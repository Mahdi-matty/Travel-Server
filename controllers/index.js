const router = require('express').Router();
const {
    Login,
    SignUp,
    UpdateUser
} = require('./userRoutes')

const {
    createFlightBookmark,
    createRideshareBookmark,
    getUserBookmarks
} = require('./markRoutes')

const {
    createFlightBooked,
    createRideshareBooked,
    getUserBooked
} = require('./tripRoute')

const {
    withTokenAuth
} = require('./tokenData')

router.route('/api/users/login').post(Login)
router.route('/api/users/:userId').post(UpdateUser)
router.route('/api/users/register').post(SignUp)

router.route('/api/mark/flight').post(createFlightBookmark)
router.route('/api/mark/ride').post(createRideshareBookmark)

router.route('/api/trip/flight').post(createFlightBooked)
router.route('/api/trip/ride').post(createRideshareBooked)

router.route('/api/trip/:userId').get(getUserBooked)
router.route('/api/mark/:userId').get(getUserBookmarks)

router.route('/api/tokenData').get(withTokenAuth)

module.exports = router;