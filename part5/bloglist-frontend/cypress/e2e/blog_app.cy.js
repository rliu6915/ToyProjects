describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'test name',
      username: 'test username',
      password: 'test password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it ('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('test username')
      cy.get('#password').type('test password')
      cy.get('#login-button').click()

      cy.contains('test name logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('test username')
      cy.get('#password').type('wrong password')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('test username')
      cy.get('#password').type('test password')
      cy.get('#login-button').click()

      cy.contains('test name logged in')
    })

    it('a blog can be created', function() {
      cy.contains('create blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#create-button').click()

      cy.contains('test title')
    })
  })
})