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
            v-model="value"
          ></v-textarea>
          <b-button @click="valider" block variant="primary">Ajouter</b-button>
        </div>
      </div>
      <div class="col-md-12">Pas encore de questions soumises.</div>
      <div v-for="(item, index) in questions" :key="index">
        <div>
          {{ index + 1 }}. {{ item }}<br />
          <v-divider></v-divider>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Questionnaire",
  data() {
    return {
      value: "",
      autoGrow: true,
      rows: 3,
      questions: [],
    };
  },
  methods: {
    valider() {
      this.questions.push(this.value);
      console.log(this.value);
    },
  },
};
</script>
