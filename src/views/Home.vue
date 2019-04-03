<template>
  <v-card class="pa-4 my-0 mx-auto" max-width="414" elevation="8">
    <v-layout column justify-center>
      <v-form v-model="demoForm" ref="form">
        <v-flex row>
          <!-- picker #1 -->
          <v-menu
            ref="menuFrom"
            v-model="menuFrom"
            :close-on-content-click="false"
            :nudge-bottom="-60"
            :nudge-right="-520"
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
                required
                :rules="fromDateRules"
                v-on="on"
                color="indigo darken-1"
              ></v-text-field>
            </template>

            <v-date-picker
              v-model="dateFrom"
              min="2018-01-01"
              :max="dateTo || today"
              no-title
              @input="menuFrom = false"
              scrollable
              first-day-of-week="1"
              locale="ru-RU"
              color="indigo darken-1"
            ></v-date-picker>
          </v-menu>

          <v-spacer></v-spacer>
          <!-- picker #2 -->
          <v-menu
            class="menu"
            v-model="menuTo"
            :close-on-content-click="false"
            :nudge-bottom="-60"
            :nudge-right="-520"
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
                required
                :rules="toDateRules"
                v-on="on"
                color="indigo darken-1"
              ></v-text-field>
            </template>

            <v-date-picker
              v-model="dateTo"
              :min="dateFrom || '2018-01-01'"
              :max="today"
              no-title
              @input="menuTo = false"
              scrollable
              first-day-of-week="1"
              locale="ru-RU"
              color="indigo darken-1"
            ></v-date-picker>
          </v-menu>
        </v-flex>

        <!-- radio buttons -->
        <v-radio-group v-model="purchaseType" :mandatory="true">
          <v-radio
            label="закупка у единственного поставщика"
            value="singleProvider"
            color="indigo darken-1"
          ></v-radio>
          <v-radio label="электронный аукцион" value="eAuction" color="indigo darken-1"></v-radio>
        </v-radio-group>
      </v-form>
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
    demoForm: "",
    fromDateRules: [v => !!v || "Это обязательное поле"],
    toDateRules: [v => !!v || "Это обязательное поле"],
    dateFrom: null,
    dateTo: null,
    menuFrom: false,
    menuTo: false,
    purchaseType: "singleProvider",
    localStorage: false,
    url: "https://78.media.tumblr.com/tumblr_m39nv7PcCU1r326q7o1_500.png"
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
      if (this.$refs.form.validate()) {
        const payload = {
          dateFrom: this.computedDateFrom,
          dateTo: this.computedDateTo,
          purchaseType: this.purchaseType,
          localStorage: this.localStorage
        };

        Vue.http(
          {
            method: "get",
            url: this.url,
            responseType: "arraybuffer"
          },
          payload
        )
          .then(response => {
            this.forceFileDownload(response);
          })
          .catch(() => console.log("error occured"));
      }
    }

    // for prod
    // downloadWithVueResource() {
    //   if (this.$refs.form.validate()) {
    //     const payload = new FormData();
    //     payload.append("dateFrom", this.computedDateFrom);
    //     payload.append("dateTo", this.computedDateTo);
    //     payload.append("purchaseType", this.purchaseType);
    //     payload.append("localStorage", this.localStorage);

    //     Vue.http
    //       .post(this.url, payload, { responseType: "arraybuffer" })
    //       .then(response => {
    //         this.forceFileDownload(response);
    //       })
    //       .catch(() => console.log("error occured"));
    //   }
    // }
  }
};
</script>
