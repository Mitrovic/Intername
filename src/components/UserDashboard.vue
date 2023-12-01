<template>
  <Layout>
    <v-container>
      <div v-if="books.length > 0">
        <h2>
          {{$store.state.authToken ? ' Your Books:' : 'All books' }}
         </h2>
        <v-text-field label="Search by Title" @input="fetchBooks"></v-text-field>
          <div v-for="book in books" :key="book.id" class="book-wrapper">
            <div class="title">{{ book.title }}</div>
            <div class="button-wrapper">
              <v-btn @click="viewBook(book.id)" class="mx-2" color="primary">View</v-btn>
              <v-btn v-if="$store.state.authToken" @click="editBook(book.id)" class="mx-2" color="success">Edit</v-btn>
              <v-btn v-if="$store.state.authToken" @click="togglePublishStatus(book.id)" class="mx-2" color="red">
                {{ book.publish ? 'Unpublish' : 'Publish' }}
              </v-btn>
            </div>
          </div>
      </div>
      <div v-else>
        <p>No books available.</p>
      </div>
    </v-container>
  </Layout>
</template>
<script>
import axios from 'axios'
import Layout from "@/components/ThemeLayout.vue";
export default {
  components: {Layout},
  data() {
    return {
      books: [],
    };
  },
  mounted() {
    // Fetch user's books from the API
    this.fetchBooks();
  },
  methods: {
    fetchBooks(query = null) {
      // Determine the API route based on the presence of a query
      const apiRoute = query
          ? `/api/books?query=${query}`
          : this.$store.state.authToken
              ? '/api/user/books'
              : '/api/books';

      // Make an API request to get books
      axios.get(apiRoute, {
        headers: this.$store.state.authToken ? { Authorization: `Bearer ${this.$store.state.authToken}` } : {},
      })
          .then(response => {
            this.books = response.data.data;
          })
          .catch(error => {
            console.error(error);
          });
    },
    viewBook(bookId) {
      // Navigate to the BookView component
      this.$router.push({ name: 'book-view', params: { id: bookId } });
    },
    editBook(bookId) {
      // Navigate to the BookEdit component
      this.$router.push({ name: 'book-edit', params: { id: bookId } });
    },
    logout() {
      // Implement logout
      this.$store.commit('clearAuthToken');
      this.$router.replace({ name: "login" });
    },
    togglePublishStatus(bookId) {
      // Make an API request to update the publish status
      axios.put(`/api/user/books/publish/${bookId}`, {}, {
        headers: { Authorization: `Bearer ${this.$store.state.authToken}` },
      })
          .then(response => {
            const updatedBook = response.data;

            const index = this.books.findIndex((b) => b.id === bookId);

            this.books[index].publish = updatedBook.publish;
          })
          .catch(error => {
            console.error('Error updating publish status:', error);
          });
    },
  },
}
</script>
<style scoped>
.book-wrapper {
  border-bottom: 1px solid #ccc; /* Border color for the bottom line */
  padding-bottom: 10px; /* Adjust as needed for spacing */
  display: flex;
}

.book-content {
  display: flex;
  align-items: stretch; /* Make child elements stretch to the same height */
  justify-content: space-between; /* Space between title and button-wrapper */
}

.title {
  flex-grow: 1; /* Allow the title to grow and take available space */
  padding-bottom: 5px; /* Adjust as needed for spacing */
  margin-bottom: 5px; /* Adjust as needed for spacing */
}

.button-wrapper {
  display: flex;
  align-items: flex-end; /* Align buttons to the bottom */
}
</style>