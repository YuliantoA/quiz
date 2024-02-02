describe('Form input', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/quiz/home', { defaultCommandTimeout: 10000 })
    cy.get('#start-button').click()
  })
  // Context('Check form input', () => {})
  it('Show form input', () => {
    cy.get('#name').should('exist')
    cy.get('#theme').should('exist')
    cy.get('#totalQuestion').should('exist')
  })

  it('Empty form name', () => {
    cy.get('#theme').select('Politics').should('have.value', 24)
    cy.get('#totalQuestion').type('4').should('have.value', '4')
    cy.get('button').click()
    cy.get('#name + .input-errors').should('exist').should('contain', 'Name')
  })
  it('Empty form theme', () => {
    cy.get('#name').type('ujank').should('have.value', 'ujank')
    cy.get('#totalQuestion').type('4').should('have.value', '4')
    cy.get('button').click()
    cy.get('#theme + .input-errors').should('exist').should('contain', 'Theme Question')
  })
  it('Empty form total question', () => {
    cy.get('#name').type('ujank').should('have.value', 'ujank')
    cy.get('#theme').select('Politics').should('have.value', 24)
    cy.get('button').click()
    cy.get('#totalQuestion + .input-errors').should('exist').should('contain', 'Total Question')
  })
  it('Empty form total question and name', () => {
    cy.get('#theme').select('Politics').should('have.value', 24)
    cy.get('button').click()
    cy.get('#totalQuestion + .input-errors').should('exist').should('contain', 'Total Question')
    cy.get('#name + .input-errors').should('exist').should('contain', 'Name')
  })
  it('Empty form', () => {
    cy.get('#submit-form').click()
    cy.get('#name + .input-errors').should('exist').should('contain', 'Name')
    cy.get('#totalQuestion + .input-errors').should('exist').should('contain', 'Total Question')
    cy.get('#theme + .input-errors').should('exist').should('contain', 'Theme Question')
  })
  it('Filled All and to Detail Question', () => {
    cy.get('#name').type('ujank').should('have.value', 'ujank')
    cy.get('#theme').select('Politics').should('have.value', 24)
    cy.get('#totalQuestion').type('4').should('have.value', '4')
    cy.get('#submit-form').click()
    cy.url().should('include', 'question/detail')
    cy.wait(5000)
  })
})
describe('Question Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://opentdb.com/api.php/**').as('getQuestion')
    cy.visit('http://localhost:5173/quiz/home', { defaultCommandTimeout: 10000 })
    cy.get('#start-button').click()
    cy.get('#name').type('ujank')
    cy.get('#theme').select('Politics')
    cy.get('#totalQuestion').type('2')
    cy.get('#submit-form').click()
    cy.wait('@getQuestion')
  })
  it('Navigation to score', () => {
    cy.wait(5000)
    cy.get('#questionDetail').should('exist')
    cy.get('#answer0').should('exist')
    cy.get('#questionDetail').invoke('text').as('question1')

    cy.get('#answer0').click()
    cy.wait(500)
    cy.get('#questionDetail').invoke('text').as('question2')

    expect('@question1').not.to.eq('@question2')
    //check back button
    cy.get('#change-menu').should('have.text', 'Back').click()
    cy.get('#answer0').should('not.exist')
    cy.get('#user-answer').should('exist')
    cy.get('#answer1').click()
    cy.get('#change-menu').should('have.text', 'Back').click()
    //answer last question
    cy.get('#answer1').should('not.exist')
    cy.get('#user-answer').should('exist')
    cy.get('#user-answer').click()
    //last question
    cy.get('#answer0').click()
    cy.url().should('include', 'score')
  })
  it('Navigation to Home', () => {
    cy.wait(5000)
    cy.get('#change-menu').should('have.text', 'Home').click()
    cy.url().should('include', 'quiz/home')
  })
})

describe('Score Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://opentdb.com/api.php/**').as('getQuestion')
    cy.visit('http://localhost:5173/quiz/home', { defaultCommandTimeout: 10000 })
    cy.get('#start-button').click()
    cy.get('#name').type('ujank')
    cy.get('#theme').select('Politics')
    cy.get('#totalQuestion').type('1')
    cy.get('#submit-form').click()
    cy.wait('@getQuestion')
    cy.get('#answer0').click()
  })
  it('Show name and score', () => {
    cy.wait(5000)
    cy.url().should('include', 'score')
    cy.get('#name').should('exist').invoke('text').should('contain', 'ujank')
    cy.get('#score').should('exist')
  })
  it('Navigate to Home', () => {
    cy.url().should('include', 'score')
    cy.get('button').click()
    cy.url().should('include', 'quiz/home')
  })
})
