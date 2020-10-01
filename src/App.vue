<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "./components/layout/Navbar";

export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>

<style>
body {
  height: 100%;
  min-height: 900px;
}
#app {
  position: relative;
  background-color: darkblue;
  /* Background pattern from Toptal Subtle Patterns */
  background: url("./assets/smoothie_orange.jpg") no-repeat center;
  background-size: cover;
  height: 100%;
  /* min-height: 1000px; */
}
#app::before {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);
  content: "";
  display: block;
}
.delete {
  color: #e91e63;
  opacity: 0.7;
  /* color: #aaa; */
}
input {
  height: 2.5rem !important;
}
</style>
