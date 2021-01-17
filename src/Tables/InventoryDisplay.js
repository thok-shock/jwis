import React from "react";
import { Table } from "react-bootstrap";



function renderRows(items) {
  if (items) {
      const nonZeroItems = items.filter(item => item.itemQuantity > 0)
    return nonZeroItems.map((item) => {
        if (item.itemExpiration) {
        item.itemExpiration = new Date(item.itemExpiration).toLocaleDateString()
        }
        if (item.itemLastModified) {
            item.itemLastModified = new Date(item.itemLastModified).toLocaleString()
        }

      return (
        <tr key={item.itemID} onClick={() => {
            window.location.href = '/item/' + item.itemID
        }} style={{cursor: 'pointer'}}>
          <td>{item.itemName}</td>
          <td>{item.itemQuantity}</td>
          <td>{item.itemDescription}</td>
          <td>{item.itemExpiration}</td>
          <td>{item.itemPrice}</td>
          <td>{item.itemLastModified}</td>
        </tr>
      );
    });
  } else {
      return <tr>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
      </tr>
  }
}

export default function InventoryDisplay(props) {
  return (
    <Table striped bordered hover>
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
      <tbody>
          {renderRows(props.items)}
      </tbody>
    </Table>
  );
}
