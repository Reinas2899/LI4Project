<template>
  <v-app>
    <Header/>
    <v-container fill-height fluid>
      <v-row no-gutters>
        <!--esquerda-->
        <v-col cols="12" md="6">
          <v-card
            color="transparent"
            height="68vh"
            tile
            flat
            class="text-center"
            style="top: 20%"
          >
            <v-img
              :src="require('../assets/' + restaurante.photo + '.png')"
              height="50vh"
              width="50vh"
              class="mx-auto"
            >
              <v-overlay color="#E2B887" opacity=".4" absolute></v-overlay
            ></v-img>
            <v-card-text class="username-prop pt-6">{{ name }}</v-card-text>
            <v-btn to="/detalhes" class="text-none" text>Editar perfil</v-btn>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card-text class="res-prop ml-3"
            >Restaurantes visitados</v-card-text
          >

          <v-divider class="mr-7" />
          <v-card class="drawer-prop ma-3" tile flat>
            <v-list>
              <v-list-item v-for="rest in restaurants" :key="rest.id_user" class="mb-5" @click="goToRestaurant(rest)">
                <v-btn height="15vh" width="45vw" depressed>
                  <!--Photo-->
                  <v-avatar size="15vh" tile color="#d3d3d3" class="photo-prop">
                    <v-img
                      :src="require('../assets/' + restaurante.photo + '.png')"
                    />
                  </v-avatar>
                  

                  <!--Informação do restaurante-->
                  <v-card color="transparent" flat class="ml-4">
                    <v-card-text class="name-prop text-left">
                      {{rest.name}}
                    </v-card-text>
                    <v-card-text class="inf-prop mt-n9 text-left">
                      {{rest.address}}
                      </v-card-text>
                    <v-card-text class="inf-prop mt-n9 text-left">
                      {{rest.mobile}}</v-card-text>
                    <v-card-text class="inf-prop mt-n9 text-left">
                      {{rest.price_level}}
                      </v-card-text>
                  </v-card>
                </v-btn>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
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
  data() {
    return {
      restaurante: {
        photo: "signIn",
        name: "restaurante",
        adress: "Rua 1, nº123, Braga",
        time: "Aberto ate 00:00",
        cost: "€€",
      },
      restaurants: [],
      name: "",
      id_user: 0
    };
  },

  created(){
        if(this.$route.params.user.id_user!=null){
          this.id_user = this.$route.params.user.id_user.toString()
          this.name = this.$route.params.user.name
        }
        console.log(this.id_user)
        axios.get('http://localhost:8001/visited', {headers: {id_user: this.id_user}})
              .then(res => {
                console.log(res)
                this.restaurants = res.data
                
        })
        
    },
    methods: {
      goToRestaurant(resti){

      let rest = {
        rest: resti,
        id_user: this.id_user
      }

        this.$router.push({
          name: "Restaurante", 
          params: { rest }
        });
      }
    }
};

</script>

<style scoped>
#app {
  background-color: white;
  height: "50vh";
}
.drawer-prop {
  height: 76vh;
  overflow-y: hidden;
  scroll-behavior: smooth;
  width: 50vw;
}
.drawer-prop:hover {
  overflow-y: auto;
}
.drawer-prop v-card {
  padding-right: 16px;
}
.drawer-prop:hover v-card {
  padding-right: 0px;
}
.photo-prop {
  position: absolute;
  left: 0px;
}
.name-prop {
  font-size: 2.3vh;
  font-weight: 500;
  color: #00302e !important;
}
.inf-prop {
  font-size: 1.7vh;
  font-weight: 400;
  color: #00302e !important;
}
.username-prop {
  font-size: 6vh;
  color: #00302e !important;
}
.res-prop {
  font-size: 4vh;
  color: #00302e !important;
}
</style>