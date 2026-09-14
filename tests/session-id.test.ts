import { describe, it, expect, vi, beforeEach } from "vitest"
import { SessionIdPlugin } from "../opencode/plugins/session-id"

describe("SessionIdPlugin", () => {
  it("returns the tool definition", async () => {
    const hooks = await SessionIdPlugin({ client: {} } as any)
    expect(hooks.tool.get_session_id).toBeDefined()
    expect(hooks.tool.get_session_id.description).toBe("Returns the current session ID")
  })

  it("returns cached ID when available from event", async () => {
    const hooks = await SessionIdPlugin({ client: {} } as any)
    await hooks["session.created"]({ session: { id: "ses_cached" } })
    const result = await hooks.tool.get_session_id.execute({}, {})
    expect(result).toBe("ses_cached")
  })

  it("lazy-fetches from client when no cached ID", async () => {
    const mockClient = {
      session: {
        list: vi.fn().mockResolvedValue({ data: [{ id: "ses_lazy123" }] }),
      },
    }
    const hooks = await SessionIdPlugin({ client: mockClient } as any)
    const result = await hooks.tool.get_session_id.execute({}, {})
    expect(result).toBe("ses_lazy123")
    expect(mockClient.session.list).toHaveBeenCalled()
  })

  it("returns fallback when lazy-fetch finds no sessions", async () => {
    const mockClient = {
      session: {
        list: vi.fn().mockResolvedValue({ data: [] }),
      },
    }
    const hooks = await SessionIdPlugin({ client: mockClient } as any)
    const result = await hooks.tool.get_session_id.execute({}, {})
    expect(result).toBe("No session ID available.")
  })

  it("handles lazy-fetch failure gracefully", async () => {
    const mockClient = {
      session: {
        list: vi.fn().mockRejectedValue(new Error("server down")),
      },
    }
    const hooks = await SessionIdPlugin({ client: mockClient } as any)
    const result = await hooks.tool.get_session_id.execute({}, {})
    expect(result).toBe("No session ID available.")
  })

  it("updates session ID on session.updated event", async () => {
    const hooks = await SessionIdPlugin({ client: {} } as any)
    await hooks["session.updated"]({ session: { id: "ses_updated" } })
    const result = await hooks.tool.get_session_id.execute({}, {})
    expect(result).toBe("ses_updated")
  })
})
