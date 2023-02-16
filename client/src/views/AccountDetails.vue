<template>
  <v-app class="stickypage">
    <Header />
    <v-container>
      <v-layout justify-center row wrap>
        <v-flex xs12 sm12 md12 lg6>
          <v-card style="top: 1vh" flat width="100vw" height="100vh">
            <v-form v-model="valid" ref="form">
              <v-row class="pb-15">
                <v-col cols="11" class="mr-2">
                  <v-row class="ms-13" justify="center">
                    <v-avatar class="mt-2" size="180">
                      <v-img src="../assets/defaultuser.jpg" />
                    </v-avatar>
                  </v-row>
                  <v-row justify="center">
                    <v-btn
                      class="mt-7 ml-16"
                      depressed
                      outlined
                      color="#0d5a55"
                    >
                      <h4>Alterar Imagem</h4>
                    </v-btn>
                  </v-row>
                </v-col>
                <v-col cols="12" class="mt-8">
                  <v-card class="text-center mx-auto" flat width="31vw ">
                    <v-text-field
                      v-model="formData.nome"
                      filled
                      color="#00302E"
                      placeholder="Nome"
                      :readonly="notEditing"
                      :rules="rules.required"
                    />

                    <v-text-field
                      v-model="formData.email"
                      filled
                      color="#00302E"
                      placeholder="Email"
                      :readonly="notEditing"
                      :rules="rules.email"
                    />
                  </v-card>
                  <v-row justify="center" align="center">
                    <v-col cols="12" md="6">
                      <v-btn
                        class="ml-8"
                        depressed
                        outlined
                        @click="passwordBtn"
                        color="#0d5a55"
                      >
                        <h4>Alterar Password</h4>
                      </v-btn>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-btn
                        class="pr-4"
                        depressed
                        @click="editBtn"
                        :outlined="notEditing"
                        color="#0d5a55"
                        :style="notEditing ? undifined : 'color:white'"
                        width="9vw"
                      >
                        <h4 v-if="notEditing">Editar Perfil</h4>
                        <h4 v-else>Confirmar</h4>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-form>
          </v-card>
          <v-dialog v-model="openPassword" max-width="500px">
            <v-card>
              <v-app-bar color="#00302E">
                <div class="d-flex align-center">
                  <h3 width="40" class="white--text">Alteração de Password</h3>
                </div>
              </v-app-bar>
              <v-container>
                <v-form v-model="valid" ref="form2">
                  <h4 class="red--text" v-if="showError">
                    Erro na submissão. Por favor corrija os erros e tente
                    novamente!
                  </h4>
                  <v-row>
                    <v-col cols="9" color="#00302E">
                      <h4 class="ml-10 mt-7" color="#00302E">
                        Password Actual:
                      </h4>
                      <v-text-field
                        v-model="passwordData.oldPassword"
                        class="ml-10 mt-3"
                        filled
                        color="#00302E"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="show1 ? 'text' : 'password'"
                        hint="At least 8 characters"
                        counter
                        @click:append="show1 = !show1"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="9">
                      <h4 class="ml-10 mt-7">Nova Password:</h4>
                      <v-text-field
                        v-model="passwordData.password"
                        class="ml-10 mt-3"
                        color="#00302E"
                        filled
                        :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="show3 ? 'text' : 'password'"
                        hint="At least 8 characters"
                        counter
                        @click:append="show3 = !show3"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="9">
                      <h4 class="ml-10 mt-7">Repetir Nova Password:</h4>
                      <v-text-field
                        v-model="repeatPassword"
                        class="ml-10 mt-3"
                        color="#00302E"
                        filled
                        :append-icon="show5 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min, matchingPasswords]"
                        :type="show5 ? 'text' : 'password'"
                        hint="At least 8 characters"
                        counter
                        @click:append="show5 = !show5"
                      />
                    </v-col>
                  </v-row>
                </v-form>

                <v-row>
                  <v-col class="text-right">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          v-bind="attrs"
                          v-on="on"
                          color="#0d5a55"
                          elevation="5"
                          class="mb-3 mr-3"
                          depressed
                          outlined
                          @click="cancelBtn"
                        >
                          <v-icon class="mr-2" 
                            >mdi-checkbox-marked-outline</v-icon
                          >
                          <h4 class="mt-1">Cancelar</h4>
                        </v-btn>
                      </template>
                      <span>Cancelar</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          v-bind="attrs"
                          v-on="on"
                          color="#0d5a55"
                          elevation="5"
                          class="mb-3 mr-3"
                          @click="changePassword"
                        >
                          <v-icon class="mr-2" color="white"
                            >mdi-checkbox-marked-outline</v-icon
                          >
                          <h4 class="white--text mt-1">Confirmar</h4>
                        </v-btn>
                      </template>
                      <span>Confirmar</span>
                    </v-tooltip>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-dialog>
          <!-- Janela de Mudança Bem-Sucedida -->
        <v-dialog v-model="showConfirm" max-width="500px">
                <v-card>
                <v-app-bar color="#00302e" >
                <div class="d-flex align-center">
                        <h3 width="40" class="white--text"> Alteração de Detalhes</h3>
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
                        <h3 class="ml-5 mt-5">Detalhes de Utilizador alterados com sucesso!</h3>
                        </v-col>
                </v-row>
                </v-container>
                <v-card-actions>
                <v-container>
                        <v-row >
                        <v-col class="text-right">
                        <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">   
                                <v-btn v-bind="attrs" v-on="on" color="#ebd9c6" @click="closeConfirm" elevation="5" class="mt-5">
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
        </v-flex>
      </v-layout>
    </v-container>
    <Footer />
  </v-app>
