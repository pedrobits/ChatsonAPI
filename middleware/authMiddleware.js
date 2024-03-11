import jwt from 'jsonwebtoken'

class middleware {
	static isAuth = async (req, res, next) => {
		const tokenHeader = req.header('Authorization');

		if (!tokenHeader || !tokenHeader.startsWith('Bearer ')) {
			return res.status(401).json({ error: 'Access denied. No token provided.' });
		}

		const token = tokenHeader.split(' ')[1];

		if (!token) return res.status(401).json({ error: 'Access denied' });
		try {
			const decoded = jwt.verify(token, process.env.saltPassword);
			req.userId = decoded.userId;
			next();
		} catch (error) {
			console.log(error);
			res.status(401).json({ error: 'Invalid token' });
		}
	}
}

export default middleware;