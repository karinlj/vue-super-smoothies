<template>
  <div class="signup container">
    <form @submit.prevent="signup" class="card-panel">
      <h2 class="center blue-text">Signup</h2>
      <div class="field">
        <label for="email">Email:</label>
        <input type="email" name="email" v-model="email" />
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="password" />
      </div>
      <div class="field">
        <label for="alias">Alias:</label>
        <input type="text" name="alias" v-model="alias" />
      </div>
      <p class="red-text center" v-if="feedback">{{ feedback }}</p>
      <div class="field center">
        <button class="btn blue">Signup</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init"; //my collections
import slugify from "slugify";
import firebase from "firebase"; //firebase library with services ex: auth

export default {
  name: "Signup",
  props: {},
  data() {
    return {
      email: null,
      password: null,
      alias: null,
      slug: null,
      feedback: null,
    };
  },
  methods: {
    signup() {
      if (this.email && this.password && this.alias) {
        //sätter slug till slugifyed alias
        this.slug = slugify(this.alias, {
          replacement: "-",
          remove: /[$*_+~.()'"!:@]/g,
          lower: true,
        });
        //skapar en users-collection
        //skapa referens till dokumentet i db med den här sluggen
        let ref = db.collection("users").doc(this.slug);
        //hitta dokumentet
        //sedan: cloud function här
        //returns a promise
        ref.get().then((doc) => {
          //is alias free?
          if (doc.exists) {
            this.feedback = "This alias is already taken.";
          } else {
            // this.feedback = "This alias is free to use.";
            //1.sign up (create)the user in AUTH: create new user-gets unique id (cred.user.uid)
            firebase
              .auth()
              //returns a promise
              .createUserWithEmailAndPassword(this.email, this.password)
              //2.create a record in DB to match with the user signed in
              //returns a promise
              .then((cred) => {
                //console.log(cred.user);
                ref.set({
                  alias: this.alias,
                  user_id: cred.user.uid,
                  //cred.user.uid= random id in auth
                });
              })
              //redirect to home
              .then(() => {
                this.$router.push({ name: "Home" });
              })
              .catch((err) => {
                console.log("error: ", err);
                this.feedback = err.message;
              });
          }
        });
        //console.log("slug", this.slug);
        this.feedback = null;
      } else {
        this.feedback = "Please fill in all fields.";
      }
    },
  },
};
</script>

<style lang="scss">
.signup {
  position: relative;
  z-index: 100;
  max-width: 400px;
  margin-top: 8rem;
  h2 {
    font-size: 2.4rem;
  }
  .field {
    margin-bottom: 1rem;
  }
}
</style>
