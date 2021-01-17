const express = require("express");
const db = require("./db");

const ItemAPI = express.Router();

function createOrAddItem(upc, data) {
  return new Promise((resolve, reject) => {
    db.query(
      {
        sql: "SELECT * FROM items WHERE itemID = ?;",
        values: [upc],
      },
      function (err, row) {
        if (err) reject(err);
        else {
          if (row && row.length > 0) {
              console.log(parseInt(row[0].itemQuantity))
            const newQuantity = parseInt(row[0].itemQuantity) + 1;
            db.query(
              {
                sql: "UPDATE items SET itemQuantity = ? WHERE itemID = ?;",
                values: [newQuantity, row[0].itemID],
              },
              function (err, row) {
                err ? reject(err) : resolve(null);
              }
            );
          } else {
            db.query(
              {
                sql:
                  "INSERT INTO items (itemID, itemName, itemDescription, itemExpiration, itemPrice, itemLastModified, itemQuantity) VALUES (?,?,?,?,?,?,?);",
                values: [
                  data.itemID,
                  data.itemName,
                  data.itemDescription,
                  data.itemExpiration,
                  data.itemPrice,
                  new Date(),
                  1,
                ],
              },
              function (err, row) {
                if (err) reject(err);
                else {
                    //console.log(row.insertId)
                    //console.log(row)
                  db.query(
                    {
                      sql: "SELECT * FROM items WHERE itemID = ?;",
                      values: [data.itemID],
                    },
                    function (err, row) {
                      err ? reject(err) : resolve(row);
                    }
                  );
                }
              }
            );
          }
        }
      }
    );
  });
}

function getItems(id, limit) {
  return new Promise((resolve, reject) => {
    if (id) {
      db.query(
        { sql: "SELECT * FROM items WHERE itemID = ?;", values: [id] },
        function (err, row) {
          err ? reject(err) : resolve(row);
        }
      );
    } else {
      const newLimit = limit ? limit : 500;
      db.query(
        {
          sql: "SELECT * FROM items ORDER BY itemLastModified DESC LIMIT ?",
          values: [newLimit],
        },
        function (err, rows) {
          err ? reject(err) : resolve(rows);
        }
      );
    }
  });
}

function modifyItem(data) {
    return new Promise((resolve, reject) => {
        db.query({
            sql: 'UPDATE items SET itemName = ?, itemDescription = ?, itemExpiration = ?, itemPrice = ?, itemLastModified = ?, itemQuantity = ? WHERE itemID = ?;',
            values: [data.itemName, data.itemDescription, new Date(data.itemExpiration), data.itemPrice, new Date(), data.itemQuantity, data.itemID]
        }, function(err, row) {
            err ? reject(err) : resolve(row)
        })
    })
}

ItemAPI.get('/', (req, res) => {
    const id = req.query ? req.query.id : null
    const limit = req.query ? parseInt(req.query.limit) : null
    getItems(id, limit)
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(rows)
    })
})

ItemAPI.post("/", (req, res) => {
  const upc = req.body.itemID;
  const data = req.body;
  createOrAddItem(upc, data)
    .then((row) => {
      if (row) {
          console.log(201)
        res.status(201).json(row);
      } else {
          console.log(200)
        res.status(200).json({message: 'created'});
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

ItemAPI.put('/', (req, res) => {
    modifyItem(req.body)
    .then(row => {
        res.json(row)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

module.exports = ItemAPI;
