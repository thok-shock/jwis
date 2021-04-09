import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Form, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import SearchedItem from './SearchedItem';


function locateItem(items, upc, forced) {
    return new Promise((resolve, reject) => {
        if (forced) {
            reject(null)
        } else if (items) {
            let foundItem = items.find(item => {
                if (item.itemID == upc) return true;
                else {
                    return false;
                }
            })
            console.log(foundItem)
            console.log(foundItem.itemName)
            if (foundItem.itemName) {resolve(foundItem)}
            else reject(null)
        }
    })
}

function locateItemFromDatabase(id) {
    return new Promise((resolve, reject) => {
        fetch('/items/search?id=' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            return res.json()
        })
        .then(res => {
            resolve(res.items[0])
        })
        .catch(err => {
            console.log(err)
            reject('There was an error processing the request')
        })
    })
}

export default function Item(props) {
    
    let {id} = useParams();
    let [unsaved, changeUnsaved] = useState(false)
    let [thisItem, updateThisItem] = useState({})
    let [searchedItem, updateSearchedItem] = useState(null)
    let [show, updateShow] = useState(false)
    let [forceUpdate, updateForceUpdate] = useState(false)

    useEffect(() => {
        if (props.items && props.items.length > 0) {
            locateItem(props.items, id, forceUpdate)
        .then(foundItem => {
            if (foundItem) {
                if (foundItem.itemExpiration) foundItem.itemExpiration = foundItem.itemExpiration.slice(0,10);
                foundItem.itemLastModified = new Date(foundItem.itemLastModified).toLocaleString()        
            }
            updateThisItem(foundItem)
        })
        .catch((err) => {
            console.log('could not locate item')
            console.log(err)
            var audio = new Audio('/audio/bad.m4a');
            audio.play();
            locateItemFromDatabase(id)
            .then(item => {
                updateSearchedItem(item)
                updateShow(true)
            })
            .catch(err => {
                console.log(err)
                toast.error('Please enter information manually')
            })
        })
        }
    }, [props.items, forceUpdate])

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
                itemPrice: document.getElementById('price').value,
                itemCategory: document.getElementById('category').value,
                itemPhotoURL: document.getElementById('photo').value
            })
        })
        .then(res => {
            if (res.status == 200) {
                var audio = new Audio('/audio/good.m4a');
                        audio.play();
                toast.success('Successfully updated item')
                window.location.href = '/add'
                
            } else {
                toast.error('Unexpected error occurred')
                var audio = new Audio('/audio/bad.m4a');
                        audio.play();
            
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
            <Form.Control onChange={onChange} maxLength='45' defaultValue={thisItem.itemName} autoFocus></Form.Control>
            </Form.Group>
            <Col>
            <h3 className='text-muted' style={{marginTop: '32px'}}>{id}</h3></Col>
            </Form.Row>
            </Col>
            <Col>
            <img src={thisItem.itemPhotoURL} style={{maxWidth: '200px'}}></img>
            </Col>
        </Row>
        <Row>
            <Col>
            <Form>
                <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control onChange={onChange} maxLength='200' as='textarea' type='text' defaultValue={thisItem.itemDescription}></Form.Control>
                </Form.Group>
                <Form.Group controlId='photo'>
                    <Form.Label>Photo URL</Form.Label>
                    <Form.Control onChange={onChange} defaultValue={thisItem.itemPhotoURL} type='text'></Form.Control>
                </Form.Group>
                <Form.Row>
                <Form.Group as={Col} controlId='quantity'>
                    <Form.Label>Quantity</Form.Label>
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
                <Form.Group as={Col} md='6' controlId='category'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control onChange={onChange} defaultValue={thisItem.itemCategory}></Form.Control>
                </Form.Group>
                </Form.Row>
            </Form>
            </Col>
        </Row>
        <Row>
            <Col>
            <Button onClick={onSubmit} variant='primary' className='m-3' disabled={!unsaved}>Save Changes</Button>
            <Button onClick={discardChange} variant='outline-danger' className='m-3' disabled={!unsaved}>Discard Changes</Button>
            <Button onClick={() => updateForceUpdate(true)} variant='warning'>Force Data Update</Button>
            </Col>
        </Row>
        <SearchedItem show={show} searchedItem={searchedItem} updateSearchedItem={updateSearchedItem} updateShow={updateShow} changeUnsaved={changeUnsaved} />
    </Container>
    } else {
        return <p>loading</p>
    }
    
}