import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  // Get the book data based on book id
  useEffect(() => {
    api.get(`/books/${id}`)
      .then(response => {
        setBook(response.data);
      })
      .catch(error => {
        console.error("Error fetching book details:", error);
      });
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Book Detail</h2>
      <h3>{book.title}</h3>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Description:</strong> {book.description}</p>
      <p><strong>Status:</strong> {book.status}</p>
      <Link to={`/edit/${book._id}`} className="btn btn-secondary">
        Edit
      </Link>
      <Link to="/books" className="btn btn-primary ms-2">
        Back to List
      </Link>
    </div>
  );
};

export default BookDetail;
