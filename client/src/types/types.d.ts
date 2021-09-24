interface IEvent {
    _id: string
    first_name: string
    last_name: string
    email: string
    date: string
    createdAt?: string
    updatedAt?:string
}

interface EventProps {
    event: IEvent
}

interface ApiDataType {
    message: string
    status: string
    events: IEvent[]
    event?: IEvent
}