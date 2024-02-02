import { shallowMount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import QuizzDetailQuestion from '@/components/quiz/QuizzDetailQuestion.vue'

describe('Quizz Detail Question', () => {
  test('Show Question', () => {
    const questionString = 'This must be a question'
    const wrapper = shallowMount(QuizzDetailQuestion, {
      propsData: {
        questionText: questionString,
        changeQuestion: false
      }
    })
    expect(wrapper.find('div').text()).toContain(questionString)
  })
  test('Change Question', () => {
    const wrapper = shallowMount(QuizzDetailQuestion, {
      propsData: {
        questionText: 'this question',
        changeQuestion: true
      }
    })
    expect(wrapper.find('div[id=questionDetail]').isVisible()).toBe(false)
  })
})
