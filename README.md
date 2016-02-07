###The Book Exchange - A Technology Demonstration Project

Key Technologies
- Express.js
- Node
- MongoDB and Mongoose
- Facebook authentication/login
- Angular

The Book Exchange is a simple community book sharing app that enables users to enter the books they own, view the books that other community members own, and "borrow" and "return" those books with the click of the button.  (How users effect the physical exchange of books is outside the domain of this app.)

The site relies on Facebook authentication and login.  

The server exposes REST data endpoints for all data operations, and serves front-end assets (js, html, css).

##The Book Exchange

- Includes a master/detail data structure, enabling the user to view either (1) a list of all titles or (2) a list of all physical book copies (some of which may share a title with other copies.)  Each title includes a summary for that title.  Each book record may also be viewed individually.  

- Each user may access his/her personal account page, which includes a Facebook picture, an "about me" field, a list of all books owned by the user, a list of all books lent by the user, and a list of all books borrowed by the user.

- Each user may access the public profile page of any other user, which includes a public Facebook image and the book list of the user.

- An administrative user may modify book titles such as deleting or adding fields.

- Angular is used to provide front end functionality.   

- The app is lightly styled using Bootstrap and some minimal additional CSS.  

- The app is deployed on Heroku : https://mybookmap.herokuapp.com

- The app is available on GitHub at : https://github.com/BookMap/book-map


##NPM Scripts
The following run options are available via Package.json scripts, in the form of "npm run start", or one of the other run options listed below.
 
The following run options are available via Package.json scripts, in the form of "npm start", or one of the other run options listed below.
>>>>>>> b0de8a44824801820dcff938c5988c065b02ae65

    "start": "node server.js",
    "dev": "eval $(cat .env) nodemon server.js",
    "dev-debug": "eval $(cat .env) node-debug server.js",
    "temp": "eval $(cat .env) mocha",
    "test": "eval $(cat .env) gulp",
    "lint": "gulp lint"
 

## .gitignore
 
Ignore folders and files as required.  Our .gitignore included the following:

- node*
- /node_modules
- npm-debug.log
- .DS_Store
- /*.env

 
## .env
 
Create an .env file of the following form.  This will enable you to avoid posting information to a public resource

APP_ID=     *INSERT HERE - NO QUOTES*

APP_SECRET= *INSERT HERE - NO QUOTES*

PORT=       *INSERT HERE - NO QUOTES*

HOST=bookmap.com    *MODIFY*

NODE_ENV=development

DB_URI=     *INSERT HERE - NO QUOTES*


  
## Tests

A. Test Preparations

For the items listed below, it is recommended to create them before running tests.
 
* process.env.DB_URI: A URI for a test mongoDB in which new entries, modifications, and queries are stored. You can use a local Mongo database or a remote database from MongoLab.

* process.env.TEST_TOKEN: A token that was issued for a valid Facebook test user. It is used and included in the request headers for restricted route access. Please create a test Facebook user, login to our app from your browser using this test Facebook, grab the token saved under localStorage.token while you are still logged in with the test Facebook in our app. Upon logout, the token will be cleared.

* process.env.TEST_USERID: A valid user ID that is included in some url queries: asking for a user's book inventory and returning a book to an owner. To obtain this value, go to your mongoDB and pick one of the test user IDs from the user's collection.

B. Tests

* Public routes:
Public routes are all GET. Requests are made without any token included.

* Restricted profile routes:
Restricted routes are made with process.env.TEST_TOKEN included in req.token. Tests include: accessing a restricted route without a valid token, getting entries from the database, creating a new entry in the database, patching entries saved in the database, deleting saved entries.

* Restricted admin routes: (Saved for Whitney)
