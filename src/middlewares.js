function checkLogin(req, res, next) {
    if (req.session.logado) {
        next();
        } else {
            res.redirect('/auth/login');
    }
}

module.exports = checkLogin;