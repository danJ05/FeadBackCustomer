<template>
  <div class="container-fluid">
    <nav class="navbar fixed navbar-expand-lg shadow-none mb-5">
      <img
        src="../assets/Picture1.png"
        class="my-0 mr-md-auto img-fluid"
        style="height: 50px"
        alt="Logo"
      />
      <router-link class="p-2 text-dark" to="/connexion"
        ><span class="font-weight-bold">Se connecter</span></router-link
      >
    </nav>
    <div class="row">
      <div class="col-md-8 mx-auto">
        <form v-on:submit.prevent="ask_besoin" method="POST">
          <h1 class="text-uppercase">Expression de besoins</h1>
          <p v-if="msg">
            <v-alert text type="error">{{ msg }}</v-alert>
          </p>
          <div class="p-3"></div>

          <div class="form-group">
            <label for="nom_structure" class="font-weight-bold"
              >1 - Nom de la structure :</label
            >
            <b-form-input
              id="nom_structure"
              v-model="nom_structure"
              type="text"
              required
            ></b-form-input>
          </div>

          <div class="form-group">
            <label for="email" class="font-weight-bold">2 - Email :</label>
            <b-form-input
              id="email"
              v-model="email"
              type="email"
              required
            ></b-form-input>
          </div>

          <div class="form-group">
            <label for="contact" class="font-weight-bold">3 - Contact :</label>
            <b-form-input
              id="contact"
              v-model="contact"
              type="tel"
              required
            ></b-form-input>
          </div>

          <div class="form-group">
            <label for="checkbox-group-2" class="font-weight-bold"
              >4- Quelle est la nature de la prestation souhaitée ?</label
            >
            <b-form-group>
              <b-form-radio
                name="nature_prestation"
                v-model="nature_prestation"
                class="mx-5"
                value="formation"
                >Une formation</b-form-radio
              >

              <b-form-radio
                name="nature_prestation"
                v-model="nature_prestation"
                class="my-2 mx-5"
                value="service web et mobile"
                >Un service web ou mobile</b-form-radio
              >

              <b-form-radio
                name="nature_prestation"
                v-model="nature_prestation"
                class="mx-5"
                value="solution business intelligence"
                >Une solution BI (Business Intelligence)</b-form-radio
              >
            </b-form-group>
          </div>

          <div class="form-group">
            <label for="nb_prestation" class="font-weight-bold"
              >5 - Le nombre de prestation souhaitée :</label
            >
            <b-form-input
              id="nb_prestation"
              v-model="nb_prestation"
              type="number"
            ></b-form-input>
          </div>

          <div class="form-group">
            <label for="nb_beneficiaire" class="font-weight-bold"
              >6 - Le nombre de bénéficiaires :</label
            >
            <b-form-input
              id="nb_beneficiaire"
              v-model="nb_beneficiaire"
              type="number"
            ></b-form-input>
          </div>

          <div class="form-group">
            <label for="checkbox-group-2" class="font-weight-bold"
              >7- Niveau hiérarchique des personnes directement concernés
              :</label
            >
            <b-form-group>
              <b-form-radio
                name="niveau_hierachique"
                v-model="niveau_hierachique"
                class="mx-5"
                value="manager"
                >Manager (Directeur généraux, Sous-directeur, DRH,
                DAF)</b-form-radio
              >

              <b-form-radio
                name="niveau_hierachique"
                v-model="niveau_hierachique"
                value="cadre dirigeant"
                class="my-2 mx-5"
                >Cadre dirigeant (Chef de service, Responsable commercial,
                Responsable Comptabilité, Chargé de la
                communication...)</b-form-radio
              >

              <b-form-radio
                name="niveau_hierachique"
                v-model="niveau_hierachique"
                class="mx-5"
                value="solution business intelligence"
                >Agent de maîtrise (Technicien, ...)</b-form-radio
              >

              <p class="mt-2">Autre ? Précisez</p>
              <b-form-input
                id="nom"
                :disabled="niveau_hierachique == '' ? false : true"
                type="text"
                autocomplete="off"
                v-model="autre_niveau_hierachique"
              ></b-form-input>
            </b-form-group>
          </div>

          <div class="form-group">
            <label for="checkbox-group-2" class="font-weight-bold"
              >8- Aptitude en informatique bureautique, et programmation
              :</label
            >
            <b-form-group>
              <b-form-radio
                v-model="aptitude_info"
                name="aptitude_info"
                class="mx-5"
                value="debutant"
                >Débutant</b-form-radio
              >
              <b-form-radio
                v-model="aptitude_info"
                name="aptitude_info"
                class="my-2 mx-5"
                value="moyen"
                >Moyen</b-form-radio
              >
              <b-form-radio
                v-model="aptitude_info"
                name="aptitude_info"
                class="mx-5"
                value="bon"
                >Bon</b-form-radio
              >
              <b-form-radio
                name="aptitude_info"
                v-model="aptitude_info"
                class="my-2 mx-5"
                value="excellent"
                >Excellent</b-form-radio
              >
            </b-form-group>
          </div>

          <div class="form-group">
            <label for="detail_besoin" class="font-weight-bold"
              >9 - Donnez-nous plus de détails sur votre besoin :</label
            >
            <b-form-textarea
              id="detail_besoin"
              v-model="detail_besoin"
              placeholder=""
              rows="3"
            ></b-form-textarea>
          </div>

          <div class="form-group">
            <label for="start-date" class="font-weight-bold"
              >10 - Sur quelle période voulez-vous qu'on réalise le projet
              :</label
            >
            <br />
            De :
            <b-form-input
              id="start_date"
              v-model="start_date"
              type="date"
            ></b-form-input
            ><br />

            A :
            <b-form-input
              id="end_date"
              v-model="end_date"
              type="date"
            ></b-form-input>
          </div>

          <div class="form-group">
            <label for="budget" class="font-weight-bold"
              >11 - Quel est votre budget (en FCFA) :</label
            >
            <b-form-input
              id="start_date"
              v-model="budget"
              type="number"
            ></b-form-input>
          </div>

          <div class="form-group">
            <button type="submit" tag="button" class="button btn-block">
              Valider
            </button>
          </div>
          <!-- <div class="form-group">
            <p>
              Vous possedez déjà un compte ?
              <router-link to="/connexion">Connectez-vous</router-link>
            </p>
          </div> -->
          <p v-if="msg">
            <v-alert text type="error">{{ msg }}</v-alert>
          </p>

          <v-snackbar
            :bottom="y === 'bottom'"
            :right="x === 'right'"
            :timeout="timeout"
            v-model="snack"
            color="success"
            >Merci! Votre demande sera traitée dans les plus brefs
            délais</v-snackbar
          >
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import TheNavbar from "../components/TheNavbar";
export default {
  name: "Register",
  data() {
    return {
      x: "right",
      y: "bottom",
      timeout: 15000,
      snack: false,
      nb_prestation: "",
      nb_beneficiaire: "",
      autre_niveau_hierachique: "",
      nature_prestation: "",
      niveau_hierachique: "",
      aptitude_info: "",
      detail_besoin: "",
      start_date: "",
      end_date: "",
      budget: "",
      nom_structure: "",
      email: "",
      contact: "",
    };
  },
  methods: {
    async ask_besoin() {
      try {
        let besoins = {
          nb_prestation: this.nb_prestation,
          nb_beneficiaire: this.nb_beneficiaire,
          autre_niveau_hierachique: this.autre_niveau_hierachique,
          nature_prestation: this.nature_prestation,
          niveau_hierachique: this.niveau_hierachique,
          aptitude_info: this.aptitude_info,
          detail_besoin: this.detail_besoin,
          start_date: this.start_date,
          end_date: this.end_date,
          budget: this.budget,
          nom_structure: this.nom_structure,
          email: this.email,
          contact: this.contact,
        };

        await axios
          .post("http://localhost:3000/api/besoin", besoins)
          .then((res) => {
            if (res.status === 200) {
              (this.nb_prestation = ""),
                (this.nb_beneficiaire = ""),
                (this.autre_niveau_hierachique = ""),
                (this.nature_prestation = ""),
                (this.niveau_hierachique = ""),
                (this.aptitude_info = ""),
                (this.detail_besoin = ""),
                (this.dateNais = ""),
                (this.start_date = ""),
                (this.end_date = ""),
                (this.budget = ""),
                (this.snack = true);
              this.msg = "";
            } else {
              this.msg = res.data.msg;
            }
          })
          .catch((error) => {
            this.msg = error.response.data.msg;
            console.log(error.response);
          });
      } catch (error) {
        // this.msg = error.response.data.msg;
      }
    },
  },
};
</script>

