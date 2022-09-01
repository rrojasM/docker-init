/* import express from 'express';
import { createPool } from 'mysql2/promise';
import mongoose from 'mongoose';
const app = express()
const port = 3000

const conn = createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'mypassword'
});

const mongoConn = await mongoose.connect('mongodb://localhost:27017/exampledb');
console.log(mongoConn.connection.db);

const response = await conn.query('SELECT 1 + 1')
console.log(response);

app.listen(port, () => console.log(`EJECUTANDO EN PUERTO =====> ${port}!`)) */

import express from 'express';
import mongoose from 'mongoose';
const app = express()
const port = 3000;

import { v4 } from 'uuid';

const mongoConn = await mongoose.connect('mongodb://databasemongo/testdb');
console.log(mongoConn.connection.db.databaseName);

const productSchema = new mongoose.Schema({
    name: String
})
const productModel = mongoose.model('Product', productSchema)

app.get('/', async (req, res) => {
    //res.send('Hola Mundo Docker')
    const newProduct = await productModel.create({
        name: "Laptop"
    })
    res.json({
        id: v4(),
        newProduct
    })
})

app.listen(port, () => console.log(`EJECUTANDO EN PUERTO =====> ${port}!`))