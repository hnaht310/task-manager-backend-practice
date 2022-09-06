require('./db/connect');
const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const port = process.env.PORT || 3000;

// middleware
app.use(express.static('./public')); // serve static files
app.use(express.json()); // to access req.body

// routes
app.use('/api/v1/tasks', tasks);

app.use(notFound);

app.use(errorHandlerMiddleware);

// app.get('/api/v1/tasks') - get all tasks
// app.post('/api/v1/tasks') - create a new task
// app.get('/api/v1/tasks/:id) - get single task
// app.patch('/api/v1/tasks/:id') - update task
// app.delete('api/v1/task/:id') - delete a task

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on ${port}...`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
