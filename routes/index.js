module.exports = (app) => {
  app.get('/', (req, res) => {
		res.render('index.ejs');
	});

	require('./user')(app);
	require('./messageBoard')(app);
	require('./comment')(app);
	require('./event')(app);
} 