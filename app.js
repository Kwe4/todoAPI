const express = require('express');
const mongoose = require('mongoose');
const Todo = require('./models/todo');

const app = express();

app.use(express.urlencoded({ 
  extended: false 
}));
app.use(express.json());


mongoose.connect('mongodb+srv://davido:thisisthenewpassword@cluster0.qkxt5.mongodb.net/todoAPI').then(
  ()=>{
  console.log('DB Connected Successfully !')
});

const PORT = 3000;

// Get ALL Todos
app.get('/api/v1/todos', async (req, res) => {
  const todos = await Todo.find();
  res.status(200).json(todos);
});

// Get Single Todo
app.get('/api/v1/todos/:id', async (req, res) => {
  const id = req.params.id;
  const todo = await Todo.findById(id);
  res.status(200).json(todo);
});

app.post('/api/v1/todos', async (req, res) => {
  const title = req.body.title;
  const newTodo = await Todo.create({
    title: title,
  });

app.delete('/api/v1/todos/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const todo = await Todo.findByIdAndDelete(id);
      res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


  app.patch('/api/v1/todos/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const todo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(todo);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  res.status(201).json(newTodo);
});




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});