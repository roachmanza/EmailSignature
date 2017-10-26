
#  ![Email signature system](https://github.com/roachmanza/EmailSignature/blob/master/Api_Site/client/content/img/MailIcon32.png "Email signature system") Email signature system APIs

### Welcome to the email signature system APIs

#### What is the email signature system
The email signature API consists of all the tools a developer would need to set up a front end system, and to interface via the API with the database.<br/>
Field items of type image is stored as base64 encoded strings in the database. This behaviour was required for images to be embedded into mails, to avoid downloading or discarding of images in the mail.<br/>
A complete swagger document is available from the main page, by clicking on the 'Swagger API documentation' menu item

### How to get the application up and running
Clone the application to your local repo.<br/>

##### Option 1
Open the folder where the application resides with a prompt , and run the 'npm start' command. This will start your application on the relevant port. You should be able to browse the application.<br/>

##### Option 2
Create a docker image of the application and run it there.<br/>
The .dockerignore and Dockerfile is already included in the application.<br/>
To create a docker image do the following:
    docker build -t email-signature-api .
    




### How to change the environments
To change the environment , change the value of the name in the env.js file in the config folder.<br/>

### Modules used in the application
    body-parser: "^1.17.2"
    cors: "^2.8.4"
    express: "^4.15.3"
    pg: "^1.3.0"
    swagger-ui-express: "^2.0.7"

### Database used in the application
PostgreSQL.<br/>














