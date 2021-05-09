<template>
  <div class="wrapper" ref="wrapper"></div>
</template>

<script>
  import {EChartsCoreOption} from "echarts";
  import echarts from "echarts";

  export default {
    name: 'Chart',

    props: {
      options: EChartsCoreOption
    },

    data() {
      return {
        chart: ''
      };
    },

    mounted() {
      if (this.options === undefined) {
        return console.error('options为空');
      }
      this.chart = echarts.init(this.$refs.wrapper);
      this.chart.setOption(this.options);
    },

    watch: {
      options: function onOptionsChange(newValue) {
        this.chart.setOption(newValue);
      }
    }
  };
</script>

<style scoped lang="scss">
  .wrapper {
    height: 260px;
  }
</style>
