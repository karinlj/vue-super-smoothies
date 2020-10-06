<template>
  <div class="view-profile container">
    <!-- <div class="card" v-if="profile"> -->
    <div class="card" v-if="profile">
      <h2 class="blue-text center">{{ profile.alias }} 's profile</h2>
      <ul>
        <li>
          <div class="black-text">
            <span class="blue-text">Alias: </span>{{ profile.alias }}
          </div>
        </li>
        <li>
          <div class="black-text">
            <span class="blue-text">Email: </span>{{ authUser.email }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";

export default {
  name: "ViewProfile",
  data() {
    return {
      profile: null,
      authUser: null,
    };
  },

  created() {
    let ref = db.collection("users");
    //returns promise
    ref
      //get a particular user via the slug in url
      .doc(this.$route.params.id)
      .get()
      .then((user) => {
        //store user data in profile-prop
        this.profile = user.data();
      });
    this.authUser = firebase.auth().currentUser;
  },
  methods: {},
};
</script>

<style lang="scss">
.view-profile {
  position: relative;
  z-index: 100;
  max-width: 600px;
  margin-top: 8rem;
  .card {
    padding: 20px;
    margin-top: 60px;
  }
  h2 {
    font-size: 2rem;
    margin-top: 0;
  }
  li {
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
}
</style>
