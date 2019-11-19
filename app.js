const express = require('express');
const app = express();
const PORT = 3000;

const { User, Item, Category } = require('./routers')

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use('/user', User) // route User
app.use('/item', Item) // route Item - Admin
app.use('/category', Category) // route Category - Admin


app.listen(PORT, () => { console.log(`Listening on port ${PORT}!`)});