# Yeet Node Modules

A simple utility to recursively find and delete all `node_modules` folders starting from the current working directory.

## Need

In large projects or monorepos, `node_modules` folders can take up significant disk space. This tool helps you quickly clean up these folders to free up space.

You can run it inside a root directory, and it will traverse all subdirectories to find and delete `node_modules` folders.

## Motivation

I wanted to explore Bun's [Single File Executables](https://bun.com/docs/bundler/executables) feature and thought a utility to delete `node_modules` folders would be a practical example.

## Usage

1. Ensure you have [Bun](https://bun.sh/) installed.
2. Clone this repository.
3. Navigate to the project directory.
4. Run the following command:
   ```bash
   bun run index.ts
   ```
5. The script will start from the current directory and delete all `node_modules` folders it finds, logging the total number deleted at the end.

## Create a Single File Executable

To create a single file executable, run the following command in the project directory:

```bash
bun build ./index.ts --compile --outfile ./yeet
```

Run the resulting `./yeet` executable to perform the cleanup without needing to run it through Bun each time.

## Add to PATH

To make the `yeet` command available globally, you can add it to your system's PATH. For example, on Unix-like systems, you can move the executable to `/usr/local/bin`:

```bash
mv ./yeet /usr/local/bin/yeet
```

Now you can run `yeet` from any directory to clean up `node_modules` folders.