</template>
    
<script>
import axios from "axios";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      showError: false,
      notEditing: true,
      editing: false,
      openPassword: false,
      show1: false,
      show2: true,
      show3: false,
      show4: true,
      show5: false,
      show6: true,
      showConfirm: false,
      id: "",
      password: "",
      newPassword: "",
      repeatPassword: "",
      formData: {
        id_user: "",
        email: "",
        nome: "",
      },
      passwordData: {
        id_user: "",
        oldPassword: "",
        password: "",
      },
      rules: {
        required: [(v) => !!v || "Field is required"],
        email: [(v) => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "E-mail must be valid",],
        min: (v) => v.length >= 8 || "Min 8 characters",
      },
    };
  },
  created() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/autenticar");
    }
    axios.get("http://localhost:8001/user", {headers: { token: localStorage.getItem("token")}})
      .then((res) => {
          this.formData.id_user = res.data.id_user
          this.formData.email = res.data.email
          this.formData.nome = res.data.nome
      });
  },

  methods: {
    editBtn() {
      if (this.notEditing) {
        this.notEditing = false;
      } else {
        this.notEditing = true;
        console.log(this.formData)
        axios.put(`http://localhost:8001/user`, this.formData)
          .then(function (response) {
              console.log(response);
              
            },
            (error) => {
              console.log(error);
            }
          );
        this.showConfirm = true
      }
    },
    passwordBtn() {
      this.openPassword = true;
    },
    cancelBtn() {
      this.openPassword = false;
    },
    closeConfirm() {
      this.showConfirm = false;
    },
    matchingPasswords() {
      if (this.passwordData.password === this.repeatPassword) {
        return true;
      } else {
        return "Password does not match.";
      }
    },
    changePassword() {
      let user = {
        id_user: this.formData.id_user,
        password: this.passwordData.password
      }
      if (this.$refs.form2.validate()) {
        console.log(this.passwordData)
        axios.put(`http://localhost:8001/userPassword`, user)
        .then(function (response) {
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
        this.openPassword = false;
        this.showConfirm = true;
        console.log('valido')
      } else {
        this.showError = true;
        console.log("Campos Inválidos!");
      }
    },
  },
};
</script>

<style scoped>
#app {
  background-color: white;
  background-image: url("../assets/signIn.png");
  background-size: cover;
  height: "50vh";
}
</style>