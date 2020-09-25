<template>
  <div>
    <div><h1>Mes préoccupations</h1></div>
    <div v-for="(item, i) in list" :key="i">
      <div class="row">
        <div class="card col-md-6 mx-auto m-4 p-4">
          <div class="display-1 mb-2">Service : {{ item.service }}</div>
          <div class="">{{ item.text }}</div>
          <hr />
          <div v-if="item.reponse == null">Pas encore repondu</div>
          <div v-else>{{ item.reponse }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ListSuggest",
  data() {
    return {
      token: "",
      user: "",
      list: "",
    };
  },
  async mounted() {
    // const credential = {
    //   id_user: this.user.id,
    //   nom: "AAA",
    // };

    await axios
      .get("http://localhost:3000/api/user", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        this.user = res.data;
      })
      .catch((error) => console.log(error));

    // console.log(this.$route.params.id);

    await axios
      .get(`http://localhost:3000/api/list_preo/${this.$route.params.id}`)
      .then((res) => {
        console.log(res.data);
        this.list = res.data.list;
      })
      .catch((error) => console.log(error));
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
  methods: {},
};
</script>

<style lang="css" scoped></style>
