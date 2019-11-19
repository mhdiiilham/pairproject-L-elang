const express = require('express');
const app = express();
const PORT = 3000;
const Rupiah = require('./helpers/convertRupiah')

const { User, Item, Category } = require('./routers')

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use('/home', (req, res)=> {
    res.render('hompage/home')
})
app.use('/user', User) // route User
app.use('/item', Item) // route Item - Admin
app.use('/category', Category) // route Category - Admin
app.locals.rupiah = Rupiah


app.listen(PORT, () => { console.log(`Listening on port ${PORT}!`)});