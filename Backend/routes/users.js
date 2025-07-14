const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET users with pagination & search
router.get('/', async (req, res) => {
  const { page = 1, limit = 20, search = '' } = req.query;
  const query = search ? { name: { $regex: search, $options: 'i' } } : {};

  try {
    const users = await User.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await User.countDocuments(query);
    res.json({ data: users, total });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

module.exports = router;
