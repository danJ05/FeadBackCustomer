<template>
  <div>
    <div v-if="admin.admin_id === 'sanogo@admin'">
      {{ this.$router.push("/adduser") }}
    </div>
    <div class="row">
      <div class="col-md-12">
        <h1 class="display-2 mb-5 ml-5">Créer des sondages</h1>
        <h5 class="font-weight-light mb-5 ml-5">
          Soumettez des questions pour l'enquête de satisfaction
        </h5>
        <div class="col-md-8 mx-auto">
          <b-form-group
            id="input-group-1"
            label="Titre du sondage:"
            label-for="titresd"
          >
            <b-form-input
              id="titresd"
              v-model="lib_sondage"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-2"
            label="Type de la prestation:"
            label-for="type_prestation"
          >
            <b-form-select
              id="type_prestation"
              v-model="type_prestation"
              :options="typeFormation"
              required
            ></b-form-select>
          </b-form-group>
          <b-form-group
            id="input-group-3"
            label="Prestation :"
            label-for="select_prestation"
          >
            <b-form-select
              id="select_prestation"
              v-model="prestation"
              :options="prestations"
              required
            ></b-form-select>
          </b-form-group>

          <b-form-group label="Ajouter des questions">
            <b-form-radio v-model="selected" name="oui" value="oui"
              >Oui</b-form-radio
            >
            <b-form-radio v-model="selected" name="non" value="non"
              >Non</b-form-radio
            >
          </b-form-group>

          <div v-if="selected === 'oui'">
            <div class="row">
              <div class="col-md-6">Nombre de questions à ajouter :</div>
              <div class="col-md-2">
                <v-select v-model="nb" :items="items"></v-select>
              </div>
            </div>

            <div v-for="(item, i) in nb" :key="i">
              <b-form-group
                id="input-group-5"
                :label="'Question' + ' ' + (i + 1)"
                label-for="quest1"
              >
                <!-- {{ `quest_${i}` = "") }} -->
                <b-form-input
                  id="quest1"
                  v-model="quest_[i]"
                  required
                ></b-form-input>
              </b-form-group>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8 mx-auto">
          <b-button @click="valider" block variant="success">Valider</b-button>
        </div>
      </div>
    </div>
    <v-snackbar
      :bottom="y === 'bottom'"
      :right="x === 'right'"
      :timeout="15000"
      v-model="snack"
      color="success"
      >Sondage créé</v-snackbar
    >
    <v-snackbar
      :bottom="y === 'bottom'"
      :right="x === 'left'"
      :timeout="15000"
      v-model="snack2"
      color="error"
      >Erreur dans la création du sondage</v-snackbar
    >
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CreateSondage",
  data() {
    return {
      nb: "",
      items: [1, 2, 3, 4, 5],
      admin: "",
      selected: "non",
      prestation: "",
      tokenAdmin: "",
      lib_sondage: "",
      quest_: [],
      msg: "",
      autoGrow: true,
      rows: 3,
      prestations: [
        "Service web",
        "Service mobile",
        "Billetterie",
        "Personnel Naviguant Commercial",
        "Fret Aérien",
      ],
      type_prestation: "",
      typeFormation: ["Services Techniques", "Formation"],
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
        lib_sondage: this.lib_sondage,
        type_prestation: this.type_prestation,
        prestation_sondage: this.prestation,
        quest_1: this.quest_[0],
        quest_2: this.quest_[1],
        quest_3: this.quest_[2],
        quest_4: this.quest_[3],
        quest_5: this.quest_[4],
      };

      console.log(credentials);
      await axios
        .post("http://localhost:3000/api/createsondage", credentials)
        .then((res) => {
          if (res.status === 200) {
            this.snack = true;
            this.msg = res.data.msg;
            console.log(res.data);
          } else if (res.status === 401) {
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
