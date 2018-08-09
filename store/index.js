export const state = () => ({
  coinList: null, // ['BTC', 'ETH', ...]
  coinName: null, // 'BTC' etc.
  coinData: null, // [{ time: '', highBid: ... }, ...]
});

export const getters = {
  currentValue(state) {
    // 選択中コインの現在値を算出
    return state.coinData[state.coinData.length - 1].closeBid;
  },
  chartOptions(state, getters) {
    // coinDataに変更があればグラフのオプションも自動で再生成
    return {
      chart: {
        type: 'line',
        height: 500,
        animations: {
          enabled: false,
        },
      },
      title: {
        text: `${state.coinName} / JPY - ${getters.currentValue}`,
      },
      series: [{
        name: '現在値',
        data: state.coinData.map(data => data.closeBid),
      }, {
        name: '高値',
        data: state.coinData.map(data => data.highBid),
      }, {
        name: '安値',
        data: state.coinData.map(data => data.lowBid),
      }],
      xaxis: {
        categories: state.coinData.map(data => data.time),
      },
    };
  },
};

export const mutations = {
  setCoinList(state, list) {
    state.coinList = list;
  },
  setCoinName(state, name) {
    state.coinName = name;
  },
  setCoinData(state, data) {
    state.coinData = data;
  },
  addCoinData(state, singleData) {
    if (state.coinData[state.coinData.length - 1].time === singleData.time) {
      // 時刻が同じなら末尾の連想配列を差し替える
      const newCoinData = [...state.coinData];
      newCoinData[newCoinData.length -1] = singleData;
      state.coinData = newCoinData;
    } else {
      // 時刻が更新されたら末尾に追加して先頭を削除する
      state.coinData = [...state.coinData, singleData].slice(1);
    }
  },
};

// 非同期でstateを変えたい場合はactionsの中でcommit
// nuxt.config.jsのaxios.baseURLが自動付加されてリクエスト

/* $axios.「$」getはnuxt.js独自のaxios拡張メソッド
   https://axios.nuxtjs.org/usage.html */
export const actions = {
  async getCoinList({ commit }) {
    const list = await this.$axios.$get('/api/coins');
    commit('setCoinList', list);
  },
  async getCoinData({ commit, state }) {
    const result = await this.$axios.$get(`/api/coin/${state.coinName}`);
    commit('setCoinData', result.data);
  },
};
