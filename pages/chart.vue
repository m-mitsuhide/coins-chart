<template>
  <div>
    <b-jumbotron
      :fluid="true"
      :header="`${$store.state.coinName} / JPY - ${$store.getters.currentValue}`"
      lead="Bootstrap 4 Components for Vue.js 2"
      text-variant="white"
      bg-variant="transparent"
    >
      <p>For more information visit website</p>
      <nuxt-link to="/">
        <b-btn variant="primary">
          <!-- fasはfontawesameのアイコン
          https://fontawesome.com/icons/home?style=solid -->
          <i class="fas fa-home"/> Home
        </b-btn>
      </nuxt-link>
    </b-jumbotron>

    <b-container>
      <line-chart :options="$store.getters.chartOptions"/>
    </b-container>
  </div>
</template>

<script>
import bJumbotron from 'bootstrap-vue/es/components/jumbotron/jumbotron';
// https://bootstrap-vue.js.org/docs/components/layout
import bContainer from 'bootstrap-vue/es/components/layout/container';
import LineChart from '@/components/LineChart';
import io from 'socket.io-client';

export default {
  components: {
    bJumbotron,
    bContainer,
    LineChart,
  },
  async fetch({ store, redirect, route }) {
    const coinName = route.query.name;
    if (coinName) {
      store.commit('setCoinName', coinName);
      await store.dispatch('getCoinData');
    } else {
      // クエリが無効な場合トップページに飛ばす
      redirect('/');
    }
  },
  // nuxt.js独自の非同期dataメソッド
  // https://ja.nuxtjs.org/guide/async-data
  asyncData({ store, app }, callback) {
    // 今回はaxiosと同じサーバーなのでURLを共有、通常は環境変数(process.env)を使う
    const socket = io(app.$axios.defaults.baseURL);
    socket.on('connect', () => {
      // join/messageという文字列はsocketサーバー開発者の命名に依存する
      socket.emit('join', store.state.coinName);
      socket.on('message', ({ data }) => store.commit('addCoinData', data));

      callback(null, {
        socket,
      });
    });
  },
  // ページを離れた直後に呼ばれる
  destroyed() {
    // setIntervalなどコンポーネント内で継続している処理はここで全て停止させる
    this.socket.close();
  },
}
</script>
