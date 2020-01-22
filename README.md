# Restaurants API

Full API for Restaurants

### Routes

**all API Endpoints prefixed with `/api/{version}/`**

##### Restaurants Resource

1. Show all restaurants `GET /restaurants/`
2. Show specific restaurant `GET /restaurants/<ID>/`
3. Create new restaurant `POST /restaurants/`
4. Update restaurant `PUT /restaurants/<ID>/`
5. Delete restaurant `DELETE /restaurants/<ID>/`

###### Restaurant Sub Resource: Menu

1. Show restaurant menu `GET /restaurants/<ID>/menu/`
2. Show specific item `GET /restaurants/<ID>/menu/<ITEM>/`
3. add new item `POST /restaurants/<ID>/menu/`
4. Update item `PUT /restaurants/<ID>/menu/<ITEM>/`
5. Delete item `DELETE /restaurants/<ID>/menu/<ITEM>/`

##### Users Resource

1. Show all users `GET /users/`
2. Show specific user `GET /users/<ID>`
3. Create new user `POST /users/`
4. Update user `PUT /users/<ID>`
5. Delete user `DELETE /user/<ID>`
