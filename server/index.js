const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

const ctrl = require('./controller')
const wishlistCtrl = require('./wishlistCtrl')

app.get("/api/compliment", ctrl.getCompliment);
app.get('/api/fortunes', ctrl.getFortune)

app.post('/api/wishlist', wishlistCtrl.addItem)
app.delete('/api/wishlist/:id', wishlistCtrl.deleteItem)


app.listen(4000, () => console.log("Server running on 4000"));
