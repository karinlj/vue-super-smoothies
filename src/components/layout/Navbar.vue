<template>
  <div class="navbar">
    <!-- <nav class="deep-purple darken-1"> -->
    <nav class="cyan">
      <div class="container">
        <router-link :to="{ name: 'Home' }" class="brand-logo left">
          Super Smoothies
        </router-link>
        <!-- conditonal tags -->
        <a
          v-if="myUser"
          href=""
          class="btn-floating btn-large halfway-fab amber"
        >
          <router-link :to="{ name: 'AddSmoothie' }">
            <i class="material-icons">add</i>
          </router-link>
        </a>
        <ul class="right">
          <li v-if="!myUser">
            <router-link :to="{ name: 'Signup' }">Signup</router-link>
          </li>
          <li v-if="!myUser">
            <router-link :to="{ name: 'Login' }">Login</router-link>
          </li>
          <li v-if="myUser">
            <a @click="logout">Logout</a>
          </li>
          <li v-if="myUser">
            <a @click="toProfile" class="amber-text"> {{ alias }}</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init"; //my collections
export default {
  name: "Navbar",
  props: {},
  data() {
    return {
      myUser: null,
      alias: null,
      profileId: null,
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        //signOut the user: returns a promise
        .signOut()
        //redirect to login
        .then(() => {
          console.log("logged out");
          this.$router.push({ name: "Home" });
        });
    },
    toProfile() {
      this.$router.push({
        name: "ViewProfile",
        params: { id: this.profileId },
      });
    },
  },
  created() {
    //check who is logged in/if anyone is logged in
    firebase.auth().onAuthStateChanged((user) => {
      //if logged in
      if (user) {
        this.myUser = user;
      } else {
        //or not
        this.myUser = null;
      }
    });

    let ref = db.collection("users");
    //comparing user_id in db with current user logged in

    ref
      .where("user_id", "==", firebase.auth().currentUser.uid)
      //should only be one, but firebase does not know that
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          //  console.log("doc.data()_navbar", doc.data().alias);
          // console.log("doc.id_navbar", doc.id);
          this.alias = doc.data().alias;
          this.profileId = doc.id; //the slug
        });
      });
  },
};
</script>

<style>
.navbar {
  position: relative;
  z-index: 100;
}
.navbar nav {
  padding: 0 20px;
}
</style>
