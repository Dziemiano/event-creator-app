import { IEvent } from "./../types/types"
import { model, Schema } from "mongoose"

const eventSchema: Schema = new Schema(
    {
        first_name: {
            type: String,
            required: true,
        },

        last_name: {
            type: String,
            required: true,
        },
        
        email: {
            type: String,
            required: true,
        },

        date: {
            type: String,
            required: true,
        },
    },
    {timestamps: true}
)

export default model<IEvent>("Event", eventSchema)