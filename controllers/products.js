//import dependencies//

const express = require('express')
const Note = require('../models/notes')
const Product = require('../models/products')

//create route//

const router = express.Router()


router.get("/", (req, res) => {
    // find all the products
    Product.find({ username: req.session.username })
      // render a template after they are found
      .then((product) => {
        console.log(product);
        res.render("./store/store", { product });
      })
      // send error as json if they aren't
      .catch((error) => {
        console.log(error);
        res.json({ error });
      });
  });

router.get('/:id', (req, res) => {
    res.send('show pages')
}) 




module.exports = router