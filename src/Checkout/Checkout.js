import React from 'react'
import { Col, Container, Row, Form, Button } from 'react-bootstrap'
import InventoryDisplay from '../Tables/InventoryDisplay'

function handleKeyPress(target, addItemFromUPC) {
    if (target.charCode==13) {
        //addItemFromUPC(document.getElementById('upc').value)
    }
}

function handleRemove(e, props) {
    console.log('running remove')
    e.preventDefault(); 
    props.handleRemove(document.getElementById('upc').value)
    document.getElementById('upc').value = ""
}

export default function Checkout(props) {
    return <Container fluid>
        <Row>
            <Col>
            <h3>Checkout Item</h3>
                        <p>Scan items out of the system.</p>
                        <Form onSubmit={(e) => {handleRemove(e, props)}}>
                            <Form.Row>
                            <Form.Group as={Col} controlId='upc'>
                                <Form.Label>UPC</Form.Label>
                                <Form.Control type='code' onKeyPress={(e) => {handleKeyPress(e, props.addItem)}} autoFocus></Form.Control>
                                <Form.Text>Please use the barcode scanner, or manually type from item</Form.Text>
                            </Form.Group>
                            <Col><Button style={{marginTop: '32px'}} onClick={e => handleRemove(e, props)}>Submit</Button></Col>
                            </Form.Row>
                        </Form>    
            </Col>
        </Row>
        <Row>
            <Col>
            <InventoryDisplay items={props.items} />
            </Col>
        </Row>
    </Container>
}