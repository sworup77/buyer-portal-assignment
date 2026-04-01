const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = "secret123";


router.post('/register', async (req, res) => {
   const { email, password, name } = req.body;

   if (!email || !password) {
      return res.status(400).json({ message: "Missing fields" });
   }

   const hashedPassword = await bcrypt.hash(password, 10);

   db.run(
      `INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)`,
      [email, hashedPassword, name || "User", "buyer"],
      function (err) {
         if (err) {
            return res.status(400).json({ message: "User already exists" });
         }
         res.json({ message: "User registered" });
      }
   );
});


router.post('/login', (req, res) => {
   const { email, password } = req.body;

   db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
      if (!user) return res.status(400).json({ message: "User not found" });

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return res.status(400).json({ message: "Wrong password" });

      const token = jwt.sign({ id: user.id }, SECRET);
      console.log("token", token)

      res.json({ token });
   });
});

module.exports = router;
const authMiddleware = require('../middleware/authMiddleware');

router.get('/me', authMiddleware, (req, res) => {
   db.get(
      `SELECT name, role FROM users WHERE id = ?`,
      [req.userId],
      (err, user) => {
         if (err) return res.status(500).json({ message: "Error fetching user" });
         res.json(user);
      }
   );
});