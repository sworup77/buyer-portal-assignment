const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
   res.send("API is running");
});

app.use('/auth', require('./routes/auth'));
app.use('/favourites', require('./routes/favourites'));

app.listen(3000, () => {
   console.log("Server running on http://localhost:3000");
});