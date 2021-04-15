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

const getGoogleCalendarEvents = (request, response) => {
    const { accesstoken } = { ...request.headers };
    // console.log("request.header", request.headers);
    eventService
        .getGoogleCalendarEvents(accesstoken, 'primary')
        .then(res => {
            response.status(200);
            // console.log("res", res.data)
            response.json(res.data);
        }).catch(err => response.json(err))
}

const addGoogleCalendarEvent = (request, response) => {
    const { accesstoken } = { ...request.headers };
    const event = request.body;
    console.log("event", event);
    eventService
        .addGoogleCalendarEvent(accesstoken, 'primary', event)
        .then(res => {
            response.status(201);
            // console.log("res", res.data)
            response.json(res.data);
        }).catch(err => response.json(err))
}

export default {
    getEvents
    , insertEvent
    , updateEvent
    , deleteEvent
    , getGoogleCalendarEvents
    , addGoogleCalendarEvent
}