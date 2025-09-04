# API Endpoints Summary

## Todo

| Endpoint   | Method  | Description        | Body Example                                   |
|------------|---------|--------------------|-----------------------------------------------|
| `/api/todos`       | GET     | Get all todos        | None                                          |
| `/api/todos`       | POST    | Create new todo      | `{ "text": "Learn typescript", "completed": false }` |
| `/api/todos/:id`   | PATCH   | Update todo by ID    | `{ "text": "Learn typescript #update", "completed": true }` |
| `/api/todos/:id`   | DELETE  | Delete todo by ID    | None                                          |

