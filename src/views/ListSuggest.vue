<template>
  <div>A {{ user.id }}</div>
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
    const credential = {
      id: this.user.id,
    };
    await axios
      .get("http://localhost:3000/api/list_suggest", credential)
      .then((res) => {
        console.log(res.data);
        // this.list = res.data.list[0];
      })
      .catch((error) => console.log(error));
    await axios
      .get("http://localhost:3000/api/user", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        this.user = res.data;
      })
      .catch((error) => console.log(error));
  },
  created() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/connexion");
    } else {
      this.token = localStorage.getItem("token");
    }
  },
  methods: {},
};
</script>

<style lang="css" scoped></style>
