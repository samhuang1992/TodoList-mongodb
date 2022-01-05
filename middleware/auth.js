module.exports = {
  authenticator: (req, res, nexet) => {
    if(req.isAuthenticator){
      return next()
    }
    res.redirect('/users/login')
  }
}