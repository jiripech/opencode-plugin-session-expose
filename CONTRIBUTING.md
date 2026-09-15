# Contributing

## Quick Start

```bash
git clone https://github.com/jiri-pech/opencode-plugin-session-expose.git
cd opencode-plugin-session-expose
bun install
```

## Development

```bash
# Run tests
bun test

# Edit the plugin
# Main file: opencode/plugins/session-expose.ts
```

## Project Structure

- `opencode/plugins/session-expose.ts` — plugin entry point
- `package.json` — dependencies and metadata
- `test/` — test files

## Submitting Changes

1. Open an issue or PR describing what you're changing
2. Run `bun test` before pushing
3. Bump the version in `package.json`
4. Update `CHANGELOG.md` with a new entry
