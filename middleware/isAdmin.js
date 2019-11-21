module.exports = (req, res, next) => {
  let userSession = req.session.user
  if(userSession.role !== 'admin') {
    res.redirect('/list')
  } else {
    next()
  }
}