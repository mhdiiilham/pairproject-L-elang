const express = require('express');
const app = express();
const PORT = 3000;

const { User } = require('./routers')

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));


app.use('/user', User) // route User

app.listen(PORT, () => { console.log(`Listening on port ${PORT}!`)});