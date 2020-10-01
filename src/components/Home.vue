<template>
  <div class="home_edit container">
    <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
      <div class="card-content">
        <h2 class="cyan-text">{{ smoothie.title }}</h2>
        <ul class="ingredients">
          <li v-for="(ing, index) in smoothie.ingredients" :key="index">
            <span class="chip">{{ ing }}</span>
          </li>
        </ul>
        <i
          v-if="someUser"
          class="material-icons delete"
          @click="deleteSmoothie(smoothie.id)"
          >delete</i
        >
      </div>
      <span v-if="someUser" class="btn-floating btn-medium halfway-fab amber">
        <router-link
          :to="{
            name: 'EditSmoothie',
            params: { smoothie_slug: smoothie.slug },
          }"
        >
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";
export default {
  name: "Home",
  data() {
    return {
      smoothies: [],
      someUser: null,
      //   smoothies: [
      //     {
      //       title: "Super Orange Brew",
      //       slug: "super-orange-brew",
      //       ingredients: ["orange", "mango", "pinepple"],
      //       id: 1,
      //     },
      //   ],
    };
  },
  methods: {
    deleteSmoothie(id) {
      //delete from db
      db.collection("smoothies")
        //ref to a doc with an id
        .doc(id)
        .delete()
        //returns promise
        .then(() => {
          //delete from frontend
          this.smoothies = this.smoothies.filter((smoothie) => {
            return smoothie.id != id;
          });
        });
    },
  },

  mounted() {
    //  console.log("user_home_edit", firebase.auth().currentUser);
  },
  created() {
    //fetch data from firestore
    db.collection("smoothies")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          // console.log("doc.data()", doc.data());
          // console.log("doc.id", doc.id);
          let smoothie = doc.data(); //all the data
          smoothie.id = doc.id; //random string
          this.smoothies.push(smoothie);
        });
      });

    //check who is logged in/if anyone is logged in
    firebase.auth().onAuthStateChanged((user) => {
      //if logged in
      if (user) {
        this.someUser = user;
      } else {
        this.someUser = null;
      }
      //console.log("user_navbar", this.user);
    });

    // let userRef = db.collection("users");
    // //comparing user_id in db with current user logged in

    // userRef
    //   .where("user_id", "==", firebase.auth().currentUser.uid)
    //   //should only be one, but firebase does not know that
    //   .get()
    //   .then((snapshot) => {
    //     snapshot.forEach((doc) => {
    //       console.log("doc.id_navbar", doc.id);
    //       this.profileId = doc.id; //the slug
    //     });
    //   });
  },

  //   directives: {
  //     rainbow: {
  //       // bind(el,binding,vnode){
  //       bind(el) {
  //         //6 digit random number
  //         el.style.color = "#" + Math.random().toString().slice(2, 8);
  //       },
  //     },
  //   },
};
</script>

<style>
.home {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 8rem;
}

.home h2 {
  font-size: 1.8rem;
  text-align: center;
  margin-top: 0;
}
.home .ingredients {
  margin: 30px auto;
}
.home .ingredients li {
  display: inline-block;
}
.home .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  /* color: #aaa; */
  font-size: 1.4rem;
}
.home .edit {
  width: 100%;
}
</style>
