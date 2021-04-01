import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import moment from 'moment';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { connect } from "react-redux";
import { EVENTFORM_INIT_STATE } from './constants'
import { showAndHideModal } from './../actions/eventFormModalActions'

class EventForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formData: { ...EVENTFORM_INIT_STATE }
        }
    }


    save = () => {
        this.clearState();
    }

    clearState = () => {
        this.setState({
            formData: { ...EVENTFORM_INIT_STATE }
        });
        this.props.setModalShow(false);
    }


    onChangeEvent = (event) => {
        // console.log("Event", event);
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
                        { description: event.target.value }
                });
                break;
            case 'startDate':
                this.setState({
                    formData: {
                        start:
                        {
                            date:
                                moment(event.target.value).format("YYYY-MM-DD")
                        }
                    }
                });
                break;
            case 'startTime':
                this.setState({
                    formData:
                    {
                        start: { time: event.target.value }
                    }
                });
                break;
            case 'endDate':
                this.setState({
                    formData:
                    {
                        end:
                        {
                            date: moment(event.target.value).format("YYYY-MM-DD")
                        }
                    }
                });
                break;
            case 'endTime':
                this.setState({
                    formData:
                    {
                        end: {
                            time: event.target.value
                        }
                    }
                });
                break;
            case 'attendees':
                this.setState({
                    formData:
                        { attendees: event.target.value }
                });
                break;
            default:
                return
        }


    }


    render() {

        console.log("this.state", this.state);

        let startDate, startTime, endDate, endTime, isShow;
        let localFormData = { ...this.state.formData }
        if (localFormData.start.date !== "" && localFormData.start.date !== this.props.startDate) {
            startDate = moment(localFormData.start.date).format("YYYY-MM-DD");
            startTime = localFormData.start.time;
            isShow = localFormData.modalShow;
        }
        else {
            startDate = moment(this.props.startDate).format("YYYY-MM-DD")
            startTime = this.props.startTime;
            isShow = this.props.showModal;
        }


        if (localFormData.end.date !== "" && localFormData.end.date !== this.props.endDate) {
            endDate = moment(localFormData.end.date).format("YYYY-MM-DD");
            endTime = localFormData.end.time;
        }
        else {
            endDate = moment(this.props.endDate).format("YYYY-MM-DD");
            endTime = this.props.endTime;
        }



        return (
            <Modal
                {...this.props}
                show={isShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
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
                                    type="text"
                                    value={localFormData.summary}
                                    placeholder="Add Title / Summary"
                                    onChange={(event) => { this.onChangeEvent(event) }}
                                /></Col>
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
                                    value={startDate}
                                    onChange={(event) => {
                                        this.onChangeEvent(event);
                                    }} type="date" /></Col>
                            <Col sm={5}><Form.Control
                                id="startTime"
                                type="time"
                                value={startTime}
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
                                value={endDate}
                                onChange={(event) => {
                                    this.onChangeEvent(event);
                                }} /></Col>
                            <Col sm={5}><Form.Control
                                id="endTime"
                                value={endTime}
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
                    <Button onClick={() => this.save()}>Save</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => ({
    show: state.eventFormReducer.modalShow
});

const mapDispatchToProps = (dispatch) => ({
    setModalShow: (show) => showAndHideModal(dispatch, show),
})

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);