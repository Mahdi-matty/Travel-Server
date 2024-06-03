const router = require('express').Router();
const {
    Login,
    SignUp
} = require('./userRoutes')

const {
    createFlightBookmark,
    createRideshareBookmark,
    getUserBookmarks
} = require('./markRoutes')

const {
    withTokenAuth
} = require('./tokenData')

router.route('/api/users/login').post(Login)
router.route('/api/users/register').post(SignUp)

router.route('/api/mark/flight').post(createFlightBookmark)
router.route('/api/mark/ride').post(createRideshareBookmark)

router.route('/api/mark/:userId').get(getUserBookmarks)

router.route('/api/tokenData').get(withTokenAuth)

module.exports = router;