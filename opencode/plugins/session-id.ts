import { type Plugin, tool } from "@opencode-ai/plugin"

export const SessionIdPlugin: Plugin = async ({ client }) => {
  let sessionId = null

  return {
    "session.created": async ({ session }) => {
      sessionId = session.id
    },
    "session.updated": async ({ session }) => {
      sessionId = session.id
    },
    tool: {
      get_session_id: tool({
        description: "Returns the current session ID",
        args: {},
        async execute() {
          if (sessionId) return sessionId
          try {
            const sessions = await client.session.list()
            if (sessions.data?.length > 0) {
              sessionId = sessions.data[0].id
              return sessionId
            }
          } catch { /* ignore */ }
          return "No session ID available."
        },
      }),
    },
  }
}
