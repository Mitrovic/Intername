<!-- Layout.vue -->
<template>
  <v-app>
    <v-container fluid fill-height>
      <v-layout>
        <v-flex>
          <!-- Header -->
          <v-app-bar app dark color="primary">
            <router-link to="/">
              <v-btn text>
                <v-toolbar-title>HOME</v-toolbar-title>
              </v-btn>
            </router-link>
            <v-spacer></v-spacer>
            <v-btn v-if="$store.state.authToken" icon @click="logout">
              <v-icon>mdi-logout</v-icon>
            </v-btn>
            <div v-else>
              <router-link to="/login">
                <v-btn text>
                  <v-toolbar-title>Login ></v-toolbar-title>
                </v-btn>
              </router-link>
            </div>
          </v-app-bar>

          <!-- Main Content Slot -->
          <div class="main-content">
            <slot></slot>
          </div>

          <!-- Footer -->
          <v-footer app>
            <v-spacer></v-spacer>
            <v-row>
              <v-col>
               © 2023 Intername Book App
              </v-col>
            </v-row>
          </v-footer>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'ThemeLayout',
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  data() {
    return {
      books: [],
    };
  },
  methods: {
    logout() {
      // Implement logout
      this.$store.commit('clearAuthToken');
      this.$store.commit('clearUser');
      this.$router.replace({ name: "login" });
    },
  },
}
</script>

<style scoped>
  .main-content {
    padding: 50px;
  }
</style>
