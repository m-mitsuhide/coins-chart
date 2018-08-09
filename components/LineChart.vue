<template>
  <div class="chart-frame">
    <div ref="chart"/>
  </div>
</template>

<script>
import ApexCharts from 'apexcharts';

export default {
  props: ['options'],
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    const chart = new ApexCharts(this.$refs.chart, this.options);
    chart.render();
    this.chart = chart;
  },
  destroyed() {
    this.chart.destroy();
  },
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
