# Changelog

## [1.0.5]

- Assessed Socket.dev dependency alerts (score 67/100)
- All flagged issues are transitive through `@opencode-ai/plugin@1.18.31` and not directly fixable:
  - `json-schema@0.4` — low risk, potential in-place mutations during validation
  - `cross-spawn@7.0.6` — uses `child_process` for shell spawning (expected for CLI tooling)
  - `msgpackr-extract@3.0.4` — contains native code for messagepack serialization
- Removed npm publishing from CI; distributing via GitHub releases only

## [1.0.4]

- Fixed release workflow publish command

## [1.0.3]

- Restored GitHub release creation step
- Attempted npm publish with `npm stage publish`
