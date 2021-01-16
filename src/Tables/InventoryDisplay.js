import React from 'react'
import { Table } from 'react-bootstrap'

export default function InventoryDisplay(props) {
    return <Table striped bordered hover>
        <thead>
            <tr>
                <td>Name</td>
                <td>Quantity</td>
                <td>Description</td>
                <td>Expiration Date</td>
                <td>Price (per unit)</td>
                <td>Last Modified Time</td>
            </tr>
        </thead>
    </Table>
}