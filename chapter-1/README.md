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

![Screenshot 2023-12-21 at 10 29 47 PM](https://github.com/production-ready-59s/todo-app/assets/839210/ea067fd0-708c-4294-bc51-9bcdcb10c32e)
