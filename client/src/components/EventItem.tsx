import React from 'react'

type Props = EventProps & {
  deleteEvent: (_id: string) => void
}

const Event: React.FC<Props> = ({ event, deleteEvent }) => {
  return (
    <div className='Event'>
      <div className='Event--text'>
        <p>{event.first_name}</p>
        <p>{event.last_name}</p>
        <p>{event.email}</p>
        <p>{event.date}</p>
      </div>
      <div className='Event--button'>
        <button
          onClick={() => deleteEvent(event._id)}
          className='Event--button__delete'
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default Event