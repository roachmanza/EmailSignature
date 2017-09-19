##  ![Mail enhancement system](https://github.com/roachmanza/MailEnhancement/blob/master/Client_website_cdn/content/img/MailIcon64.png "Mail enhancement system") Mail enhancement system database

### How to get the database up and running
Install postgres from the web site <a href="https://www.postgresql.org/">https://www.postgresql.org/</a><br/>
<b>Change the 'pg_hba.conf' file</b> to facilitate your local database instance to be accessed from the API's @~\data\pg96 , sample here : <a href="https://github.com/roachmanza/MailEnhancement/blob/master/Database/Postgres/pg_hba.conf">here</a><br/>
<b>Create the user</b> with the script found <a href="https://github.com/roachmanza/MailEnhancement/blob/master/Database/PostGres/0_Create_User.sql">here</a><br/>
<b>Create the database</b> with the script found <a ref="https://github.com/roachmanza/MailEnhancement/blob/master/Database/PostGres/1_Create_Database.sql">here</a><br/>
<b>Grant access</b> to the user with the script found <a href="https://github.com/roachmanza/MailEnhancement/blob/master/Database/PostGres/2_GrantAccess.sql">here</a><br/>
Create the <b>tables</b> with the script found <a href="https://github.com/roachmanza/MailEnhancement/blob/master/Database/PostGres/3_Create_Tables.sql">here</a><br/>
<b>Create reference data </b> on the tables with the script found <a href="https://github.com/roachmanza/MailEnhancement/blob/master/Database/PostGres/3_Create_BaseValues.sql">here</a><br/>

#### Database
The database that is used is a postgres 9.6, and can be at <a href="https://www.postgresql.org/">https://www.postgresql.org/</a>

#### Markdown-Cheatsheet
<a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet">https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet</a>











