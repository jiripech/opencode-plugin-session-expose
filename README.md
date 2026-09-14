# opencode-plugin-session-expose

OpenCode plugin that exposes the current session ID as a tool.

## Install

Add the package to your OpenCode config:

```json
{
  "plugin": ["opencode-plugin-session-expose"]
}
```

Or place the `opencode/plugins/` directory directly in your plugin path:

```text
~/.config/opencode/plugins/
.opencode/plugins/
```

## Tool

- **`get_session_id`** — returns the current session ID string

## License

[MIT License][def]

[def]: LICENSE
