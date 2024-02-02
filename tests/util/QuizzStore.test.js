import { beforeEach, describe, expect, test } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useQuizStore } from '@/stores'

describe('Quizz Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  test('Calculate user score', () => {
    const store = useQuizStore()
    store.question = [
      { correct_answer: 'answer1' },
      { correct_answer: 'answer2' },
      { correct_answer: 'answer3' }
    ]
    store.calculateScore(['answer1', 'answer3', 'answer3'])
    expect(store.score).toBe(2)
  })
})
