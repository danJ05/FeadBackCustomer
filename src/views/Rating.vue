<template>
  <div>
    <div class="row">
      <div v-if="user.statut === 'client'">
        <div
          class="col-md-5 mx-auto my-auto choice-a mx-1 shadow-sm p-4 lien"
          @click="hey(user.id)"
        >
          Noter les services déja réalisés pour vous
        </div>
      </div>
      <div v-else-if="user.statut === 'etudiant'">
        <div
          class="col-md-5 mx-auto my-auto choice-a mx-1 shadow-sm p-4 lien"
          @click="hey_(user.id)"
        >
          Noter les formations que vous avez suivies
        </div>
      </div>

      <router-link
        class="col-md-5 mx-auto my-auto choice-b mx-1 shadow-sm p-4 lien"
        to="/rating"
      >
        Prendre part à l'enquête
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Rating",

  data() {
    return {
      token: "",
      user: "",
      list: "",
    };
  },
  methods: {
    async hey(id) {
      this.$router.push(`/prestation/list/${id}`);
    },
    async hey_(id) {
      this.$router.push(`/formation/list/${id}`);
    },
  },
  async mounted() {
    await axios
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
    }
  },
};
</script>

<style lang="css">
.choice-a,
.choice-b {
  border: 2px solid black;
  color: black !important;
  border-radius: 2px;
  text-decoration: none;
  background-color: #fff;
}
.choice-a:hover,
.choice-b:hover {
  color: #348def !important;
  border: 2px solid #348def;
  text-decoration: none;
  border-radius: 2px;
}
.lien {
  cursor: pointer;
}
</style>
