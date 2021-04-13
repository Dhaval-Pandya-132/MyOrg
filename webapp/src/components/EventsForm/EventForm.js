import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import moment from 'moment';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Cookie from "js-cookie";
import { connect } from "react-redux";
import { EVENTFORM_INIT_STATE } from '../constants'
import { showAndHideModal, updateDateRange } from '../../actions/eventFormModalActions'
import { addNewEvent } from '../../actions/calendarActions'
import ErrorList from '../ErrorList/ErrorList';
import eventService from '../../services/events.service'


class EventForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formData: { ...EVENTFORM_INIT_STATE },
            errorList: []
        }
    }


    save = (event) => {

        if (this.validateForm()) {
            // save data and clear state
            let formData = {
                ...this.state.formData,
                ...this.props.dateRange
            }
            let tokenId = Cookie.get('tokenId');
            eventService
                .addEvent(tokenId, formData)
                .then(response => console.log('inserted new event to db', response));
            this.props.addNewEvent(formData);
            this.clearState();
            return;
        }
    }

    validateForm = () => {
        let errorList = [];
        let localFormData = { ...this.state.formData };
        let { dateRange } = { ...this.props };
        console.log('localFormData', localFormData)
        if (localFormData.summary === "") {
            errorList.push("Title is required")
        }
        if (dateRange.start.date === ""
            || dateRange.start.time === "") {
            errorList.push("Start date/time is required")
        }
        if (dateRange.end.date === ""
            || dateRange.end.time === "") {
            errorList.push("End date/time is required")
        }
        if (dateRange.start.date !== ""
            && dateRange.start.time !== ""
            && dateRange.end.date !== ""
            && dateRange.end.time !== ""
        ) {
            if (dateRange.start.date > dateRange.end.date) {
                errorList.push("Start date should be greater than end date")
            }
            if (dateRange.start.time > dateRange.end.time) {
                errorList.push("Start time should be greater than end time")
            }

        }
        this.setState({ errorList });
        return errorList.length === 0;

    }

    clearState = () => {
        this.setState({
            formData: { ...EVENTFORM_INIT_STATE },
            errorList: []
        });
        this.props.setModalShow(false);
    }


    onChangeEvent = (event) => {
        // console.log("Event", event);
        let dateRange = {}
        switch (event.target.id) {
            case 'title':
                this.setState({
                    formData:
                        { ...this.state.formData, summary: event.target.value }
                });
                break;
            case 'description':
                this.setState({
                    formData:
                    {
                        ...this.state.formData
                        , description: event.target.value
                    }
                });
                break;
            case 'startDate':
                dateRange = { ...this.props.dateRange }
                dateRange.start.date = moment(event.target.value).format("YYYY-MM-DD");
                this.props.updateDateRange(dateRange);
                break;
            case 'startTime':
                dateRange = { ...this.props.dateRange }
                dateRange.start.time = event.target.value;
                this.props.updateDateRange(dateRange);
                break;
            case 'endDate':
                dateRange = { ...this.props.dateRange }
                dateRange.end.date = moment(event.target.value).format("YYYY-MM-DD");
                this.props.updateDateRange(dateRange);
                break;
            case 'endTime':
                dateRange = { ...this.props.dateRange }
                dateRange.end.time = event.target.value;
                this.props.updateDateRange(dateRange);
                break;
            case 'attendees':
                this.setState({
                    formData:
                        { ...this.state.formData, attendees: event.target.value }
                });
                break;
            default:
                return
        }


    }


    render() {
        console.log("this.state", this.state);
        let { errorList } = { ...this.state };
        let { dateRange } = { ...this.props };
        let localFormData = { ...this.state.formData }
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <ErrorList errorList={errorList} />
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add New Event
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} >
                            <Col sm={2}>  <Form.Label>Title</Form.Label></Col>
                            <Col sm={10}>
                                <Form.Control id="title"
                                    required={true}
                                    type="text"
                                    value={localFormData.summary}
                                    placeholder="Add Title / Summary"
                                    onChange={(event) => { this.onChangeEvent(event) }}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} >
                            <Col sm={2}>  <Form.Label>Description</Form.Label></Col>
                            <Col sm={10}>  <Form.Control
                                id="description"
                                as="textarea"
                                value={localFormData.description}
                                placeholder="Description"
                                onChange={(event) => { this.onChangeEvent(event) }}
                            /></Col>
                        </Form.Group>
                        <Form.Group as={Row} >
                            <Col sm={2}>
                                <Form.Label>Start Date and Time</Form.Label>
                            </Col>
                            <Col sm={5}>
                                <Form.Control
                                    id="startDate"
                                    value={dateRange.start.date}
                                    onChange={(event) => {
                                        this.onChangeEvent(event);
                                    }} type="date" /></Col>
                            <Col sm={5}><Form.Control
                                id="startTime"
                                type="time"
                                value={dateRange.start.time}
                                onChange={(event) => {
                                    this.onChangeEvent(event);
                                }}
                            /></Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col sm={2}>
                                <Form.Label>End Date and Time</Form.Label>
                            </Col>
                            <Col sm={5}><Form.Control
                                id="endDate"
                                type="date"
                                value={dateRange.end.date}
                                onChange={(event) => {
                                    this.onChangeEvent(event);
                                }} /></Col>
                            <Col sm={5}><Form.Control
                                id="endTime"
                                value={dateRange.end.time}
                                type="time"
                                onChange={(event) => {
                                    this.onChangeEvent(event);
                                }}
                            /></Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col sm={2}>  <Form.Label>Attendees</Form.Label></Col>
                            <Col sm={10}> <Form.Control
                                id="attendees"
                                onChange={(event) => {
                                    this.onChangeEvent(event);
                                }}
                                type="text"
                                value={localFormData.attendees}
                                placeholder="Add Email Address" /></Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.clearState()}>Close</Button>
                    <Button type="submit" onClick={(event) => this.save(event)}>Save</Button>
                </Modal.Footer>
            </Modal >

        );
    }
}

const mapStateToProps = (state) => ({
    show: state.eventFormReducer.modalShow,
    dateRange: state.eventFormReducer.dateRange
});

const mapDispatchToProps = (dispatch) => ({
    setModalShow: (show) => showAndHideModal(dispatch, show),
    updateDateRange: (dateRange) => updateDateRange(dispatch, dateRange),
    addNewEvent: (event) => addNewEvent(dispatch, event)

})

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);