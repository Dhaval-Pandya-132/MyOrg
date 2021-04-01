import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar-like-google';
import { connect } from 'react-redux';
import events from './events';
import moment from 'moment';
import 'react-big-calendar-like-google/lib/css/react-big-calendar.css'
import ApiCalendar from 'react-google-calendar-api'
import EventForm from './EventForm'
import { showAndHideModal } from './../actions/eventFormModalActions'

class Calender extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: ""
    }


    BigCalendar.momentLocalizer(moment);
    this.ZOOM_API_KEY = 'WZ8d3cpAR3qx1cPD1Pdj6g';
    this.ZOOM_REDIRECT_URL = 'http://localhost:3000/calendar';

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
    let code = 'OwVw1la5wY_q9g5YHL1QTaI65Mqg7L2Wg';
    let email = 'pandya.d@northeastern.edu'
    // code = code.substring(6,code.length);
    console.log(code);
    fetch(`https://api.zoom.us/v2/users/${email}/meetings`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${code}`,
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
      }
    }).then(response => {
      console.log('response -->', response)
    }
    ).catch(console.log('error'));

  }


  // setModalShow = (modalShow) => {
  //   this.setState({ modalShow });
  // }

  render() {
    console.log("props", this.props);
    return (

      <div ref={this.myRef} {...this.props} style={{ height: 600 }}>
        {/* <button
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
              </button> */}


        <EventForm showModal={this.props.show} {...this.state}
          animation={false}
          backdrop={false}
        />
        <BigCalendar
          selectable
          //   min={moment('12:00am', 'h:mma').toDate()}
          //   max={moment('11:59pm', 'h:mma').toDate()}
          events={events}
          defaultView='week'
          onLeftMenu={() => { }}
          popup={true}
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date()}
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={(slotInfo) => {
            this.props.setModalShow(true);
            this.setState({
              startDate: moment(slotInfo.start).format("YYYY-MM-DD"),
              endDate: moment(slotInfo.start).format("YYYY-MM-DD"),
              startTime: moment(slotInfo.start.toLocaleString()).format("hh:mm"),
              endTime: moment(slotInfo.end.toLocaleString()).format("hh:mm")

            })

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
  show: state.eventFormReducer.modalShow
});

const mapDispatchToProps = (dispatch) => ({
  setModalShow: (show) => showAndHideModal(dispatch, show),
})

export default connect(mapStateToProps, mapDispatchToProps)(Calender);