'use client'
import { useState, useRef, useEffect } from 'react'

export default function Chat() {
  const [messages, setMessages] = useState<{text: string, isUser: boolean}[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  async function sendMessage() {
    if (!input.trim()) return
    
    setIsLoading(true)
    setMessages(prev => [...prev, { text: input, isUser: true }])
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
      
      // Обрабатываем ошибки от API
      if (data.error) {
        throw new Error(data.details || 'Unknown error')
      }

      // Добавляем проверку наличия content
      if (!data.content) {
        throw new Error('Пустой ответ от сервера')
      }

      setMessages(prev => [...prev, { 
        text: data.content, 
        isUser: false 
      }])

    } catch (error) {
      setMessages(prev => [...prev, { 
        text: `*отрыгивает* Ошибка: ${error.message}`, 
        isUser: false 
      }])
      console.error('Chat error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Автопрокрутка к новым сообщениям
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex flex-col h-screen bg-gray-900 p-4 text-green-400">
      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-3xl px-4 py-2 rounded-lg ${
              msg.isUser ? 'bg-purple-600' : 'bg-gray-700'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !isLoading && sendMessage()}
          placeholder="Спроси Рика..."
          className="flex-1 bg-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading}
          className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg disabled:opacity-50"
        >
          {isLoading ? '...' : '➔'}
        </button>
      </div>
    </div>
  )
}