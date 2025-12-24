# Log Analyzer (TypeScript) 🔍📄

**Brief:**
A TypeScript-based command-line application to analyze log files — parse, filter, and produce reports/metrics. This repository is in early development and already has TypeScript configured.

---

## 🚦 Current status (what you’ve done so far)
- Project initialized with a `package.json`.
- Dev dependencies installed: `typescript`, `ts-node`, `@types/node` (via `npm install typescript ts-node @types/node --save-dev`).
- TypeScript initialized with `npx tsc --init` and `tsconfig.json` added.

---

## ⚙️ Prerequisites
- Node.js (recommended v16+)
- npm (or yarn)

---

## 🚀 Quick start — Local setup
1. Install dependencies:

```bash
npm install
```

2. (Optional) Generate a massive sample log for testing:

```bash
npx ts-node generate-logs.ts
```

> Run this from the project root; it will generate a `massive-log.log` that you can use as input to the analyzer.

3. Recommended `package.json` scripts (add if not present):

```json
"scripts": {
  "build": "tsc",
  "dev": "ts-node src/index.ts",
  "start": "node dist/index.js",
  "typecheck": "tsc --noEmit",
  "generate-logs": "ts-node generate-logs.ts",
  "analyze": "ts-node analyze.ts",
  "lint": "eslint . --ext .ts",
  "test": "jest"
}
```

3. Create the project entry point `src/index.ts` (example):

```ts
console.log('Log Analyzer — start building your parser here');
```

4. Development run (after adding `src/index.ts`):

```bash
npm run dev
```

5. Build and run:

```bash
npm run build
npm start
```

6. Analyze logs (example)

If you generated a sample log (`massive-log.log` or `massive-log.txt`), run the analyzer to extract lines containing `[ERROR]`:

```bash
# run directly with ts-node
npx ts-node analyze.ts

# or via npm script
npm run analyze
```

By default the included `analyze.ts` script reads `./massive-log.txt` and writes `./errors-only.txt` containing only the lines that matched. Adjust paths in `analyze.ts` or enhance it to accept CLI arguments as the next step.

---

## 🧭 Example usage ideas
- CLI flags: `--input <file>`, `--format json|text`, `--from <timestamp>`, `--to <timestamp>`, `--level <error|warn|info>`.
- Commands: `analyze`, `report`, `tail` (streaming analytics for live logs).

---

## 📈 Suggested roadmap (next steps)
1. Implement a basic parser for one format (e.g., JSON logs).
2. Add a CLI parser (e.g., `commander` or `yargs`) and support `--input` / `--output` flags.
3. Add streaming support for large files with Node streams.
4. Add unit tests (Jest + ts-jest) and set up CI.
5. Add linting (ESLint + TypeScript rules) and Prettier formatting.
6. Add example log fixtures and sample output formats.

---

## 🧾 Contributing
- Use feature branches: `feature/<name>`.
- Open issues for bugs or feature requests.

---

## ⚖️ License
- Add a license when ready (MIT is a common choice for small open-source projects).

---

If you want, I can also:
- Add the `src/index.ts` starter file now ✅
- Add the scripts to `package.json` for you ✅
- Add basic linting/test configuration ✅

Tell me which of the above I should add next and I'll implement it.