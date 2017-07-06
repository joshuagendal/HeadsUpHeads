module.exports = (app) => {
    app.get('/', (req, res) => {
        var successMsg = req.flash('signupSuccessMsg');
        res.render('home.ejs', { successMsg: successMsg, hasSuccessMsg: successMsg.length > 0});
	});

    app.get('/home', (req, res) => {
        var successMsg = req.flash('signupSuccessMsg');
        res.render('home.ejs', { successMsg: successMsg, hasSuccessMsg: successMsg.length > 0});
    });

    app.get('/about-us', (req, res) => {
        res.render('aboutUs.ejs');
    });

	require('./user')(app);
	require('./messageBoard')(app);
	require('./comment')(app);
	require('./event')(app);
	require('./emailVerification')(app);
} 