
#  ![Email signature system](https://github.com/roachmanza/EmailSignature/blob/master/Api_Site/client/content/img/MailIcon32.png "Email signature system") Email signature system

### Welcome to email signatures

#### What is the email signature system
    Consists of 3 parts
    1. A postgres databse for the data and images
    2. An API site for rest calls to GET,PUT and POST data to the databse.
    3. Web interface to populate and maintain the signatures.

The email signature system is a system where applications can add signatures and headers to outgoing mail, according to the sent from address.<br/>

### How to get the application up and running
Clone the application to your local repo.<br/>
Below is the the details as found in each part of the system.






#  ![Email signature system](https://github.com/roachmanza/EmailSignature/blob/master/Api_Site/client/content/img/MailIcon32.png "Email signature system") Email signature database

### How to get the database up and running

### Option 1 - Run a postgres db on your machine
    
##### How to :
    Install postgres from the web site <a href="https://www.postgresql.org/">https://www.postgresql.org/</a><br/>

<b>Change the 'pg_hba.conf' file</b> to facilitate your local database instance to be accessed from the API's @~\data\pg96 , sample here : <a href="https://github.com/roachmanza/EmailSignature/blob/master/Database/Postgres/pg_hba.conf">here</a><br/>
<b>Create the user</b> with the script found <a href="https://github.com/roachmanza/EmailSignature/blob/master/Database/Postgres/0_Create_User.sql">here</a><br/>
<b>Create the database</b> with the script found 
<a href="https://github.com/roachmanza/EmailSignature/blob/master/Database/Postgres/1_Create_Database.sql">here</a><br/>
<b>Grant access</b> to the user with the script found <a href="https://github.com/roachmanza/EmailSignature/blob/master/Database/Postgres/2_GrantAccess.sql">here</a><br/>
Create the <b>tables</b> with the script found <a href="https://github.com/roachmanza/EmailSignature/blob/master/Database/Postgres/3_Create_Tables.sql">here</a><br/>
<b>Create reference data </b> on the tables with the script found <a href="https://github.com/roachmanza/EmailSignature/blob/master/Database/Postgres/4_Create_BaseValues.sql">here</a><br/>

### Option 2 - Run a docker container

Install docker and create the db instance on the docker instance.<br/>
Create a volume and run the postgres instance on that volume<br/>

##### How to :
    docker volume create --name emailsignaturepgdb
    docker run --name postgres -v emailsignaturepgdb:/var/lib/postgresql/plantmonitorpgdb/data -e POSTGRESPAWD=postgres -d -p 5432:5432 postgres

    You can then start and stop the postgres database at any time from the command line with the following commands:

    docker start postgres
    docker stop postgres

Download pgAdmin <a href="https://www.pgadmin.org/download/">here</a><br/>
Open the pgAdmin client and create a connection to localhost.<br/>
You can then run the scripts below to create the base database and data.<br/>


<b>Create the user</b> with the script found <a href="https://github.com/roachmanza/EmailSignature/blob/master/Database/Postgres/0_Create_User.sql">here</a><br/>
<b>Create the database</b> with the script found 
<a href="https://github.com/roachmanza/EmailSignature/blob/master/Database/Postgres/1_Create_Database.sql">here</a><br/>
<b>Grant access</b> to the user with the script found <a href="https://github.com/roachmanza/EmailSignature/blob/master/Database/Postgres/2_GrantAccess.sql">here</a><br/>
Create the <b>tables</b> with the script found <a href="https://github.com/roachmanza/EmailSignature/blob/master/Database/Postgres/3_Create_Tables.sql">here</a><br/>
<b>Create reference data </b> on the tables with the script found <a href="https://github.com/roachmanza/EmailSignature/blob/master/Database/Postgres/4_Create_BaseValues.sql">here</a><br/>


#### Database
The database that is used is a postgres 9.6, and can be at <a href="https://www.postgresql.org/">https://www.postgresql.org/</a>

#### Markdown-Cheatsheet
<a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet">https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet</a>






#  ![Email signature system](https://github.com/roachmanza/EmailSignature/blob/master/Api_Site/client/content/img/MailIcon32.png "Email signature system") Email signature system APIs

### Welcome to the email signature system APIs

#### What is the email signature system
The email signature API consists of all the tools a developer would need to set up a front end system, and to interface via the API with the database.<br/>
Field items of type image is stored as base64 encoded strings in the database. This behaviour was required for images to be embedded into mails, to avoid downloading or discarding of images in the mail.<br/>
A complete swagger document is available from the main page, by clicking on the 'Swagger API documentation' menu item

### How to get the application up and running
Clone the application to your local repo.<br/>

##### Run the api site directly from the command prompt
    npm start

Open the folder where the application resides with a prompt , and run the 'npm start' command. This will start your application on the relevant port. You should be able to browse the application.<br/>

##### Run the api website in a docker container
    docker build -t email-signature-api .
    docker run -p 4010:4010 -d email-signature-api
    
Create a docker image of the application and run it there.<br/>
The .dockerignore and Dockerfile is already included in the application.<br/>
To create a docker image follow the steps above.
    

### How to change the environments
To change the environment , change the value of the name in the env.js file in the config folder.<br/>

##### docker container build per environment
    LOCAL:
    docker build -f dockerfiles/local/Dockerfile.local -t email-signature-api:local .
    docker run --name email-signature-api-local -d -p 4010:4010 email-signature-api:local

    DEV:
    docker build -f dockerfiles/dev/Dockerfile.dev -t email-signature-api:dev .
    docker run --name email-signature-api-dev -d -p 4010:4010 email-signature-api:dev

    Then use the folowing command to stop and start the image : 
    docker start email-signature-api-local
    docker stop email-signature-api-local

### Modules used in the application
    body-parser: "^1.17.2"
    cors: "^2.8.4"
    express: "^4.15.3"
    pg: "^1.3.0"
    swagger-ui-express: "^2.0.7"

### Database used in the application
PostgreSQL.<br/>









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



























