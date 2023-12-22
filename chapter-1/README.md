# Chapter 1

Create the most basic Todo List application that's easily found on the Internet. In the subsequent chapters, I'll show
you how
to turn this boring "toy" application into a "production ready" application.

This simple app allows the user to add Todo items to a list, and be able to update a todo, mark one as completed, and to
delete.

## MongoDB

Install MongoDB on your localhost and run `mongod`:

```
mongod --dbpath /usr/local/var/mongodb
```

## Server

Server runs on port 4000.

```
cd backend
npm install
npm run start
```

## Client

Client runs on port 3000.

```
cd frontend
npm install
npm run start 
```

