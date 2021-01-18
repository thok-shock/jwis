import React from "react";
import { Table } from "react-bootstrap";

function renderRows(items, sortType, sortDirection) {

  if (items) {
    
    
    const nonZeroItems = items.filter((item) => item.itemQuantity > 0);

    //create an array of readable items
    const convertedItems =  nonZeroItems.map((item) => {

      //take the database date values and convert them into readable strings
      if (item.itemExpiration) {
        item.itemExpiration = new Date(
          item.itemExpiration
        ).toLocaleDateString();
      }
      if (item.itemLastModified) {
        item.itemLastModified = new Date(
          item.itemLastModified
        ).toLocaleString();
      }

      return (
        <tr
          key={item.itemID}
          item={item}
          onClick={() => {
            window.location.href = "/item/" + item.itemID;
          }}
          style={{ cursor: "pointer" }}
        >
          <td>{item.itemName}</td>
          <td>{item.itemQuantity}</td>
          <td>{item.itemDescription}</td>
          <td>{item.itemExpiration}</td>
          <td>{item.itemPrice}</td>
          <td>{item.itemLastModified}</td>
        </tr>
      );
    });

    //perform sorting and return the sorted values

    return convertedItems.sort((itemA, itemB) => {
     console.log(itemA.props.item)
     console.log(itemB.props.item)

     //sort by name, descending
     if (itemA.props.item.itemName && itemB.props.item.itemName) {
      if (itemA.props.item.itemName.toUpperCase() > itemB.props.item.itemName.toUpperCase()) {
        return 1
      } else if (itemA.props.item.itemName == itemB.props.item.itemName) {
        return 0
      } else {
        return -1
      }
    } else {
      return -1
    }
    })


  } else {
    return (
      <tr>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
      </tr>
    );
  }
}

export default function InventoryDisplay(props) {
  return (
    <Table striped bordered hover size="sm">
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
      <tbody>{renderRows(props.items)}</tbody>
    </Table>
  );
}
