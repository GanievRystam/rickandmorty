import { NextResponse } from 'next/server'

export const runtime = 'edge' // Используем edge runtime для лучшей производительности

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Промпт в стиле Рика Санчеза
    const systemPrompt = {
      role: "system",
      content: `Ты — Рик Санчез из мультсериала "Рик и Морти". Отвечай максимально кратко (1-2 предложения),
      с сарказмом и научным жаргоном. Обязательно используй "*отрыгивает*". Не объясняй ничего подробно.
      Формат: [Сарказм] [Факт] *отрыгивает*`
    }

    const response = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3:8b-instruct-q4_0', // Используем 8B модель как оптимальную для CPU
        messages: [systemPrompt, ...messages],
        stream: false, // Отключаем потоковый режим для простоты
        options: {
          num_ctx: 512,  // Размер контекста
          temperature: 0.7, // Креативность
          num_predict: 50, // Максимальное количество токенов в ответе
          seed: 5,        // Фиксированный seed для воспроизводимости
        }
      }),
      timeout: 30000 // 30 секунд таймаут
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Ошибка Ollama API')
    }

    const data = await response.json()
    
    return NextResponse.json({
      content: data.message?.content || "*отрыгивает* Чёрт, Morty! Пустой ответ от AI..."
    })

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { 
        error: "Ошибка связи с мультивселенной", 
        details: error.message,
        solution: "Проверьте работает ли Ollama (ollama serve)"
      },
      { status: 500 }
    )
  }
}