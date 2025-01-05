describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'test name',
      username: 'test username',
      password: 'test password'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.visit('')
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

      // cy.contains('Wrong username or password')
      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'test name logged in')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'test username', password: 'test password' })
      // cy.request('POST', 'http://localhost:3003/api/login', {
      //   username: 'test username', password: 'test password'
      // }).then((response) => {
      //   localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
      //   cy.visit('http://localhost:3000')
      // })
      // cy.contains('login').click()
      // cy.get('#username').type('test username')
      // cy.get('#password').type('test password')
      // cy.get('#login-button').click()

      // cy.contains('test name logged in')
    })

    it('a blog can be created', function() {
      cy.contains('create blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#create-button').click()

      cy.contains('test title')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        // cy.contains('create blog').click()
        // cy.get('#title').type('test title 2')
        // cy.get('#author').type('test author 2')
        // cy.get('#url').type('test url 2')
        // cy.get('#create-button').click()
        cy.createBlog({
          title: 'test title 2', author: 'test author 2', url: 'test url 2'
        })
      })

      it('it can be liked', function () {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('1')
      })

      it('it can be deleted by the user who created it', function () {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.get('html').should('not.contain', 'test title 2')
      })

      it('it cannot be deleted by another user', function () {
        // cy.createBlog({
        //   title: 'created by test username', author: 'username', url: 'test url 3'
        // })

        cy.contains('logout').click()
        const user = {
          name: 'test name 1',
          username: 'test username 1',
          password: 'test password 1'
        }
        cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
        cy.login({ username: 'test username 1', password: 'test password 1' })

        cy.contains('view').click()
        cy.get('form').should('not.contain', 'remove')

        // cy.contains('view').click()
        // cy.get('html').should('contain', 'created by test username')

      })

      it('blogs are ordered according to likes with the blog with the most likes being first', function () {
        cy.createBlog({
          title: 'test title 3', author: 'test author 3', url: 'test url 3'
        })
        cy.createBlog({
          title: 'test title 4', author: 'test author 4', url: 'test url 4'
        })

        cy.get('.blog').eq(1).contains('view').click()
        cy.get('.blog').eq(1).contains('like').click()

        cy.get('.blog').eq(0).contains('test title 3')
        cy.get('.blog').eq(1).contains('test title 2')
        cy.get('.blog').eq(2).contains('test title 4')

      })

    })

  })

})