<template>
  <Layout>
    <template v-slot:header>
      <v-app-bar app dark color="primary">
        <v-toolbar-title>Edit Book</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-app-bar>
    </template>
  <v-container>
    <v-row>
      <v-col>
        <h2>Edit Book</h2>
        <v-card>
          <v-card-text>
            <v-form @submit.prevent="editBook" enctype="multipart/form-data">
              <v-text-field v-model="book.title" label="Title"></v-text-field>
              <v-text-field v-model="book.description" label="Description"></v-text-field>
              <img v-if="book.cover_image" :src="book.cover_image" alt="Image Preview" style="max-width: 100%; max-height: 100%;">
              <v-file-input ref="imageFileInput" v-model="book.imageFile" label="Upload Image" @change="handleImageUpload"></v-file-input>
              <v-text-field v-model="book.price" label="Price"></v-text-field>
              <div class="buttons">
                <v-btn type="submit" color="primary">Update Changes</v-btn>
                <v-btn @click="deleteBook" color="error">Delete Book</v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  </Layout>
</template>

<script>
import axios from 'axios';
import Layout from "@/components/ThemeLayout.vue";
export default {
  name: 'BookEdit',
  components: {Layout},
  data() {
    return {
      book: {},
      imageFile: null
    };
  },
  mounted() {
    // Fetch book details from the API based on route parameter
    this.fetchBookDetails();
  },
  methods: {
    fetchBookDetails() {
      // Extract book ID from route parameter
      const bookId = this.$route.params.id;

      // Make an API request to get book details
      // Replace 'your_laravel_api_books_endpoint' with the actual endpoint in your Laravel API
      axios.get(`/api/books/${bookId}`)
          .then(response => {
            this.book = response.data;
          })
          .catch(error => {
            console.error(error);
          });
    },
    editBook() {
      // Make an API request to update the book details
      axios.post(`/api/user/books/${this.book.id}`, this.book, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${this.$store.state.authToken}`,
        },
      })
          .then(() => {
            // Handle successful update, e.g., redirect to book details page
            this.$router.push({ name: 'book-view', params: { id: this.book.id } });
          })
          .catch(error => {
            console.error(error);
          });
    },
    handleImageUpload() {
      // Assuming you want to preview the uploaded image
    /*  const reader = new FileReader();
      reader.onload = (event) => {
        this.imageFile = event.target.result;
      };
      reader.readAsDataURL(this.imageFile);*/
    },
    deleteBook() {
      if (confirm('Are you sure you want to delete this book?')) {
        // Make an API request to delete the book
        axios.delete(`/api/user/books/${this.book.id}`, {
          headers: {
            Authorization: `Bearer ${this.$store.state.authToken}`,
          },
        })
            .then(() => {
              // Handle successful deletion, e.g., redirect to book list page
              this.$router.push({ name: 'dashboard' });
            })
            .catch(error => {
              console.error(error);
            });
      }
    }
  },
};
</script>
<style>
.buttons{
  display: flex;
  justify-content: space-between;
}
</style>