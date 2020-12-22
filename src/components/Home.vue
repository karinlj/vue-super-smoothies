<template>
  <div class="home container">
    <section class="search_section">
      <div>
        <input type="text" v-model="search" placeholder="Search smoothies" />
      </div>
    </section>
    <section class="smoothies_section">
      <div class="card" v-for="smoothie in filteredSmoothies" :key="smoothie.id">
        <div class="card-content">
          <h2 class="blue-text">{{ smoothie.title }}</h2>
          <ul class="ingredients">
            <li v-for="(ing, index) in smoothie.ingredients" :key="index">
              <span class="chip">{{ ing }}</span>
            </li>
          </ul>
          <i v-if="someUser" class="material-icons delete" @click="deleteSmoothie(smoothie.id)"
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
    </section>
  </div>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";
import "../styles/_variables.scss";
export default {
  name: "Home",
  data() {
    return {
      smoothies: [],
      someUser: null,
      search: "",
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
  },
  computed: {
    filteredSmoothies() {
      //return filtered smoothies
      return this.smoothies.filter((smoothie) => {
        //check if search term is in smoothie
        return smoothie.title.match(this.search);
      });
    },
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

<style lang="scss">
.home {
  margin-top: 3rem;
  .search_section {
    display: flex;
    flex-direction: center;
    position: relative;
    z-index: 1000;
    padding-bottom: 3rem;
    @media all and (min-width: 576px) {
      justify-content: flex-end;
    }

    div {
      width: 100%;
      background-color: #fff !important;
      padding: 0.5rem 1rem;
      transition: box-shadow 0.25s, -webkit-box-shadow 0.25s;
      border-radius: 2px;
      @media all and (min-width: 576px) {
        width: 300px;
      }
    }
  }
  .smoothies_section {
    // display: grid;
    // grid-template-columns: 1fr 1fr 1fr;
    // grid-gap: 30px;
    display: flex;
    flex-wrap: wrap;
    .card {
      margin-bottom: 1.5rem;
      margin-left: 1%;
      flex: 0 0 99%;
      @media all and (min-width: 576px) {
        flex: 0 0 49%;
      }
      @media all and (min-width: 768px) {
        flex: 0 0 32.33%;
      }
    }
    h2 {
      font-size: 1.8rem;
      text-align: center;
      margin-top: 0;
    }
    .ingredients {
      margin: 30px auto 20px auto;
      li {
        display: inline-block;
      }
    }
    .delete {
      position: absolute;
      top: 4px;
      right: 4px;
      cursor: pointer;
      /* color: #aaa; */
      font-size: 1.4rem;
    }
    .edit {
      width: 100%;
    }
  }
}
</style>
