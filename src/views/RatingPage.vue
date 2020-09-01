<template>
  <div>
    <div v-for="(item, index) in list" :key="index">
      <v-card :id="index" class="mx-auto my-3" max-width="500">
        <v-card-text>
          {{ item.content }}
          <v-rating
            v-model="rating"
            background-color="orange lighten-3"
            color="orange"
          ></v-rating>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import RatingCard from "../components/RatingCard";
export default {
  name: "RatingPage",
  components: {},
  data() {
    return {
      token: "",
      user: "",
      rating: "",
      list: "",
      step: 1,
    };
  },
  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Sign-up";
        case 2:
          return "Create a password";
        default:
          return "Account created";
      }
    },
  },
  async mounted() {
    await axios
      .get("http://localhost:3000/api/question")
      .then((res) => (this.list = res.data.list))
      .catch((err) => console.log(err));

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
    if (localStorage.getItem("token") === null) {
      this.$router.push("/connexion");
    }
  },
};
</script>
