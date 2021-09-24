import { Document } from "mongoose"

export interface IEvent extends Document {
    first_name: string
    last_name: string
    email: string
    date: string
}