export interface Msg {
    id: string
    text: string
    isUser: boolean
    ts: number
  }
  
  export interface ChatState {
    messages: Msg[]
    isLoading: boolean
    conversationId: string | null
  }