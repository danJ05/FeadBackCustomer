<template>
  <div>
    <div class="container-fluid">
      <h1 class="text-uppercase mb-5">Expressions des besoins</h1>

      <div v-for="(item, i) in besoin" :key="i">
        <v-card class="mb-4">
          <v-card-text>
            <div class="text--primary m-1">
              Société : {{ item.nom_structure }}
            </div>
            <div class="text--primary m-1">Email : {{ item.email }}</div>
            <div class="text--primary m-1">Contact : {{ item.contact }}</div>
            <div class="text--primary m-1">
              Nature de la prestation : {{ item.nature_prestation }}
            </div>
            <div class="text--primary m-1">
              Nombre de prestation voulue : {{ item.nb_prestation }}
            </div>
            <div class="text--primary m-1">
              Nombre de bénéficiaire : {{ item.nb_beneficiaire }}
            </div>
            <div class="text--primary m-1">
              Niveau hiérachique : {{ item.niveau_hierachique }}
            </div>
            <div class="text--primary m-1">
              Autre niveau hiérachique : {{ item.autre_niveau_hierachique }}
            </div>
            <div class="text--primary m-1">
              Aptitude en informatique et bureautique : {{ item.aptitude_info }}
            </div>
            <div class="text--primary m-1">
              Détail du besoin: {{ item.detail_besoin }}
            </div>
            <div class="text--primary m-1">
              Date début :
              {{
                new Date(item.start_date).getDate() +
                  "/" +
                  (new Date(item.start_date).getMonth() + 1) +
                  "/" +
                  new Date(item.start_date).getFullYear()
              }}
            </div>
            <div class="text--primary m-1">
              Date fin :
              {{
                new Date(item.end_date).getDate() +
                  "/" +
                  (new Date(item.end_date).getMonth() + 1) +
                  "/" +
                  new Date(item.end_date).getFullYear()
              }}
            </div>
            <div class="text--primary m-1">
              Budget :
              {{
                new Intl.NumberFormat("ci-CI", {
                  style: "currency",
                  currency: "XOF",
                }).format(item.budget)
              }}
            </div>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// let SpeechRecognition =
//   window.SpeechRecognition || window.webkitSpeechRecognition;
// let recognition = SpeechRecognition ? new SpeechRecognition() : false;
export default {
  name: "Dashboard",
  data() {
    return {
      admin: "",
      tokenAdmin: "",
      besoin: "",
    };
  },
  computed: {
    // getInitials: function() {
    //   var nom = this.admin.nom;
    //   var prenoms = this.admin.prenoms;
    //   return nom.charAt(0) + prenoms.charAt(0);
    // },
  },
  methods: {
    voice() {},
    logout() {
      localStorage.clear();
      this.$router.push("/admin");
      // console.log("logged out!");
    },
  },
  async mounted() {
    // console.log(localStorage.getItem("tokenAdmin"));
    await axios
      .get("http://localhost:3000/api/admin", {
        headers: { token: localStorage.getItem("tokenAdmin") },
      })
      .then((res) => {
        this.admin = res.data;
      })
      .catch((error) => console.log(error));

    await axios
      .get("http://localhost:3000/api/getBesoin")
      .then((res) => {
        this.besoin = res.data.result;
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

<style scoped></style>
