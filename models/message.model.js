import mongoose from "mongoose";

var messageSchema = new mongoose.Schema({
	senderID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	receiverId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	message: {
		type: String,
		required: true
	},
	profilePic: {
		type: String,
		default: 'https://img.freepik.com/free-vector/purple-man-with-blue-hair_24877-82003.jpg',
	}
});

const Message = mongoose.model('User', messageSchema);

export default Message;