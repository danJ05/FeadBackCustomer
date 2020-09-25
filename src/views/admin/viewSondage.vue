<template>
  <div>
    <div class="row">
      <div v-if="result[0] === undefined || result[0] === null">
        <h1 class="col-md-12 ml-2">Aucune reponse pour le moment</h1>
      </div>
      <div v-else>
        <div class="col-md-12 ml-2">
          <h2 class="display-2 mb-5 font-weight-bolder text-uppercase ">
            {{ result[0].lib_sondage }}
          </h2>

          <div class="text--primary m-2">
            <span class="font-weight-bold">Type prestation</span> :
            {{ result[0].type_prestation }}
          </div>
          <div class="text--primary m-2">
            <span class="font-weight-bold">Prestation</span> :
            {{ result[0].prestation_sondage }}
          </div>
          <div class="text--primary m-2">
            <span class="font-weight-bold">Date création</span> :
            {{
              new Date(result[0].date_creation).getDate() +
                "/" +
                (new Date(result[0].date_creation).getMonth() + 1) +
                "/" +
                new Date(result[0].date_creation).getFullYear()
            }}
          </div>

          <div class="col-md-12">
            <v-card class="mx-auto p-5">
              <h4 class="text--primary">
                Comment evaluez vous la qualité de la prestation réalisée ?
              </h4>
              <div class="row mb-4">
                <div
                  class="d-flex flex-column align-items-center justify-content-center col-auto"
                >
                  <v-card-text>
                    <v-progress-circular
                      :rotate="360"
                      :size="100"
                      :width="15"
                      :value="def1[0]"
                      color="red"
                    >
                      {{ def1[0] }}
                    </v-progress-circular>
                  </v-card-text>
                  <span>1 étoile</span>
                </div>

                <div
                  class="d-flex flex-column align-items-center justify-content-center col-auto"
                >
                  <v-card-text>
                    <v-progress-circular
                      :rotate="360"
                      :size="100"
                      :width="15"
                      :value="def1[1]"
                      color="pink"
                    >
                      {{ def1[1] }}
                    </v-progress-circular>
                  </v-card-text>
                  <span>2 étoiles</span>
                </div>

                <div
                  class="d-flex flex-column align-items-center justify-content-center col-auto"
                >
                  <v-card-text>
                    <v-progress-circular
                      :rotate="360"
                      :size="100"
                      :width="15"
                      :value="def1[2]"
                      color="info"
                    >
                      {{ def1[2] }}
                    </v-progress-circular>
                  </v-card-text>
                  <span>3 étoiles</span>
                </div>

                <div
                  class="d-flex flex-column align-items-center justify-content-center col-auto"
                >
                  <v-card-text>
                    <v-progress-circular
                      :rotate="360"
                      :size="100"
                      :width="15"
                      :value="def1[3]"
                      color="primary"
                    >
                      {{ def1[3] }}
                    </v-progress-circular>
                  </v-card-text>
                  <span>4 étoiles</span>
                </div>

                <div
                  class="d-flex flex-column align-items-center justify-content-center col-auto"
                >
                  <v-card-text>
                    <v-progress-circular
                      :rotate="360"
                      :size="100"
                      :width="15"
                      :value="def1[4]"
                      color="success"
                    >
                      {{ def1[4] }}
                    </v-progress-circular>
                  </v-card-text>
                  <span>5 étoiles</span>
                </div>
              </div>

              <h4 class="text--primary">
                A quel niveau recommanderiez-vous cette prestation ?
              </h4>
              <div class="row mb-4">
                <div
                  class="d-flex flex-column align-items-center justify-content-center col-auto"
                >
                  <v-card-text>
                    <v-progress-circular
                      :rotate="360"
                      :size="100"
                      :width="15"
                      :value="def2[0]"
                      color="red"
                    >
                      {{ def2[0] }}
                    </v-progress-circular>
                  </v-card-text>
                  <span>1 étoile</span>
                </div>

                <div
                  class="d-flex flex-column align-items-center justify-content-center col-auto"
                >
                  <v-card-text>
                    <v-progress-circular
                      :rotate="360"
                      :size="100"
                      :width="15"
                      :value="def2[1]"
                      color="pink"
                    >
                      {{ def2[1] }}
                    </v-progress-circular>
                  </v-card-text>
                  <span>2 étoiles</span>
                </div>

                <div
                  class="d-flex flex-column align-items-center justify-content-center col-auto"
                >
                  <v-card-text>
                    <v-progress-circular
                      :rotate="360"
                      :size="100"
                      :width="15"
                      :value="def2[2]"
                      color="info"
                    >
                      {{ def2[2] }}
                    </v-progress-circular>
                  </v-card-text>
                  <span>3 étoiles</span>
                </div>

                <div
                  class="d-flex flex-column align-items-center justify-content-center col-auto"
                >
                  <v-card-text>
                    <v-progress-circular
                      :rotate="360"
                      :size="100"
                      :width="15"
                      :value="def2[3]"
                      color="primary"
                    >
                      {{ def2[3] }}
                    </v-progress-circular>
                  </v-card-text>
                  <span>4 étoiles</span>
                </div>

                <div
                  class="d-flex flex-column align-items-center justify-content-center col-auto"
                >
                  <v-card-text>
                    <v-progress-circular
                      :rotate="360"
                      :size="100"
                      :width="15"
                      :value="def2[4]"
                      color="success"
                    >
                      {{ def2[4] }}
                    </v-progress-circular>
                  </v-card-text>
                  <span>5 étoiles</span>
                </div>
              </div>

              <h4 class="text--primary">
                Préoccupations
              </h4>
              <p>
                <v-dialog
                  v-model="dialog"
                  fullscreen
                  hide-overlay
                  transition="dialog-bottom-transition"
                  max-width="300px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn depressed small dark v-bind="attrs" v-on="on">
                      Voir les préoccupations
                    </v-btn>
                  </template>
                  <v-card>
                    <v-toolbar dark color="dark">
                      <v-btn icon dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                      <v-toolbar-title>Préoccupations</v-toolbar-title>
                      <v-spacer></v-spacer>
                    </v-toolbar>
                    <div v-for="(item, i) in result" :key="i">
                      <div class="mt-5 ml-5">
                        {{ item.re_preo }}
                        <span style="float: right" class="mr-5">{{
                          item.nom
                        }}</span>
                      </div>
                      <hr />
                    </div>
                  </v-card>
                </v-dialog>
              </p>

              <h4 class="text--primary">
                Suggestions
              </h4>
              <p>
                <v-dialog
                  v-model="dialog2"
                  fullscreen
                  hide-overlay
                  transition="dialog-bottom-transition"
                  max-width="300px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn depressed small dark v-bind="attrs" v-on="on">
                      Voir les suggestions
                    </v-btn>
                  </template>
                  <v-card>
                    <v-toolbar dark color="dark">
                      <v-btn icon dark @click="dialog2 = false">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                      <v-toolbar-title>Suggestions</v-toolbar-title>
                      <v-spacer></v-spacer>
                    </v-toolbar>
                    <div v-for="(item, i) in result" :key="i">
                      <div class="mt-5 ml-5">
                        {{ item.re_suggest
                        }}<span style="float: right" class="mr-5">{{
                          item.nom
                        }}</span>
                      </div>

                      <hr />
                    </div>
                  </v-card>
                </v-dialog>
              </p>
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
  name: "viewSondage",
  data() {
    return {
      fields: ["nom", "prenoms", "statut"],
      admin: "",
      tokenAdmin: "",
      content: "",
      result: "",
      msg: "",
      autoGrow: true,
      rows: 3,
      value: 3,
      questions: [],
      def1: "",
      def2: "",
      quest1: "",
      quest2: "",
      quest3: "",
      quest4: "",
      quest5: "",
      dialog: false,
      dialog2: false,
    };
  },
  methods: {
    getRating() {},
    async valider() {
      const credentials = {
        content: this.content,
        id_admin: this.admin.admin_id,
      };
      await axios
        .post("http://localhost:3000/api/question", credentials)
        .then((res) => {
          if (res.status === 200) {
            this.msg = "";
            console.log(res.data);
          } else {
            this.msg = res.data.msg;
            console.log(this.msg);
          }
        })
        .catch((err) => {
          this.msg = err.response.data.msg;
          console.log(err.response);
        });
    },
    logout() {
      localStorage.clear();
    },
  },
  async mounted() {
    await axios
      .get("http://localhost:3000/api/admin", {
        headers: { token: localStorage.getItem("tokenAdmin") },
      })
      .then((res) => {
        this.admin = res.data;
      })
      .catch((error) => console.log(error));

    await axios
      .get(
        `http://localhost:3000/api/getReponse/${this.$route.params.id_sondage}`
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.result);
          this.result = res.data.result;
          this.def1 = res.data.def1;
          this.def2 = res.data.def2;
          this.quest1 = res.data.quest1;
          this.quest2 = res.data.quest2;
          this.quest3 = res.data.quest3;
          this.quest4 = res.data.quest4;
          this.quest5 = res.data.quest5;
        }
      });

    // axios.get()
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
