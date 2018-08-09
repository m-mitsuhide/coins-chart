<template>
  <div class="chart-frame">
    <!-- $refsに「chart」という名前で生DOMを登録 -->
    <div ref="chart"/>
  </div>
</template>

<script>
// https://github.com/apexcharts/apexcharts.js
import ApexCharts from 'apexcharts';

export default {
  props: ['options'],
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    // ref属性で登録した生DOMを外部ライブラリに渡す
    const chart = new ApexCharts(this.$refs.chart, this.options);
    chart.render();
    this.chart = chart;
  },
  destroyed() {
    this.chart.destroy();
  },
  // propsの「options」が変更されたらapexchartsを手動で更新
  watch: {
    options() {
      this.chart.updateOptions(this.options);
    },
  },
}
</script>

<style scoped>
.chart-frame {
  background: #fff;
  border-radius: 5px;
  padding: 10px 5px 0;
}
</style>