<style lang="css" scoped>
.button {
  background-color: #06f;
  border: none;
  border-radius: 0;
  color: white;
  padding: 10px 15px;
  transition: all 0.1s;
}
.radio-buttons {
  width: 100%;
  margin: 0 auto;
  text-align: center;
}

.custom-radio input {
  display: none;
}
.radio-btn {
  margin: 10px;
  width: 100px;
  height: 100px;
  border: 3px solid transparent;
  display: inline-block;
  border-radius: 10px;
  position: relative;
  text-align: center;
  box-shadow: 0 0 20px #c3c3c367;
  cursor: pointer;
}

.radio-btn > .icon {
  color: #fff;
  background-color: #348def;
  font-size: 15px;
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%) scale(4);
  border-radius: 50px;
  padding: 2px 6px 0px 6px;
  transition: 0.2s;
  pointer-events: none;
  opacity: 0;
  z-index: 100;
}

.radio-btn .status-icon {
  width: 80px;
  height: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
/* .radio-btn .status-icon img {
  height: 60px;
} */

.radio-btn .status-icon h3 {
  color: #348def;
  font-size: 10px;
  font-weight: bold;
  text-transform: uppercase;
}

.custom-radio input:checked + .radio-btn {
  border: 3px solid #348def;
}

.custom-radio input:checked + .radio-btn > .icon {
  border: 3px solid #348def;
  opacity: 1;
  transform: translateX(-50%) scale(1);
}
</style>
