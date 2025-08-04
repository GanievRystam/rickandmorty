import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ChatState, Msg } from '@/types/chat'
import { RootState } from '@/store' 

const initialState: ChatState = {
  messages: [],
  isLoading: false,
  conversationId: null
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Msg>) => {
      state.messages.push(action.payload)
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    clearChat: (state) => {
      state.messages = []
    },
    setMessages: (state, action: PayloadAction<Msg[]>) => {
      state.messages = action.payload
    },
    setConversationId: (state, action: PayloadAction<string>) => {
        state.conversationId = action.payload
      },
  },
})

export const { addMessage, setLoading, clearChat, setMessages, setConversationId } = chatSlice.actions
export const selectMessages = (state: RootState) => state.chat.messages // ✅ Обращение к state.chat
export const selectIsLoading = (state: RootState) => state.chat.isLoading // ✅

export default chatSlice.reducer