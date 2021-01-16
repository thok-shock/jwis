import React, { useState } from 'react'
import { Col, Container, Row, Form, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

export default function Item(props) {
    
    let {id} = useParams();
    let [unsaved, changeUnsaved] = useState(false)
    
    return <Container fluid>
        <Row>
            <Col>
            <Form.Row>
            <Form.Group as={Col}>
            <Form.Label>Item Name</Form.Label>
            <Form.Control>{props.name}</Form.Control>
            </Form.Group>
            <Col>
            <h3 className='text-muted' style={{marginTop: '32px'}}>{id}</h3></Col>
            </Form.Row>
            </Col>
            <Col>
            
            </Col>
        </Row>
        <Row>
            <Col>
            <Form>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as='textarea'></Form.Control>
                </Form.Group>
                <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control></Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Price</Form.Label>
                    <Form.Control></Form.Control>
                </Form.Group>
                <Form.Group as={Col} >
                    <Form.Label>Last Modified</Form.Label>
                    <p>{props.lastModified}</p>
                </Form.Group>
                </Form.Row>
            </Form>
            </Col>
        </Row>
        <Row>
            <Col>
            <Button variant='outline-primary' className='m-3' disabled={!unsaved}>Save Changes</Button>
            <Button variant='outline-danger' className='m-3' disabled={!unsaved}>Discard Changes</Button>
            </Col>
        </Row>
    </Container>
}