import { defineStore } from 'pinia'
import apiClient from '../helpers/ApiClient'
import { getQuestionEndpoint } from '../helpers/ListApi'

export const useQuizStore = defineStore({
  id: 'quiz',
  state: () => ({
    score: 0,
    question: [],
    totalQuestion: 0,
    themeQuestion: '',
    name: '',
    activeQuestion: -1
  }),
  actions: {
    incActiveQuestion() {
      this.activeQuestion++
    },
    decActiveQuestion() {
      this.activeQuestion--
    },
    clearAll() {
      this.activeQuestion = -1
      this.question = []
      this.score = 0
      this.name = ''
      this.themeQuestion = ''
      this.totalQuestion = ''
    },
    setNewQuestion({ name, theme, totalQuestion }) {
      this.name = name
      this.themeQuestion = theme
      this.totalQuestion = totalQuestion
    },
    setRandomAnswer({ listAnswer, index }) {
      this.question[index].randomAnswer = listAnswer
    },
    calculateScore(userAnswer) {
      const answer = this.question.map((a) => a.correct_answer)

      answer.forEach((value, index) => {
        value === userAnswer[index] ? this.score++ : ''
      })
    },

    async fetchQuestion() {
      try {
        const params = { amount: this.totalQuestion }
        this.themeQuestion === 'any' ? '' : (params.category = this.themeQuestion)
        const result = await apiClient.apiCall({
          ...getQuestionEndpoint,
          params: params
        })
        this.activeQuestion = 0
        this.question = result.data.results
        return result
      } catch (error) {
        console.log(error)
      }
    }
  },
  getters: {
    getTotalQuestion: (state) => state.totalQuestion,
    getThemeQuestion: (state) => state.themeQuestion,
    getLengthQuestion: (state) => state.question.length
  }
})
