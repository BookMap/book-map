<h1>The Book Exchange - A Technology Demonstration Project </h1>

Key Technologies
- Express.js
- Node
- MongoDB and Mongoose
- Facebook authentication/login

The Book Exchange is a simple community book sharing app that enables users to enter the books they own, view the books that other community members own, and "borrow" and "return" those books with the click of the button.  (How users effect the physical exchange of books is outside the domain of this app.)

The site relies on Facebook authentication and login.  

The server exposes REST data endpoints for all data operations, and serves front-end assets (js, html, css).


<h1>The Book Exchange</h1>

- Includes a master/detail data structure, enabling the user to view either (1) a list of all titles or (2) a list of all physical book copies (some of which may share a title with other copies.)  Each title includes a summary for that title.  Each book record may also be viewed individually.  

- Each user may access his/her personal account page, which includes a Facebook picture, an "about me" field, a list of all books owned by the user, a list of all books lent by the user, and a list of all books borrowed by the user.

- Each user may access the public profile page of any other user, which includes a public Facebook image and the book list of the user.

- An administrative user may access individual user accounts. 

- Angular is used to provide front end functionality.   

- The app is lightly styled using Bootstrap and some minimal additional CSS.  

- The app is deployed on Heroku : https://mybookmap.herokuapp.com/#/

- The app is available on GitHub at : https://github.com/BookMap/book-map



- create a meaningful and structured README, which will contain

    - coding standards

    - application structure

    - build/test/run instructions

The following run options are available via Package.json scripts, in the form of "npm run start", or one of the other run options listed below.

    "start": "node server.js",
    "dev": "eval $(cat .env) nodemon server.js",
    "dev-debug": "eval $(cat .env) node-debug server.js",
    "temp": "eval $(cat .env) mocha",
    "test": "eval $(cat .env) gulp",
    "lint": "gulp lint"



////delete below here

Your code should:

- be consistent across all files

- be contained in a clean/semantic application structure

- include modularization of primary pieces of functionality

As a group you will need to:

- collaborate cross functionally

- contribute equally

- participate in a mock "sprint-review" at set time each day that simulates reporting demonstrable progress to stakeholders

- Demonstrate at Tuesday sprint review, sprint 0 basic deployment and infrastructure in place. All teams members can develop and deploy to heroku with appropriate env config.

- create an organization in GitHub, containing all members of your team

- use a consistent branch naming convention (and include relevant feature branches, bug branches, etc)

- ask questions and get help when you're stuck

- create a meaningful and structured README, which will contain

    - coding standards

    - application structure

    - build/test/run instructions

As a bonus, you can:

- add image uploads

- integrate with Travis CI

- add a "Share this" option

- etc, etc, etc

- be ultra creative, come up with cool stuff!!!