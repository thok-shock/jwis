import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Navigation from '../Navigation'
import InventoryDisplay from '../Tables/InventoryDisplay'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Add from '../Add/Add';
import Item from '../Item/Item';

export default function Overview(props) {
    return <div>
        <Router>
        <Navigation />
        <Container fluid className='p-5'>
            <Row>
                <Col>
                <Switch>
                    <Route exact path='/'>
                    <InventoryDisplay />
                    </Route>
                    <Route exact path='/add'>
                        <Add />
                    </Route>
                    <Route exact path='/checkout'>
                    <InventoryDisplay />
                    </Route>
                    <Route path='/item/:id'>
                        <Item />
                    </Route>
                    <Route>
                    <p>nothign here!</p>
                    </Route>
                </Switch>
                </Col>
            </Row>
    </Container>
    </Router>
        </div>
}