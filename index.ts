import { readdir, stat, rm } from "fs/promises";
import { join } from "path";

async function removeNodeModules(dir: string): Promise<number> {
  let entries;
  let deletedCount = 0;

  try {
    entries = await readdir(dir);
  } catch {
    // Skip directories we cannot read (permissions, etc.)
    return deletedCount;
  }

  for (const entry of entries) {
    const fullPath = join(dir, entry);

    let entryStat;
    try {
      entryStat = await stat(fullPath);
    } catch {
      continue;
    }

    if (entryStat.isDirectory()) {
      if (entry === "node_modules") {
        console.log(`Removing: ${fullPath}`);
        await rm(fullPath, { recursive: true, force: true });
        deletedCount++;
      } else {
        deletedCount += await removeNodeModules(fullPath);
      }
    }
  }

  return deletedCount;
}

async function main() {
  const startDir = process.cwd();
  console.log(`Starting cleanup from: ${startDir}`);
  const totalDeleted = await removeNodeModules(startDir);
  console.log(
    `Cleanup complete. Deleted ${totalDeleted} node_modules folder(s).`
  );
}

main().catch((err) => {
  console.error("Error during cleanup:", err);
  process.exit(1);
});
