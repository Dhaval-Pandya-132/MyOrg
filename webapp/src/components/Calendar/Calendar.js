import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar-like-google';
import { connect } from 'react-redux';
import events from '../events';
import moment from 'moment';
import 'react-big-calendar-like-google/lib/css/react-big-calendar.css'
import Cookie from "js-cookie";
import EventForm from '../EventsForm/EventForm'
import {
  showAndHideModal
  , updateDateRange
} from '../../actions/eventFormModalActions'
import { getAllEvents, selectEvent } from '../../actions/calendarActions'
import eventService from '../../services/events.service'


class Calender extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewEvent: false
    }
    BigCalendar.momentLocalizer(moment);

  }

  componentDidMount() {
    const tokenId = Cookie.get('tokenId');
    eventService.getAllEvents(tokenId).then(eventList => {
      console.log("eventList", eventList)
      this.props.getAllEvents(eventList);
    }).catch(() => this.props.history.push("/login"))

  }

  viewEventHandler = (event) => {
    this.setState({ viewEvent: true })
    this.props.selectEvent({ eventId: event.eventId });
    this.props.setModalShow(true);
  }

  render() {
    console.log("props", this.props);
    let { eventList } = { ...this.props };

    let eventsList = eventList.map(event => {

      return {
        "eventId": event.eventId,
        "title": event.summary,
        "start": new Date(event.start.dateTime.toString()),
        "end": new Date(event.end.dateTime.toString()),
        "desc": event.description,
        "bgColor": event.bgColor
      }
    })



    console.log("eventsList", eventsList);
    console.log("event", events);


    return (

      <div ref={this.myRef} {...this.props} style={{ height: 600 }}>
        <EventForm show={this.props.show}
          animation={false}
          backdrop={false}
          viewEvent={this.state.viewEvent}
        />
        <BigCalendar
          selectable
          events={eventsList}
          defaultView='week'
          onLeftMenu={() => { }}
          onClick={() => { }}
          popup={true}
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date()}
          onSelectEvent={event => {
            this.viewEventHandler(event);
          }}
          onSelectSlot={(slotInfo) => {
            this.props.setModalShow(true);
            this.setState({ viewEvent: false })
            const dateRange = {
              start: {
                date: moment(slotInfo.start).format("YYYY-MM-DD"),
                time: moment(slotInfo.start.toLocaleString()).format("hh:mm"),
                timezone: ""
              },
              end: {
                date: moment(slotInfo.end).format("YYYY-MM-DD"),
                time: moment(slotInfo.end.toLocaleString()).format("hh:mm"),
                timezone: ""
              }
            }
            this.props.updateDateRange(dateRange);


            console.log(
              `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
              `\nend: ${slotInfo.end.toLocaleString()}` +
              `\naction: ${slotInfo.action}`)
          }
          }
        />
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  show: state.eventFormReducer.modalShow,
  dateRange: state.eventFormReducer.dateRange,
  eventList: state.calendarReducer.eventList
});

const mapDispatchToProps = (dispatch) => ({
  setModalShow: (show) => showAndHideModal(dispatch, show),
  updateDateRange: (dateRange) => updateDateRange(dispatch, dateRange),
  getAllEvents: (eventList) => getAllEvents(dispatch, eventList),
  selectEvent: (event) => selectEvent(dispatch, event)
})

export default connect(mapStateToProps, mapDispatchToProps)(Calender);