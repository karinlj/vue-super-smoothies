<template>
  <div class="view-profile container">
    <!-- <div class="card" v-if="profile"> -->
    <div class="card" v-if="profile">
      <h2 class="cyan-text center">{{ profile.alias }} 's profile</h2>
      <ul>
        <li>
          <div class="black-text">
            <span class="cyan-text">Alias: </span>{{ profile.alias }}
          </div>
        </li>
        <li>
          <div class="black-text">
            <span class="cyan-text">Email: </span>{{ authUser.email }}
          </div>
        </li>
      </ul>
      <!-- <ul class="comments collection">
        <li v-for="(comment, index) in comments" :key="index">
          <div class="purple-text">{{ comment.from }}</div>
          <div class="grey-text text-darken-2">{{ comment.content }}</div>
        </li>
      </ul> -->
      <!-- <form @submit.prevent="addComment">
        <div class="field">
          <label for="comment">Add a comment</label>
          <input type="text" name="comment" v-model="newComment" />
          <p v-if="feedback" class="red-text center">{{ feedback }}</p>
        </div>
      </form> -->
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

<style>
.view-profile {
  position: relative;
  z-index: 100;
  max-width: 600px;
  margin-top: 8rem;
}
.view-profile .card {
  padding: 20px;
  margin-top: 60px;
}
.view-profile h2 {
  font-size: 2rem;
  margin-top: 0;
}
.view-profile li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
</style>