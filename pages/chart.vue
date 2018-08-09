<template>
  <div>
    <div class="background"/>
    <b-jumbotron
      :fluid="true"
      :header="`${$store.state.coinName} / JPY - ${$store.getters.currentValue}`"
      lead="Bootstrap 4 Components for Vue.js 2"
      text-variant="white"
      bg-variant="transparent"
    >
      <p>For more information visit website</p>
      <b-btn variant="primary" href="#">More Info</b-btn>
    </b-jumbotron>

    <b-container>
      <LineChart :options="$store.getters.chartOptions"/>
    </b-container>
  </div>
</template>

<script>
import bJumbotron from 'bootstrap-vue/es/components/jumbotron/jumbotron';
import bContainer from 'bootstrap-vue/es/components/layout/container';
import LineChart from '@/components/LineChart';

export default {
  components: {
    bJumbotron,
    bContainer,
    LineChart,
  },
  async fetch({ store, route }) {
    const coinName = route.query.name;
    store.commit('setCoinName', coinName);
    await store.dispatch('getCoinData');
  },
}
</script>

<style scoped>
.background {
  background: center/cover url(~/assets/background.jpg);
  position: fixed;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}
</style>
