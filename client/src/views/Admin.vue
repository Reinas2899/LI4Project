<template>
  <v-app>
    <Header />
    <v-container fill-height fluid>
      <v-row align="center" justify="center">
        <v-card class="card-prop mt-10 text-center">
          <v-card-title class="titleBack">
            <h3 class="white--text">Inserir Restaurante</h3> 
          </v-card-title>
          <v-form class="mx-auto my-10 form-prop">
            <v-text-field
              v-model="name"
              label="Nome do Restaurante"
              type="text"
              color="#00302e"
            />
            <v-text-field
              v-model="mobile"
              label="Número de telemóvel"
              type="text"
              color="#00302e"
            />
            <v-text-field
              v-model="address"
              label="Endereço"
              type="text"
              color="#00302e"
            />
            <v-row justified="center">
              <v-col col="6">
                <v-text-field
                  v-model="latitude"
                  label="latitude"
                  type="text"
                  color="#00302e"
                />
              </v-col>
              <v-col col="6">
                <v-text-field
                  v-model="longitude"
                  label="longitude"
                  type="text"
                  color="#00302e"
                />
              </v-col>
            </v-row>

            <v-combobox
              v-model="price"
              label="Nível de custo"
              type="text"
              color="#00302e"
              :items="cost"
            />
            <v-row justified="center">
              <v-col col="4">
                <v-checkbox
                  v-model="takeaway"
                  label="Takeaway"
                  color="#00302e"
                />
              </v-col>
              <v-col col="4">
                <v-checkbox
                  v-model="delivery"
                  label="Entregas a domicílios"
                  color="#00302e"
                />
              </v-col>
              <v-col col="4">
                <v-checkbox v-model="dine_in" label="Sala" color="#00302e"
              /></v-col>
            </v-row>
            <v-text-field
              v-model="description"
              label="Descrição"
              type="text"
              color="#00302e"
              class="mt-5"
              outlined
            />
          </v-form>

          <v-btn
            color="#00302e"
            width="46vh"
            height="7vh"
            class="btn-prop text-none mt-n15"
            flat
            @click="inserir"
            ><v-card-text>Adicionar Restaurante </v-card-text></v-btn
          >
        </v-card>
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
  data: function () {
    return {
      cost: ["€", "€€", "€€€"],
      name: "",
      adress: "",
      mobile: "",
      latitude: "",
      longitude: "",
      description: "",
      takeaway:"",
      price_level: "",
      delivery: "",
      dine_in: "",
      type: ''
    };
  },
  created(){
        (async () => {
          try {
            const response = await axios.get('http://localhost:8001/user', {headers: {token: localStorage.getItem('token')}})
            console.log(response);
            this.type = response.data.type
          } catch (error) {
            console.log(error.response.body);
          }
        })();

        console.log(this.type) 
  },
   methods: {
    inserir() {
    console.log("Cheguei");
    let newRestaurant =  {
        name: this.name, 
        mobile: this.mobile,
        address: this.address,
        latitude: this.latitude,
        longitude: this.longitude,
        description: this.description,
        price_level: this.price,
        takeaway: this.takeaway,
        delivery: this.delivery,
        dine_in: this.dine_in,
    }
      console.log(newRestaurant)
      //let self = this

        axios.post(`http://localhost:8001/restaurante`, newRestaurant)
        .then(function (response) {
        console.log(response);
              //self.$router.push({name: "Admin"});
            (error) => {
              console.log(error);
            }
        }
        );
      }
    },
  };  
</script>

<style scoped>
#app {
  background-color: white;
  background-image: url("../assets/signIn.png");
  background-size: cover;
}
.card-prop {
  width: 60vw;
  height: 87vh;
}
.form-prop {
  width: 40vw;
}
.btn-prop {
  color: white !important;
  font-size: 3vh;
}
.titleBack {
  background-color: #00302e;
}
</style>