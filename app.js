const express = require('express');
const app = express();
const PORT = 3000;

const { User, Item } = require('./routers')

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use('/item', Item)

app.listen(PORT, () => { console.log(`Listening on port ${PORT}!`)});