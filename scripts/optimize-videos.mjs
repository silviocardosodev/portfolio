import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import ffmpegPath from "ffmpeg-static";

const DEFAULT_EXTENSIONS = new Set([".mp4", ".mov", ".m4v", ".webm", ".avi", ".mkv"]);

export async function optimizeVideos({
  inputDir = "public/stories",
  outputDir,
  width = 1080,
  height = 1920,
  webmCrf = 28,
  mp4Crf = 20,
  preset = "slow",
  formats = ["webm", "mp4"],
  overwrite = false,
  keepAudio = false,
  extensions = DEFAULT_EXTENSIONS,
} = {}) {
  const sourceRoot = path.resolve(inputDir);
  const targetRoot = path.resolve(outputDir ?? inputDir);
  const optimized = [];
  const skipped = [];

  if (!(await directoryExists(sourceRoot))) {
    return { optimized, skipped };
  }

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

      for (const format of formats) {
        const targetPath = path.join(targetRoot, relativePath).replace(/\.[^.]+$/u, `.${format}`);

        if (sourcePath === targetPath || (!overwrite && (await fileExists(targetPath)))) {
          skipped.push(sourcePath);
          continue;
        }

        await fs.mkdir(path.dirname(targetPath), { recursive: true });
        await encodeVideo({
          sourcePath,
          targetPath,
          width,
          height,
          webmCrf,
          mp4Crf,
          preset,
          keepAudio,
          format,
          overwrite,
        });
        optimized.push({ source: sourcePath, target: targetPath });
      }
    }
  }

  await walk(sourceRoot);

  return { optimized, skipped };
}

function encodeVideo({ sourcePath, targetPath, width, height, webmCrf, mp4Crf, preset, keepAudio, format, overwrite }) {
  const coverFilter = `scale=${width}:${height}:force_original_aspect_ratio=increase,crop=${width}:${height}`;
  const args = [
    overwrite ? "-y" : "-n",
    "-i",
    sourcePath,
    "-vf",
    coverFilter,
    "-movflags",
    "+faststart",
  ];

  if (format === "webm") {
    args.push("-c:v", "libvpx-vp9", "-crf", String(webmCrf), "-b:v", "0");
  } else {
    args.push("-c:v", "libx264", "-crf", String(mp4Crf), "-preset", preset, "-pix_fmt", "yuv420p");
  }

  if (keepAudio) {
    args.push("-c:a", format === "webm" ? "libopus" : "aac", "-b:a", "128k");
  } else {
    args.push("-an");
  }

  args.push(targetPath);

  return new Promise((resolve, reject) => {
    const child = spawn(ffmpegPath, args, { stdio: ["ignore", "ignore", "pipe"] });
    let stderr = "";

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`FFmpeg exited with code ${code} while processing ${sourcePath}\n${stderr}`));
    });
  });
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function directoryExists(directoryPath) {
  try {
    const stats = await fs.stat(directoryPath);
    return stats.isDirectory();
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
    } else if (arg === "--width" && next) {
      options.width = Number(next);
      index += 1;
    } else if (arg === "--height" && next) {
      options.height = Number(next);
      index += 1;
    } else if (arg === "--webm-crf" && next) {
      options.webmCrf = Number(next);
      index += 1;
    } else if (arg === "--mp4-crf" && next) {
      options.mp4Crf = Number(next);
      index += 1;
    } else if (arg === "--format" && next) {
      options.formats = next.split(",").map((format) => format.trim()).filter(Boolean);
      index += 1;
    } else if (arg === "--overwrite") {
      options.overwrite = true;
    } else if (arg === "--keep-audio") {
      options.keepAudio = true;
    }
  }

  return options;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = await optimizeVideos(getCliOptions());
  console.log(`Optimized ${result.optimized.length} video file(s).`);

  for (const item of result.optimized) {
    console.log(`${path.relative(process.cwd(), item.source)} -> ${path.relative(process.cwd(), item.target)}`);
  }
}
