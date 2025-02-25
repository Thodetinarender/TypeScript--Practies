import { Router, Request, Response, NextFunction } from 'express';
import { Todo } from '../models/todo';

const router = Router();
const todos: Todo[] = [];

router.get('/', (req: Request, res: Response, next: NextFunction): void => {
  res.status(200).json({ todos });
});

router.post('/todo', (req: Request, res: Response, next: NextFunction): void => {
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: req.body.text,
  };

  todos.push(newTodo);
  res.status(201).json({ message: 'Todo added', todo: newTodo, todos });
});

router.post('/delete', (req: Request, res: Response, next: NextFunction): void => {
  const todoId = req.body.id;

  const todoIndex = todos.findIndex(todo => todo.id === todoId);

  if (todoIndex === -1) {
    res.status(404).json({ message: 'Todo not found' });
    return;
  }

  todos.splice(todoIndex, 1);
  res.status(200).json({ message: 'Todo deleted', todos });
});

router.post('/update', (req: Request, res: Response, next: NextFunction): void => {
    const todoId = req.body.id;
    const newText = req.body.text; 
  
    const todoIndex = todos.findIndex(todo => todo.id === todoId);
  
    if (todoIndex === -1) {
      res.status(404).json({ message: 'Todo not found' });
      return;
    }

    todos[todoIndex].text = newText;

    res.status(200).json({ message: 'Todo updated', todo: todos[todoIndex], todos });

  
    
  });

export default router;
