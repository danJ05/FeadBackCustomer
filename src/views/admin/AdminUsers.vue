<template>
  <div>
    <v-tabs :grow="true">
      <v-tab>
        <v-icon>mdi-account</v-icon>
        clients
      </v-tab>

      <v-tab-item>
        <v-card flat>
          <v-card-title>
            <v-text-field
              v-model="search"
              :key="'user_search'"
              append-icon="mdi-magnify"
              label="Rechercher"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-card-text>
            <div v-if="!list_users.listusers">
              <v-skeleton-loader
                ref="skeleton"
                :type="'table-row'"
                class="mx-auto"
              ></v-skeleton-loader>
              <v-skeleton-loader
                ref="skeleton"
                :type="'table-row'"
                class="mx-auto"
              ></v-skeleton-loader>
              <v-skeleton-loader
                ref="skeleton"
                :type="'table-row'"
                class="mx-auto"
              ></v-skeleton-loader>
              <v-skeleton-loader
                ref="skeleton"
                :type="'table-row'"
                class="mx-auto"
              ></v-skeleton-loader>
              <v-skeleton-loader
                ref="skeleton"
                :type="'table-row'"
                class="mx-auto"
              ></v-skeleton-loader>
              <v-skeleton-loader
                ref="skeleton"
                :type="'table-row'"
                class="mx-auto"
              ></v-skeleton-loader>
              <v-skeleton-loader
                ref="skeleton"
                :type="'table-row'"
                class="mx-auto"
              ></v-skeleton-loader>
              <v-skeleton-loader
                ref="skeleton"
                :type="'table-row'"
                class="mx-auto"
              ></v-skeleton-loader>
            </div>
            <div v-else>
              <v-data-table
                locale="fr-FR"
                :headers="headers"
                :items="list_users.listusers"
                :sort-by="['nom']"
                item-key="id"
                :search="search"
                class="elevation-0"
              ></v-data-table>
            </div>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-title>
            <v-text-field
              v-model="search"
              :key="'admin_search'"
              append-icon="mdi-magnify"
              label="Rechercher"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-card-text>
            <div v-if="!list_users.listusers">
              <v-skeleton-loader
                ref="skeleton"
                :type="'table-row'"
                class="mx-auto"
              ></v-skeleton-loader>
              <v-skeleton-loader
                ref="skeleton"
                :type="'table-row'"
                class="mx-auto"
              ></v-skeleton-loader>
              <v-skeleton-loader
                ref="skeleton"
                :type="'table-row'"
                class="mx-auto"
              ></v-skeleton-loader>
              <v-skeleton-loader
                ref="skeleton"
                :type="'table-row'"
                class="mx-auto"
              ></v-skeleton-loader>
              <v-skeleton-loader
                ref="skeleton"
                :type="'table-row'"
                class="mx-auto"
              ></v-skeleton-loader>
              <v-skeleton-loader
                ref="skeleton"
                :type="'table-row'"
                class="mx-auto"
              ></v-skeleton-loader>
              <v-skeleton-loader
                ref="skeleton"
                :type="'table-row'"
                class="mx-auto"
              ></v-skeleton-loader>
              <v-skeleton-loader
                ref="skeleton"
                :type="'table-row'"
                class="mx-auto"
              ></v-skeleton-loader>
            </div>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AdminUsers",
  data() {
    return {
      snack2: false,
      msg: "",
      x: "left",
      y: "bottom",
      snack: false,
      search: "",
      dialog: false,
      list_users: "",
      list_admin: "",
      item: [{ tab: "Client", content: this.list_users }],
      headers: [
        {
          text: "#",
          align: "start",
          sortable: true,
          value: "",
        },
        { text: "Nom", value: "fullname" },
        { text: "Email", value: "email" },
        { text: "Statut", value: "statut" },
        { text: "", value: "" },
      ],
      headers2: [
        {
          text: "#",
          align: "start",
          sortable: true,
          value: "",
        },
        { text: "Nom et Prénoms", value: "fullname" },
        { text: "Email", value: "email" },
        { text: "Statut", value: "statut" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        admin_id: "",
        mdp: "",
        nom: "",
        prenoms: "",
        email: "",
      },
      defaultItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      adminC: [],
    };
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/admin");
      console.log("logged out!");
    },
    editItem(item) {
      this.editedIndex = this.adminC.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.adminC.indexOf(item);
      confirm("Voulez vous vraiment supprimer cet admin ?") &&
        this.adminC.splice(index, 1);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      if (this.editedIndex > -1) {
        Object.assign(this.adminC[this.editedIndex], this.editedItem);
      } else {
        this.adminC.push(this.editedItem);
        // console.log(this.adminC[0].nom);
        const credentials = {
          admin_id: this.adminC[0].admin_id,
          mdp: this.adminC[0].mdp,
          nom: this.adminC[0].nom,
          prenoms: this.adminC[0].prenoms,
          email: this.adminC[0].email,
        };
        await axios
          .post("http://localhost:3000/api/addAdmin", credentials)
          .then((res) => {
            if (res.status === 200) {
              (this.mdp = ""),
                (this.nom = ""),
                (this.remdp = ""),
                (this.email = ""),
                (this.statut = ""),
                (this.prenoms = ""),
                (this.dateNais = ""),
                (this.sexe = ""),
                (this.promotion = ""),
                (this.snack = true);
              this.msg = "";
              // this.$router.go();
            } else {
              this.msg = res.data.msg;
              this.snack = true;
              console.log(this.msg);
            }
          })
          .catch((err) => {
            this.msg = err.response.data.msg;
            console.log(err.response);
            this.snack2 = true;
          });
      }

      this.close();
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
      })
      .catch((error) => console.log(error));

    await axios
      .get("http://localhost:3000/api/list-users")
      .then((res) => {
        // console.log(res.data);
        this.list_users = res.data;
        // console.log(res.data.msg);
      })
      .catch((error) => console.log(error));

    await axios
      .get("http://localhost:3000/api/list-admin")
      .then((res) => {
        // console.log(res.data);
        this.list_admin = res.data;
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
