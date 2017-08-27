# SimpleQL

## Introduction
SimpleQL is a web based application that allows users to define the database schema, upload and access the data in their databases, and interact with their database without having to write a single line of code. Database schema visualization is an essential process during the initial project design phase. Also, it can be useful when you need to reverse engineer a big schema. Our application allows users to visualize the schema and understand various relationships between different tables. SimpleQL creates the users database on Amazon Relational Database Service (well known as RDS) and also allow users to even store and retrieve data from RDS. That’s not all. If you want to use the same database for production application you can use it through our api endpoints.

## Functionality

* SimpleQL enables user to create/load existing database, create/rename/drop tables and to create associations between the tables. We used Amazon RDS as cloud storage to create user databases.
* SimpleQL enables user to recreate the databse on local machine through downloadable SQL scripts for his database.
* User can upload data to his database and can view them on SimpleQL.
* User can use the same cloud database on his application by interacting with SimpleQL through api endpoints.

## Start

`npm run start-dev` will make great things happen!

If you want to run the server and/or webpack separately, you can also `npm run start-server` and `npm run build-client`.

From there, just follow your bliss.

