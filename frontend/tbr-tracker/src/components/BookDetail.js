import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button, Typography, Paper, Box } from '@mui/material';
import api from '../api/axios';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  // Fetch the book data
  useEffect(() => {
    api.get(`/books/${id}`)
      .then(response => {
        setBook(response.data);
      })
      .catch(error => {
        console.error("Error fetching book details:", error);
      });
  }, [id]);

  const handleDelete = () => {
    api.delete(`/books/${id}`)
      .then(() => {
        navigate('/books');
      })
      .catch(error => {
        console.error('Error deleting book:', error);
      });
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ padding: 3, maxWidth: 800, margin: 'auto' }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>{book.title}</Typography>
        <Typography variant="h6" gutterBottom>
          <strong>Author:</strong> {book.author}
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Description:</strong> {book.description}
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Status:</strong> {book.status}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
          <Link to={`/edit/${book._id}`} style={{ textDecoration: 'none' }}>
            <Button variant="outlined" color="secondary">
              Edit
            </Button>
          </Link>
          <Button variant="outlined" color="error" onClick={handleDelete}>
            Delete
          </Button>
          <Link to="/books" style={{ textDecoration: 'none' }}>
            <Button variant="outlined" color="primary">
              Back to List
            </Button>
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default BookDetail;
