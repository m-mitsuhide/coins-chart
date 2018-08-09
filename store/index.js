export const state = () => ({
  coinList: null,
  coinName: null,
  coinData: null,
});

export const getters = {
  currentValue(state) {
    return state.coinData[state.coinData.length - 1].closeBid;
  },
  chartOptions(state, getters) {
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
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
      }, {
        name: '高値',
        data: [35, 40, 55, 50, 49, 70, 70, 91, 125]
      }, {
        name: '安値',
        data: [35, 80, 55, 80, 49, 80, 70, 91, 125]
      }],
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
      }
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
};

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
