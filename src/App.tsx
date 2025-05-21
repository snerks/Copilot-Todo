import { useState } from 'react'
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, IconButton, Checkbox, Paper, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import './App.css'

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim() === '') return;
    setTodos([
      ...todos,
      { id: Date.now(), text: input.trim(), completed: false }
    ]);
    setInput('');
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Todo List
        </Typography>
        <Box display="flex" gap={1} mb={2}>
          <TextField
            fullWidth
            variant="outlined"
            label="Add a new todo"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTodo()}
            size="small"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={addTodo}
            startIcon={<AddIcon />}
            sx={{ minWidth: 0, px: 2 }}
          >
            Add
          </Button>
        </Box>
        <List>
          {todos.map(todo => (
            <ListItem
              key={todo.id}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => removeTodo(todo.id)}>
                  <DeleteIcon />
                </IconButton>
              }
              disablePadding
            >
              <Checkbox
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                edge="start"
                tabIndex={-1}
                disableRipple
                color="primary"
              />
              <ListItemText
                primary={todo.text}
                sx={{ textDecoration: todo.completed ? 'line-through' : 'none', color: todo.completed ? 'text.secondary' : 'text.primary' }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default App
