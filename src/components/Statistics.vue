<template>

  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <template>
          <v-tabs fixed-tabs>
            <v-tab ripple :key="year">
              Yaer
            </v-tab>
            <v-tab ripple :key="month">
              Month
            </v-tab>
            <v-tab-item :key="year">
              <year-view />
            </v-tab-item>
            <v-tab-item :key="month">
              <h1>TBD</h1>
            </v-tab-item>
          </v-tabs>
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import YearView from './YearStatistics'
export default {
  components: {
    YearView
  }
}
</script>
