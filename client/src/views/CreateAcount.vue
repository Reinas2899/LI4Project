<template>
  <v-app>
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="12" md="6" v-for="k in 2" :key="k">
        <!--Image on left side-->
        <v-card v-if="k == 1" color="transparent" height="100vh" tile>
          <v-img
            src="../assets/signUp.png"
            width="50vw"
            height="100vh"
          >
            <v-overlay color="#E2B887" opacity=".4" absolute></v-overlay
          ></v-img>
        </v-card>

        <!--Actual sign in part-->
        <v-card v-if="k == 2" color="white" height="100vh" tile>
          <v-card-text class="text-center my-auto title-prop"
            >Registar Conta!
          </v-card-text>
          <v-card class="form-prop px-auto" flat>
            <v-form v-model="valid" ref="form">
              <v-text-field v-model="nome" label="Nome de usuário" type="text" color="#00302e" outlined :rules="rules.required"/>
              <v-text-field v-model="email" label="Email" type="text" color="#00302e" outlined :rules="rules.email"/>
              <v-text-field v-model="password" label="Palavra-passe" color="#00302e" outlined :append-icon="show ? 'visibility' : 'visibility_off'" @click:append="() => (show1 = !show1)" :type="show1 ? 'password' : 'text'" :rules="[rules.min]"/>
              <v-text-field v-model="repeatPassword" label="Confirmar Palavra-passe" color="#00302e" outlined :append-icon="show2 ? 'visibility' : 'visibility_off'" @click:append="() => (show2 = !show2)" :type="show2 ? 'password' : 'text'" :rules="[rules.min,equalPasswords]"/>
            </v-form
          ></v-card>

          <v-btn class="aut-btn text-none" @click="register" depressed
            >Registar
          </v-btn>

          <v-btn class="sign-in-prop text-none" text plain :to="'/autenticar'">
            Já tem uma conta? Autentifique-se
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
    <Footer />
  </v-app>
</template>

<script>
import axios from "axios";
import Footer from "../components/Footer";

export default {
  components: {
    Footer,
  },
  data() {
    return {
      nome: "",
      email: "",
      password: "",
      repeatPassword: "",
      show1: true,
      show2: true,
      rules: {
            required: [(v) => !!v || "Field is required"],
            email: [v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'],
            min: v => v.length >= 8 || 'Min 8 characters',
      },
      errorPassword: ''
    };
  },
  methods: {
    register() {
      let newUser = {
        email: this.email,
        nome: this.nome,
        password: this.password,
        type: 'User'
      };
      let self = this

      if(this.$refs[`form`][0].validate()){
        axios.post(`http://localhost:8001/user`, newUser)
            .then(function (response) {
              console.log(response);
              self.$router.push({name: "Authentication"});
            },
            (error) => {
              console.log(error);
            }
        );
      }
    },

    equalPasswords(){
        if (this.password === this.repeatPassword) {
            return true;
        } else {
            return 'Password does not match.';
        }
    }
  }
};

</script>

<style scoped>
#app {
  background-color: #00302e;
  height: auto;
  min-height: 100vh;
}
.title-prop {
  color: #00302e !important;
  font-size: 5vh;
  font-weight: 600;
  position: absolute;
  top: 10%;
}
.form-prop {
  position: absolute;
  top: 45%;
  width: 30vw;
  left: 50%;
  transform: translate(-50%, -50%);
}
.aut-btn {
  background-color: #00302e !important;
  color: #dfdcd7 !important;
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3vh;
  height: 7vh !important;
  width: 30vw;
}
.sign-in-prop {
  color: #00302e !important;
  position: absolute;
  top: 77%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5vh;
  width: 30vw;
}
</style>
