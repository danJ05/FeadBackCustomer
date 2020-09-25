<template>
  <div>
    <div><h1>Formations</h1></div>
    <div class="lead">
      Retrouvez ici les formations que vous avez suivies ou que vous suivez.
    </div>
    <div v-for="(item, i) in list" :key="i">
      <div class="row">
        <div class="card col-md-6 mx-auto m-4 p-4">
          <div class="row">
            <div class="col-md-9">
              <div class="display-1 mb-2">
                <span class="display-0"
                  >Formation {{ i + 1 }} : {{ item.libelle_formation }}</span
                >
              </div>
            </div>
            <b-button
              variant="primary"
              @click="viewFormation()"
              class="col-md-3"
              >Noter</b-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ListFormation",
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
      .get(`http://localhost:3000/api/formation/${this.$route.params.id}`)
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
