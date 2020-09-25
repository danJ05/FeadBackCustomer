import Vue from "vue";
import VueRouter from "vue-router";
// import Home from '../views/Home.vue'
import LoginPage from "../views/LoginPage";
import Register from "../views/Register";
import Dashboard from "../views/admin/Dashboard";
import AdminLogin from "../views/admin/AdminLogin";
import CreateSondage from "../views/admin/CreateSondage";
import NotFound from "../views/NotFound.vue";
import Menu from "../components/Menu.vue";
import Profile from "../components/Profile.vue";
import RatingPage from "../views/RatingPage.vue";
// import Rating from "../views/Rating.vue";
import Suggestion from "../components/Suggestions.vue";
import Preoccupation from "../components/Preoccupation.vue";
import UserPage from "../views/UserPage.vue";
import Preoccup from "../views/admin/Preoccup.vue";
import AdminUsers from "../views/admin/AdminUsers.vue";
import ReponsesQuestions from "../views/admin/ReponsesQuestions.vue";
// import VueReponses from "../views/admin/VueReponses.vue";
import ListSuggest from "../views/ListSuggest.vue";
import ListPreo from "../views/ListPreo.vue";
import ListFormation from "../views/ListFormation.vue";
import ListPrestation from "../views/ListPrestation.vue";
import Statistics from "../views/admin/Statistics.vue";
import SuggestionAdmin from "../views/admin/SuggestionAdmin.vue";
// import Home from "../views/Home.vue";
import ListeSondage from "../views/admin/ListeSondage.vue";
import viewSondage from "../views/admin/viewSondage.vue";
import ListUsers from "../views/admin/ListUsers.vue";
import ListeSondageClient from "../views/ListeSondageClient.vue";
import Sexe from "../views/admin/Sexe.vue";
import Besoin from "../views/Besoins.vue";
import BesoinView from "../views/admin/BesoinView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Besoin,
  },
  {
    path: "/connexion",
    name: "LoginPage",
    component: LoginPage,
  },
  // {
  //   path: "/inscription",
  //   name: "Register",
  //   component: Register,
  // },
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
      // {
      //   path: "/rating",
      //   component: RatingPage,
      // },
      {
        path: "/sondage/list/:id",
        component: ListeSondageClient,
      },
      {
        path: "/rating/:id_sondage/:id_user",
        component: RatingPage,
      },
      // {
      //   path: "/sondage_list",
      //   component: Rating,
      // },
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
      {
        path: "/formation/list/:id",
        component: ListFormation,
      },
      {
        path: "/prestation/list/:id",
        component: ListPrestation,
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
    redirect: "/home",
    children: [
      {
        path: "/home",
        component: CreateSondage,
      },
      {
        path: "/sondages",
        component: ListeSondage,
      },
      {
        path: "/sondages/1",
        component: viewSondage,
      },
      {
        path: "/besoins",
        component: BesoinView,
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
        path: "/suggests",
        component: SuggestionAdmin,
      },
      {
        path: "/view/sondage/:id_sondage",
        component: viewSondage,
      },
      {
        path: "/stats",
        component: Statistics,
      },
      {
        path: "/adduser",
        component: Register,
      },
      {
        path: "/users",
        component: ListUsers,
      },
      {
        path: "/stats/sexe",
        component: Sexe,
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
