<template>
  <div class="add-smoothie container">
    <form @submit.prevent="addSmoothie" class="card-panel">
      <h2 class="center-align cyan-text">Add New Smoothie Recipe</h2>

      <div class="field title">
        <label for="title">Smoothie Title</label>
        <input type="text" name="title" v-model="title" />
      </div>
      <!-- outputting editable ingredients with input-element-->
      <div class="field" v-for="(ing, index) in ingredients" :key="index">
        <label for="ing">Ingredient: </label>
        <!-- must bind to something in data(): ingredients -->
        <input type="text" name="ingredient" v-model="ingredients[index]" />
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
        <button class="btn cyan">Add smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";
export default {
  name: "AddSmoothie",
  data() {
    return {
      //har alla props i denna comp
      title: null,
      ingredients: [],
      slug: null,
      another: null,
      feedback: null,
    };
  },
  methods: {
    addSmoothie() {
      //console.log("addSmoothie", this.title, this.ingredients);
      if (this.title) {
        this.feedback = null;
        //create slug with slugify
        this.slug = slugify(this.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!:@]/g,
          lower: true,
        });
        //add to db
        //returns promise
        db.collection("smoothies")
          .add({
            title: this.title,
            ingredients: this.ingredients,
            slug: this.slug,
          })
          .then(() => {
            //do something after added to db
            this.$router.push({ name: "Home" });
          });
      } else {
        this.feedback = "Please enter a smoothie title.";
      }
    },
    //adding ing
    addIng() {
      if (this.another) {
        //push to empty array
        this.ingredients.push(this.another);
        //console.log("ingredients", this.ingredients);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "Please enter a value.";
      }
    },
    //deleting ing
    deleteIng(ing) {
      this.ingredients = this.ingredients.filter((ingredient) => {
        return ingredient !== ing;
      });
    },
  },
};
</script>

<style>
.add-smoothie {
  position: relative;
  z-index: 1000;
  margin-top: 60px;
  max-width: 500px;
}
.add-smoothie h2 {
  font-size: 2rem;
  margin: 0.8rem auto;
}
.add-smoothie .field {
  margin: 0.5rem auto;
  position: relative;
}
.add-smoothie .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #e91e63;
  font-size: 1.4rem;
  cursor: pointer;
  opacity: 0.7;
}
</style>
