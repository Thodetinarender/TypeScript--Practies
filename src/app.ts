import express from 'express';
import bodyParser from 'body-parser';
import todosRoutes from './routes/todos';

const app = express();

app.use(bodyParser.json());

app.use('/todos', todosRoutes);

app.listen({port:3000}, ()=>{
    console.log('Server is running on http://localhost:3000');
});