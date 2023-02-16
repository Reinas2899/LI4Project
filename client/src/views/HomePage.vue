<template>
  <v-app>
    <Header />
    <v-container fill-height fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" md="5" v-for="k in 2" :key="k">
          <!--Image-->
          <v-img
            v-if="k == 2"
            max-height="350"
            max-width="350"
            class="mx-auto mt-n15"
            src="../assets/foodImageMain.png"
            
          ></v-img>

          <!--Text-->
          <v-card
            v-else
            color="transparent"
            class="text-left mt-n15 ml-10"
            elevation="0"
          >
            <v-card-text class="text-prop" style="font-size: 64px"
              >Um
              <span style="color: #e4c5a3">restaurante</span>
            </v-card-text>
            <v-card-text class="text-prop" style="font-size: 64px"
              >espera por ti!
            </v-card-text>
            <v-btn
                to="/escolha"
                color="#e4c5a3"
                class="text-none mt-7 ml-4"
                outlined
              >
                <v-card-text class="text-prop text-op" style="font-size: 18px"
                  >Clica aqui para começar a pesquisar!
                </v-card-text></v-btn
              >
          </v-card>
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
};
</script>

<style scoped>
#app {
  background-color: #00302e;
  height: "50vh";
}

.text-prop {
  color: white !important;
}

.text-op {
  opacity: 0.73 !important;
}
</style>
