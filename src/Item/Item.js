import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Form, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';


function locateItem(items, upc, updateThisItem) {
    if (items) {
    let foundItem = items.find(item => {
        if (item.itemID == upc) return true;
        else {
            return false;
        }
    })
    if (foundItem) {
        if (foundItem.itemExpiration) foundItem.itemExpiration = foundItem.itemExpiration.slice(0,10);
        foundItem.itemLastModified = new Date(foundItem.itemLastModified).toLocaleString()
            console.log(foundItem.itemExpiration)
        
    }
    updateThisItem(foundItem)
}
}

export default function Item(props) {
    
    let {id} = useParams();
    let [unsaved, changeUnsaved] = useState(false)
    let [thisItem, updateThisItem] = useState({})

    useEffect(() => {
        locateItem(props.items, id, updateThisItem)
    }, [props.items])

    function onChange(e) {
        if (!unsaved) changeUnsaved(!unsaved);
    }

    function discardChange(e) {
        changeUnsaved(false)
        window.location.href = '/item/' + id
    }

    function onSubmit() {
        fetch('/items', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                itemID: id,
                itemName: document.getElementById('name').value,
                itemDescription: document.getElementById('description').value,
                itemQuantity: document.getElementById('quantity').value,
                itemExpiration: document.getElementById('expiration').value,
                itemPrice: document.getElementById('price').value
            })
        })
        .then(res => {
            if (res.status == 200) {
                toast.success('Successfully updated item')
                window.location.href = '/add'
            } else {
                toast.error('Unexpected error occurred')
            }
            return res.json()
        })
    }
    
    if (thisItem) {
        return <Container fluid>
        <Row>
            <Col>
            <Form.Row>
            <Form.Group as={Col} controlId='name'>
            <Form.Label>Item Name</Form.Label>
            <Form.Control onChange={onChange} maxLength='45' defaultValue={thisItem.itemName}></Form.Control>
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
                <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control onChange={onChange} maxLength='200' as='textarea' type='text' defaultValue={thisItem.itemDescription}></Form.Control>
                </Form.Group>
                <Form.Row>
                <Form.Group as={Col} controlId='quantity'>
                    <Form.Label  >Quantity</Form.Label>
                    <Form.Control onChange={onChange} step='1' type='number' defaultValue={thisItem.itemQuantity}></Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId='price'>
                    <Form.Label >Price</Form.Label>
                    <Form.Control onChange={onChange} defaultValue={thisItem.itemPrice} type='money'></Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId='last'>
                    <Form.Label >Last Modified</Form.Label>
                    <p>{thisItem.itemLastModified}</p>
                </Form.Group>
                <Form.Group as={Col} controlId='expiration'>
                    <Form.Label>Expiration Date</Form.Label>
                    <Form.Control onChange={onChange} type='date' defaultValue={thisItem.itemExpiration}></Form.Control>
                </Form.Group>
                </Form.Row>
            </Form>
            </Col>
        </Row>
        <Row>
            <Col>
            <Button onClick={onSubmit} variant='primary' className='m-3' disabled={!unsaved}>Save Changes</Button>
            <Button onClick={discardChange} variant='outline-danger' className='m-3' disabled={!unsaved}>Discard Changes</Button>
            </Col>
        </Row>
    </Container>
    } else {
        return <p>loading</p>
    }
    
}