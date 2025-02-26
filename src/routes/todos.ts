import { Router } from 'express';
import { Todo } from '../models/todo';

type RequestBody = {text: string};
type RequestParams = {todoId: string};

let todos: Todo[] = [];
const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({ todos: todos });
});

router.post('/todo', (req, res) => {
  const body = req.body as RequestBody;
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: body.text,
  };

  todos.push(newTodo);
  res.status(201).json({ message: 'Todo added', todo: newTodo, todos:todos });
});

router.put('/todo/:todoId', (req: any, res: any) => {
  const params = req.params as RequestParams; 
  const body = req.body as RequestBody;
  const tid = params.todoId;
  const todoIndex = todos.findIndex((todoItem) => todoItem.id ===tid);
    if (todoIndex >=0) {
      todos[todoIndex] = { id: todos[todoIndex].id, text: body.text};
      return res.status(200).json({ message: 'Todo updated', todos: todos });
      
    }
    res.status(404).json({ message: 'Todo not found' });  
  });

router.delete('/todo/:todoId', (req, res) => {
  const params = req.params as RequestParams;
  todos = todos.filter((todoItem) =>todoItem.id !== params.todoId);
  res.status(200).json({ message: 'Todo deleted', todos });
});



export default router;
