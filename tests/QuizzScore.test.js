import { beforeEach, describe, expect, test, vi } from 'vitest'
import { useQuizStore } from '@/stores'
import { createPinia, setActivePinia } from 'pinia'
import { shallowMount } from '@vue/test-utils'
import QuizzScore from '@/components/quiz/QuizzScore.vue'
import { createTestingPinia } from '@pinia/testing'
import { useRouter } from 'vue-router'
import { routesNames } from '../src/router'

vi.mock('@/stores')
vi.mock('vue-router')
vi.mock('@fireworks-js/vue', () => ({
  defineComponent: vi.fn()
}))

describe('Quizz score', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    // useQuizStore.name.mockReset()
  })
  useRouter.mockReturnValue({
    replace: vi.fn()
  })
  useQuizStore.mockReturnValue({
    name: '',
    score: '',
    clearAll: vi.fn()
  })
  test('show name and score of user from store', () => {
    const store = useQuizStore()
    const name = 'ujank'
    const score = 5
    store.name = name
    store.score = score
    console.log(store.name)
    const wrapper = shallowMount(QuizzScore, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })
    // const wrapper = shallowMount(QuizzScore)
    expect(wrapper.find('#name').text()).toBe(name)
    expect(wrapper.find('#score').text()).toBe(score + '')
  })
  test('Change router to home', async () => {
    const wrapper = shallowMount(QuizzScore, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })
    await wrapper.find('button').trigger('click')
    expect(useRouter().replace).toHaveBeenCalledWith({ name: routesNames.HOME })
  })
})
