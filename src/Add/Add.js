import React from 'react'
import { Col, Container, Form, Row, Button } from 'react-bootstrap'
import InventoryDisplay from '../Tables/InventoryDisplay'

function handleKeyPress(target, addItemFromUPC) {
    if (target.charCode==13) {
        //addItemFromUPC(document.getElementById('upc').value)
    }
}

function handleAdd(e, props) {
    e.preventDefault(); 
    props.addItem(document.getElementById('upc').value)
    document.getElementById('upc').value = ""
}

export default function Add(props) {
    return <Container fluid>
        <Row>
            <Col>
            <h3>Add Item</h3>
                        <p>This page will allow you to add items into the inventory system. Items are modifiable once added.</p>
                        <Form onSubmit={(e) => {handleAdd(e, props)}}>
                            <Form.Row>
                            <Form.Group as={Col} controlId='upc'>
                                <Form.Label>UPC</Form.Label>
                                <Form.Control type='code' onKeyPress={(e) => {handleKeyPress(e, props.addItem)}} autoFocus></Form.Control>
                                <Form.Text>Please use the barcode scanner, or manually type from item</Form.Text>
                            </Form.Group>
                            <Col><Button style={{marginTop: '32px'}} onClick={e => handleAdd(e, props)}>Submit</Button></Col>
                            </Form.Row>
                        </Form>        
            </Col>
        </Row>
        <Row className='mt-3'>
            <Col>
            <InventoryDisplay items={props.items} />
            </Col>
        </Row>
        
    </Container>
    
}

