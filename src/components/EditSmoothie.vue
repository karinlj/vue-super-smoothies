<template>
  <!-- output om det finns något i smoothie, dvs om svar finns från db -->
  <div v-if="smoothie" class="edit-smoothie container">
    <form @submit.prevent="editSmoothie" class="card-panel">
      <h2 class="center-align cyan-text">
        Edit {{ smoothie.title }}
        <!-- Edit a smoothie: {{ this.$route.params.smoothie_slug }} -->
      </h2>
      <div class="field title">
        <label for="title">Smoothie Title</label>
        <input type="text" name="title" v-model="smoothie.title" />
      </div>
      <!-- outputting editable ingredients with input-element-->
      <div
        class="field"
        v-for="(ing, index) in smoothie.ingredients"
        :key="index"
      >
        <label for="ing">Ingredient: </label>
        <!-- must bind to something in data(): ingredients -->
        <input
          type="text"
          name="ingredient"
          v-model="smoothie.ingredients[index]"
        />
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <!-- add-ingredient -->
      <div class="field add-ingredient">
        <label for="add-ingredient">Ingredient:</label>
        <input
          type="text"
          name="add-ingredient"
          @keydown.tab.prevent="addIng"
          v-model="another"
        />
      </div>
      <div class="field center-align">
        <p class="red-text" v-if="feedback">{{ feedback }}</p>
        <button class="btn cyan">Update smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";
export default {
  name: "EditSmoothie",
  data() {
    return {
      //utgår från smoothie i denna comp and all data is inside it
      smoothie: null,
      another: null,
      feedback: null,
    };
  },
  methods: {
    editSmoothie() {
      //title, ingredients, id and slug does not exist in this comp,
      // it is stored in the smoothie object in the db
      //console.log("edit", this.smoothie.title, this.smoothie.ingredients);
      if (this.smoothie.title) {
        this.feedback = null;
        //create slug with slugify
        this.smoothie.slug = slugify(this.smoothie.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!:@]/g,
          lower: true,
        });
        //returns promise
        db.collection("smoothies")
          //ändrat här...grab the doc and update it
          //this.smoothie.id = doc.id from created()
          .doc(this.smoothie.id)
          .update({
            title: this.smoothie.title,
            ingredients: this.smoothie.ingredients,
            slug: this.smoothie.slug,
          })
          .then(() => {
            //do something after added to db
            this.$router.push({ name: "Home" });
          });
      } else {
        this.feedback = "Please enter a smoothie title.";
      }
    },

    addIng() {
      if (this.another) {
        //push to empty array
        this.smoothie.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "Please enter a value.";
      }
    },
    //deleting ing
    deleteIng(ing) {
      this.smoothie.ingredients = this.smoothie.ingredients.filter(
        (ingredient) => {
          return ingredient !== ing;
        }
      );
    },
  },
  created() {
    // get data and store the doc we want in a variable
    // only .doc if we have the id
    // we have the slug from url: look through the data and get me the docs with the slug of...
    let ref = db
      .collection("smoothies")
      //get me inside the smoothies-collection the slug that== the route
      .where("slug", "==", this.$route.params.smoothie_slug);
    //get the data
    ref.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        this.smoothie = doc.data();
        //this id is not in the data(), but in the doc
        //här får vi this.smoothie.id till editSmoothie() ovan
        this.smoothie.id = doc.id;
        //console.log("doc.id", doc.id);
        //console.log("doc.data()", doc.data());
      });
    });
  },
};
</script>

<style>
.edit-smoothie {
  position: relative;
  z-index: 1000;
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.edit-smoothie h2 {
  font-size: 2rem;
  margin: 0.8rem auto;
}
.edit-smoothie .field {
  margin: 0.5rem auto;
  position: relative;
}
.edit-smoothie .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #e91e63;
  font-size: 1.4rem;
  cursor: pointer;
  opacity: 0.7;
}
</style>
