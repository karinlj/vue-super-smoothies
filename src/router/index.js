import Vue from "vue"; //for Vue.use();
import Router from "vue-router";
import Home from "../components/Home";
import Signup from "../components/auth/Signup";
import Login from "../components/auth/Login";
import ViewProfile from "../components/profile/ViewProfile";
import AddSmoothie from "../components/AddSmoothie";
import EditSmoothie from "../components/EditSmoothie";
import firebase from "firebase";

Vue.use(Router);
//new router instance
const router = new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/signup",
      name: "Signup",
      component: Signup,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/add-smoothie",
      name: "AddSmoothie",
      component: AddSmoothie,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/edit-smoothie/:smoothie_slug",
      name: "EditSmoothie",
      component: EditSmoothie,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/profile/:id",
      name: "ViewProfile",
      component: ViewProfile,
      meta: {
        requiresAuth: true,
      },
    },
  ],
  mode: "history",
});

//protect route
router.beforeEach((to, from, next) => {
  //check to see if route requires auth
  if (to.matched.some((rec) => rec.meta.requiresAuth)) {
    //check auth state of user
    let user = firebase.auth().currentUser;
    if (user) {
      //user signed in-proceed to route
      next();
    } else {
      //no user signed in-redirect to login
      next({ name: "Login" });
    }
  } else {
    next();
  }
});

export default router;
