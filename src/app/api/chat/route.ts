import { NextResponse } from 'next/server'

export const runtime = 'edge'

// Сохраняем историю переписки в памяти сервера (для демо)
// В продакшене используйте базу данных
const conversationHistory = new Map<string, any[]>()

export async function POST(req: Request) {
  try {
    const { messages, conversationId } = await req.json()

    // Промпт в стиле Рика Санчеза
    const systemPrompt = {
      role: "system",
      content: `Ты — Рик Санчез. Отвечай кратко с сарказмом и научным жаргоном. *отрыгивает*`
    }

    // Получаем или инициализируем историю для conversationId
    if (!conversationHistory.has(conversationId)) {
      conversationHistory.set(conversationId, [systemPrompt])
    }

    const history = conversationHistory.get(conversationId)!
    const fullMessages = [...history, ...messages]

    const response = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3:8b-instruct-q4_0',
        messages: fullMessages,
        stream: false,
        options: {
          num_ctx: 2048,  // Увеличиваем контекст для истории
          temperature: 0.7,
        }
      })
    })

    if (!response.ok) throw new Error('Ошибка Ollama API')

    const data = await response.json()
    const aiResponse = data.message?.content

    // Сохраняем новые сообщения в историю
    history.push(...messages, {
      role: "assistant",
      content: aiResponse
    })

    return NextResponse.json({
      content: aiResponse,
      conversationId // Возвращаем тот же ID для продолжения
    })

  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json(
      { error: "*отрыгивает* Чёрт, Morty! Ошибка мультивселенной!" },
      { status: 500 }
    )
  }
}