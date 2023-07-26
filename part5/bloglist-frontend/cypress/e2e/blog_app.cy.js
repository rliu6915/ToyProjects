describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('username')
    cy.contains('Log in to application')
  })

  it ('login form can be opened', function() {
    cy.contains('login').click()
    cy.get('#username').type('test username')
    cy.get('#password').type('test password')
    cy.get('#login-button').click()

    cy.contains('test name logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('test username')
      cy.get('#password').type('test password')
      cy.get('#login-button').click()

      cy.contains('test name logged in')
    })

    it('a new blog can be created', function() {
      cy.contains('create blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#create-button').click()

      cy.contains('test title')
    })
  })
})