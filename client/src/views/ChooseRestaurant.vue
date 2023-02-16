<template>
  <v-app>
    <Header />
    <v-container fill-height fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" md="4" v-for="k in 2" :key="k" >
          <!--Choose in Map button-->
          <v-card
            v-if="k == 1"
            flat
            class="btn-prop mt-n15 text-center"
            
            rounded="lg"
            color="#e1e1e1"
            
            v-ripple="false"
            
          >

            <v-div v-if="active" fill-height d-flex align-center justify-center>
              <v-img
                class="mx-auto small-img-prop"
                src="../assets/map.png"
              ></v-img>
              <v-card-text class="text-prop mt-10" style="font-size: 3vh"
                >Escolher localização no mapa
              </v-card-text>
              <v-form v-model="valid">
                <v-container>
                  <v-row justify="center" width="50vh">
                    <v-col cols="12" md="6">
                      <v-select
                        v-model="location"
                        label="Localização"
                        color="#00302e"
                        :items="concelhos"
                        item-text="name"
                        class="mt-10"
                        solo
                        :rules="rules.required"
                    /></v-col>

                    <v-col cols="12" md="3">
                      <v-text-field
                        v-model="radius"
                        label="Raio"
                        color="#00302e"
                        type="number"
                        solo
                        class="mt-10"
                        suffix="Km"
                        :rules="rules.required"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
              <v-btn
                color="#00302e"
                width="46vh"
                height="7vh"
                @click="pesquisar"
                ><v-card-text class="search-prop"
                  >Pesquisar
                </v-card-text></v-btn
              >
            </v-div>
          </v-card>
          <!--Choose Here button-->

          <v-card
            v-else
            rounded="lg"
            flat
            color="#e1e1e1"
            class="mt-n15 btn-prop text-center"
          >
            <v-img class="mx-auto img-prop" src="../assets/map-pin.png"></v-img>
            <v-card-text class="text-prop mt-10" style="font-size: 3vh"
              >Utilizar localização atual
            </v-card-text>
            <v-form v-model="valid">
                <v-container>
                  <v-row justify="center" width="50vh">
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="radiusLocal"
                        label="Raio"
                        color="#00302e"
                        type="number"
                        solo
                        class="mt-10"
                        suffix="Km"
                        :rules="rules.required"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            <v-btn
                color="#00302e"
                width="46vh"
                height="7vh"
                @click="pesqLocal"
                ><v-card-text class="search-prop"
                  >Pesquisar
                </v-card-text></v-btn>
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
import * as geolib from 'geolib';
export default {
  components: {
    Footer,
    Header,
  },
  data() {
    return {
      active: true,
      valid: false,
      radius: 0,
      radiusLocal: 0,
      local: 'local',
      notLocal: 'notLocal',
      concelhos: [{name:'Ajuda', latitude: 38.71039412005384, longitude: -9.200427339321811}, {name:'Alcântara', latitude: 38.70601308630938, longitude: -9.182757243524021}, 
                  {name:'Areeiro', latitude: 38.74475352481073, longitude: -9.134389594487757}, {name:'Arroios', latitude: 38.73349360214666, longitude: -9.13444248550311},
                  {name:'Avenidas Novas', latitude: 38.74133193296114, longitude: -9.146505694122883}, {name:'Beato', latitude: 38.7349488496629, longitude: -9.105905830005277},
                  {name:'Belém', latitude: 38.69965962878386, longitude: -9.220308187361322}, {name:'Benfica', latitude: 38.75101013650626, longitude: -9.202554314659057},
                  {name:'Campo de Ourique', latitude: 38.72130562241478, longitude: -9.16725502615812}, {name:'Campolide', latitude: 38.73816468524725, longitude: -9.163774036496418},
                  {name:'Carnide', latitude: 38.75722942353298, longitude: -9.191245068634741}, {name:'Estrela', latitude: 38.70369740311072, longitude: -9.168109391363949},
                  {name:'Lumiar', latitude: 38.7751592385185, longitude: -9.162491961787628}, {name:'Marvila', latitude: 38.740463726645004, longitude: -9.107409030003428},
                  {name:'Misericórdia', latitude: 38.71178358837767, longitude: -9.142923802556906}, {name:'Olivais', latitude: 38.76752063605735, longitude: -9.10446139926655},
                  {name:'Parque das Nações', latitude: 38.768596522090775, longitude: -9.095978404891312}, {name:'Penha de França', latitude: 38.725906528212604, longitude: -9.12756492273621},
                  {name:'Santa Clara', latitude: 38.786551533899775, longitude: -9.142206482781559}, {name:'Santa Maria Maior', latitude: 38.71175130131151, longitude: -9.13579203551215},
                  {name:'Santo António', latitude: 38.7232928498108, longitude: -9.148265194050834}, {name:'São Domingos de Benfica', latitude: 38.7500098463503, longitude: -9.168443401044435},
                  {name:'São Vicente', latitude: 38.71981354985076, longitude: -9.129689948856681 }, {name:'Alvalade', latitude: 38.754747629475176, longitude: -9.144247845339553}
      ],
      location: '',
      rules: {
            required: [(v) => !!v || "Field is required"],
      },
      restaurants: []
    };
  },
  created(){
    axios.get(`http://localhost:8001/restaurante`)
      .then((response)=>{
        this.restaurants=response.data
      },(error) =>{
          console.log(error);
    }); 
  },

  methods: {
    onClickOutside() {
      this.active = false;
    },
    pesquisar(){

        let data = {
            latitude: 0,
            longitude: 0
        }
        let finalRestaurants = []

        this.concelhos.forEach((obj)=>{
            if(obj.name === this.location){
              data.latitude = obj.latitude
              data.longitude = obj.longitude
            }
        })

        this.restaurants.forEach((object)=>{
            let pertence = false
            pertence = geolib.isPointWithinRadius(
                { latitude: object.latitude, longitude:object.longitude },
                { latitude: data.latitude, longitude: data.longitude },
                this.radius * 1000
            );
            if(pertence){
              finalRestaurants.push(object)
            }
        })

        
        this.$router.push({
          name: "Results", 
          params: { finalRestaurants }
        });

    },
    
    pesqLocal(){

      let data = {
          lat: 38.71770883641866,
          lng: -9.151242248243376
      }
        let finalRestaurants = []

        this.restaurants.forEach((object)=>{
            let pertence = false
            pertence = geolib.isPointWithinRadius(
                { latitude: object.latitude, longitude:object.longitude },
                { latitude: data.lat, longitude: data.lng },
                this.radiusLocal * 1000
            );
            if(pertence){
              finalRestaurants.push(object)
            }
        })
        this.$router.push({
          name: "Results", 
          params: { finalRestaurants }
        });
    },
  },
};
</script>

<style scoped>
#app {
  background-color: white;
  height: "50vh";
}
.img-prop {
  top: 5%;
  max-height: 35vh !important;
  max-width: 35vh !important;
  filter: invert(10%) sepia(75%) saturate(530%) hue-rotate(129deg)
    brightness(98%) contrast(101%) !important;
}
.small-img-prop {
  top: 5%;
  max-height: 35vh !important;
  max-width: 35vh !important;
  filter: invert(10%) sepia(75%) saturate(530%) hue-rotate(129deg)
    brightness(98%) contrast(101%) !important;
}
.btn-prop {
  height: 70vh !important;
  width: 60vh !important;
}
.search-prop {
  color: white !important;
  font-size: 3vh;
}
.text-prop {
  color: #002423 !important;
}
</style>
