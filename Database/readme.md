#  ![Email signature system](https://github.com/roachmanza/EmailSignature/blob/master/Api_Site/client/content/img/MailIcon32.png "Email signature system") Email signature database

### How to get the database up and running

##### Option 1 - Run a postgres db on your machine, run db commands with the pgAdmin tool
    Install postgres from the web site <a href="https://www.postgresql.org/">https://www.postgresql.org/</a><br/>

<b>Change the 'pg_hba.conf' file</b> to facilitate your local database instance to be accessed from the API's @~\data\pg96 , sample here : <a href="https://github.com/roachmanza/EmailSignature/blob/master/Database/Postgres/pg_hba.conf">here</a><br/>
<b>Create the user</b> with the script found <a href="https://github.com/roachmanza/EmailSignature/blob/master/Database/Postgres/0_Create_User.sql">here</a><br/>
<b>Create the database</b> with the script found 
<a href="https://github.com/roachmanza/EmailSignature/blob/master/Database/Postgres/1_Create_Database.sql">here</a><br/>
<b>Grant access</b> to the user with the script found <a href="https://github.com/roachmanza/EmailSignature/blob/master/Database/Postgres/2_GrantAccess.sql">here</a><br/>
Create the <b>tables</b> with the script found <a href="https://github.com/roachmanza/EmailSignature/blob/master/Database/Postgres/3_Create_Tables.sql">here</a><br/>
<b>Create reference data </b> on the tables with the script found <a href="https://github.com/roachmanza/EmailSignature/blob/master/Database/Postgres/4_Create_BaseValues.sql">here</a><br/>



##### Option 2 - Run a docker container, and create a postgres image, run db commands with the pgAdmin tool
    docker volume create --name emailsignaturepgdb
    docker run --name postgres -v emailsignaturepgdb:/var/lib/postgresql/plantmonitorpgdb/data -e POSTGRESPAWD=postgres -d -p 5432:5432 postgres

    You can then start and stop the postgres database at any time from the command line with the following commands:

    docker start postgres
    docker stop postgres

Install docker and create the db instance on the docker instance.<br/>
Create a volume and run the postgres instance on that volume<br/>


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











