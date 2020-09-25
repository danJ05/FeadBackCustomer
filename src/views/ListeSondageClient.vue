<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <h1 class="display-2 mb-5 font-weight-bolder">Liste des sondages</h1>
        <div v-for="(item, i) in list.sondages" :key="i">
          <div class="col-md-12">
            <v-card class="mx-auto">
              <v-card-text>
                <h4 class="text--primary text-uppercase font-weight-bold">
                  <span>{{ item.lib_sondage }}</span>
                </h4>
                <div class="text--primary">
                  <span class="font-weight-bold">Type prestation</span> :
                  {{ item.type_prestation }}
                </div>
                <div class="text--primary">
                  <span class="font-weight-bold">Prestation</span> :
                  {{ item.prestation_sondage }}
                </div>
                <div class="text--primary">
                  <span class="font-weight-bold" style="float: left"
                    >Date création</span
                  >
                  :
                  {{
                    new Date(item.date_creation).getDate() +
                      "/" +
                      (new Date(item.date_creation).getMonth() + 1) +
                      "/" +
                      new Date(item.date_creation).getFullYear()
                  }}
                  <!-- {{ typeof  }} -->
                  <span v-if="item.done === 'yes'" style="float: right">
                    <v-icon :color="'green'" :large="true"
                      >mdi-check-all</v-icon
                    >
                    déjà répondu
                  </span>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  :disabled="item.done === 'yes' ? true : false"
                  @click="voirSondage(item.id_sondage, user.id)"
                  text
                  color="deep-purple accent-4"
                >
                  Répondre
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </div>
      </div>
    </div>
    <v-snackbar
      :bottom="y === 'bottom'"
      :right="x === 'right'"
      :timeout="15000"
      v-model="snack"
      color="success"
      >Question ajoutée</v-snackbar
    >
    <v-snackbar
      :bottom="y === 'bottom'"
      :right="x === 'left'"
      :timeout="15000"
      v-model="snack2"
      color="error"
      >{{ msg }}</v-snackbar
    >
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ListeSondage",
  data() {
    return {
      user: "",
      token: "",
      content: "",
      msg: "",
      autoGrow: true,
      rows: 3,
      list: "",
      questions: [],
      snack: false,
      snack2: false,
      x: "left",
      y: "bottom",
      done: "",
      tab: [],
    };
  },
  methods: {
    voirSondage(id_sondage, user_id) {
      this.$router.push(`/rating/${id_sondage}/${user_id}`);
    },
    logout() {
      localStorage.clear();
      this.$router.push("/");
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
      .catch((error) => console.log(error));

    await axios
      .get(`http://localhost:3000/api/getSondage/${this.$route.params.id}`)
      .then((res) => {
        this.list = res.data;
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
      this.tokenAdmin = localStorage.getItem("token");
    }
  },
};
</script>
