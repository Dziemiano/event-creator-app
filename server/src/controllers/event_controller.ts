import { Response, Request } from "express"
import { IEvent } from './../types/types'
import  Event  from "./../models/event_model"
import { validationResult, Result, ValidationError } from "express-validator"

const getEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const events: IEvent[] = await Event.find()
    
    res.status(200).json({ events })
  } catch (error) {
    throw error
  }
}

const addEvent = async (req: Request, res: Response): Promise<any> => {
  try {
    const errors: Result<ValidationError> = validationResult(req)
    errors.throw()

    const body = req.body as Pick<IEvent, "first_name" | "last_name" | "email" | "date">

    const event: IEvent = new Event({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      date: body.date,
    })
    
    const newEvent: IEvent = await event.save()
    const allEvents: IEvent[] = await Event.find()

    res.status(201).json({
        message: "Event added", 
        event: newEvent, 
        events: allEvents
      })
    } catch (error) {
        res.status(400).json({ error })
        throw error;
    }
}

const deleteEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedEvent: IEvent | null = await Event.findByIdAndRemove(req.params.id)
    const allEvents: IEvent[] = await Event.find()
    
    res.status(200).json({
          message: 'Event deleted',
          event: deletedEvent,
          events: allEvents,
        })
  } catch (error) {
    throw error
  }
}

export { getEvents, addEvent, deleteEvent }