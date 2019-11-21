module.exports = (req, res, next) => {
  let userSession = req.session.user
  if(!userSession) {
		res.redirect('/list')
	} else {
    next()
  }
}