<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <template>
          <v-tabs fixed-tabs grow>
            <v-tab ripple :key="month">
              Month
            </v-tab>
            <v-tab ripple :key="year">
              Year
            </v-tab>
            <v-tab-item :key="month">
              <month-view />
            </v-tab-item>
            <v-tab-item :key="year">
              <year-view />
            </v-tab-item>
          </v-tabs>
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>

import YearView from './YearStatistics'
import MonthView from './MonthStatistics'
export default {
  components: {
    YearView,
    MonthView
  }
}
</script>
