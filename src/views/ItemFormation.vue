<template>
  <div>
    <div class="row">
      <div class="col-md-9"><h1 class="mb-5">Formation :</h1></div>
    </div>
    <div class="col-md-8 col-sm-12 m-3 mx-auto">
      <div class="text-center shadow-sm bg-white p-5">
        <v-rating v-model="note"></v-rating>
        <button class="btn btn-block" @click="submit">Valider</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ItemFormation",
  data() {
    return {
      token: "",
      user: "",
      note: "",
    };
  },
  methods: {
    // async hey(id) {
    //   this.$router.push(`/preoccupation/list/${id}`);
    // },
    async submit() {
      try {
        let credential = {
          note: this.note,
        };
        await axios
          .post("http://localhost:3000/api/formation", credential)
          .then((res) => console.log(res.data))
          .catch((error) => console.log(error));
      } catch (err) {
        console.log(err);
      }

      this.text = "";
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/user", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        this.user = res.data;
        console.log(this.user);
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
};
</script>
