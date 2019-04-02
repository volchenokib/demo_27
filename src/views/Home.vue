<template>
  <v-card class="pa-4 my-0 mx-auto" max-width="640" elevation="8">
    <v-layout column justify-center>
      <v-flex row xs12 sm6 md4>
        <!-- picker #1 -->
        <v-menu
          ref="menuFrom"
          v-model="menuFrom"
          :close-on-content-click="false"
          :nudge-bottom="-60"
          :nudge-right="-220"
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
          class="menu"
          v-model="menuTo"
          :close-on-content-click="false"
          :nudge-bottom="-60"
          :nudge-right="-220"
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
            min="2018-01-01"
            :max="today"
            no-title
            @input="menuTo = false"
            scrollable
            first-day-of-week="1"
            locale="ru-RU"
          ></v-date-picker>
        </v-menu>
      </v-flex>

      <!-- radio buttons -->
      <v-radio-group v-model="type" :mandatory="true">
        <v-radio label="закупка у единственного поставщика" value="type1" color="indigo darken-1"></v-radio>
        <v-radio label="электронный аукцион" value="type2" color="indigo darken-1"></v-radio>
      </v-radio-group>
    </v-layout>

    <v-switch v-model="localStorage" label="Взять из локального хранилища" color="indigo darken-1"></v-switch>

    <v-divider></v-divider>

    <!-- button -->
    <!-- <v-btn color="indigo darken-1" flat @click.prevent="submit">сформировать</v-btn> -->
    <v-btn color="indigo darken-1" flat @click="downloadWithVueResource">сформировать</v-btn>
  </v-card>
</template>


<style lang="scss">
// .input {
//   position: relative !important;
// }
// .custom {
//   margin: 0 auto;
// }
</style>


<script>
import Vue from "vue";
export default {
  name: "home",
  data: () => ({
    dateFrom: null,
    dateTo: null,
    menuFrom: false,
    menuTo: false,
    type: "type1",
    localStorage: false,
    url: "https://78.media.tumblr.com/tumblr_m39nv7PcCU1r326q7o1_500.png",
    // url: "http://producthelp.sdl.com/sdl%20trados%20studio/client_en/sample.xml"
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
    forceFileDownload(response) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.xls"); //or any other extension
      document.body.appendChild(link);
      link.click();
    },

    downloadWithVueResource() {
      Vue.http({
        method: "get",
        url: this.url,
        responseType: "arraybuffer"
      })
        .then(response => {
          this.forceFileDownload(response);
        })
        .catch(() => console.log("error occured"));
    },

    submit() {
      console.log(
        "dateFrom",
        this.computedDateFrom,
        "dateTo",
        this.computedDateTo,
        "type",
        this.type,
        "localStorage",
        this.localStorage
      );
    }
  }
};
</script>
