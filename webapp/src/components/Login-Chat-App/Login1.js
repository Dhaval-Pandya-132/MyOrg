import React, { useRef } from 'react'
import { Container, Form, Button } from 'react-bootstrap'

import { v4 as uuidV4 } from 'uuid'

export default function Login1({ onIdSubmit }) {
    const idRef = useRef()

    function handleSubmit(event){
        event.preventDefault()

        onIdSubmit(idRef.current.value)

    }

    // To create new id for new user
    function createNewId(){
        onIdSubmit(uuidV4())

    }


    return (
        <Container className="login-container">
            <Form onSubmit={handleSubmit} className="w-100">
                <Form.Group>
                <Form.Label> Enter your Id </Form.Label>
                <Form.Control type="text" ref ={idRef} required />
            </Form.Group>
            <Button type="submit" className="mr-2"> Login </Button>
            <Button  onClick={createNewId} variant="secondary"> Create a new Id</Button>
            </Form>
        </Container>
    )
}
