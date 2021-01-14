const router = require('express').Router();
const { roomExists } = require('../utilities/utilities');
const { check, validationResult } = require('express-validator');

router.post('/', [
    check('username', 'Username is required').notEmpty(),
    check('room', 'Room is required').notEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({
            ok: false,
            errors: errors.array()
        })
    }
    const room = req.body.room;
    const username = req.body.username;
    const success = roomExists(room);
    if (success == -1) {
        return res.status(404).json({
            ok: false,
            errors: [{
                param: 'room',
                msg: `Room ${room} is not available`
            }]
        });

    }
    const user = {
        room,
        username
    }
    return res.json({
        ok: true,
        user
    })

});

module.exports = router;