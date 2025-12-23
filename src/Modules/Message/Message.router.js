import { Router } from "express";
import * as MC from "./Message.controller.js";
import * as MV from "./message.validation.js";
import { validation } from "../../middleWares/validation.middel.js";

const router = Router();
router.get(
  "/getAllMessages",
  validation(MV.AllmessagesSchema),
  MC.getAllMessages
);
router.get("/:_id", validation(MV.singleMessageSchema), MC.getMessages);
router.post("/sendMessage", validation(MV.messageschema), MC.sendMessage);

router.delete("/delete/:messageId", MC.deleteMessage);

export default router;
