<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <h1 class="display-2 font-weight-bolder mb-5">
          <!-- style="color: #3F51B5; letter-spacing: 10px" -->
          Réponses aux sondages
        </h1>
        <h5 class="font-weight-light mb-5">
          Consultez les reponses aux sondages que vous avez créés
        </h5>
        <div v-for="(item, i) in list" :key="i">
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
                  <span class="font-weight-bold">Date création</span> :
                  {{
                    new Date(item.date_creation).getDate() +
                      "/" +
                      (new Date(item.date_creation).getMonth() + 1) +
                      "/" +
                      new Date(item.date_creation).getFullYear()
                  }}
                  <!-- {{ typeof  }} -->
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  @click="voirSondage(item.id_sondage)"
                  text
                  color="blue accent-4"
                >
                  Voir
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ListeSondage",
  data() {
    return {
      admin: "",
      tokenAdmin: "",
      content: "",
      msg: "",
      autoGrow: true,
      rows: 3,
      questions: [],
      snack: false,
      snack2: false,
      x: "left",
      y: "bottom",
      list: "",
    };
  },
  methods: {
    voirSondage(id_sondage) {
      this.$router.push(`/view/sondage/${id_sondage}`);
    },
    async valider() {
      const credentials = {
        content: this.content,
        id_admin: this.admin.admin_id,
      };
      await axios
        .post("http://localhost:3000/api/question", credentials)
        .then((res) => {
          if (res.status === 200) {
            (this.content = ""), (this.snack = true);
            this.msg = "";
            // this.$router.go();
            console.log(res.data);
          } else {
            this.msg = res.data.msg;
            console.log(this.msg);
          }
        })
        .catch((err) => {
          this.msg = err.response.data.msg;
          console.log(err.response);
          this.snack2 = true;
        });

      // axios.post("http://localhost:3000/api/question");
    },
    logout() {
      localStorage.clear();
      this.$router.push("/admin");
      // console.log("logged out!");
    },
  },
  async mounted() {
    await axios
      .get("http://localhost:3000/api/admin", {
        headers: { token: localStorage.getItem("tokenAdmin") },
      })
      .then((res) => {
        this.admin = res.data;
        console.log(this.admin);
      })
      .catch((error) => console.log(error));

    await axios
      .get("http://localhost:3000/api/getListSondage")
      .then((res) => {
        // console.log(res.data);
        this.list = res.data.result;
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
