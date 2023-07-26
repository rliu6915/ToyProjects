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

    cy.contains('test username logged in')
  })

  // describe('when logged in', function() {
  //   beforeEach(function() {
  //     cy.contains('login').click()
  //     cy.get('#username').type('test username')
  //     cy.get('#password').type('test password')
  //     cy.get('#login-button').click()

  //     cy.contains('test username logged in')
  //   })

  //   it('a new blog can be created', function() {

  //   })
  // })
})