const mongoose = require('mongoose');

// create a schema/structure for the data (think of it as a collection in MongoDB)
const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide name'],
    trim: true, // trim white spaces
    maxlength: [20, 'name can not be more than 20 characters'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// validation: simple example

module.exports = mongoose.model('Task', TaskSchema);
