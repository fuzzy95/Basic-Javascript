const express = require('express');
const Task = require('../models/task');
const router = new express.Router();

// Task 
router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});


// Query
router.get('/tasks', async (req, res) => {  
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (e) {
        res.status(500).send(e);
    }
});

// Get tasks by id
router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findById(_id);
        if(!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
});

// Updating task
router.patch('/tasks/:id', async (req, res) => {
    // for invalid update
    const updates = Object.keys(req.body);
    const allowrdUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => allowrdUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({'Error' : 'Invalid updates'});
    }

    // for updating
    try {
        const task = await Task.findById(req.params.id);
        
        // Dynamic update
        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

// Delete task
router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }
})

module.exports = router;