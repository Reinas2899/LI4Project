<template>
  <v-footer dark padless fixed bottom class="mt-16">
    <v-card class="flex" flat tile height="100%">
      <v-card-title class="#0B0D17" height="1">
        <v-btn v-for="l in left" :key="l.name" color="white" text rounded>
          <router-link :to="{path:l.to}" style="text-decoration: none; color: inherit;">{{l.name}}</router-link>
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon>
          
          <v-icon size="28px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-title>

      <!--
      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>RASBet</strong>
      </v-card-text>
      -->
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-instagram"],
    left: [
      {name: "Home", to: '/'},
      {name: "Team", to: '/equipa'},
    ],
  }),
};
</script>