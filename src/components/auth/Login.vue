<template>
  <div class="login container">
    <form @submit.prevent="login" class="card-panel">
      <h2 class="center cyan-text">Login</h2>
      <div class="field">
        <label for="email">Email:</label>
        <input type="email" name="email" v-model="email" />
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="password" />
      </div>
      <p class="red-text center" v-if="feedback">{{ feedback }}</p>
      <div class="field center">
        <button class="btn cyan">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
// import db from "@/firebase/init";
// import slugify from "slugify";
import firebase from "firebase";

export default {
  name: "Login",
  props: {},
  data() {
    return {
      email: null,
      password: null,
      feedback: null,
    };
  },
  methods: {
    login() {
      console.log("hej login", this.email, this.password);
      if (this.email && this.password) {
        //auth
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          //when the user is logged in, the callback will fire
          //and we redirect to home
          .then((cred) => {
            console.log("user", cred.user);
            this.$router.push({ name: "Home" });
          })
          //error from firebase
          .catch((err) => {
            this.feedback = err.message;
          });
        this.feedback = null;
      } else {
        this.feedback = "Please fill in both fields.";
      }
    },
  },
};
</script>

<style>
.login {
  position: relative;
  z-index: 100;
  max-width: 400px;
  margin-top: 8rem;
}
.login h2 {
  font-size: 2.4rem;
}
.login .field {
  margin-bottom: 1rem;
}
</style>
