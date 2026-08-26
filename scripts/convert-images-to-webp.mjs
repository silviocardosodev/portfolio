import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const DEFAULT_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".jfif", ".pjpeg", ".pjp"]);

export async function convertImagesToWebp({
  inputDir = "src/assets/img",
  outputDir,
  quality = 82,
  overwrite = false,
  extensions = DEFAULT_EXTENSIONS,
  modifier,
} = {}) {
  const sourceRoot = path.resolve(inputDir);
  const targetRoot = path.resolve(outputDir ?? inputDir);
  const converted = [];
  const skipped = [];

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
        skipped.push(sourcePath);
        continue;
      }

      const relativePath = path.relative(sourceRoot, sourcePath);
      const targetPath = path.join(targetRoot, relativePath).replace(/\.[^.]+$/u, ".webp");

      if (!overwrite && (await fileExists(targetPath))) {
        skipped.push(sourcePath);
        continue;
      }

      await fs.mkdir(path.dirname(targetPath), { recursive: true });

      const pipeline = modifier ? modifier(sharp(sourcePath), sourcePath) : sharp(sourcePath);
      await pipeline.webp({ quality }).toFile(targetPath);
      converted.push({ source: sourcePath, target: targetPath });
    }
  }

  await walk(sourceRoot);

  return { converted, skipped };
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
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
    }
  }

  return options;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = await convertImagesToWebp(getCliOptions());
  console.log(`Converted ${result.converted.length} image(s) to WebP.`);

  for (const item of result.converted) {
    console.log(`${path.relative(process.cwd(), item.source)} -> ${path.relative(process.cwd(), item.target)}`);
  }
}
