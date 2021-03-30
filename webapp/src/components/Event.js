import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import moment from 'moment';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class Event extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            summary: "",
            description: "",
            attendes: [],
            end: {
                dateTime: "",
                timezone: ""
            },
            start: {
                dateTime: "",
                timezone: ""
            },
            status: "",
            syncGoogleCalendar: false

        }

    }


    save = () => {

    }


    render() {
        console.log('this.props', this.props);
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add New Event
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>

                        <Form.Group as={Row} controlId="formGridPassword">
                            <Col sm={2}>  <Form.Label>Title</Form.Label></Col>
                            <Col sm={10}>  <Form.Control type="text" value="Test"
                                placeholder="Add Title / Summary"
                                onChange={() => { }}
                            /></Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formGridPassword">
                            <Col sm={2}>  <Form.Label>Description</Form.Label></Col>
                            <Col sm={10}>  <Form.Control as="textarea" placeholder="Description" /></Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formGridAddress1">
                            <Col sm={2}><Form.Label>Start Date and Time</Form.Label></Col>
                            <Col sm={5}><Form.Control defaultValue={moment(new Date()).format("YYYY-MM-DD")} onChange={(event) => {
                                console.log(event.target.value)
                            }} type="date" /></Col>
                            <Col sm={5}><Form.Control type="time" /></Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formGridAddress1">
                            <Col sm={2}><Form.Label>End Date and Time</Form.Label></Col>
                            <Col sm={5}><Form.Control type="date" /></Col>
                            <Col sm={5}><Form.Control type="time" /></Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formGridPassword">
                            <Col sm={2}>  <Form.Label>Attendes</Form.Label></Col>
                            <Col sm={10}> <Form.Control type="text" placeholder="Add Email Address" /></Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                    <Button onClick={this.props.onHide}>Save</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}


export default Event;