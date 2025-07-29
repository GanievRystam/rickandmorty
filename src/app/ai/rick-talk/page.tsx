'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './rickTalk.css';

type Msg = { id: string; text: string; isUser: boolean; ts: number }

export default function Chat() {
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  async function sendMessage() {
    if (!input.trim() || isLoading) return

    setIsLoading(true)
    const now = Date.now()
    const userMessage: Msg = { id: String(now), text: input, isUser: true, ts: now }

    setMessages(prev => [...prev, userMessage])
    const payload = input
    setInput('')

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: payload }] })
      })

      const data = await response.json()
      if (data.error) throw new Error(data.details || 'Unknown error')
      if (!data.content) throw new Error('Пустой ответ от сервера')

      const botMessage: Msg = {
        id: String(Date.now()),
        text: data.content,
        isUser: false,
        ts: Date.now()
      }
      setMessages(prev => [...prev, botMessage])
    } catch (error: any) {
      setMessages(prev => [
        ...prev,
        {
          id: String(Date.now()),
          text: `*отрыгивает* Ошибка: ${error.message}`,
          isUser: false,
          ts: Date.now()
        }
      ])
      console.error('Chat error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  // ----- UI helpers
  const todayLabel = messages.length ? 'Сегодня' : ''

  return (
    <div className="relative h-screen text-gray-100">
      {/* Портальный фон */}
      <img
        className="absolute inset-0 w-full h-full object-cover -z-10"
        src="/img/rickbgforchat.png"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black/70 via-[#0b0f0b]/70 to-black/80" />

      {/* Шапка (как в Telegram) */}
      <div className="sticky top-0 z-20 px-4 py-3 bg-gray-900/60 backdrop-blur-md border-b border-[#ff099b]/40">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <img
            src="/img/rick-icon.png"
            alt="Rick"
            className="w-9 h-9 rounded-full ring-2 ring-[#39ff14]/20"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold tracking-wide">Рик Санчез</span>
              <span className="inline-flex items-center gap-1 text-xs text-[#39ff14]">
                <span className="w-2 h-2 rounded-full bg-[#39ff14] animate-pulse" /> онлайн
              </span>
            </div>
            <div className="text-xs text-gray-400">Citadel of Ricks • Earth C‑137</div>
          </div>
        </div>
      </div>

      {/* Лента сообщений */}
      <div className="max-w-3xl mx-auto h-[calc(100vh-140px)] px-3 sm:px-4 overflow-y-auto py-4 space-y-3">
        {/* День/дата */}
        {todayLabel && (
          <div className="flex justify-center">
            <span className="px-3 py-1 text-xs rounded-full bg-gray-800/70 border border-gray-700/80">
              {todayLabel}
            </span>
          </div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} items-end`}
            >
              {/* Аватар слева для Рика */}
              {!msg.isUser && (
                <img
                  src="/img/rick-icon.png"
                  alt="Rick"
                  className="w-8 h-8 rounded-full mr-2 mt-6 hidden sm:block"
                />
              )}

              <div className="relative max-w-[78%] sm:max-w-[75%]">
                <div
                  className={`
                    px-4 py-3 rounded-2xl shadow-lg leading-relaxed break-words
                    ${msg.isUser
                      ? 'bg-[#ff099b] text-white rounded-br-md user-tail neon-user'
                      : 'bg-gray-800/90 text-[#00ffff] border border-[#00ffff]/20 rounded-bl-md rick-tail neon-rick'
                    }
                  `}
                >
                  {msg.text}
                  {/* Статус как в Telegram (галочка) для своих */}
                  {msg.isUser && (
                    <span className="ml-2 align-middle text-xs opacity-80">✓</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Индикатор «Рик печатает…» */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="flex justify-start"
            >
              <div className="relative max-w-[70%]">
                <div className="bg-gray-800/90 text-[#00ffff] border border-[#00ffff]/20 px-4 py-3 rounded-2xl rounded-bl-md rick-tail shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-sm opacity-80">Рик печатает</span>
                    <span className="flex gap-1">
                      <span className="dot" />
                      <span className="dot delay-150" />
                      <span className="dot delay-300" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Поле ввода */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky bottom-0 z-20"
      >
        <div className="max-w-4xl mx-auto px-3 sm:px-4 pb-3">
          <div className="flex items-center gap-3 p-2.5 bg-gray-900/70 backdrop-blur-md rounded-2xl border border-gray-800">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !isLoading && sendMessage()}
              placeholder="Спроси Рика..."
              className="flex-1 bg-gray-800/80 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff099b] text-white placeholder-gray-400"
              disabled={isLoading}
            />
            <motion.button
              onClick={sendMessage}
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-6 py-2 rounded-xl text-white font-medium disabled:opacity-50 transition-all
                         bg-gradient-to-r from-[#ff099b] to-[#ff4d6d] shadow-[0_0_18px_rgba(255,9,155,0.45)]"
              aria-label="Отправить"
              title="Отправить"
            >
              {isLoading ? (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="inline-block"
                >
                  ↻
                </motion.span>
              ) : (
                '➔'
              )}
              {/* Портальное свечение под кнопкой */}
              <span className="pointer-events-none absolute -inset-1 rounded-xl portal-glow" />
            </motion.button>
          </div>
        </div>
      </motion.div>

    </div>
  )
}
