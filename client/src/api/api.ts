import axios, { AxiosResponse } from 'axios'

const url: string = "http://localhost:4000"

export const getEvents = async (): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const events: AxiosResponse<ApiDataType> = await axios.get(
            url + "/events"
        )
        return events
    } catch (error: any) {
        throw new Error()
    }
}

export const addEvent = async (formData: IEvent): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const event: Omit<IEvent, "_id"> = {
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            date: formData.date,
        }
        const saveEvent: AxiosResponse<ApiDataType> = await axios.post(
            url + "/add-event",
            event
        )
        return saveEvent
    } catch (error: any) {
        throw new Error(error)
    }
}

export const deleteEvent = async (_id: string): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const deletedTodo: AxiosResponse<ApiDataType> = await axios.delete(
            `${url}/delete-event/${_id}`
        )
        return deletedTodo
    }   catch (error: any) {
        throw new Error(error)
    }
}