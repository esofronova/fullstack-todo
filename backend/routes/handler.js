const router = require('express').Router();
const Task = require('../models/Tasks');

// GET TASKS
router.get('/', (req, res) => {
   Task.find({})
      .then((data) => {
         res.json(data);
      })
      .catch((err) => {
         console.log(err);
      });
});

// SAVE A TASK
router.post('/save', (req, res) => {
   const data = req.body;
   const newTask = new Task(data);

   newTask.save((err) => {
      if (err) {
         console.log(err);
      } else {
         res.json(data);
      };
   });
});

// UPDATE TASK
router.put('/update', (req, res) => {
   const task = Task.findById(req.body.id);
   task.updateOne({ $set: { isDone: req.body.isDone }})
      .then(() => {
         res.json();
      })
      .catch((err) => {
         console.log(err);
      });
});

// DELETE TASK
router.delete('/delete', (req, res) => {
   const task = Task.findById(req.body.id);
   task.deleteOne()
      .then(() => {
         res.json();
      })
      .catch((err) => {
         console.log(err);
      });
});

module.exports = router;