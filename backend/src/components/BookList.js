import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { Button, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    api.get('/books')
      .then(res => setBooks(res.data))
      .catch(err => console.error('Error loading books:', err));
  }, []);

  return (
    <div>
      <Paper elevation={3} sx={{ padding: 3, maxWidth: 800, margin: 'auto' }}>
        <h2>Book List</h2>
        <List>
          {books.map((book) => (
            <div key={book._id}>
              <ListItem>
                <ListItemText
                  primary={book.title}
                  secondary={`By ${book.author}`}
                />
                <div>
                  <Link to={`/books/${book._id}`}>
                    <Button variant="outlined" color="primary" sx={{ marginRight: 1 }}>
                      View Details
                    </Button>
                  </Link>
                  <Link to={`/edit/${book._id}`}>
                    <Button variant="outlined" color="secondary">
                      Edit
                    </Button>
                  </Link>
                </div>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
        <Link to="/add">
          <Button variant="contained" color="success" startIcon={<AddCircleOutline />} sx={{ marginTop: 2 }}>
            Add New Book
          </Button>
        </Link>
      </Paper>
    </div>
  );
};

export default BookList;
