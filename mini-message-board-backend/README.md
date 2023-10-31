mini-message-board-backend REST API:

**POST /submit**

Submits a new message to the message board.

**Request body:**

```json
{
  "message": "This is a new message."
}
```

**Response:**

```json
{
  "message": "Message submitted successfully!"
}
```

**GET /messages**

Retrieves all messages from the message board.

**Response:**

```json
[
  {
    "_id": 1,
    "message": "This is the first message."
  },
  {
    "_id": 2,
    "message": "This is the second message."
  }
]
```

**GET /messages/:id**

Retrieves a single message by ID.

**Request parameters:**

* `id`: The ID of the message to retrieve.

**Response:**

```json
{
  "_id": 1,
  "message": "This is the first message."
}
```

**PUT /messages/:id**

Updates a single message by ID.

**Request parameters:**

* `id`: The ID of the message to update.

**Request body:**

```json
{
  "message": "This is the updated message."
}
```

**Response:**

```json
{
  "message": "Message updated successfully!"
}
```

**DELETE /messages/:id**

Deletes a single message by ID.

**Request parameters:**

* `id`: The ID of the message to delete.

**Response:**

```json
{
  "message": "Message deleted successfully!"
}
```