const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, (req, res) => {
   db.all(
      `SELECT * FROM favourites WHERE userId = ?`,
      [req.userId],
      (err, rows) => {
         res.json(rows);
      }
   );
});


router.post('/', auth, (req, res) => {
   const { propertyName } = req.body;

   db.run(
      `INSERT INTO favourites (userId, propertyName) VALUES (?, ?)`,
      [req.userId, propertyName],
      () => {
         res.json({ message: "Added" });
      }
   );
});


router.delete('/:id', auth, (req, res) => {
   db.run(
      `DELETE FROM favourites WHERE id = ? AND userId = ?`,
      [req.params.id, req.userId],
      () => {
         res.json({ message: "Removed" });
      }
   );
});

module.exports = router;