<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12 mx-auto">
        <!-- <b-table hover :items="items"></b-table> -->
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
            ><template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>Liste clients</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <!-- <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                      >Notifier Clients</v-btn
                    >
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.name"
                              label="Dessert name"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.calories"
                              label="Calories"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.fat"
                              label="Fat (g)"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.carbs"
                              label="Carbs (g)"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.protein"
                              label="Protein (g)"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close"
                        >Cancel</v-btn
                      >
                      <v-btn color="blue darken-1" text @click="save"
                        >Save</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog> -->
              </v-toolbar>
            </template></v-data-table
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Register",
  data() {
    return {
      timeout: 15000,
      snack: false,
      admin: "",
      tokenAdmin: "",
      snack2: false,
      msg: "",
      x: "left",
      y: "bottom",
      search: "",
      dialog: false,
      list_users: "",
      elt: [],
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
        { text: "Prestation", value: "prestation" },
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
  methods: {},
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

    // await axios
    //   .get("http://localhost:3000/api/list-admin")
    //   .then((res) => {
    //     // console.log(res.data);
    //     this.list_admin = res.data;
    //     // console.log(res.data.msg);
    //   })
    //   .catch((error) => console.log(error));
  },
};
</script>

<style lang="css" scoped></style>
