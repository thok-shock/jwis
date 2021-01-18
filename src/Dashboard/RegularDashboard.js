import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import InventoryDisplay from '../Tables/InventoryDisplay'

export default function RegularDashboard(props) {
    return <Container fluid>
        <Row>
            <Col>
            <h1>Welcome to JWIS</h1>
            <p>This website contains the inventory of the 1325 Randall Ct APT 4 pantry, refrigerator, and freezer. All information is up to date.</p>
            <InventoryDisplay items={props.items} />
            </Col>
        </Row>

    </Container>
}