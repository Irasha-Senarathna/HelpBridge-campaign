
// const express = require('express');
// const router = express.Router();
// const { 
//     createUser, 
//     loginUser,
//     getUsers, 
//     getUser, 
//     updateUser, 
//     deleteUser 
// } = require('../controllers/userController');

// router.route('/').get(getUsers);
// router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);
// router.post('/login', loginUser);
// router.post('/register', createUser);

// module.exports = router;

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

// Specific routes first
router.post('/login', loginUser);
router.post('/register', createUser);

// Then collection routes
router.get('/', getUsers);

// Then dynamic ID routes
router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;

