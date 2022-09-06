const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');
// with asyncwrapper:
// Models are fancy constructors compiled from Schema definitions. An instance of a model is called a document. Models are responsible for creating and reading documents from the underlying MongoDB database.
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

// create function is used to create new documents
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }

  res.status(200).json({ task });
});
const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }
  res.status(200).json({ task });
});
const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }

  res.status(200).json({ task });
});

//// WITHOUT ASYNCWRAPPER:
// const getAllTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find({});
//     // console.log(tasks);
//     // res.status(200).json({ tasks }); // sends back an object which has a property named 'tasks' {tasks: tasks} => es6 shorthand (the property name is the same as the variable name - the variable that stores the value). We return what we get back from find()
//     res.status(200).json({ tasks, amount: tasks.length });
//     // res.status(200).json({ status: 'success', data: { tasks, nbHits: tasks.length } });
//   } catch (err) {
//     res.status(500).json({ msg: err });
//   }
// };

// // Models are fancy constructors compiled from Schema definitions. An instance of a model is called a document. Models are responsible for creating and reading documents from the underlying MongoDB database.

// // create function is used to create new documents
// const createTask = async (req, res) => {
//   try {
//     const task = await Task.create(req.body);
//     console.log(req.body);
//     res.status(200).json({ task });
//   } catch (err) {
//     res.status(500).json({ msg: err }); // general server error
//   }
// };

// const getTask = async (req, res) => {
//   try {
//     const { id: taskID } = req.params;
//     // console.log(req.params);
//     // find a task by its ID
//     const task = await Task.findOne({ _id: taskID });
//     if (!task) {
//       return res.status(404).json({ msg: `No task with id: ${taskID}` }); // this error is for when the id passed in is in correct syntax
//     }
//     res.status(200).json({ task });
//   } catch (err) {
//     res.status(500).json({ msg: err }); // for other errors such as when the id is in incorrect syntax => CastError. eg: it has more/less characters than the correct syntax
//   }
// };

// const deleteTask = async (req, res) => {
//   try {
//     const { id: taskID } = req.params;
//     const task = await Task.findOneAndDelete({ _id: taskID });
//     if (!task) {
//       res.status(404).json({ msg: `No task with id: ${taskID}` });
//     }
//     res.status(200).send(); // since it's to delete a task, we don't need to send back anything
//     // res.status(200).json({ task });
//     // res.status(200).json({ task: null, status: 'success' }); // we can also do this for response
//   } catch (err) {
//     res.status(400).json({ msg: err });
//   }
// };

// const updateTask = async (req, res) => {
//   try {
//     const { id: taskID } = req.params;
//     // console.log(req.body);
//     // findOneAndUpdate(conditions, update, options)
//     const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!task) {
//       return res.status(404).json({ msg: `No task with ID: ${taskID}` });
//     }
//     res.status(200).json({ task });
//   } catch (err) {
//     res.status(500).json({ msg: err });
//   }
// };

// // const editTask = async (req, res) => {
// //   try {
// //     const { id: taskID } = req.params;
// //     const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
// //       new: true,
// //       runValidators: true,
// //       overwrite: true,
// //     });
// //     if (!task) {
// //       res.status(404).json({ msg: `No task with ID: ${taskID}` });
// //     }
// //     res.status(200).json({ task });
// //   } catch (err) {
// //     res.status(500).json({ msg: err });
// //   }
// // };

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  // editTask,
};
