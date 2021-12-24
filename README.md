# Magic Link authentication w/Prisma

> Passwordless authentication made with Express and Prisma (Typescript)

---

This starter template allows authentication with a magic link send to mail users. 

## Get Started

Download
```
git clone https://github.com/gNaps/magic-link-prisma
```

### Install all deps
```
yarn
```

### Run server
```
yarn run start
```

### Init DB
Declare an env DATABASE_URL with url to your POSTGRESQL DB. Then exec Prisma's command from terminal.

```
npx prisma db push 
```

### Endpoints
| Method    | Url                                       | Description                                                                                |
|-----------|-------------------------------------------|--------------------------------------------------------------------------------------------|
| POST       | /login/getMagicLink  | Send to user a link for login (if it is the first time a new user will be create) |
| POST       | /login/me  | Check validity of token and login the user returns JWT |
