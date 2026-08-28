import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const DEFAULT_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".jfif", ".pjpeg", ".pjp"]);
const DEFAULT_SOURCE_DIR = "src";

export async function convertImagesToWebp({
  inputDir = "src/assets/img",
  outputDir,
  quality = 82,
  overwrite = false,
  dryRun = false,
  deleteOriginals = false,
  usedOnly = true,
  sourceDir = DEFAULT_SOURCE_DIR,
  extensions = DEFAULT_EXTENSIONS,
  modifier,
} = {}) {
  validateQuality(quality);

  const sourceRoot = path.resolve(inputDir);
  const targetRoot = path.resolve(outputDir ?? inputDir);
  const referencedAssets = usedOnly ? await getReferencedAssetPaths(sourceDir) : null;
  const converted = [];
  const skipped = [];
  const deleted = [];
  const totals = {
    sourceBytes: 0,
    targetBytes: 0,
  };

  async function walk(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const sourcePath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        await walk(sourcePath);
        continue;
      }

      if (!entry.isFile()) {
        continue;
      }

      const extension = path.extname(entry.name).toLowerCase();

      if (!extensions.has(extension)) {
        skipped.push({ source: sourcePath, reason: "extension" });
        continue;
      }

      const relativePath = path.relative(sourceRoot, sourcePath);
      const targetPath = path.join(targetRoot, relativePath).replace(/\.[^.]+$/u, ".webp");
      const expectedWebpPath = path.resolve(sourcePath.replace(/\.[^.]+$/u, ".webp"));

      if (referencedAssets && !referencedAssets.has(sourcePath) && !referencedAssets.has(expectedWebpPath)) {
        skipped.push({ source: sourcePath, reason: "unused" });
        continue;
      }

      if (!overwrite && (await fileExists(targetPath))) {
        skipped.push({ source: sourcePath, reason: "exists" });
        continue;
      }

      const sourceSize = (await fs.stat(sourcePath)).size;
      let targetSize = 0;

      if (!dryRun) {
        await fs.mkdir(path.dirname(targetPath), { recursive: true });

        const pipeline = modifier ? modifier(sharp(sourcePath), sourcePath) : sharp(sourcePath);
        await pipeline.webp({ quality }).toFile(targetPath);
        targetSize = (await fs.stat(targetPath)).size;

        if (deleteOriginals && path.resolve(sourcePath) !== path.resolve(targetPath)) {
          await fs.unlink(sourcePath);
          deleted.push(sourcePath);
        }
      }

      converted.push({ source: sourcePath, target: targetPath, sourceSize, targetSize });
      totals.sourceBytes += sourceSize;
      totals.targetBytes += targetSize;
    }
  }

  await walk(sourceRoot);

  return { converted, skipped, deleted, dryRun, totals };
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function validateQuality(quality) {
  if (!Number.isInteger(quality) || quality < 1 || quality > 100) {
    throw new Error("--quality must be an integer between 1 and 100.");
  }
}

async function getReferencedAssetPaths(sourceDir) {
  const sourceRoot = path.resolve(sourceDir);
  const references = new Set();

  async function walk(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const entryPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        await walk(entryPath);
        continue;
      }

      if (!entry.isFile() || !/\.(css|js|jsx|mjs|ts|tsx)$/iu.test(entry.name)) {
        continue;
      }

      const contents = await fs.readFile(entryPath, "utf8");
      const matches = contents.matchAll(/@\/assets\/img\/[^"'`)]+|(?:\.\.\/)+assets\/img\/[^"'`)]+/giu);

      for (const match of matches) {
        const reference = match[0];
        const assetPath = reference.startsWith("@/")
          ? path.resolve(sourceRoot, reference.slice(2))
          : path.resolve(path.dirname(entryPath), reference);

        references.add(assetPath);
      }
    }
  }

  await walk(sourceRoot);

  return references;
}

function formatBytes(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function getCliOptions() {
  const args = process.argv.slice(2);
  const options = {};

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    const next = args[index + 1];

    if (arg === "--input" && next) {
      options.inputDir = next;
      index += 1;
    } else if (arg === "--output" && next) {
      options.outputDir = next;
      index += 1;
    } else if (arg === "--quality" && next) {
      options.quality = Number(next);
      index += 1;
    } else if (arg === "--overwrite") {
      options.overwrite = true;
    } else if (arg === "--dry-run") {
      options.dryRun = true;
    } else if (arg === "--delete-originals") {
      options.deleteOriginals = true;
    } else if (arg === "--all") {
      options.usedOnly = false;
    } else if (arg === "--source" && next) {
      options.sourceDir = next;
      index += 1;
    } else if (arg === "--help" || arg === "-h") {
      options.help = true;
    }
  }

  return options;
}

function printHelp() {
  console.log(`Usage: node scripts/convert-images-to-webp.mjs [options]

Options:
  --input <dir>          Source image directory. Default: src/assets/img
  --output <dir>         Output directory. Default: same as input
  --source <dir>         Directory scanned for asset usage. Default: src
  --quality <1-100>      WebP quality. Default: 82
  --overwrite            Replace existing WebP files
  --dry-run              Show what would be converted without writing files
  --delete-originals     Delete original images after successful conversion
  --all                  Convert all matching images, including unused assets
  --help, -h             Show this help`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const options = getCliOptions();

  if (options.help) {
    printHelp();
    process.exit(0);
  }

  let result;

  try {
    result = await convertImagesToWebp(options);
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }

  const prefix = result.dryRun ? "Would convert" : "Converted";

  console.log(`${prefix} ${result.converted.length} image(s) to WebP.`);

  for (const item of result.converted) {
    const source = path.relative(process.cwd(), item.source);
    const target = path.relative(process.cwd(), item.target);
    const savings =
      item.targetSize > 0
        ? ` (${formatBytes(item.sourceSize)} -> ${formatBytes(item.targetSize)}, saved ${formatBytes(
            Math.max(0, item.sourceSize - item.targetSize),
          )})`
        : ` (${formatBytes(item.sourceSize)})`;

    console.log(`${source} -> ${target}${savings}`);
  }

  const skippedByReason = result.skipped.reduce((groups, item) => {
    groups[item.reason] = [...(groups[item.reason] ?? []), item];
    return groups;
  }, {});

  for (const [reason, items] of Object.entries(skippedByReason)) {
    console.log(`Skipped ${items.length} image(s): ${reason}.`);
  }

  if (result.deleted.length > 0) {
    console.log(`Deleted ${result.deleted.length} original image(s).`);
  }

  if (!result.dryRun && result.totals.targetBytes > 0) {
    const savedBytes = Math.max(0, result.totals.sourceBytes - result.totals.targetBytes);
    const savedPercent = result.totals.sourceBytes > 0 ? ((savedBytes / result.totals.sourceBytes) * 100).toFixed(1) : "0.0";

    console.log(
      `Total: ${formatBytes(result.totals.sourceBytes)} -> ${formatBytes(result.totals.targetBytes)} (${savedPercent}% saved).`,
    );
  }
}
