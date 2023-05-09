module.exports.signin = (req, res) => {
    res.render('signin');
};
module.exports.signup = (req, res) => {
    res.render('signup');
};
module.exports.index = (req, res) => {
    res.render('index',{username: req.session.username});
};

