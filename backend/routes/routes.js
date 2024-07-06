const express = require('express');
const { registerUser, loginUser,getAllUsers,deleteUser } = require('../controller/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/getAllUsers',getAllUsers);
router.delete('/deleteUser/:id',deleteUser)

module.exports = router;