<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Econo</span>
        <span class="font-weight-light">Physica DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank">
        <span class="mr-2">Choose Theme</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <demo1/>
    </v-content>
  </v-app>
</template>

<script>
import demo1 from "./components/demo1";

export default {
  name: "App",
  components: {
    demo1
  },
  data() {
    return {
      //
    };
  }
};
</script>
