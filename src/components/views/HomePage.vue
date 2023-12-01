<template>
  <div class="book-list">
    <h1>Book List</h1>

    <table class="book-table">
      <thead>
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Author</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="book in books" :key="book.id">
        <td>{{ book.id }}</td>
        <td>{{ book.title }}</td>
        <td>{{ book.author }}</td>
        <td>
          <button class="action-btn view-btn" @click="viewBook(book.id)">View</button>
          <button class="action-btn edit-btn" @click="editBook(book.id)">Edit</button>
          <button class="action-btn delete-btn" @click="deleteBook(book.id)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      books: [],
    };
  },
  mounted() {
    this.fetchBooks();
  },
  methods: {
    fetchBooks() {
      this.$http.get("/api/books")
          .then(response => {
            this.books = response.data;
          })
          .catch(error => {
            console.error('Error fetching books:', error);
          });
    },
    viewBook(bookId) {
      // Implement your view logic, e.g., navigate to a new route
      console.log(`View book with ID ${bookId}`);
    },
    editBook(bookId) {
      // Implement your edit logic, e.g., navigate to an edit route
      console.log(`Edit book with ID ${bookId}`);
    },
    deleteBook(bookId) {
      // Implement your delete logic, e.g., show a confirmation dialog
      console.log(`Delete book with ID ${bookId}`);
    },
  },
};
</script>

<style>
.book-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.book-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.book-table th, .book-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

.book-table th {
  background-color: #f2f2f2;
}

.action-btn {
  padding: 8px 12px;
  margin: 4px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  font-size: 14px;
}

.view-btn {
  background-color: #4caf50;
  color: #fff;
}

.edit-btn {
  background-color: #2196f3;
  color: #fff;
}

.delete-btn {
  background-color: #f44336;
  color: #fff;
}
/* Your component styles go here */
</style>
