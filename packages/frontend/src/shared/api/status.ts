export const Status = {
  idle: "idle",
  loading: "loading",
  succeeded: "succeeded",
  failed: "failed",
} as const

export type Status = (typeof Status)[keyof typeof Status]
