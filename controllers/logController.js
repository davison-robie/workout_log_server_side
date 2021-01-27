let express = require('express');
let router = express.Router();
let validateSession = require("../middleware/validate-session")
const Log = require("../db").import("../models/log")

//
//CREATE LOG ENTRY
//
router.post('/create', validateSession, (req, res) => {
    const logEntry = {
        description: req.body.workoutLog.description,
        definition: req.body.workoutLog.definition,
        result: req.body.workoutLog.result,
        owner_id: req.user.id
    }
    Log.create(logEntry)
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({ error: err }))
});

//
//GET ALL LOGS BY USER
//
router.get("/", validateSession, (req, res) => {
    let userId = req.user.id
    Log.findAll({
        where: {owner_id: userId}
    })
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({error: err}))
});

//
//GET INDIVIDUAL LOGS BY ENTRY ID
//
router.get('/:id', function (req, res) {
    let id = req.params.id;

    Log.findAll({
        where: {id: id}
    })
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({error: err}))
});

//
//UPDATE INDIVIDUAL WORKOUT LOG
//
router.put("/:id", validateSession, function (req, res) {
    const updateLogEntry = {
        description: req.body.workoutLog.description,
        definition: req.body.workoutLog.definition,
        result: req.body.workoutLog.result,
    };

    const query = {
        where: {
            id: req.params.id,
        }
    };

    Log.update(updateLogEntry, query)
    .then((logs) => res.status(200).json(logs))
    .catch((err) => res.status(500).json({error: err}))
});

//
//DELETE WORKOUT LOG
//
router.delete("/:id", validateSession, function (req, res) {
    const query = {
        where: {
            id: req.params.id,
        }
    };
    Log.destroy(query)
    .then(logs => res.status(200).json({message: "Workout Log Removed"}))
    .catch(err => res.status(500).json({error: err}))
});

module.exports = router;