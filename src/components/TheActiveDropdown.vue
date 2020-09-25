<template>
  <div>
    <b-dropdown variant="text" toggle-class="text-decoration-none">
      <template v-slot:button-content>
        <b-avatar :text="getInitials()" fluid size="3rem"></b-avatar
        ><span class="ml-2">{{ votreNom }}</span>
      </template>
      <b-dropdown-item to="/profil">Profil</b-dropdown-item>
      <b-dropdown-item variant="danger" @click="logout"
        >Se deconnecter</b-dropdown-item
      >
    </b-dropdown>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "TheActiveDropdown",
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/connexion");
      console.log("logged out!");
    },
    getInitials() {
      return this.user.nom.charAt(0);
    },
  },

  data() {
    return {
      token: "",
      user: "",
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/user", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        this.user = res.data;
      })
      .catch((err) => console.log(err));
  },
  created() {
    if (
      localStorage.getItem("token") === null ||
      localStorage.getItem("token") === undefined
    ) {
      this.$router.push("/connexion");
    } else {
      this.token = localStorage.getItem("token");
    }
  },
  computed: {
    votreNom() {
      if (this.user.prenom === null) return this.user.nom;
      return this.user.nom + " " + this.user.prenom;
    },
  },
};
</script>
