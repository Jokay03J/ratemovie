# api

## environment variable

```bash
  HOST:(host server, ex: localhost)
  PORT:(port server, ex: 3333)
  APP_KEY:(The secret to encrypt and sign different values in application)
  APP_NAME:(app name will be display in logger)
  DRIVE_DISK:(The default disk to use for managing file uploads)
  NODE_ENV:(activate prettyPrint or not)
  DB_CONNECTION:(The primary connection for making database queries across the application, EX: mysql)
  MYSQL_HOST:(host of mysql db, ex: 127.0.0.1)
  MYSQL_PORT:(port of mysql db)
  MYSQL_USER:(mysql user for the tables)
  MYSQL_PASSWORD:(password of mysql user)
  MYSQL_DB_NAME:(database name for perform query)
```

# build

1. npm ci
2. npm run build

## run

```bash
node server.js
```

## deployment

you can read docs [here](https://docs.adonisjs.com/guides/deployment#document)

# client

## environment variable

inside `.env`

```bash
VITE_PUBLIC_FETCH_URL=url of api url
```

**do not place "/" at end**

exemple:

```bash
VITE_PUBLIC_FETCH_URL=http://localhost:3333
```

## models

Movie\
id: number\
title: string\
author: string\
createdAt: Date\
note?: number | null | undefined

\*movie note is available only on route `/movie/:idMovie`

Note\
id: number\
movieId: number
note: float