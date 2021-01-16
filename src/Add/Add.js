import React from 'react'
import { Col, Container, Form, Row, Button } from 'react-bootstrap'
import InventoryDisplay from '../Tables/InventoryDisplay'

export default function Add(props) {
    return <Container fluid>
        <Row>
            <Col>
            <h3>Add Item</h3>
                        <p>This page will allow you to add items into the inventory system. Items are modifiable once added.</p>
                        <Form>
                            <Form.Row>
                            <Form.Group as={Col} controlID='upc'>
                                <Form.Label>UPC</Form.Label>
                                <Form.Control type='code'></Form.Control>
                                <Form.Text>Please use the barcode scanner, or manually type from item</Form.Text>
                            </Form.Group>
                            <Col><Button style={{marginTop: '32px'}}>Submit</Button></Col>
                            </Form.Row>
                        </Form>        
            </Col>
        </Row>
        <Row className='mt-3'>
            <Col>
            <InventoryDisplay />
            </Col>
        </Row>
    </Container>
}