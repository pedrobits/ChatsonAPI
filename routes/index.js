import userController from '../controllers/user.controller.js'
import chatController from '../controllers/chat.controller.js'
import middleware from '../middleware/authMiddleware.js'

const routes = (app) => {
	app.get('/', (req, res) => {
		res.send('ChatsonAPI 1.0');
	});

	app.post('/createNewUser', userController.createNewUser)
	app.post('/login', userController.loginUser)

	//Message 
	app.post('/sendMessage/:id', middleware.isAuth, chatController.sendMessage)
}

export default routes;