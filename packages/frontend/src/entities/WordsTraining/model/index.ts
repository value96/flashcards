import { slice } from './slice'
export { slice }

export const actions = { ...slice.actions }
export * as thunks from './thunks'
export * as selectors from './selectors'
