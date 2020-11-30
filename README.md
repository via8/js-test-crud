# JS simple CRUD controller test
- install express: `npm install express --save`
- launch: `node crud.js`
- interact via browser: \
`http://localhost:4444/create/<name>` - to create new name in list\
`http://localhost:4444/read` - to list all saved names with their IDs\
`http://localhost:4444/read/<ID>` - to show name by integer ID\
`http://localhost:4444/update/<ID>/<new name>` - to update name\
`http://localhost:4444/delete/<ID>` - to delete name