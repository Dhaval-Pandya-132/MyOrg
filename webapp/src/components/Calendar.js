import React, {Component} from 'react'
import BigCalendar from 'react-big-calendar-like-google';
import events from './events';
import moment from 'moment';
import 'react-big-calendar-like-google/lib/css/react-big-calendar.css'

class Calender extends Component{

    constructor(){
        super();
        BigCalendar.momentLocalizer(moment);

    }

    render(){
        console.log("props",this.props);
        return(

            // <div ref={this.myRef} {...this.props} style={{height: 600}}>
            <BigCalendar
           
              selectable
            //   min={moment('12:00am', 'h:mma').toDate()}
            //   max={moment('11:59pm', 'h:mma').toDate()}
              events={events}
              defaultView='week'
              onLeftMenu={()=>{}}
              popup={true}
              scrollToTime={new Date(1970, 1, 1, 6)}
              defaultDate={new Date()}
              onSelectEvent={event => alert(event.title)}
              onSelectSlot={(slotInfo) => alert(
                `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
                `\nend: ${slotInfo.end.toLocaleString()}` +
                `\naction: ${slotInfo.action}`
              )}
            />
        //   </div>
            );
    }

}



export default Calender;