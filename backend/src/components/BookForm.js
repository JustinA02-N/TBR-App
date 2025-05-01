import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, TextField, MenuItem, Grid, Paper, Typography } from '@mui/material';
import axios from '../api/axios';


const BookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '',
    author: '',
    description: '',
    status: 'To Read',
  });

  useEffect(() => {
    if (id) {
      // Get book data by book id
      axios.get(`/books/${id}`)
        .then(response => {
          setBook(response.data);
        })
        .catch(error => {
          console.error('Error fetching book data', error);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      // Update book by editing book
      axios.put(`/books/${id}`, book)
        .then(response => {
          console.log('Book updated:', response.data);
          navigate('/books');
        })
        .catch(error => {
          console.error('Error updating book:', error);
        });
    } else {
      // Create new book by adding book
      axios.post('/books', book)
        .then(response => {
          console.log('Book added:', response.data);
          navigate('/books');
        })
        .catch(error => {
          console.error('Error adding book:', error);
        });
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>{id ? 'Edit Book' : 'Add New Book'}</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              fullWidth
              value={book.title}
              onChange={(e) => setBook({ ...book, title: e.target.value })}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Author"
              fullWidth
              value={book.author}
              onChange={(e) => setBook({ ...book, author: e.target.value })}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={book.description}
              onChange={(e) => setBook({ ...book, description: e.target.value })}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Status"
              select
              fullWidth
              value={book.status}
              onChange={(e) => setBook({ ...book, status: e.target.value })}
            >
              <MenuItem value="To Read">To Read</MenuItem>
              <MenuItem value="Reading">Reading</MenuItem>
              <MenuItem value="Finished">Finished</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              {id ? 'Save Changes' : 'Add Book'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default BookForm;
