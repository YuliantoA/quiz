import { beforeEach, describe, expect, test, vi } from 'vitest'
import QuizzQuestion from '@/components/quiz/QuizzQuestion.vue'
import { flushPromises, mount, shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { createPinia, setActivePinia } from 'pinia'
import { useQuizStore } from '@/stores'
vi.mock('@/stores')
// vi.mock('')
describe.only('Change question', () => {
  const results = [
    {
      type: 'multiple',
      difficulty: 'hard',
      category: 'Animals',
      question: 'What is the Gray Wolf&#039;s scientific name?',
      correct_answer: 'Canis Lupus',
      incorrect_answers: ['Canis Aureus', 'Canis Latrans', 'Canis Lupus Lycaon']
    },
    {
      type: 'multiple',
      difficulty: 'hard',
      category: 'Animals',
      question: 'Which species is a &quot;mountain chicken&quot;?',
      correct_answer: 'Frog',
      incorrect_answers: ['Chicken', 'Horse', 'Fly']
    }
  ]
  useQuizStore.mockReturnValue({
    fetchQuestion: async () => {
      const response = {
        data: {
          results
        }
      }
      return response
    }
  })
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  test.only('Show question in mounted', async () => {
    // ini ga ketemu cara slot di apiloader buat ngeload component yang lain, dia ga mau nge load component answer sama detail question
    // const wrapper = mount(QuizzQuestion, {
    //   global: {
    //     plugins: [
    //       createTestingPinia({
    //         createSpy: vi.fn
    //       })
    //     ]
    //   }
    // })
    // const store = useQuizStore()
    // await flushPromises
    // await setTimeout(() => '', 500)
    // await flushPromises
    // const test = wrapper.findComponent({ name: 'api-loader' })
    // console.log(test.vm.loading)
    // console.log(test.vm.isError)
    // await flushPromises
    // await setTimeout(() => '', 500)
    // console.log(test.html())
    // const childDetailQuestion = wrapper.findComponent({ name: 'QuizzDetailQuestion' })
    // const childAnswer = wrapper.findComponent({ name: 'QuizzAnswer' })
    // console.log(childAnswer.html())
  })
})
