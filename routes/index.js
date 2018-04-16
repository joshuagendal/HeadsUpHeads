const actions = require('../controllers/indexController.js');


module.exports = (app) => {

  // GET HOME PAGE 
  app.get('/', actions.getHomePage);

  // GET ABOUT US PAGE
  app.get('/about-us', (req, res) => {
      res.render('aboutUs.ejs');
  });

  // require routes for rest of app
	require('./user')(app);
	require('./messageBoard')(app);
	require('./comment')(app);
	require('./event')(app);
  require('./emailVerification')(app);
}