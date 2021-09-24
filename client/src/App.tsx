import React, { useEffect, useState } from 'react';
import './App.css';
import EventItem from './components/EventItem'
import AddEvent from './components/AddEvent';
import { getEvents, addEvent, deleteEvent } from './api/api';

const App: React.FC = () => {
  const [events, setEvents] = useState<IEvent[]>([])

  useEffect(() => {
    fetchEvents() 
  }, [])
  
  const fetchEvents = (): void => {
    getEvents()
      .then(({ data: { events }}: IEvent[] | any) => setEvents(events))
      .catch((err: Error) => console.log(err))
  }

  const handleSaveEvent = (formData: IEvent): void => {
    console.log(formData)
    addEvent(formData)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error('Event not saved')
        }
        setEvents(data.events)
      })
      .catch((err: Error) => console.log(err))
  }

  const handleDeleteEvent = (_id: string): void => {
    console.log(_id)
    deleteEvent(_id)
      .then(({ status, data }) => {
        if (status !==200) {
          throw new Error('Event not deleted')
        }
        setEvents(data.events)
      })
      .catch((err: Error) => console.log(err))
  }

  return (
    <main className='App'>
      <AddEvent saveEvent={handleSaveEvent} />
      <div className='Events'>
        <div className='Events-header'>
          <div className='Events--text'>
            <p>First Name</p>
            <p>Last Name</p>
            <p>Email</p>
            <p>Event Date</p>
          </div>
        </div>
        {events.map((event: IEvent) => ( 
          <EventItem
            key={event._id}
            event={event}
            deleteEvent={handleDeleteEvent}
          />
        ))}
      </div>
    </main>
  )
}

export default App;
