'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Chat() {
  const [messages, setMessages] = useState<{text: string, isUser: boolean, id: string}[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  async function sendMessage() {
    if (!input.trim()) return
    
    setIsLoading(true)
    const userMessageId = Date.now().toString()
    setMessages(prev => [...prev, { text: input, isUser: true, id: userMessageId }])
    setInput('')

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: input }]
        })
      })

      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.details || 'Unknown error')
      }

      if (!data.content) {
        throw new Error('Пустой ответ от сервера')
      }

      setMessages(prev => [...prev, { 
        text: data.content, 
        isUser: false,
        id: Date.now().toString()
      }])

    } catch (error: any) {
      setMessages(prev => [...prev, { 
        text: `*отрыгивает* Ошибка: ${error.message}`, 
        isUser: false,
        id: Date.now().toString()
      }])
      console.error('Chat error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 text-gray-100">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 px-2">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className={`max-w-3xl px-4 py-3 rounded-2xl ${
                  msg.isUser 
                    ? 'bg-[#ff099b] text-white rounded-br-none' 
                    : 'bg-gray-700 rounded-bl-none'
                } shadow-lg`}
              >
                {msg.text}
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-3 p-2 bg-gray-800/50 backdrop-blur-sm rounded-xl"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !isLoading && sendMessage()}
          placeholder="Спроси Рика..."
          className="flex-1 bg-gray-700/80 px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff099b] text-white placeholder-gray-400 transition-all duration-200"
          disabled={isLoading}
        />
        <motion.button
          onClick={sendMessage}
          disabled={isLoading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-[#ff099b] to-[#ff4d6d] px-6 py-3 rounded-xl disabled:opacity-50 text-white font-medium shadow-lg hover:shadow-[#ff099b]/30 transition-all duration-200"
        >
          {isLoading ? (
            <motion.span 
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="inline-block"
            >
              ↻
            </motion.span>
          ) : (
            '➔'
          )}
        </motion.button>
      </motion.div>
    </div>
  )
}