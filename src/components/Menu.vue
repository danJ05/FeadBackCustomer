<template>
  <div>
    <!-- <div v-if="user.nom === null || user.nom === undefined">
      {{ this.$router.push("/connexion") }}
    </div> -->
    <div class="row align-self-center align-items-center">
      <div class="col-md-12 col-sm-12">
        <v-alert text color="info">
          <div class="display-1 text-capitalize font-weight-bold">
            <span>{{ salute }}</span> {{ user.nom }}
          </div>
        </v-alert>

        <!-- <vue-speech /> -->
        <div class="text-center shadow-sm p-2 bg-white">
          <img
            class="img-fluid"
            width="200px"
            src="../assets/user_interface.svg"
          />
          <div class="col">
            <p class="sub">Participer au sondage</p>
          </div>
          <div class="text-black-50">
            Donnez votre avis sur nos differentes prestations.
          </div>
          <div class="col">
            <button class="boutton" @click="voirList(user.id)">Aller</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Menu",
  data() {
    return {
      token: "",
      user: "",
    };
  },
  computed: {
    salute: function() {
      var today = new Date();
      var curHr = today.getHours();

      if (curHr < 12) {
        return "Bonjour";
      } else if (curHr < 18) {
        return "Bonsoir";
      } else {
        return "Bonsoir";
      }
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/user", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        this.user = res.data;
      })
      .catch((error) => console.log(error));
  },
  //
  created() {
    if (
      localStorage.getItem("token") === null ||
      localStorage.getItem("token") === undefined ||
      this.user.nom === null
    ) {
      this.$router.push("/connexion");
    } else {
      this.token = localStorage.getItem("token");
    }
  },
  methods: {
    voirList(id) {
      console.log(id);
      this.$router.push(`/sondage/list/${id}`);
    },
  },
};
</script>

<style lang="css" scope>
.sub {
  font-weight: 500;
  font-size: 20px;
}
.boutton {
  margin: 15px 0px !important;
  padding: 10px 30px;
  color: #fff !important;
  border: none;
  background: #06f;
  border-radius: 2px;
  text-decoration: none;
}
</style>
