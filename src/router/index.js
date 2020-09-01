import Vue from "vue";
import VueRouter from "vue-router";
// import Home from '../views/Home.vue'
import LoginPage from "../views/LoginPage";
import Register from "../views/Register";
import Dashboard from "../views/admin/Dashboard";
import AdminLogin from "../views/admin/AdminLogin";
import Questions from "../views/admin/Questions";
import NotFound from "../views/NotFound.vue";
import Menu from "../components/Menu.vue";
import Profile from "../components/Profile.vue";
import RatingPage from "../views/RatingPage.vue";
import Rating from "../views/Rating.vue";
import Suggestion from "../components/Suggestions.vue";
import Preoccupation from "../components/Preoccupation.vue";
import UserPage from "../views/UserPage.vue";
import Preoccup from "../views/admin/Preoccup.vue";
import AdminUsers from "../views/admin/AdminUsers.vue";
import ReponsesQuestions from "../views/admin/ReponsesQuestions.vue";
import VueReponses from "../views/admin/VueReponses.vue";
import ListSuggest from "../views/ListSuggest.vue";
import ListPreo from "../views/ListPreo.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/connexion",
  },
  {
    path: "/connexion",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: "/inscription",
    name: "Register",
    component: Register,
  },
  {
    path: "/user",
    name: "UserPage",
    component: UserPage,
    children: [
      {
        path: "/menu",
        component: Menu,
      },
      {
        path: "/profil",
        component: Profile,
      },
      {
        path: "/rating",
        component: RatingPage,
      },
      {
        path: "/choix",
        component: Rating,
      },
      {
        path: "/suggestions",
        component: Suggestion,
      },
      {
        path: "/suggestions/list/:id",
        component: ListSuggest,
      },
      {
        path: "/preoccupation",
        component: Preoccupation,
      },
      {
        path: "/preoccupation/list/:id",
        component: ListPreo,
      },
    ],
  },
  {
    path: "/admin",
    redirect: "/admin/login",
  },
  {
    path: "/admin/login",
    component: AdminLogin,
  },
  {
    path: "/dashboard",
    component: Dashboard,
    children: [
      {
        path: "/questions",
        component: Questions,
      },
      {
        path: "/list-preoccupation",
        component: Preoccup,
      },
      {
        path: "/admin/users",
        component: AdminUsers,
      },
      {
        path: "/view-questions",
        component: ReponsesQuestions,
      },
      {
        path: "/view-questions/:id",
        name: "responses_to_questions",
        component: VueReponses,
      },
    ],
  },
  { path: "/404", component: NotFound },
  { path: "*", redirect: "/404" },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
