<template>
  <div>
    <template>
      <v-btn
        id="btn"
        @click.stop="startVoice"
        :color="!toggle ? 'grey' : speaking ? 'red' : 'red darken-3'"
        class="p-3"
        fixed
        absolute
        dark
        fab
        bottom
        right
        style="right:20px; bottom: 20px"
      >
        <v-icon>{{ toggle ? "mdi-microphone" : "mdi-microphone-off" }}</v-icon>
      </v-btn>
      <div class="row">
        <div class="col-md-12 text-uppercase display-1">
          <h1 id="output"></h1>
        </div>

        <div class="col-md-6">
          <v-card class="text-center" color="green" dark max-width="600">
            <v-card-text>
              <div
                class="font-weight-bold display-1"
                v-if="customers_completed_count.length === 0"
              >
                Aucun client n'a repondu à un sondage
              </div>
              <div class="display-1 font-weight-bold" v-else>
                {{ customers_completed_count }}
                <span
                  v-if="
                    customers_completed_count == 0 ||
                      customers_completed_count === 1
                  "
                >
                  client a completé un sondage
                </span>
                <span v-if="customers_completed_count > 1">
                  clients ont completé le sondage</span
                >
                <span v-if="customers_completed_count === 0"
                  >Aucun client n'a soumis de sondage</span
                >
              </div>
            </v-card-text>
          </v-card>
        </div>

        <div class="col-md-6">
          <v-card class="text-center" color="blue" dark max-width="600">
            <v-card-text>
              <div class="display-1 font-weight-thin">
                Clients inscrits
              </div>
              <div class="display-1 font-weight-bold">
                {{ customers_count }} clients inscrits
              </div>
            </v-card-text>
          </v-card>
        </div>

        <div class="mt-5 mb-2 ml-5">
          <h3>Tous les sondages: Evaluations globales</h3>
        </div>
        <div class="row mb-4">
          <div
            class="d-flex flex-column align-items-center justify-content-center col-auto"
          >
            <v-card-text>
              <v-progress-circular
                :rotate="360"
                :size="100"
                :width="15"
                :value="total_one"
                color="red"
              >
                {{ total_one }}
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
                :value="total_two"
                color="pink"
              >
                {{ total_two }}
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
                :value="total_three"
                color="info"
              >
                {{ total_three }}
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
                :value="total_four"
                color="primary"
              >
                {{ total_four }}
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
                :value="total_five"
                color="success"
              >
                {{ total_five }}
              </v-progress-circular>
            </v-card-text>
            <span>5 étoiles</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import Artyom from "artyom.js";
import axios from "axios";

const vc = new Artyom();

vc.addCommands({
  indexes: ["bonjour"],
  action: function(i) {
    if (i == 0) {
      axios
        .get(`http://localhost:3000/api/stats/customerssurveycompleted`)
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data.customerscompleted[0].clientscompleted);
            vc.say("c'est fait");
          }
        });
    }
  },
});

vc.addCommands({
  indexes: ["apprenant"],
  action: function(i) {
    if (i == 0) {
      axios.get(`http://localhost:3000/api/stats/getNbEtu`).then((res) => {
        if (res.status === 200) {
          console.log("o");
          console.log(
            "Il y a " + res.data.nbEtu[0].nb + " apprenants inscrits"
          );
          vc.say("Il y a " + res.data.nbEtu[0].nb + " apprenants inscrits");
          var div = document.getElementById("output");

          div.innerHTML =
            "Il y a " + res.data.nbEtu[0].nb + " apprenants inscrits";
        }
      });
    }
  },
});

vc.redirectRecognizedTextOutput(function(text, isFinal) {
  var div = document.getElementById("output");
  if (isFinal) {
    div.innerHTML = "";
  } else {
    div.innerHTML = text;
  }
});

const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"],
];
// var SpeechRecognition = SpeechRecognition || window.webkitSpeechRecognition;
// var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList;
// var SpeechRecognitionEvent =
//   SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

