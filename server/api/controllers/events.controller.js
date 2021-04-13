import eventService from '../services/events.service'


const getEvents = (request, response) => {
    const promise = eventService.getAllEvents();
    promise.then(res => {
        response.status(200);
        response.json(res);
    })

};

const insertEvent = (request, response) => {
    const newEvent = { ...request.body };
    eventService.addNewEvent(newEvent).then(event => {
        response.status(201);
        response.json(event);
    }).catch(err =>
        response.json(err)
    );

}

const updateEvent = (request, response) => {
    const id = request.params.id;
    const updatedEvent = { ...request.body };
    eventService.updateEvent(id, updatedEvent).then(event => {
        response.status(200);
        response.json(event);
    }).catch(err =>
        response.json(err)
    );

}

const deleteEvent = (request, response) => {
    const id = request.params.id;
    eventService.deleteEvent(id).then(event => {
        response.status(200);
        response.json(event);
    }).catch(err =>
        response.json(err)
    );

}



export default {
    getEvents
    , insertEvent
    , updateEvent
    , deleteEvent
}