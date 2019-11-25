# todolist-backend-app
https://documenter.getpostman.com/view/9587090/SW7dVRSD

## POST Register
https://todolist-backend-app.herokuapp.com/users/register

**Headers**

| KEY          | VALUE            |
|--------------|------------------|
| Content-Type | application/json |

**Body** raw (application/json)

```json
{
  "name": "Yaman KATBY",
  "email": "m.yaman.katby@gmail.com",
  "password": "123456"
}
```

## POST Login
https://todolist-backend-app.herokuapp.com/users/login

**Headers**

| KEY          | VALUE            |
|--------------|------------------|
| Content-Type | application/json |

**Body** raw (application/json)

```json
{
  "email": "m.yaman.katby@gmail.com",
  "password": "123456"
}
```

## GET Profile
https://todolist-backend-app.herokuapp.com/users/profile

**Headers**

| KEY           | VALUE           |
|---------------|-----------------|
| Authorization | {{accessToken}} |

## GET Fetch TodoList
`https://todolist-backend-app.herokuapp.com/todos`

**Headers**

| KEY           | VALUE           |
|---------------|-----------------|
| Authorization | {{accessToken}} |

## POST Create Todo
https://todolist-backend-app.herokuapp.com/todos/create

**Headers**

| KEY           | VALUE            |
|---------------|------------------|
| Content-Type  | application/json |
| Authorization | {{accessToken}}  |

**Body** raw (application/json)

```json
{
  "name": "Learn React Native"
}
```

## POST Edit Todo
https://todolist-backend-app.herokuapp.com/todos/edit

**Headers**

| KEY           | VALUE            |
|---------------|------------------|
| Content-Type  | application/json |
| Authorization | {{accessToken}}  |

**Params**

| KEY | VALUE      |
|-----|------------|
| id  | {{todoId}} |

**Body** raw (application/json)

```json
{
  "name": "Learn React"
}
```

## POST Toggle Todo
https://todolist-backend-app.herokuapp.com/todos/toggle

**Headers**

| KEY           | VALUE           |
|---------------|-----------------|
| Authorization | {{accessToken}} |

**Params**

| KEY | VALUE      |
|-----|------------|
| id  | {{todoId}} |

## POST Remove Todo
https://todolist-backend-app.herokuapp.com/todos/remove

**Headers**

| KEY           | VALUE           |
|---------------|-----------------|
| Authorization | {{accessToken}} |

**Params**

| KEY | VALUE      |
|-----|------------|
| id  | {{todoId}} |
