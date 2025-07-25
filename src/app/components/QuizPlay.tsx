import { useState, useEffect } from 'react'

type QuizQuestion = {
  quote: string
  correctAuthor: string
  options: string[]
}

const QuizPlay = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    const mockQuestions: QuizQuestion[] = [
      {
        quote: 'Wubba Lubba Dub Dub!',
        correctAuthor: 'Рик',
        options: ['Рик', 'Морти', 'Саммер', 'Мистер Мисикс'],
      },
      {
        quote: "I'm Pickle Rick!",
        correctAuthor: 'Рик',
        options: ['Рик', 'Джерри', 'Бет', 'Бёрдперсон'],
      },
    ]
    setQuestions(mockQuestions)
  }, [])

  const handleAnswer = (answer: string) => {
    if (answer === questions[currentQuestion]?.correctAuthor) {
      setScore((prev) => prev + 1)
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      setShowResult(true)
    }
  }

  if (questions.length === 0) return <div className="text-white">Загрузка...</div>

  return (
    <section className="quiz-section bg-black/70 border border-[#ff099b]/20 backdrop-blur-md p-8 rounded-xl shadow-lg max-w-2xl mx-auto text-white mb-15 mt-15">
      <h2 className="text-3xl font-bold mb-6 text-[#ff099b] tracking-wide text-center">
        Викторина по «Рику и Морти»
      </h2>

      {!showResult ? (
        <div className="question space-y-6">
          <p className="quote text-xl italic text-center">«{questions[currentQuestion].quote}»</p>
          <div className="options grid grid-cols-2 gap-4">
            {questions[currentQuestion].options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className="bg-[#1a1a1a] border border-[#ff099b]/30 hover:border-[#ff099b] hover:shadow-[0_0_10px_#ff099b66] transition text-white py-3 px-4 rounded-lg font-medium"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="result text-center space-y-6">
          <h3 className="text-2xl text-[#ff099b] font-semibold">
            Ваш результат: {score} из {questions.length}
          </h3>
          <button
            onClick={() => {
              setCurrentQuestion(0)
              setScore(0)
              setShowResult(false)
            }}
            className="bg-[#ff099b] hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            Пройти заново
          </button>
        </div>
      )}
    </section>
  )
}

export default QuizPlay
