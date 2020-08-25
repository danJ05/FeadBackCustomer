<template>
  <div>
    <v-card>
      <v-list-item-group v-model="item" color="primary">
        <div v-for="(item, i) in list.list" :key="i">
          <v-list-item two-line @click="hey(item.id)">
            <v-list-item-content>
              <v-list-item-title>Question {{ i + 1 }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.content }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list-item-group>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ReponsesQuestions",
  data() {
    return {
      item: "",
      admin: "",
      tokenAdmin: "",
      list: "",
    };
  },
  methods: {
    async hey(id) {
      this.$router.push(`/view-questions/${id}`);
    },
    logout() {
      localStorage.clear();
      this.$router.push("/admin");
      console.log("logged out!");
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
      })
      .catch((error) => console.log(error));

    await axios
      .get("http://localhost:3000/api/question")
      .then((res) => {
        // console.log(res.data);
        this.list = res.data;
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
