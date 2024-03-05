import User from '../models/user.model.js'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

class userController {
	static createNewUser = async (req, res) => {
		const { name, email, gender, password } = req.body;

		if (!name || !email || !password || !gender) {
			return res.status(400).json({ error: true, message: 'Faltam informações necessárias. Por favor, forneça todos os campos obrigatórios.' });
		}

		if (gender !== 'male' && gender !== 'female') {
			return res.status(400).json({ error: true, message: 'Gênero informado inválido.' });
		}

		var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

		if (!validRegex.test(email)) {
			return res.status(400).json({ error: true, message: 'Email inválido, por favor, verifique.' });
		}

		if (password.length < 6 || !password) {
			return res.status(400).json({ error: true, message: 'Senha inválida, por favor, verifique se sua senha contém pelo menos 6 caracteres.' });
		}

		try {
			const hashedPassword = await bcrypt.hash(password, 10);

			const newUser = new User({ name: name, email: email, password: hashedPassword, gender: gender });

			const savedDoc = await newUser.save();

			return res.status(200).json({ error: false, message: 'Usuário criado com sucesso.', user: savedDoc });
		} catch (error) {
			return res.status(500).json({ error: true, message: 'Erro ao salvar usuário.' });
		}
	}

	static loginUser = async (req, res) => {
		const { email, password } = req.body;

		try {
			const user = await User.findOne({ email });

			if (!user) {
				return res.status(401).json({ error: true, message: 'Credenciais inválidas.' });
			}

			const passwordMatch = await bcrypt.compare(password, user.password);

			if (!passwordMatch) {
				return res.status(401).json({ error: true, message: 'Credenciais inválidas.' });
			}

			const token = jwt.sign({ userId: user._id }, process.env.saltPassword, { expiresIn: '1h' });

			return res.status(200).json({ error: false, message: 'Login bem-sucedido.', token });
		} catch (error) {
			return res.status(500).json({ error: true, message: 'Erro ao fazer login.', erroDetalhado: error.message });
		}
	}
}

export default userController;
