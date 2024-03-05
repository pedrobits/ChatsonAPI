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
	}
});

const Message = mongoose.model('User', messageSchema);

export default Message;