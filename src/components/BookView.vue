<template>
  <Layout>
  <v-container>
    <v-row>
      <v-col>
        <h2>Book Details</h2>
        <v-card>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Title: {{ book.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Description: {{ book.description }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <img :src="book.cover_image" alt="Book Cover" style="max-width: 100%; max-height: 100%;">
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Price: {{ book.price }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <!-- Add more details as needed -->
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  </Layout>
</template>

<script>
import Layout from './ThemeLayout.vue';
import axios from 'axios';

export default {
  name: 'BookView',
  components: {
    Layout,
  },
  data() {
    return {
      book: {},
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
  },
};
</script>
