<template>
  <v-app >
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <form ref="form" @submit.prevent="login()">
                  <v-text-field
                      v-model="email"
                      name="email"
                      label="Email"
                      type="text"
                      placeholder="email"
                      required
                  ></v-text-field>

                  <v-text-field
                      v-model="password"
                      name="password"
                      label="Password"
                      type="password"
                      placeholder="password"
                      required
                  ></v-text-field>
                  <v-btn type="submit" class="mt-4" color="primary" value="log in">Login</v-btn>
                </form>
              </v-card-text>
            </v-card>

          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'
export default {
  name: "UserLogin",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      const { email, password } = this;

      // Make a POST request to your Laravel API for authentication
      axios.post('api/authenticate', {
        email: email,
        password: password,
      })
          .then(response => {
            // Handle the successful authentication response
            console.log(response.data);
            this.$store.commit('setAuthToken', response.data.access_token);
            this.fetchUserData();
            this.$router.replace({ name: "dashboard", params: { email: email } });
          })
          .catch(error => {
            // Handle authentication error
            console.error(error);
          });
    },
    fetchUserData() {
      // Make an API request to fetch user data
      // Replace 'your_laravel_api_user_endpoint' with the actual endpoint in your Laravel API
      axios.get('/api/me', {
            headers: {
              Authorization: `Bearer ${this.$store.state.authToken}`,
            },
          })
          .then(response => {
            // Store user data in Vuex
            this.$store.commit('setUser', response.data);
          })
          .catch(error => {
            console.error(error);
          });
    },
  },
};
</script>