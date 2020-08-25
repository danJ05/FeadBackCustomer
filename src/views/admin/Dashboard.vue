<template>
  <div>
    <nav>
      <v-app-bar app flat>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title class="text-uppercase grey--text">
          <span>DASHBOARD</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text @click="logout">
          <span>Se deconnecter</span>
          <v-icon medium color="red darken-2" right>mdi-exit-to-app</v-icon>
        </v-btn>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" app class="grey lighten-4">
        <v-list nav flat>
          <v-list-item-group>
            <v-list-item two-line :class="miniVariant && 'px-0'">
              <v-list-item-avatar>
                <v-avatar color="red" size="35">
                  <span class="white--text">A</span>
                </v-avatar>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ admin.admin_id }}</v-list-item-title>
                <v-list-item-subtitle>Administrateur</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>
            <v-list-item
              v-for="item in items"
              :key="item.title"
              link
              :to="item.route"
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </nav>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Dashboard",
  data() {
    return {
      admin: "",
      tokenAdmin: "",
      initial: "",
      drawer: false,
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard", route: "/dashboard" },
        {
          title: "Utilisateurs",
          icon: "mdi-account-group",
          route: "/admin/users",
        },
        {
          title: "Questionnaire",
          icon: "mdi-comment-question-outline",
          route: "/questions",
        },
        {
          title: "Suggestions",
          icon: "mdi-lightbulb-on",
          route: "/suggest",
        },
        {
          title: "Préoccupations",
          icon: "mdi-account-question-outline",
          route: "/list-preoccupation",
        },
        { title: "Statistiques", icon: "mdi-chart-bar", route: "/admin/stats" },
      ],
      miniVariant: false,
      expandOnHover: true,
    };
  },
  computed: {
    // getInitials: function() {
    //   var nom = this.admin.nom;
    //   var prenoms = this.admin.prenoms;
    //   return nom.charAt(0) + prenoms.charAt(0);
    // },
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/admin");
      // console.log("logged out!");
    },
  },
  async mounted() {
    // console.log(localStorage.getItem("tokenAdmin"));
    await axios
      .get("http://localhost:3000/api/admin", {
        headers: { token: localStorage.getItem("tokenAdmin") },
      })
      .then((res) => {
        // console.log(res.data);
        this.admin = res.data;
        // console.log(res.data.msg);
        // console.log(this.admin);
      })
      .catch((error) => console.log(error));
  },
  created() {
    if (
      localStorage.getItem("tokenAdmin") === null ||
      localStorage.getItem("tokenAdmin") === undefined
    ) {
      this.$router.push("/admin");
    } else {
      this.tokenAdmin = localStorage.getItem("tokenAdmin");
    }
  },
};
</script>

<style scoped></style>
