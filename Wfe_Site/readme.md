
#  ![Email signature system](https://github.com/roachmanza/EmailSignature/blob/master/Api_Site/client/content/img/MailIcon32.png "Email signature system") Email signature system WFE

### Welcome to the email signature system Web Front End (WFE)

#### What is the email signature system Web Front End (WFE)

The web front end is used to create all the relevant information pertaining to the signatures.
Contact types is defineed as a name and an email address pair, where the contact type is the primary key of the system.
Field types are the type of field you would like to define for the signature item, for example operating hours, email , image etc.
Languages is the language the signature will be sent in to the client.

Field items are re-useable lines in a signature.
Signature items adds the re-useable line of a signature to a contact type , and includes a order the item must be displyed in.

There is a menu item called 'Signatures' where you can view a sample of the completed signature for the language selected.


### How to get the application up and running
Clone the application to your local repo.<br/>

##### Run the api site directly from the command prompt
    npm start

Open the folder where the application resides with a prompt , and run the 'npm start' command. This will start your application on the relevant port. You should be able to browse the application.<br/>

##### Run the wfe website in a docker container
    docker build -t email-signature-wfe .
    docker run -p 4011:4011 -d email-signature-wfe
    
Create a docker image of the application and run it there.<br/>
The .dockerignore and Dockerfile is already included in the application.<br/>
To create a docker image follow the steps above.
    

### How to change the environments
To change the environment , change the value of the name in the env.js file in the config folder.<br/>

##### docker container build per environment
    LOCAL:
    docker build -f dockerfiles/local/Dockerfile.local -t email-signature-wfe:local .
    docker run --name email-signature-wfe-local -d -p 4011:4011 email-signature-wfe:local

    DEV:
    docker build -f dockerfiles/dev/Dockerfile.dev -t email-signature-wfe:dev .
    docker run --name email-signature-wfe-dev -d -p 4011:4011 email-signature-wfe:dev

    Then use the folowing command to stop and start the image : 
    docker start email-signature-wfe-local
    docker stop email-signature-wfe-local

### Modules used in the application
    body-parser: "^1.17.2",
    express: "^4.15.3",
    formidable: "^1.1.1",
    fs: "0.0.1-security",
    mkdirp: "^0.5.1",
    mv: "^2.1.1",
    webcomponents-lite: "^0.6.0"

### Dependencies
    email-signature-api














