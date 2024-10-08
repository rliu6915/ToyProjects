
# University of Helsinki - Full Stack Open - ToyProjects
Here is my demonstration of toy projects from full stack open at University of Helsinki. 


### About the course 

The course introduce to modern JavaScript-based web development. The main focus is on building single page applications with ReactJS that use _REST APIs_ built with _Node.js_. This course covers: _React_, _Redux_, _Node.js_, _MongoDB_, _GraphQL_ and _TypeScript_.

### About this repository

This repository contains my own exercise solutions to the 2024 edition of the [Full Stack Open](https://fullstackopen.com/en) course from the [University of Helsinki]().

### Certificates

[Certificate of completion Fullstack Open Course from the University of Helsinki](https://studies.cs.helsinki.fi/stats/api/certificate/fullstackopen/en/134505da2c4663fc00e46b1ef93e656a)


[Certificate of completion CI/CD part of the course](https://studies.cs.helsinki.fi/stats/api/certificate/fs-cicd/en/cd994d115e07f9d7abd1b275e7658d2e)

[Certificate of completion GraphQL part of the course](https://studies.cs.helsinki.fi/stats/api/certificate/fs-graphql/en/629642b745244e55eb1cea01080a1bcb)

[Certificate of completion React Native part of the course](https://studies.cs.helsinki.fi/stats/api/certificate/fs-react-native-2020/en/7e928c8232d3d3684643acfc6a3cf8bf)

[Certificate of completion Relational Database part of the course](https://studies.cs.helsinki.fi/stats/api/certificate/fs-psql/en/c65f84c7d21cbbe493117e9f56f97a09)

### Part 0 - [Fundamentals of Web apps](https://fullstackopen.com/en/part0)

An overall introduction to the course. It introduces to some concepts like HTTP requests, how traditional web apps work, DOM, CSS and Single Page Applications.

- [new note](/part0) - The diagram shows how communicate the browser and the server when user added a note to a page containing JavaScript.
- [single page app](/part0) - The diagram shows the communication between the browser and the server when user opened single page app on the browser.
- [new note (single page app)](/part0) - The diagram shows how communicate the browser and the server when user added a note to a single page app.

### Part 1 - [Introduction to React](https://fullstackopen.com/en/part1)

This part introduces to _React_ concepts. It covers the basics: components, props, _JSX_ and more advanced concepts: _Javascript_ functionalities that are used a lot in _React_ (`.map()`, `.filter()`, `.reduce()`), destructuring, event handlers in _React_ and passing state to child components, spread operator, hooks and their rules and conditional rendering.

- [courseinfo](/part1/course-info) - Simple course information page which counts total number of exercises of the course.
- [unicafe](/part1/unicafe) - This app gathers feedbacks and makes statistic.
- [anecdotes](/part1/anecdotes) - This app provides to vote for a random anecdote, also shows the most voted anecdote.

### Part 2 - [Communicating with server](https://fullstackopen.com/en/part2)

This part covers how to display list items in _React_ and how to handle forms. Introduces _JSON server_ and fetching data from it, _axios_ for sending `GET`, `PUT`, `POST` and `DELETE` requests and how to style your _React_ app (CSS).

- [courseinfo](/part2/course-info) - Extended Course info app from part 1.
- [phonebook-frontend](/part2/phonebook) - Phonebook, add/delete contacts with numbers, edit numbers.
- [countries](/part2/countries) - A react app that fetches and displays information form the [REST Countries](https://restcountries.eu) and [Weatcher Stack](https://weatherstack.com/) API's.

### Part 3 - [Programming a server with NodeJS and Express](https://fullstackopen.com/en/part3)

This part is focused on the backend. How to: implement a simple _REST API_ in _Node.js_ using _Express_, connect to a database (_MongoDB_) to store and retrieve data, deploy your app.

- [phonebook-backend](/part3/phonebook-backend) - The app source backend code.
- [phonebook-deployed](https://phonebook-backend-1.fly.dev) - The app deployed on fly. Frontend from part 2 and Backend from part 3 works together.

### Part 4 - [Testing Express servers, user administration](https://fullstackopen.com/en/part4)

This part is focused on testing _Node.js_ applications, async/await, user administration, references across collections, token based authentication.

- [bloglist-backend](/part4/bloglist-backend) - Allows users to save information (blog author, title, url, and amount of upvotes from users) about interesting blogs they have stumbled across on the internet.

### Part 5 - [Testing React apps](https://fullstackopen.com/en/part5)

This part is focused on token based authentication and testing the _React_ components using _Jest_, _React Testing Library_ and _Cypress_.

- [bloglist-frontend](/part5/bloglist-frontend) - The app frontend code.

### Part 6 - [State management with Redux](https://fullstackopen.com/en/part6)

This part is focused on _Redux_, which can be used for more complex state management of your _React_ app (covers concepts like immutability, global store, actions and reducers). Also this chapter covers how to use _Redux_ with `hooks`, and how to use the old `connect` higher order component when you work on older code bases, and `redux thunk` for asynchronous code.

- [unicafe-redux](/part6/unicafe-redux) - The app source code.
- [redux-anecdotes](/part6/redux-anecdotes) - The app source code.

### Part 7 - [React router, custom hooks, styling app with CSS and webpack](https://fullstackopen.com/en/part7)

This part handles a lot of different subjects. Such as _React router_ (with hooks) which used to navigate in _React_ apps, how to create custom hooks, ways to style an app and which UI libraries can be used. This part also covers how to use _Webpack_ instead of Create-React-App to setup an app, and gives a short overview of class components.

- [routed-anecdotes](/part7/routed-anecdotes) - The app source code.
- [ultimate-hooks](/part7/ultimate-hooks) - The app source code.
- [country-hook](/part7/country-hook) - The app source code.
- [bloglist-frontend](/part7/bloglist-frontend) - The app source code.
- [bloglist-backend](/part7/bloglist-backend) - The app source code.

### Part 8 - [GraphQL](https://fullstackopen.com/en/part8)

This part is about _GraphQL_, Facebook's alternative to _REST API_ for communication between browser and server. In this parts covered basic GraphQL concepts like `schema`, `queries` and `resolver` also how to setup and use [Apollo's](https://www.apollographql.com/) `ApolloServer` and `ApolloClient`.

- [library-backend](/part8/library-backend) - The app source code.
- [library-frontend](/part8/library-frontend) - The app source code.

### Part 9 - [TypeScript](https://fullstackopen.com/en/part9)

This part is all about TypeScript: an open-source typed superset of JavaScript developed by Microsoft that compiles to plain JavaScript.

- [first-ts-projects](/part9/first-ts-projects/) - TypeScript toy projects.
- [frontend-patientor](/part9/frontend-patientor/) - The app source code.
- [backend-patientor](/part9/backend-patientor/) - The app source code. 

### Part 10 - [React Native](https://fullstackopen.com/en/part10)

This part is about how to build native Android and iOS mobile applications with _JavaScript_ and _React_ using the _React Native_ framework. By developing an entire mobile application from scratch this part gives a good dive into the _React Native_ ecosystem. It covers concepts such as how to render native user interface components with _React Native_, how to create beautiful user interfaces, how to communicate with a server, and how to test a _React Native_ application.

- [rate-repository-app](https://github.com/rliu6915/rate-repository-app) - The app source code.

### Part 11 - [CI/CD](https://fullstackopen.com/en/part11)

This part shows and esplains of why you should use _Continuous Integration / Continuous Delivery (CI/CD) system_ and what can it do for you. And how to get started with _[GitHub Actions](https://github.com/features/actions)_.

- [full-stack-open-pokedex](../../../full-stack-open-pokedex) - Exercise repository.
- [full-stack-open-pokedex](https://pokedex-fso.fly.dev/) - Deployed app.

### Part 12 - Container

- [part12-containers-applications](https://github.com/rliu6915/part12-containers-applications) - The app source code.

### Part 13 - Using relational databases

- [blog-backend-postgresql](https://github.com/rliu6915/blog-backend-postgresql) - The app source code.
