import userController from '../controllers/user.controller.js'

const routes = (app) => {
	app.get('/', (req, res) => {
		res.send('ChatsonAPI 1.0');
	  });

	  app.post('/createNewUser', userController.createNewUser)
	  app.post('/login', userController.loginUser)
}

export default routes;