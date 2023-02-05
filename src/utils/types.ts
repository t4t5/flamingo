export interface RequestData {
  id: string
  method: string
  data?: Record<string, unknown>
}

export interface MessageData {
  target: string
  requestData: RequestData
  responseData?: unknown
}

export type PromiseObject = {
  resolve: (value: unknown) => void
  reject: () => void
}
