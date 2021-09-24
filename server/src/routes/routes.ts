import { Router } from "express"
import { getEvents, addEvent, deleteEvent } from "../controllers/event_controller"
import { body } from "express-validator"

const router: Router = Router()

router.get("/events", getEvents)

router.post(
    "/add-event",
    body("first_name").notEmpty().isString(), 
    body("last_name").notEmpty().isString(), 
    body("email").notEmpty().isEmail(),
    body("date").notEmpty().isString(),  
    addEvent
)

router.delete("/delete-event/:id", deleteEvent)

export default router