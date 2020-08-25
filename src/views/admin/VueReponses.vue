<template>
  <div>
    <h1>Q: {{ question.content }}</h1>

    <div v-if="!list">
      Aucune reponse pour le moment.
    </div>
    <div v-else>
      <div v-for="(item, i) in list" :key="i">
        <div class="col-md-6 m-2">
          <v-card class="mx-auto" max-width="344">
            <v-card-text>
              <p class="display-1 text--primary">
                <!-- be•nev•o•lent -->{{ item.nom }} • {{ item.statut }}
              </p>
              <div class="text--primary">
                {{ item.content }}
              </div>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ReponsesQuestions",
  data() {
    return {
      list: "",
      admin: "",
      tokenAdmin: "",
      question: "",
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/admin");
      console.log("logged out!");
    },
  },
  async mounted() {
    await axios
      .get(`http://localhost:3000/api/question/${this.$route.params.id}`)
      .then((res) => {
        console.log(res.data);
        this.question = res.data.list[0];
      })
      .catch((error) => console.log(error));
    // console.log(this.$route.params.id);
    const credential = {
      id: this.$route.params.id,
    };
    await axios
      .post("http://localhost:3000/api/questionVue", credential)
      .then((res) => {
        console.log(res.data);
        this.list = res.data.list;
      })
      .catch((error) => console.log(error));

    await axios
      .get("http://localhost:3000/api/admin", {
        headers: { token: localStorage.getItem("tokenAdmin") },
      })
      .then((res) => {
        // console.log(res.data);
        this.admin = res.data;
        // console.log(res.data.msg);
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
