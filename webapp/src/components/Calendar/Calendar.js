import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar-like-google';
import { connect } from 'react-redux';
import events from '../events';
import moment from 'moment';
import 'react-big-calendar-like-google/lib/css/react-big-calendar.css'
import ApiCalendar from 'react-google-calendar-api'
import EventForm from '../EventsForm/EventForm'
import {
  showAndHideModal
  , updateDateRange
} from '../../actions/eventFormModalActions'

class Calender extends Component {

  constructor(props) {
    super(props);

    BigCalendar.momentLocalizer(moment);

  }
  handleItemClick = async (event, name) => {
    if (name === 'sign-in') {
      ApiCalendar.handleAuthClick();
      const rep = await ApiCalendar.getBasicUserProfile();
      if (ApiCalendar.sign)
        ApiCalendar.listUpcomingEvents(10).then(result => {
          console.log(result);
        });
      console.log('here', rep);
    } else if (name === 'sign-out') {
      ApiCalendar.handleSignoutClick();
    }
  }

  getZoomData = (event) => {
    // let code = 'mtDy0FxCoE_q9g5YHL1QTaI65Mqg7L2Wg';
    // let email = 'pandya.d@northeastern.edu'
    // let b = this.ZOOM_API_KEY + ":" + this.ZOOM_API_SECRET
    // // code = code.substring(6,code.length);
    // console.log(code);
    // fetch(`https://api.zoom.us/v2/users/${email}/meetings`, {
    //   method: "GET",
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     "Content-Type": "application/json",
    //     'Access-Control-Allow-Origin': '*'
    //   }
    // }).then(response => {
    //   console.log('response -->', response)
    // }
    // ).catch(console.log('error'));

  }


  // setModalShow = (modalShow) => {
  //   this.setState({ modalShow });
  // }

  render() {
    console.log("props", this.props);
    let { eventList } = { ...this.props };

    let eventsList = eventList.map(event => {

      return {
        "title": event.summary,

        "start": new Date(event.start.date + ' ' + event.start.time),
        "end": new Date(event.end.date + ' ' + event.end.time),
        "desc": event.description

      }
    })


    console.log("eventsList", eventsList);
    console.log("event", events);


    return (

      <div ref={this.myRef} {...this.props} style={{ height: 600 }}>
        <button
          onClick={(e) => this.handleItemClick(e, 'sign-in')}
        >
          sign-in
              </button>

        <a href={`https://zoom.us/oauth/authorize?response_type=code&client_id=${this.ZOOM_API_KEY}&redirect_uri=${this.ZOOM_REDIRECT_URL}`}>
          Connect Zoom
</a>
        <button
          onClick={(e) => this.getZoomData(e)}
        >
          Zoom
              </button>


        <EventForm show={this.props.show}
          animation={false}
          backdrop={false}
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
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={(slotInfo) => {
            this.props.setModalShow(true);
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
  updateDateRange: (dateRange) => updateDateRange(dispatch, dateRange)
})

export default connect(mapStateToProps, mapDispatchToProps)(Calender);