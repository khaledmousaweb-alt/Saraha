import { messageModel } from "../../DB/Models/massage.model.js";
import { userModel } from "../../DB/Models/user.model.js";

const sendMessage = async (req, res, next) => {
  try {
    const { content, sender, recieverEmail } = req.body;

    const user = await userModel.findOne({ email: recieverEmail });
    if (!user) {
      return next(
        new Error("Invalid receiver Email - User not found", { cause: 404 })
      );
    }

    const message = await messageModel.create({
      content,
      sender,
      reciever: user._id,
    });
    return res
      .status(201)
      .json({ message: "Message sent successfully", data: message });
  } catch (error) {
    return next(error);
  }
};

const getMessages = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const messages = await messageModel
      .findById(_id)
      .populate([{ path: "sender" }]);

    if (messages) {
      return res
        .status(200)
        .json({ message: "Messages retrieved successfully", data: messages });
    }
    return next(new Error("Invalid message ID", { cause: 404 }));
  } catch (error) {
    return next(error);
  }
};

const getAllMessages = async (req, res, next) => {
  try {
    const { flag, sender, reciever } = req.query;

    let massages;
    if (flag == "inbox") {
      massages = await messageModel
        .find({ reciever })
        .populate("sender", "userName email")
        .sort({ createdAt: -1 });
    } else {
      massages = await messageModel
        .find({ sender })
        .populate("reciever", "userName email")
        .sort({ createdAt: -1 });
    }
    return res
      .status(200)
      .json({ message: "Messages retrieved successfully", data: massages });
  } catch (error) {
    return next(error);
  }
};

const deleteMessage = async (req, res, next) => {
  try {
    const { messageId } = req.params;

    if (!messageId) {
      return next(new Error("Message ID is required", { cause: 400 }));
    }

    const deletedMessage = await messageModel.findByIdAndDelete(messageId);

    if (!deletedMessage) {
      return next(new Error("Message not found", { cause: 404 }));
    }

    return res
      .status(200)
      .json({ message: "Message deleted successfully", data: deletedMessage });
  } catch (error) {
    return next(error);
  }
};

export { sendMessage, getMessages, getAllMessages, deleteMessage };
