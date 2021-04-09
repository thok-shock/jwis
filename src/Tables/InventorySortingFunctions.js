function sortByName(itemA, itemB, sortDirection) {
  if (sortDirection) {
    if (itemA.props.item.itemName && itemB.props.item.itemName) {
      if (
        itemA.props.item.itemName.toUpperCase() >
        itemB.props.item.itemName.toUpperCase()
      ) {
        return 1;
      } else if (itemA.props.item.itemName == itemB.props.item.itemName) {
        return 0;
      } else {
        return -1;
      }
    } else {
      return -1;
    }
  } else {
    if (itemA.props.item.itemName && itemB.props.item.itemName) {
      if (
        itemA.props.item.itemName.toUpperCase() >
        itemB.props.item.itemName.toUpperCase()
      ) {
        return -1;
      } else if (itemA.props.item.itemName == itemB.props.item.itemName) {
        return 0;
      } else {
        return 1;
      }
    } else {
      return -1;
    }
  }
}

function sortByQuantity(itemA, itemB, sortDirection) {
  if (sortDirection) {
    if (itemA.props.item.itemQuantity && itemB.props.item.itemQuantity) {
      if (itemA.props.item.itemQuantity > itemB.props.item.itemQuantity) {
        return 1;
      } else if (
        itemA.props.item.itemQuantity == itemB.props.item.itemQuantity
      ) {
        return 0;
      } else return -1;
    }
  } else {
    if (itemA.props.item.itemQuantity && itemB.props.item.itemQuantity) {
      if (itemA.props.item.itemQuantity > itemB.props.item.itemQuantity) {
        return -1;
      } else if (
        itemA.props.item.itemQuantity == itemB.props.item.itemQuantity
      ) {
        return 0;
      } else return 1;
    }
  }
}

function sortByDescription(itemA, itemB, sortDirection) {
  if (sortDirection) {
    if (itemA.props.item.itemDescription && itemB.props.item.itemDescription) {
      if (
        itemA.props.item.itemDescription.toUpperCase() >
        itemB.props.item.itemDescription.toUpperCase()
      ) {
        return 1;
      } else if (
        itemA.props.item.itemDescription.toUpperCase() ==
        itemB.props.item.itemDescription.toUpperCase()
      ) {
        return 0;
      } else {
        return -1;
      }
    } else return -1;
  } else {
    if (itemA.props.item.itemDescription && itemB.props.item.itemDescription) {
      if (
        itemA.props.item.itemDescription.toUpperCase() >
        itemB.props.item.itemDescription.toUpperCase()
      ) {
        return -1;
      } else if (
        itemA.props.item.itemDescription.toUpperCase() ==
        itemB.props.item.itemDescription.toUpperCase()
      ) {
        return 0;
      } else {
        return 1;
      }
    } else return -1;
  }
}

function sortByExpiration(itemA, itemB, sortDirection) {
  const aDate = new Date(itemA.props.item.itemExpiration);
  const bDate = new Date(itemB.props.item.itemExpiration);

  if (sortDirection) {
    if (itemA.props.item.itemExpiration && itemB.props.item.itemExpiration) {
      if (aDate.getTime() === bDate.getTime()) return 0;
      return aDate.getTime() > bDate.getTime() ? 1 : -1;
    } else {
      return itemA.props.item.itemExpiration === null ? 1 : -1;
    }
  } else {
    if (itemA.props.item.itemExpiration && itemB.props.item.itemExpiration) {
      if (aDate.getTime() === bDate.getTime()) return 0;
      return aDate.getTime() > bDate.getTime() ? -1 : 1;
    } else return itemA.props.item.itemExpiration === null ? 1 : -1;
  }
}

function sortByPrice(itemA, itemB, sortDirection) {
    const priceA = parseFloat(itemA.props.item.itemPrice)
    const priceB = parseFloat(itemB.props.item.itemPrice)
    if (sortDirection) {
        if (priceA && priceB) {
            if (priceA === priceB) return 0;
            return priceA > priceB ? 1 : -1;
          } else {
              console.log(priceA)
            return isNaN(priceA) ? 1 : -1;
          }
    } else {
        if (priceA && priceB) {
            if (priceA === priceB) return 0;
            return priceA > priceB ? -1 : 1;
          } else {
            return isNaN(priceA) ? 1 : -1;
          }
    }
}

function sortByModified(itemA, itemB, sortDirection) {
  const aDate = new Date(itemA.props.item.itemLastModified);
  const bDate = new Date(itemB.props.item.itemLastModified);

  if (sortDirection) {
    if (itemA.props.item.itemLastModified && itemB.props.item.itemLastModified) {
      if (aDate.getTime() === bDate.getTime()) return 0;
      return aDate.getTime() > bDate.getTime() ? 1 : -1;
    } else {
      return itemA.props.item.itemLastModified === null ? 1 : -1;
    }
  } else {
    if (itemA.props.item.itemLastModified && itemB.props.item.itemLastModified) {
      if (aDate.getTime() === bDate.getTime()) return 0;
      return aDate.getTime() > bDate.getTime() ? -1 : 1;
    } else return itemA.props.item.itemLastModified === null ? 1 : -1;
  }
}

module.exports = {
  sortByName,
  sortByQuantity,
  sortByDescription,
  sortByExpiration,
  sortByPrice,
  sortByModified
};
