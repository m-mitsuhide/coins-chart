<template>
  <div>
    <b-jumbotron
      :fluid="true"
      header="Vue Crypto Coins"
      lead="Bootstrap 4 Components for Vue.js 2"
      text-variant="white"
      bg-variant="transparent"
    >
      <p>For more information visit website</p>

      <!-- nuxt-linkの実体はaタグ、toはhref相当 -->
      <nuxt-link
        v-for="name in $store.state.coinList"
        :key="name"
        :to="`/chart/?name=${name}`"
        class="coin-btn"
      >
        <b-btn variant="primary">{{ name }} / JPY</b-btn>
      </nuxt-link>
    </b-jumbotron>
  </div>
</template>

<script>
// https://bootstrap-vue.js.org/docs/components/jumbotron
import bJumbotron from 'bootstrap-vue/es/components/jumbotron/jumbotron';

export default {
  components: {
    bJumbotron,
  },
  // fetchはページレンダリングに必要なstateを最初に取得するためのnuxt.js固有メソッド
  // https://ja.nuxtjs.org/api/pages-fetch/
  async fetch({ store }) {
    await store.dispatch('getCoinList');
  },
}
</script>

<style scoped>
.coin-btn {
  margin-right: 15px;
}
</style>
