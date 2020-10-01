<template>
  <div class="home_edit container">
    <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
      <div class="card-content">
        <h2 class="deep-purple-text">{{ smoothie.title }}</h2>
        <ul class="ingredients">
          <li v-for="(ing, index) in smoothie.ingredients" :key="index">
            <span class="chip">{{ ing }}</span>
          </li>
        </ul>
        <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)"
          >delete</i
        >
      </div>
      <!-- <span class="btn-floating btn-medium halfway-fab pink">
        <router-link :to="{name: 'EditSmoothie', params:{smoothie_slug: smoothie.slug}}">
          <i class="material-icons edit">edit</i>
        </router-link>
      </span> -->
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
//import firebase from "firebase";
export default {
  name: "HomeEdit",
  data() {
    return {
      smoothies: [],
      //before db:
      //   smoothies: [
      //     {
      //       title: "Super Orange Brew",
      //       slug: "super-orange-brew",
      //       ingredients: ["orange", "mango", "pinepple"],
      //       id: 1,
      //     },
      //     {
      //       title: "Super Kiwi Moody",
      //       slug: "super-kiwi-moody",
      //       ingredients: ["kiwi", "lime", "juice"],
      //       id: 2,
      //     },
      //     {
      //       title: "Super Pink Drink",
      //       slug: "super-pink-drink",
      //       ingredients: ["raspberry", "icecream", "juice"],
      //       id: 3,
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
.home_edit {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 8rem;
}
/* .home .card {
  background: lightgreen;
} */

.home_edit h2 {
  font-size: 1.8rem;
  text-align: center;
  margin-top: 0;
}
.home_edit .ingredients {
  margin: 30px auto;
}
.home_edit .ingredients li {
  display: inline-block;
}
.home_edit .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  /* color: #aaa; */
  font-size: 1.4rem;
}
.home_edit .edit {
  width: 100%;
}
</style>
