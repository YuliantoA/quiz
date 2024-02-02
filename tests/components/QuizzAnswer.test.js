import { shallowMount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import QuizzAnswer from '@/components/quiz/QuizzAnswer.vue'

describe('Quizz answer', async () => {
  test('New Question to show', () => {
    const allAnswer = ['answer1', 'answer2', 'answer3', 'answer4']
    const wrapper = shallowMount(QuizzAnswer, {
      propsData: {
        detailAnswer: {
          correct_answer: allAnswer[0],
          incorrect_answers: allAnswer.slice(1)
        },
        userAnswer: ''
      }
    })
    let isSame = wrapper.emitted().randomQuiz[0][0].every(function (element) {
      return allAnswer.includes(element)
    })
    expect(wrapper.emitted().randomQuiz[0][0].length === allAnswer.length).toBe(true)
    expect(isSame).toBe(true)
  })
  test('Exist Question to show', async () => {
    const allAnswer = ['answer1', 'answer2', 'answer3', 'answer4']
    const wrapper = shallowMount(QuizzAnswer, {
      propsData: {
        detailAnswer: {
          correct_answer: allAnswer[0],
          incorrect_answers: allAnswer.slice(1),
          randomAnswer: allAnswer
        },
        userAnswer: ''
      }
    })
    for (let i of allAnswer) {
      expect(wrapper.find('div > div').text()).toContain(i)
    }
  })
  test('User already answer the question', () => {
    const allAnswer = ['answer1', 'answer2', 'answer3', 'answer4']
    const wrapper = shallowMount(QuizzAnswer, {
      propsData: {
        detailAnswer: {
          correct_answer: allAnswer[0],
          incorrect_answers: allAnswer.slice(1),
          randomAnswer: allAnswer
        },
        userAnswer: 'answer1'
      }
    })
    expect(wrapper.find('#user-answer').text()).toBe('answer1')
  })
})
