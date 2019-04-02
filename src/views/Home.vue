<template>
  <v-layout row wrap justify-center>
    <v-card min-width="650" class="pa-2">
      <v-layout wrap>
        <!-- picker #1 -->
        <v-menu
          ref="menuFrom"
          v-model="menuFrom"
          :close-on-content-click="false"
          :nudge-right="-550"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              class="input"
              v-model="computedDateFrom"
              label="от"
              persistent-hint
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="dateFrom"
            min="2018-01-01"
            :max="today"
            no-title
            @input="menuFrom = false"
            scrollable
            first-day-of-week="1"
            locale="ru-RU"
          ></v-date-picker>
        </v-menu>

        <v-spacer></v-spacer>

        <!-- picker #2 -->
        <v-menu
          v-model="menuTo"
          :close-on-content-click="false"
          :nudge-right="-550"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="computedDateTo"
              label="до"
              persistent-hint
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>

          <v-date-picker
            v-model="dateTo"
            no-title
            @input="menuTo = false"
            scrollable
            first-day-of-week="1"
            locale="ru-RU"
          ></v-date-picker>
        </v-menu>
      </v-layout>

      <!-- radio buttons -->
      <v-radio-group v-model="type" :mandatory="true">
        <v-radio label="закупка у единственного поставщика" value="type1"></v-radio>
        <v-radio label="электронный аукцион" value="type2"></v-radio>
      </v-radio-group>

      <!-- button -->
      <v-btn color="primary" flat @click.prevent="submit">сформировать</v-btn>
    </v-card>
  </v-layout>
</template>


<style lang="scss">
.input {
  position: relative !important;
}
</style>


<script>
export default {
  name: "home",
  data: () => ({
    dateFrom: null,
    dateTo: null,
    menuFrom: false,
    menuTo: false,
    type: "type1"
  }),

  computed: {
    computedDateFrom() {
      if (this.dateFrom) {
        const [year, month, day] = this.dateFrom.split("-");
        return `${day}.${month}.${year}`;
      }
    },
    computedDateTo() {
      if (this.dateTo) {
        const [year, month, day] = this.dateTo.split("-");
        return `${day}.${month}.${year}`;
      }
    },
    today() {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      return (today = yyyy + "-" + mm + "-" + dd);
    }
  },

  methods: {
    submit() {
      console.log(
        "dateFrom",
        this.computedDateFrom,
        "dateTo",
        this.computedDateTo
      );
    }
  }
};
</script>
