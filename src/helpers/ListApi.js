const baseUrl = `${import.meta.env.VITE_APP_QUIZZ_ENDPOINT}`

export const getQuestionEndpoint = { url: `${baseUrl}/`, method: 'get' }