// var words = ["salut", "bonsoir", "bonjour toi", "aurevoir"];
// var grammar =
//   "#JSGF V1.0 UTF-8 fr; grammar words; public <words" + words.join("|") + ";";
// var recognition = new SpeechRecognition();
// var speechRecognitionList = new SpeechGrammarList();
// speechRecognitionList.addFromString(grammar, 1);
// recognition.grammars = speechRecognitionList;
// recognition.continuous = true;
// recognition.lang = "fr-FR";
// recognition.interimResults = false;
// recognition.maxAlternatives = 1;
export default {
  name: "Statistics",
  data() {
    return {
      showLabels: false,
      lineWidth: 2,
      labelSize: 7,
      radius: 10,
      padding: 8,
      lineCap: "round",
      gradient: gradients[5],
      value: [0, 2, 5, 9, 5, 10, 3, 5, -4, -10, 1, 8, 2, 9, 0],
      gradientDirection: "top",
      gradients: gradients,
      fill: false,
      type: "trend",
      autoLineWidth: false,
      customers_count: "",
      customers_completed_count: "",
      error: "",
      lastresponse: "",
      total_five: "",
      total_four: "",
      total_three: "",
      total_two: "",
      total_one: "",
      toggle: false,
      speaking: false,
      speakResult: "",
      reponse: "",
    };
  },

  methods: {
    // hey() {
    //   this.toggle = !this.toggle;
    //   if (this.toggle === true) {
    //     this.startVoice();
    //   } else {
    //     this.stopVoice();
    //   }
    //   console.log(this.toggle);
    // },
    // stopVoice() {
    //   recognition.stop();
    // },
    goto() {
      this.$router.push("/stats/sexe");
    },

    startVoice() {
      vc.initialize({
        lang: "fr-FR",
        // Process 1 command, if nothing recognized then it will stop
        continuous: false,
        // Log everything in the console
        debug: true,
        // Initialize artyom !
        listen: true,
      });
      // if (!recognition) {
      //   alert(
      //     "Impossible d'utiliser la reconnaissance vocale sur ce navigateur! Utiliser Chrome ou Firefox"
      //   );
      // }
      // this.toggle = true;
      // recognition.start();
      // recognition.onstart = async () => {
      //   this.speaking = true;
      // };
      // recognition.onend = async () => {
      //   this.speaking = false;
      // };
      // recognition.onresult = async function(event) {
      //   var words = event.results[0][0].transcript;
      //   // diagnostic.textContent = "Result received: " + words + ".";
      //   console.log(words);
      //   this.speakResult = words;
      //   console.log("Confidence: " + event.results[0][0].confidence);
      //   if (this.speakResult.includes("garçon")) {
      //     console.log("ok");
      //     this.reponse = "Vous avez demandé un garçon";
      //     console.log(this.reponse);
      //   }
      // };
      // if (words === "bonjour toi") {
      //   var elt = document.getElementById("elt");
      //   elt.style.backgroundColor = "red";
      // }
      // if (words === "Bonsoir") {
      //   await axios
      //     .get(`http://localhost:3000/api/stats/lastresponse`)
      //     .then((res) => {
      //       this.lastresponse = res.data.lastresponse;
      //       console.log(this.lastresponse);
      //       // return res.data.lastresponse;
      //     })
      //     .catch((error) => console.log(error));
      // }
      // recognition.onspeechend = async function() {
      //   await recognition.stop();
      // };
    },

    checkCompatibility() {
      // if (!recognition) {
      //   this.error =
      //     "Speech Recognition is not available on this browser. Please use Chrome or Firefox";
      // }
    },

    logout() {
      localStorage.clear();
      this.$router.push("/admin");
    },
  },
  async mounted() {
    await axios
      .get("http://localhost:3000/api/admin", {
        headers: { token: localStorage.getItem("tokenAdmin") },
      })
      .then((res) => {
        this.admin = res.data;
        // console.log(this.admin);
      })
      .catch((error) => console.log(error));

    await axios.get("http://localhost:3000/api/stats/all").then((res) => {
      var total = res.data;
      this.total_five = total.total_five;
      this.total_four = total.total_four;
      this.total_three = total.total_three;
      this.total_two = total.total_two;
      this.total_one = total.total_one;
    });

    await axios.get(`http://localhost:3000/api/stats/customers`).then((res) => {
      if (res.status === 200) {
        this.customers_count = res.data.customers[0].clients;
      }
    });
    await axios
      .get(`http://localhost:3000/api/stats/customerssurveycompleted`)
      .then((res) => {
        if (res.status === 200) {
          this.customers_completed_count =
            res.data.customerscompleted[0].clientscompleted;
        }
      });

    this.checkCompatibility();
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
