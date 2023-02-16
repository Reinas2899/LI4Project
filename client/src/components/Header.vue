<template>
  <v-app-bar color="#00302E" height="90" clipped-left elevate-on-scroll>
    <a href="/escolha">
      <v-avatar color="#00302E" size="75" class="ml-5">
        <v-img src="../assets/logotipo.png" />
      </v-avatar>
    </a>
    <v-btn class="btn" color="white" text id="no-background-hover" to="/escolha">
      <h1>RestauraçaUM</h1>
    </v-btn>

    <div class="spacer"></div>  

    
    <v-tooltip v-if="!logged" bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-if="!logged" v-bind="attrs" v-on="on" color="#ebd9c6" text to="/autenticar" class="mr-6">
      Iniciar Sessão
    </v-btn>
      </template>
      <span>Iniciar Sessão</span>
    </v-tooltip>

    <v-tooltip v-if="!logged" bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
      v-if="!logged"
      v-bind="attrs"
      color="#e9cfb4"
      style="color: #00302e"
      class="mr-16"
      to="/criar"
      v-on="on"
    >
      Registar
    </v-btn>
      </template>
      <span>Registar Utilizador</span>
    </v-tooltip>

    <v-tooltip v-if="logged" bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
      v-if="logged"
      v-bind="attrs"
      color="#e9cfb4"
      style="color: #00302e"
      class="mr-16"
      to="/escolha"
      v-on="on"
    >
      Restaurantes
    </v-btn>
      </template>
      <span>Registar Utilizador</span>
    </v-tooltip>

    <v-menu v-if="logged" :rounded="rounded" offset-y>
      <template v-slot:activator="{ on: menu }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn fab v-on="{ ...tooltip, ...menu }">
              <v-avatar>
                <v-img src="../assets/defaultuser.jpg" />
              </v-avatar>
            </v-btn>
          </template>
          <span> </span>
        </v-tooltip>
      </template>
      <v-list>
        <v-list-item class="mb-3" link :to="asd">
          <v-avatar class="mr-3">
            <v-img src="../assets/defaultuser.jpg" />
          </v-avatar>
          <h4>{{nome}}</h4>
        </v-list-item>
        <v-list-item v-if="type=='Admin'" to="/admin">
          <v-icon class="mr-3">mdi-silverware</v-icon>
          <v-list-item-title> Inserir Restaurante</v-list-item-title>
        </v-list-item>

        <v-list-item @click="goPerfil">
          <v-icon class="mr-3">mdi-account</v-icon>
          <v-list-item-title> Perfil</v-list-item-title>
        </v-list-item>

        <v-list-item  to="/detalhes">
          <v-icon class="mr-3">mdi-cog</v-icon>
          <v-list-item-title> Definições</v-list-item-title>
        </v-list-item>

        <v-list-item @click="logout" text>
            <v-icon class="mr-3">mdi-logout</v-icon>
            <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    
  </v-app-bar>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      logged: false,
      id_user: 0,
      nome: '',
      email: '',
      type: '',
    };
  },
  created(){
        if (localStorage.getItem("token") != null) {
          this.logged = true;
        } else if (
          this.$router.history.current.path != "/equipa" &&
          this.$router.history.current.path != "/" &&
          this.logged == false
        ) {
          this.$router.push("/autenticar");
        }
        axios.get('http://localhost:8001/user', {headers: {token: localStorage.getItem('token')}})
            .then(res => {
                this.id_user = res.data.id_user
                this.nome = res.data.nome
                this.email = res.data.email
                this.type = res.data.type

        },(error) =>{
              console.log(error);
        });  

        
    },

  methods: {
      goPerfil(){
        let user = {
          id_user: this.id_user,
          name: this.nome
        }
      
        this.$router.push({
          name: "Perfil", 
          params: { user }
        });
      },
      logout(){
          localStorage.clear()
          this.$router.push('/autenticar')
      }
  },
};
</script>

<style scoped>
/* css do cabeçalho */
.v-toolbar__content,
.v-toolbar__extension {
  position: relative;
}
.spacer {
  flex-grow: 1;
}
h1 {
  color: white;
  text-align: center;
}
#rounded-card {
  border-radius: 50%;
  min-height: 500px;
  min-width: 500px;
}
.btn {
  text-transform: none;
}
#no-background-hover::before {
  background-color: transparent;
}

.min-button::before {
  display: none;
}
</style>