<template>
  <div>
    <div class="row">
      <div class="col-md-8 mx-auto mt-5">
        <RatingCard />

        <b-button block variant="primary" class="mt-4">Valider</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import RatingCard from "../components/RatingCard";
export default {
  name: "RatingPage",
  components: {
    RatingCard,
  },
  data() {
    return {
      token: "",
      user: "",
      list: "",
    };
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

    await axios
      .get("http://localhost:3000/api/question")
      .then((res) => {
        // console.log(res.data);
        this.list = res.data;
      })
      .catch((error) => console.log(error));
  },
  created() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/connexion");
    } else {
      this.token = localStorage.getItem("token");
      this.$router.push("/menu");
    }
  },
};
</script>
