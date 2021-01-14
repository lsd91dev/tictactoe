const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const { roomExists } = require('../utilities/utilities');


router.get('/', (req, res) => {
    const data = require('../data/db.json');
    let room;
    let exists;
    do {
        room = Math.random().toString(36).substring(7);
        exists = roomExists(data, room);
    } while (exists != -1);

    return res.json({
        ok: true,
        room
    });
})

router.post('/room', [
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
    let username = req.body.username;
    let room = req.body.room;
    let user = {
        username,
        room,
    }
    return res.json({
        ok: true,
        user
    });
});


module.exports = router;