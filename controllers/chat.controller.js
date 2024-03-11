import Conversation from '../models/conversation.model.js'
import Message from '../models/message.model.js'

class chatController {
	static sendMessage = async (req, res) => {
		try {
			const senderID = req.userId
			const { message } = req.body
			const { id: receiverID } = req.params

			let conversation = await Conversation.findOne({
				participants: {
					$all: [senderID, receiverID]
				}
			})

			if (!conversation) {
				conversation = await Conversation.create({
					participants: [senderID, receiverID]
				})
			}

			const newMessage = new Message({
				senderID,
				receiverID,
				message
			})

			if (newMessage) {
				conversation.messages.push(newMessage._id)
			}

			await Promise.all([conversation.save(), newMessage.save()])

			console.log(`Mensagem enviado: ${message}, Enviado por: ` + senderID)

			return res.status(201).json(newMessage)
		} catch (error) {
			console.log('Error in SendMessage Controller: ' + error)
			return res.status(500).send({ erro: 'sim', detalhe: 'Internal Server Error' })
		}
	}

	static getConversation = async (req, res) => {
		try {
			const { id: userToChatId } = req.params;
			const senderID = req._id;

			const conversation = await Conversation.findOne({
                participants: {
                    $all: [senderID, userToChatId]
                }
            }).populate("messages");

			res.status(200).send(conversation.messages)
		} catch (error) {
			console.log('Error in getConversation Controller: ' + error)
			return res.status(500).send({ erro: 'sim', detalhe: 'Internal Server Error' })
		}
	}
}

export default chatController;