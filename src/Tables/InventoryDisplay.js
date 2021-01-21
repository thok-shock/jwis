import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { ArrowDown, ArrowUp } from "react-bootstrap-icons";
import {
  sortByDescription,
  sortByExpiration,
  sortByName,
  sortByQuantity,
  sortByPrice
} from "./InventorySortingFunctions";

function isExpired(itemExpiration) {
  const pastDate = new Date(itemExpiration)
  const currDate = new Date()
  if (pastDate.getTime() < currDate.getTime()) return {color: 'red'}
}

function renderRows(items, sortType, sortDirection) {
  if (items) {
    const nonZeroItems = items.filter((item) => item.itemQuantity > 0);

    //create an array of readable items
    const convertedItems = nonZeroItems.map((item) => {
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
          <td style={isExpired(item.itemExpiration)}>{item.itemExpiration}</td>
          <td>{item.itemPrice}</td>
          <td>{item.itemLastModified}</td>
        </tr>
      );
    });

    //perform sorting and return the sorted values

    return convertedItems.sort((itemA, itemB) => {
      //console.log(itemA.props.item);
      //console.log(itemB.props.item);

      switch (sortType) {
        case "itemName":
          return sortByName(itemA, itemB, sortDirection);
        case "itemQuantity":
          return sortByQuantity(itemA, itemB, sortDirection);
        case "itemDescription":
          return sortByDescription(itemA, itemB, sortDirection);
        case "itemExpiration":
          return sortByExpiration(itemA, itemB, sortDirection);
          case "itemPrice":
            return sortByPrice(itemA, itemB, sortDirection);
      }
    });
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
  const [sortType, updateSortType] = useState("itemExpiration");
  const [sortDirection, updateSortDirection] = useState(true);

  function updateSort(newType) {
    if (sortType == newType) {
      updateSortDirection(!sortDirection);
    } else {
      updateSortType(newType);
    }
  }

  function determineArrow(columnName) {
    if (columnName === sortType)
    return sortDirection ? <ArrowUp /> : <ArrowDown />
  }

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <td
            onClick={(e) => {
              updateSort("itemName");
            }}
            style={{ cursor: "pointer" }}
          >
            Name {determineArrow('itemName')}
          </td>
          <td
            onClick={(e) => {
              updateSort("itemQuantity");
            }}
            style={{ cursor: "pointer" }}
          >
            Quantity {determineArrow('itemQuantity')}
          </td>
          <td
            onClick={(e) => {
              updateSort("itemDescription");
            }}
            style={{ cursor: "pointer" }}
          >
            Description {determineArrow('itemDescription')}
          </td>
          <td
            onClick={(e) => {
              updateSort("itemExpiration");
            }}
            style={{ cursor: "pointer" }}
          >
            Expiration Date {determineArrow('itemExpiration')}
          </td>
          <td
          onClick={(e) => {
            updateSort("itemPrice");
          }}
          style={{ cursor: "pointer" }}
          >Price (per unit) {determineArrow('itemPrice')}</td>
          <td>Last Modified Time</td>
        </tr>
      </thead>
      <tbody>{renderRows(props.items, sortType, sortDirection)}</tbody>
    </Table>
  );
}
