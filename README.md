# Notes Backend ❤️

### From Now on

> This project will follow schemantic versioning like: \
> So that it would be useful in Database migration.

- /api/v1/notes
- /api/v2/notes

> > Draft

- User will of different types [paid, free, important]
- User with important and paid tags are required to aked to be both security checking and jwt tokens
- free users would be able to login with id and password or api key.

> What changed in this

- localhost:5050/ -> localhost:5050/api/v1/
- New api is /api/v1/notes instead of /notes
- & /api/v1/todos instead of /todos
- Instead of sending the {userName and Password to user} I am sending {message: "success"}, It may break the flow.

## Top Level Routes

- `/api/v1/notes` For all notes routes
- `/api/v1/todos` For all todos routes
- `/api/v1/auth` For authentication

### NOTES routes

####

| Controllers | use case                             | routes /api/v1/notes | method |
| ----------- | ------------------------------------ | -------------------- | ------ |
| viewNote    | to view all Notes                    | /                    | GET    |
| openNote    | to open specific Note                | /:id                 | GET    |
| filterNote  | to filter based on title and content | /filters?term="This" | GET    |
| createNote  | to create a new Note                 | /                    | POST   |
| updateNote  | to update specific Note              | /:id                 | PATCH  |
| trashNote   | to set isTrash to true               | /:id/trash           | PATCH  |
| deleteNote  | to delete specific Note              | /:id                 | DELETE |

### AUTH routes

| Controllers  | useCase            | routes /api/v1/auth | method |
| ------------ | ------------------ | ------------------- | ------ |
| registerUser | to create New user | /register           | POST   |
| loginUser    | to login user      | /login              | POST   |
| logoutUser   | to logout user     | /logout             | GET    |
| getMe        | to get Info        | /me                 | GET    |

Currently, the focus is just on notes and authentication so I am avoiding rest features for now.

## ⛓️‍💥 What may have been broken

- Everything related to notes and todos
  as changes routes and schemantic versioning
- New routes have been defined
- user schema changed totally

```js
   {
  "_id": {
    "$oid": "69a1a9acce7ab4c6341013bd"
  },
  "password": "123456", // String
  "DOB": {
    "$date": "2005-01-01T00:00:00.000Z" // Date
  },
  "Sessions": [ // Array of objects
    {
      "ip": "something",
      "logged_at": {
        "$date": "2026-04-21T00:00:00.000Z"
      },
      "device_name": "Asus",
      "isActive": true
    }
  ],
  "email": "sk@tonyway.in",
  "isPublic": true,
  "name": "Sk Tonyway",
  "profile_pic": "https://something",
  "refreshToken": "something",
  "userName": "tonyway"
}
```

- notes schema also changed drastically

```js
{
  "_id": {
    "$oid": "69e741a398ffab531bba8695"
  },
  "user_id": {
    "$oid": "69a1a9acce7ab4c6341013bd"
  },
  "title": "Something",
  "content": "Something",
  "category": "Personal",
  "tags": [
    "Important",
    "College",
    "Assignment"
  ],
  "isPinned": true,
  "color": "red",
  "createdAt": {
    "$date": "2026-01-01T00:00:00.000Z"
  },
  "updatedAt": {
    "$date": "2026-01-01T00:00:00.000Z"
  },
  "__v": {
    "$numberLong": "0"
  },
  "is_archieve": true,
  "is_public": true,
  "is_trash": true,
  "onlyContent": true,
  "sub_content": {
    "text": "something",
    "order": {
      "$numberLong": "1"
    },
    "img": "url\n"
  }
}
```
