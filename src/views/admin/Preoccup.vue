<template>
  <div>
    {{ index }}
    <v-data-table
      :locale="locale"
      :headers="headers"
      :items="list.listpreo"
      :sort-by="['nom']"
      item-key="id"
      class="elevation-1"
    ></v-data-table>
    <!-- <div v-for="(item, index) in list.listpreo" :key="index">
      {{ index + 1 }} - {{ item.text }}
      <span style="color: blue">{{ item.nom }}</span>
    </div> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Preoccup",
  data() {
    return {
      locale: "fr-FR",
      index: "",
      admin: "",
      tokenAdmin: "",
      list: "",
      msg: "",
      headers: [
        {
          text: "#",
          align: "start",
          sortable: true,
          value: "",
        },
        { text: "Nom (prenoms)", value: "nom" },
        { text: "Préoccupation", value: "text" },
        { text: "Service", value: "service" },
      ],
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/admin");
      console.log("logged out!");
    },
    getIndexOfJSON() {
      this.index = -1;
      var needle = 200;
      this.list.find(function(item, i) {
        if (item.id === needle) {
          this.index = i;
        }
      });
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
      .get("http://localhost:3000/api/preo")
      .then((res) => {
        console.log(res.data);
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
