import { useState } from 'react'
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, IconButton, Checkbox, Paper, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import './App.css'
import { createTheme, ThemeProvider, CssBaseline, useMediaQuery, Switch, FormControlLabel, AppBar, Toolbar } from '@mui/material';
import { useMemo } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkMode, setDarkMode] = useState(prefersDarkMode);

  const theme = useMemo(() => createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      ...(darkMode
        ? {
          background: { default: '#181a20', paper: '#23272f' },
          primary: { main: '#90caf9' },
          secondary: { main: '#f48fb1' },
        }
        : {
          background: { default: '#f5f5f5', paper: '#fff' },
          primary: { main: '#1976d2' },
          secondary: { main: '#9c27b0' },
        }),
    },
  }), [darkMode]);

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="fixed" color="default" elevation={1} sx={{ width: '100%', top: 0, left: 0, mb: 4 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" color="inherit" noWrap>
            Todo List App
          </Typography>
          <FormControlLabel
            control={<Switch checked={darkMode} onChange={() => setDarkMode(v => !v)} color="primary" />}
            label={darkMode ? 'Dark Mode' : 'Light Mode'}
            sx={{ ml: 2 }}
          />
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ mt: 12 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          {/* <Typography variant="h4" align="center" gutterBottom>
            Todo List
          </Typography> */}
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
                  primary={<span data-testid="todo-text" style={{ textDecoration: todo.completed ? 'line-through' : 'none', color: todo.completed ? '#888' : 'inherit' }}>{todo.text}</span>}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App
