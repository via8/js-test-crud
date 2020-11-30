const express = require('express');
const controller = require('./util/data.controller');
const crud = express();

crud.use("/create", controller.create);
crud.use("/read", controller.read);
crud.use("/update", controller.update);
crud.use("/delete", controller.delete);
crud.listen(4444, () => {
    console.log('CRUD running...');
})
