const express = require('express');
const app = express();
const PORT = 3000;
const Rupiah = require('./helpers/convertRupiah')
const session = require('express-session');
const { user } = require('./controllers')
const ModelCategory = require('./models').Category


const { User, Item, Category } = require('./routers')

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.get('/', (req, res)=>{
    let userSession = req.session.user
    res.redirect('/home')
})
app.use('/home', (req, res)=> {
    ModelCategory.findAll()
    .then(categories=> {
      let userSession = req.session.user
      res.render('hompage/home', {user: userSession, categories})
    })
    .catch(err=>{
      res.send(err)
    })
})
app.use('/list', (req, res, next)=>{
  let userSession = req.session.user
  if(!userSession){
    res.redirect('/login')
  }
  else {
    res.send('ada user')
  }
})


app.use('/login', user.loginPage);
app.use('/signup', user.register);
app.use('/user', User) // route User
app.use('/item', Item) // route Item - Admin
app.use('/category', Category) // route Category - Admin
app.locals.rupiah = Rupiah


app.listen(PORT, () => { console.log(`Listening on port ${PORT}!`)});