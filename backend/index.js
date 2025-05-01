const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('./models/Book');

dotenv.config();

const init = async () => {
  const server = Hapi.server({
    port: 4000,
    host: '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'], // Allow all for dev
      },
    },
  });

  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected');

  server.route([
    {
      method: 'GET',
      path: '/books',
      handler: async () => await Book.find()
    },
    {
      method: 'GET',
      path: '/books/{id}',
      handler: async (request) => await Book.findById(request.params.id)
    },
    {
      method: 'POST',
      path: '/books',
      handler: async (request) => {
        const book = new Book(request.payload);
        return await book.save();
      }
    },
    {
      method: 'PUT',
      path: '/books/{id}',
      handler: async (request) => {
        try {
          const updatedBook = await Book.findByIdAndUpdate(request.params.id, request.payload, { new: true });
          if (!updatedBook) {
            return { message: 'Book not found' };  // Handle the case when book does not exist
          }
          return updatedBook;  // Return the updated book
        } catch (error) {
          console.error('Error updating book:', error);
          return { message: 'Error updating book' };
        }
      }
    },
    {
      method: 'DELETE',
      path: '/books/{id}',
      handler: async (request) => {
        return await Book.findByIdAndDelete(request.params.id);
      }
    }
  ]);

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

init();
