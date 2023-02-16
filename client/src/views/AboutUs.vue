<template>
  <v-app>
    <Header />
    <v-container fill-height fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" md="3" v-for="member in members" :key="member">
        </v-col>
      </v-row>
    </v-container>

    <Footer />
  </v-app>
</template>



<script>
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
export default {
  components: {
    Footer,
    Header,
  },
  data: function () {
    return {};
  },
};
</script>

<style scoped>
#app {
  background-color: white;
  height: "50vh";
}
</style>