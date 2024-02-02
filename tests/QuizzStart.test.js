import { test, describe, expect, vi, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { routesNames } from '../src/router/index'
import { useRouter } from 'vue-router'
vi.mock('vue-router')
import QuizzHome from '@/components/quiz/QuizzHome.vue'
describe('QuizzHome.vue', () => {
  useRouter.mockReturnValue({
    push: vi.fn()
  })
  beforeEach(() => {
    useRouter().push.mockReset()
  })
  const wrapper = shallowMount(QuizzHome)
  test('submit button show', () => {
    expect(wrapper.find('button > div').text()).toBe('start')
  })
  test('expect to change route on click', async () => {
    await wrapper.find('button').trigger('click')
    expect(useRouter().push).toHaveBeenCalledWith({
      name: routesNames.FORM
    })
  })
})
