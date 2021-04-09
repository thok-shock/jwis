import { Col, Form, Modal, Button } from 'react-bootstrap'
import React from 'react'



export default function SearchedItem(props) {

    function updateSearched(e) {
        //console.log(e)
        //console.log(e.target.name)
        props.updateSearchedItem({...props.searchedItem, [e.target.name]: e.target.value})
        return null;
    }

    return <Modal show={props.show} onClose={() => {props.updateShow(false)}}>
        <Modal.Header>
            <Modal.Title>Add From GTIN Search</Modal.Title>
        </Modal.Header>
        {props.searchedItem && <Modal.Body>
            <p>Through the power of searching sketchy internet databases for information, we have located a possible item match.</p>
            <p>Please verify the following information</p>
            {props.searchedItem.images && <img src={props.searchedItem.images[0]} style={{maxWidth: '200px'}}></img> }
            <Form>
                <Form.Group controlId='title'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control name='title' value={props.searchedItem.title} onChange={(e) => {updateSearched(e)}}></Form.Control>
                </Form.Group>
                <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control name='description' as='textarea' value={props.searchedItem.description} onChange={(e) => {updateSearched(e)}}></Form.Control>
                </Form.Group>
                <Form.Group controlId='image'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control name='image' defaultValue={props.searchedItem.images[0]}></Form.Control>
                </Form.Group>
                <Form.Row>
                <Form.Group as={Col} controlId='brand'>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control name='brand' value={props.searchedItem.brand} onChange={(e) => {updateSearched(e)}}></Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Category</Form.Label>
                    <Form.Control name='category' value={props.searchedItem.category} onChange={(e) => {updateSearched(e)}}></Form.Control>
                </Form.Group>
                </Form.Row>
            </Form>
            <Modal.Footer>
                <Button onClick={() => {
                    document.getElementById('name').value = props.searchedItem.title
                    document.getElementById('description').value = props.searchedItem.description
                    document.getElementById('quantity').value = 1
                    document.getElementById('price').value = 1
                    document.getElementById('category').value = props.searchedItem.category
                    document.getElementById('photo').value = document.getElementById('image').value
                    props.changeUnsaved(true)
                    props.updateShow(false)
                }}>Submit</Button>
                <Button variant='outline-danger' onClick={() =>
                    {props.updateShow(false)}
                }>Cancel</Button>
            </Modal.Footer>
        </Modal.Body>}
    </Modal>
}