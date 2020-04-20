# Node.Js-Assignment
## Assignment: Software Development Engineer - NodeJs
### task is to build a simple stateless microservice in Nodejs, with two major functionalities
* Authentication
* Image Thumbnail Generation
### Public Endpoints
  The Login Request body should contain an arbitrary username/password pair. Treat it as a mock
authentication service and accept any username/password. Return a signed Json Web Token(JWT,
https://jwt.io/) which can be used to validate future requests

### Protected Endpoint
  The following endpoint should be protected. The JWT obtained in the “Login” endpoint must be attached
to each request. If the JWT is missing or invalid, these endpoints should reject the request.
  * Create Thumbnail Request should contain a public image URL. Download the image, resize to
50x50 pixels, and return the resulting thumbnail

### Building
* run `npm install` to install all required dependencies.
* run `npm test` to test.
* run `npm start` to run the local server at http://localhost:3000/.

### run
* All the instructions for Mock Authentication and thumbnail generation are listed in `home.ejs`, one can also see them on home page of local server 
* we can access `image` page *only if* you've logged in
