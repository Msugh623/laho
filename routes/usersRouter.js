import express from "express"
import requestHandlers from "../handlers/requestHandlers"
const usersRouter = express.Router()

usersRouter.get("/:uid", requestHandlers.getUser)

export default usersRouter