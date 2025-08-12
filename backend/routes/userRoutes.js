
const express = require('express');
const router = express.Router();
const { 
    createUser, 
    loginUser,
    getUsers, 
    getUser, 
    updateUser, 
    deleteUser 
} = require('../controllers/userController');

router.route('/').get(getUsers);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);
router.post('/login', loginUser);
router.post('/register', createUser);

module.exports = router;