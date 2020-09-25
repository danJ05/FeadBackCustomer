<template>
  <div>
    <div v-if="done === false">
      <div
        class="display-4 col-md-10 mt-5 mx-auto font-weight-bold text-center"
      >
        <h2 class="text-uppercase">{{ list.lib_sondage }}</h2>
      </div>
      <div class="col-md-6 mt-5 mx-auto">
        <div class="text--primary m-2">
          <span class="font-weight-bold">Type prestation</span> :
          {{ list.type_prestation }}
        </div>
        <div class="text--primary m-2">
          <span class="font-weight-bold">Prestation</span> :
          {{ list.prestation_sondage }}
        </div>
      </div>

      <v-card class="mx-auto my-3" max-width="550">
        <v-card-text>
          <span class="black--text">{{ list.default_quest_1 }}</span>
          <v-rating
            v-model="rating"
            :hover="true"
            :large="true"
            background-color="orange lighten-3"
            color="orange"
          ></v-rating>
        </v-card-text>
      </v-card>

      <v-card class="mx-auto my-3" max-width="550">
        <v-card-text>
          <span class="black--text">{{ list.default_quest_2 }}</span>
          <v-rating
            v-model="rating0"
            :hover="true"
            :large="true"
            background-color="orange lighten-3"
            color="orange"
          ></v-rating>
        </v-card-text>
      </v-card>

      <div v-if="list.quest_1">
        <v-card class="mx-auto my-3" max-width="550">
          <v-card-text>
            {{ list.quest_1 }}
            <v-rating
              v-model="rating1"
              background-color="orange lighten-3"
              color="orange"
            ></v-rating>
          </v-card-text>
        </v-card>
      </div>

      <div v-if="list.quest_2">
        <v-card class="mx-auto my-3" max-width="550">
          <v-card-text>
            {{ list.quest_2 }}
            <v-rating
              v-model="rating2"
              background-color="orange lighten-3"
              color="orange"
            ></v-rating>
          </v-card-text>
        </v-card>
      </div>

      <div v-if="list.quest_3">
        <v-card class="mx-auto my-3" max-width="550">
          <v-card-text>
            {{ list.quest_3 }}
            <v-rating
              v-model="rating3"
              background-color="orange lighten-3"
              color="orange"
            ></v-rating>
          </v-card-text>
        </v-card>
      </div>

      <div v-if="list.quest_4">
        <v-card class="mx-auto my-3" max-width="650">
          <v-card-text>
            {{ list.quest_4 }}
            <v-rating
              v-model="rating4"
              background-color="orange lighten-3"
              color="orange"
            ></v-rating>
          </v-card-text>
        </v-card>
      </div>

      <div v-if="list.quest_5">
        <v-card class="mx-auto my-3" max-width="650">
          <v-card-text>
            {{ list.quest_5 }}
            <v-rating
              v-model="rating5"
              background-color="orange lighten-3"
              color="orange"
            ></v-rating>
          </v-card-text>
        </v-card>
      </div>

      <div class="col-md-7 col-sm-7 mx-auto">
        <p>Quels etaient les problèmes rencontrés ?</p>
        <v-textarea solo name="input-7-4" v-model="preo"></v-textarea>
      </div>

      <div class="col-md-7 col-sm-7 mx-auto">
        <p>Quelles sont vos suggestions pour améliorer notre prestation ?</p>
        <v-textarea solo name="input-7-4" v-model="suggest"></v-textarea>
      </div>

      <div class="row">
        <div class="col-md-7 col-sm-7 mt-5 mx-auto">
          <b-button block variant="primary" @click="submit(list.id_sondage)"
            >Valider</b-button
          >
        </div>
      </div>
      <v-snackbar
        :bottom="y === 'bottom'"
        :right="x === 'right'"
        :timeout="timeout"
        v-model="snack"
        color="success"
        >Sondage soumis
      </v-snackbar>
    </div>
    <div v-else>
      {{ this.$router.push("/menu") }}
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import RatingCard from "../components/RatingCard";
export default {
  name: "RatingPage",
  components: {},
  data() {
    return {
      token: "",
      msg: "",
      user: "",
      list: "",
      rating: 0,
      rating0: 0,
      rating1: 0,
      rating2: 0,
      rating3: 0,
      rating4: 0,
      rating5: 0,
      preo: "",
      suggest: "",
      timeout: 15000,
      snack: false,
      x: "right",
      y: "bottom",
      done: false,
    };
  },
  methods: {
    async submit(id_sondage) {
      const credentials = {
        re_default_quest1: this.rating,
        re_default_quest2: this.rating0,
        re_quest1: this.rating1,
        re_quest2: this.rating2,
        re_quest3: this.rating3,
        re_quest4: this.rating4,
        re_quest5: this.rating5,
        re_preo: this.preo,
        re_suggest: this.suggest,
        id_sondage: id_sondage,
        id_user: this.user.id,
      };
      await axios
        .post("http://localhost:3000/api/setSondage", credentials)
        .then((res) => {
          if (res.status === 200) {
            this.$swal.fire(
              "Bien joué!",
              "Le sondage a été validé!",
              "success"
            );
            this.done = true;
          } else if (res.status === 401) {
            this.$swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Vous n'avez pas rempli tous les champs",
            });
            this.$router.push("/menu");
          }
        })
        .catch((err) => {
          this.$swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Vous n'avez pas rempli tous les champs",
          });
          console.log(err);
        });
    },
  },
  async mounted() {
    await axios
      .get(
        `http://localhost:3000/api/ratesurvey/${this.$route.params.id_sondage}/${this.$route.params.id_user}`
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          this.list = res.data.nextPage[0];
        }
      });

    await axios
      .get("http://localhost:3000/api/user", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        this.user = res.data;
      })
      .catch((err) => console.log(err));
  },
  created() {
    if (
      localStorage.getItem("token") === null ||
      localStorage.getItem("token") === undefined
    ) {
      this.$router.push("/connexion");
    }
  },
};
</script>
