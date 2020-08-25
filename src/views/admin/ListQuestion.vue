<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <h1 class="display-2 mb-5">Entrez des questions</h1>
        <h5 class="font-weight-light mb-5">
          Soumettez des questions pour l'enquête de satisfaction
        </h5>
        <div class="col-md-12">
          <v-textarea
            outlined
            filled
            :rows="rows"
            :auto-grow="autoGrow"
            name="input-7-4"
            label="Questions pour l'enquête"
            v-model="content"
          ></v-textarea>
          <b-button @click="valider" block variant="primary">Ajouter</b-button>
        </div>
      </div>
      <v-btn class="ma-2" block tile outlined color="success">
        Voir les questions
      </v-btn>
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
  name: "ListQuestion",
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
    };
  },
  methods: {
    async valider() {
      const credentials = {
        content: this.content,
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

      axios.post("http://localhost:3000/api/question");
    },
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
        // console.log(res.data);
        this.admin = res.data;
        // console.log(res.data.msg);
        // console.log(this.admin);
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
