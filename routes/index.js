module.exports = (app) => {
    app.get('/', (req, res) => {
		res.render('home.ejs');
	});

    app.get('/home', (req, res) => {
        res.render('home.ejs')
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