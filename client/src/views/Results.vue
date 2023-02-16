<template>
  <v-app>
    <Header />
    <v-container class="fill-height" fluid>
      <v-row no-gutters>
        <v-col cols="3">
          <!--Resultados dos restaurantes-->
          <v-card class="drawer-prop ma-n3" tile>
            <v-list>
              <v-list-item v-for="rest in restaurants" :key="rest.id" class="mb-5" @click="goToRestaurant(rest)">
                <v-btn height="15vh" width="25vw" depressed>
                  <!--Photo-->
                  <!--Informação do restaurante-->
                  <v-card color="transparent" flat width="25vw">
                    <v-card-text class="name-prop text-left">
                      {{rest.name}}
                    </v-card-text>
                    <v-card-text class="inf-prop mt-n5 text-left">
                      {{rest.address}}
                    </v-card-text>
                    <v-card-text class="inf-prop mt-n5 text-left">
                      {{rest.mobile}}
                      </v-card-text>
                    <v-card-text class="inf-prop mt-n5 text-left">
                      {{rest.price_level}}
                    </v-card-text>
                  </v-card>
                </v-btn>
              </v-list-item>
            </v-list>
          </v-card>
          <!--Fim de resultados-->
        </v-col>
        <v-col cols="12" md="9">
          <gmap-map :center="mapCenter" :zoom="14" style="width:1390px; height:730px; margin: 10px auto">
              <gmap-info-window :options="infoWindowOptions" :position="infoWindowPosition" :opened="infoWindowOpened" @closeclick="handleInfoWindowClose">
                  <div class="info-window">
                      <h2 v-text="activeRestaurant.name"/>
                      <p v-text="activeRestaurant.address"/>
                      <p v-text="activeRestaurant.mobile"/>
                      <p> Restaurante - {{activeRestaurant.price_level}} </p>
                      <p> {{activeRestaurant.description}}</p>
                      
                  </div>
              </gmap-info-window>
              <gmap-marker v-for="r in restaurants" :key="r.id" :position="getPosition(r)" :clickable="true" :draggable="false" @click="handleMarkerClicked(r)">

              </gmap-marker>
          </gmap-map>

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
    Header
  },
  data: function () {
    return {
      /*Teste*/
      drawer: null,
      photo: "signIn",
      restaurants: [],
      infoWindowOptions: {
        pixelOffset: {
          width: 10,
          height: -35
        }
      },
      activeRestaurant: {},
      infoWindowOpened: false,
      typePesquisa: '',
      radius: 0,
      tempLat: 0,
      tempLng: 0,
      id_user: 0
    };
  },

  created(){
          if(this.$route.params.finalRestaurants!=null){
            this.restaurants = this.$route.params.finalRestaurants
          }

          axios.get('http://localhost:8001/user', {headers: {token: localStorage.getItem('token')}})
            .then(res => {
                this.id_user = res.data.id_user
          },(error) =>{
                console.log(error);
          }); 

          console.log(this.id_user)
          

  },

  methods: {
      getPosition(r){
          return {
            lat: parseFloat(r.latitude),
            lng: parseFloat(r.longitude)
          }
      },
      handleMarkerClicked(r){
        this.activeRestaurant = r
        this.infoWindowOpened = true
      },
      handleInfoWindowClose(){
        this.activeRestaurant = {}
        this.infoWindowOpened = false
      },
      goToRestaurant(resti){
        console.log(this.id_user)
        let rest = {
          rest: resti,
          id_user: this.id_user
        }
        this.$router.push({
          name: "Restaurante", 
          params: { rest }
        });
      }
  },
  computed: {
      mapCenter(){
        if(this.typePesquisa === 'local'){
            return {
                lat: 38.71770883641866,
                lng: -9.151242248243376
            }
        }

        if(this.typePesquisa === 'notLocal'){
            return {
                lat: this.tempLat,
                lng: this.tempLng
            }
        }
          if(!this.restaurants.length){
              return {
                lat: 38.7436883,
                lng: -9.1952226
              }
          }
          return{
            lat: parseFloat(this.restaurants[0].latitude),
            lng: parseFloat(this.restaurants[0].longitude)
          }
      },
      infoWindowPosition() {
        return{
            lat: parseFloat(this.activeRestaurant.latitude),
            lng: parseFloat(this.activeRestaurant.longitude)
          }
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
  height: 90vh;
  overflow-y: hidden;
  scroll-behavior: smooth;
  width: 27vw;
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
  text-align: left;
  color: #002423 !important;
}
.inf-prop {
  font-size: 1.7vh;
  font-weight: 400;
  color: #002423 !important;
}
</style>