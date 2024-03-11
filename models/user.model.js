import mongoose from 'mongoose';

var userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		index: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	gender: {
		type: String,
		required: true,
		enum: ['male', 'female']
	},
	password: {
		type: String,
		required: true,
	},
	profilePic: {
		type: String,
		default: 'https://img.freepik.com/free-vector/purple-man-with-blue-hair_24877-82003.jpg',
	}
	//creatAt, updateAt
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;