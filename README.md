# COIN/PAIR CRUD TABLE

## Description:
A web app that helps you to search through USD/PAIR,price,note and volume allowing you to search by multiple filters that search by attributes also allowing you to update the record and delete the record
# Run COIN/PAIR CRUD TABLE locally:

Please note that  it requires that you have node js installed on your pc,it preferable to have version 18 or more
note that if you have problem with express js try to use node version 16 on server folder only like run 
```
nvm install <version>
nvm use 16
```
if you don't you can install it from here  [node js](https://nodejs.org/en)

Create a folder to clone the repo on it then open the command window or git pash and cd to this folder
 1 . clone the repo: git clone (`https://github.com/mohmmadAyesh/Full-stack-crud-table.git`)

first running the  backend :

 2 . go to the repo folder in the folder that you clone the repo on it.
 3-enter the server folder by typing in command line type
 ```
 cd server 
 ```
 4-you first need to create the database notice so you need first to create a .env file 
 and then set the following variables:
    DB_HOST=your appropriate host
    DB_USER=your local username 
    DB_PASS=your local password
###
5- run npm i in the folder<br>
6-then you need to create database by running those scripts by typing
```
npm run db
```
and then you run the server by typing
```
npm start
```
7-next you run the front side then go back to client folder by typing
```
cd ..
cd client
```
8-run npm i inside client folder<br>
9-then you need to set .env file and set the server link like you write in previous .env file the value of DB_HOST link and set that in 
NEXT_PUBLIC_API_BASE_URL environment variable<br>
10- next you run the front side by typing
```
npm run dev
```
## congratulation you run this app and test it

