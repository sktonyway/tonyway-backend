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

| Controllers   | useCase            | routes /api/v1/auth | method |               |
| ------------- | ------------------ | ------------------- | ------ | ------------- |
| registerUser  | to create New user | /register           | POST   |               |
| loginUser     | to login user      | /login              | POST   |               |
| logoutUser    | to logout user     | /logout             | GET    | needs upgrade |
| getMe         | to get Info        | /me                 | GET    | needs upgrade |
| updateProfile | to update profile  | /me                 | POST   | needs upgrade |

Currently, the focus is just on notes and authentication so I am avoiding rest features for now.

## ⛓️‍💥 What may have been broken

- Everything related to notes and todos
  as changes routes and schemantic versioning
- New routes have been defined
- user schema changed totally

```js
   {
  "_id": "65f2a1b2c3d4e5f6a7b8c9d0",
  "firstname": "Sagar",
  "lastname": "Way",
  "username": "sktonyway",
  "email": "sagar@example.com",
  "password": "$2a$10$7qB9WvR8zX1y2z3A4B5C6D7E8F9G0H1I2J3K4L5M6N7O8P9Q0R1S",
  "dp": "https://api.dicebear.com/7.x/avataaars/svg?seed=Sagar",
  "dob": "2002-05-15T00:00:00.000Z",
  "public": false,
  "sessions": [
    {
      "_id": "65f2a1b2c3d4e5f6a7b8c9d1",
      "ip": "192.168.1.1",
      "logged_at": "2026-05-15T10:30:00.000Z",
      "location": "Patna, IN",
      "device_name": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      "isactive": true
    }
  ],
  "resetPasswordToken": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "resetPasswordExpires": "2026-05-15T11:30:00.000Z",
  "createdAt": "2026-05-01T08:00:00.000Z",
  "updatedAt": "2026-05-15T10:30:00.000Z",
  "__v": 1
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
