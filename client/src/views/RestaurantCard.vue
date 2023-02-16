<template>
  <v-app>
    <Header />
    <v-container fill-height fluid>
      <v-row justify="center" align="center">
        <v-card height="60vh" width="60vw" flat class="text-center">
          <v-img height="10vh" />
          <h1>{{ res.name }}</h1>
          <v-row justify="center" align="center" no-gutters>
            <v-col col="6">
              <v-card
                width="15vw"
                class="text-left ml-10"
                style="
                  color: '00302e';
                  font-size: 3vh;
                  font-weight: 500;
                  left: 30%;
                "
                flat
              >
                <div>Número de telefone:</div>
                <div>Endereço:</div>
                <div>Preço:</div>
                <div>Comer no Local:</div>
                <div>Takeaway:</div>
                <div>Entrega:</div>
              </v-card>
            </v-col>
            <v-col col="6">
              <v-card
                width="20vw"
                class="text-left"
                style="color: '00302e'; font-size: 3vh; font-weight: 300"
                flat
              >
                <div>{{ res.mobile }}</div>
                <div>{{ res.address }}</div>
                <div>{{ cost[res.price] }}</div>

                <div>
                  <v-icon v-if="res.dine_in">mdi-check</v-icon>

                  <v-icon v-else> mdi-close </v-icon>
                </div>
                <div>
                  <v-icon v-if="res.takeaway">mdi-check</v-icon>
                  <v-icon v-else>mdi-close </v-icon>
                </div>
                <div>
                  <v-icon v-if="res.delivery">mdi-check</v-icon>
                  <v-icon v-else>mdi-close </v-icon>
                </div>
              </v-card>
              </v-col
            >
          </v-row>
          <div class="mt-16" style="font-size:2.5vh">{{ res.description }}</div>
          <span class="ex mt-16">{{showError}}</span>
        </v-card>
        <v-btn
          height="7vh"
          width="60vw"
          class="text-none"
          color="#00302e"
          style="color: white"
          @click="submit"
        >
          <h2>Marcar como visitado</h2>
        </v-btn>
      </v-row>
      <!-- Janela de Mudança Bem-Sucedida -->
        <v-dialog v-model="showConfirm" max-width="500px">
                <v-card>
                <v-app-bar color="#00302e" >
                <div class="d-flex align-center">
                        <h3 width="40" class="white--text"> Marcar Visitado</h3>
                </div>
                </v-app-bar>
                <v-container>
                <v-row>
                        <v-col cols="3">
                        <v-card class="ml-4 mt-1" color="white" flat height="100px" width="110px" >
                        <v-img src="@/assets/check.png"/>
                        </v-card>
                        </v-col>
                        <v-col cols="9">
                        <h3 class="ml-5 mt-5">Restaurante marcado como visitado!</h3>
                        </v-col>
                </v-row>
                </v-container>
                <v-card-actions>
                <v-container>
                        <v-row >
                        <v-col class="text-right">
                        <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">   
                                <v-btn v-bind="attrs" v-on="on" color="#ebd9c6" @click="closeConfirmSubmit" elevation="5" class="mt-5">
                                        <v-icon>mdi-door-open</v-icon>
                                </v-btn>                     
                                </template>
                                <span>Ok</span>
                        </v-tooltip>
                        </v-col>
                        </v-row>
                </v-container>
                </v-card-actions>
                </v-card>
        </v-dialog>    
    </v-container>

    <Footer />
  </v-app>
</template>



<script>
import axios from "axios";
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
export default {
  components: {
    Footer,
    Header,
  },
  data: function () {
    return {
      cost: ["€", "€€", "€€€"],
      res: {},
      showConfirm: false,
      showError: '',
      id: 0
    };
  },
  created(){
        if(this.$route.params.rest!=null){
                this.res = this.$route.params.rest.rest
                this.id_user = this.$route.params.rest.id_user
        }
  },
  methods: {
        submit(){
                let visited = {
                        id_user: this.id_user,
                        id_restaurant: this.res.id_restaurant,
                        date: new Date().toLocaleString(),
                }
                
                axios.post(`http://localhost:8001/visited`, visited)
                        .then((response) => {
                                console.log(response);
                                this.showConfirm = true
                                this.showError = ''
                        },(error) => {
                                console.log(error);
                                this.showError = 'Restaurante já foi marcado como visitado'
                        }
                );
        },
        closeConfirmSubmit(){
                this.showConfirm = false
        }
  }
};
</script>

<style scoped>
#app {
  background-color: white;
  background-image: url("../assets/signIn.png");
  background-size: cover;
  height: "50vh";
}

.ex {
  color: rgb(255, 17, 0);
}
</style>