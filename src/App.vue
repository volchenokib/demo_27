<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Demo #1</router-link>
      <!-- <router-link to="/about">About</router-link> -->
    </div>
    <v-container>
      <router-view/>
    </v-container>
  </div>
</template>

<style lang="scss">
html,
body {
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #1a237e;
    }
  }
}
</style>
