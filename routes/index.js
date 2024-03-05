

const routes = (app) => {
	app.get('/', (req, res) => {
		res.send('ChatsonAPI 1.0');
	  });
}

export default routes;