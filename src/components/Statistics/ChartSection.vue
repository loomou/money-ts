<template>
  <div>
    <div class="title">
      <span>{{this.title}}</span>
      <span>
      <button class="btn btn-pay"
              @click="typeSel('pay')"
              :class="this.selType === 'pay' && 'selected-pay'">
        支出
      </button>
      <button class="btn btn-income"
              @click="typeSel('income')"
              :class="this.selType === 'income' && 'selected-income'">
        收入
      </button>
    </span>
    </div>
    <div class="xxx" ref="chartWrapper">
      <div class="chart-wrapper" :style="{width: this.chartWidth + '%'}">
        <Chart class="chart" :options="chartOptions1"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Chart from '../Echarts/Chart.vue';
  import dayjs from 'dayjs';
  import _ from 'lodash';
  import clone from '../../libs/clone';
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import {Record} from '@/interfaces/details';

  @Component({
    components: {Chart}
  })
  export default class ChartSection extends Vue {
    @Prop({required: true}) readonly title!: string;
    @Prop({default: 100}) readonly chartWidth!: number;
    @Prop({default: 'date'}) readonly filterType!: dayjs.UnitType;
    @Prop({default: 'YYYY-MM-DD'}) readonly selFormat!: string;
    @Prop({default: 'M月D日'}) readonly Format!: string;
    @Prop({default: 30}) readonly num!: number;
    @Prop({default: 'day'}) readonly subType!: dayjs.UnitType;
    selType: string = 'pay';

    beforeCreate() {
      this.$store.commit('RecordStore/fetchRecords');
    }

    mounted() {
      const div = (this.$refs.chartWrapper as HTMLDivElement);
      div.scrollLeft = div.scrollWidth;
    }

    get recordList() {
      return this.$store.state.RecordStore.recordList;
    }

    get keyValueList() {
      const array = [];
      for (let i = 0; i <= this.num; i++) {
        const dateString = dayjs(this.$store.state.RecordStore.staDate).subtract(i, this.subType).format(this.selFormat);
        const found = _.find(this.groupedList, {
          title: dateString
        });
        array.push({
          key: dateString, value: found ? found.total : 0
        });
      }
      array.sort((a, b) => {
        if (a.key > b.key) {
          return 1;
        } else if (a.key === b.key) {
          return 0;
        } else {
          return -1;
        }
      });
      return array;
    }

    get chartOptions1() {
      const keys = this.keyValueList.map(item => dayjs(item.key).format(this.Format));
      const values = this.keyValueList.map(item => item.value);
      return {
        animationDuration: 2000,
        grid: {
          left: 0,
          right: 0,
          top: 35,
          height: 200
        },
        xAxis: {
          type: 'category',
          data: keys,
          axisTick: {
            alignWithLabel: false,
          },
          axisLine: {
            lineStyle: {
              color: '#666'
            }
          },
          axisLabel: {
            interval: 0,
            formatter: values
          }
        },
        tooltip: {
          show: true,
          triggerOn: 'click',
          formatter: '{c}',
          position: 'top',
        },
        yAxis: {
          type: 'value',
          show: false,
        },
        series: [{
          itemStyle: {
            borderWidth: 0.5,
            color: this.selType === 'pay' ? 'rgb(9, 114, 231)' : 'rgb(240, 183, 57)',
            borderColor: this.selType === 'pay' ? 'rgb(9, 114, 231)' : 'rgb(240, 183, 57)'
          },
          label: {
            show: true,
            position: 'top',
            formatter: (data: any) => {
              if (data.value === 0) {
                return '';
              } else if (data.value >= 10000) {
                return `￥${(data.value / 10000).toFixed(2)}万`;
              } else {
                return `￥${data.value.toFixed(2)}`;
              }
            }
          },
          data: values,
          type: 'bar',
          barWidth: 15,
        }]
      };
    }

    get groupedList() {
      const {recordList} = this;
      if (recordList.length === 0) {
        return [];
      }
      const newList = clone(recordList)
        .filter((r: Record) => r.type === this.selType)
        .filter((y: Record) => {
          if (dayjs(this.$store.state.RecordStore.staDate).isSame(dayjs(new Date()), this.filterType)) return true;
          // @ts-ignore
          return dayjs(y.createdAt).isSameOrBefore(dayjs(this.$store.state.RecordStore.staDate), this.filterType);
        }).sort((a: Record, b: Record) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
      type Result = { title: string; total?: number; items: Record[] }[];
      const result: Result = [{title: dayjs(newList[0].createdAt).format(this.selFormat), items: [newList[0]]}];
      for (let i = 1; i < newList.length; i++) {
        const current = newList[i];
        const last = result[result.length - 1];
        if (dayjs(last.title).isSame(dayjs(current.createdAt), this.filterType)) {
          last.items.push(current);
        } else {
          result.push({title: dayjs(current.createdAt).format(this.selFormat), items: [current]});
        }
      }
      result.map(group => {
        group.total = group.items.reduce((sum, item) => {
          return sum + item.amount;
        }, 0);
      });
      return result;
    }

    typeSel(type: string) {
      if (type !== 'pay' && type !== 'income') {
        throw new Error('type is unknown ');
      }
      this.selType = type;
    }
  };
</script>

<style lang="scss" scoped>
  .xxx {
    width: 100%;
    overflow: auto;

    .chart {

      &-wrapper {
        overflow: auto;

        &::-webkit-scrollbar {
          display: none;
        }
      }
    }
  }

  .title {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    font-size: 14px;

    .btn {
      display: inline-flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      padding: 2px 8px;
      outline: none;
      border-radius: 16px;
      border: 1px solid rgb(241, 241, 241);
      background: rgb(241, 241, 241);
      color: rgb(144, 147, 153);
      font-size: 12px;

      &.selected-pay {
        border: 1px solid rgb(9, 114, 231);
        background: rgb(9, 114, 231);
        color: rgb(241, 241, 241);
      }

      &.selected-income {
        border: 1px solid rgb(240, 183, 57);
        background: rgb(240, 183, 57);
        color: rgb(241, 241, 241);
      }
    }

    .btn-pay {
      margin-right: 8px;
    }

  }
</style>
