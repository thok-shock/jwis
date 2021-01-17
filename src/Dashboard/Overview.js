import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Button } from 'react-bootstrap'
import Navigation from '../Navigation'
import InventoryDisplay from '../Tables/InventoryDisplay'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
  } from "react-router-dom";
import Add from '../Add/Add';
import Item from '../Item/Item';

import { toast, ToastContainer } from 'react-toastify';
import Checkout from '../Checkout/Checkout';


function play() {
    
}



function loadItems(updateItems) {
    fetch('/items')
    .then(res => res.json())
    .then(res => {
        updateItems(res)        
    })
}

export default function Overview(props) {

    const [items, updateItems] = useState([]);
    const history = useHistory()

    useEffect(() => {
        loadItems(updateItems)
    }, [])

    function addItemFromUPC(upc) {
        fetch('/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                itemID: upc
            })
        })
        .then(res => {
            if (res.status != 500) {
                toast.success('Item Added')
                var audio = new Audio('/audio/good.m4a');
                audio.play();
                if (res.status == 201) {
                    console.log(res)
                    return res.json()
                } else {
                    return parseInt(upc)
                }
            } else {
                throw new error
            } 
        })
        .then(res => {
            console.log(res)
            const copyItems = JSON.parse(JSON.stringify(items))
            if (typeof res === 'number') {
                const updatedItems = copyItems.map(item => {
                    if (item.itemID == upc) {
                        var newQuant = parseInt(item.itemQuantity)
                        newQuant += 1;
                        item.itemQuantity = newQuant
                        return item
                    } else {
                        return item
                    }
                })
                //console.log(updatedItems)
                updateItems(updatedItems)
            } else {
                console.log(res)
            copyItems.push(res[0])
            //console.log(copyItems)
            updateItems(copyItems)
            console.log(res[0].itemID)
            window.location.href = ('/item/' + res[0].itemID)
            }
            
        })
        .catch(err => {
            console.log(err)
            toast.error('Failed to Add Item')
                console.log('Failed to add')
        })
    } 

    function handleRemove(upc) {
        const copyItems = JSON.parse(JSON.stringify(items))
        const foundItem = copyItems.find(item => {
            if (item.itemID == upc) {
                return true
            } else {
                return false
            }
        })
        if (foundItem.itemQuantity > 0) {
            foundItem.itemQuantity = foundItem.itemQuantity - 1
        }
        fetch('/items', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(foundItem)
        })
        .then(res => {
            if (res.status == 200) {
                const returnItems = copyItems.map(item => {
                    /*
                    if (item.itemID == upc) {
                        if (item.itemQuantity > 0) {
                            item.itemQuantity = item.itemQuantity - 1
                        }
                    }*/
                    return item
                }) 
                toast.success('Item Checked Out')
                updateItems(returnItems)
                var audio = new Audio('/audio/good.m4a');
                        audio.play();
            } else {
                toast.error('An unexpected error occurred')
                var audio = new Audio('/audio/bad.m4a');
                        audio.play();
            }
        })
    }

    return <div>
        <Router>
        <Navigation />
        <Container fluid className='p-5'>
            <Row>
                <Col>
                <Switch>
                    <Route exact path='/'>
                    <InventoryDisplay items={items} />
                    </Route>
                    <Route exact path='/add'>
                        <Add items={items} addItem={addItemFromUPC} />
                    </Route>
                    <Route exact path='/checkout'>
                    <Checkout items={items} handleRemove={handleRemove} />
                    </Route>
                    <Route path='/item/:id' >
                        <Item items={items} />
                    </Route>
                    <Route>
                    <p>nothign here!</p>
                    </Route>
                </Switch>
                </Col>
            </Row>
    </Container>
    <audio id='success' src='/audio/success.mp3'></audio>
    </Router>
    
        </div>
}