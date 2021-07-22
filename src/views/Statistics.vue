<template>
  <Layout>
    <MonthTotal/>
    <section class="statistic-wrapper" v-if="isShow">
      <section class="pay-income">
        <Consist :title="'收支构成'"/>
        <div class="line"></div>
        <ChartSection :title="'每日对比'"
                      :chartWidth="500"
                      :filterType="'date'"
                      :selFormat="'YYYY-MM-DD'"
                      :Format="'M月D日'"
                      :num="30"
                      :subType="'day'"/>
        <div class="line"></div>
        <ChartSection :title="'每月对比'"
                      :chartWidth="100"
                      :filterType="'month'"
                      :selFormat="'YYYY-MM'"
                      :Format="'M月'"
                      :num="5"
                      :subType="'month'"/>
      </section>
    </section>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import MonthTotal from '@/components/Statistics/MonthTotal.vue';
import ChartSection from '@/components/Statistics/ChartSection.vue';
import Consist from '@/components/Statistics/Consist.vue';
import service from '@/libs/http';
import defaultType from '@/constant/defaultType';

@Component({
  components: {MonthTotal, ChartSection, Consist}
})
export default class Statistics extends Vue {
  type: string = 'pay';
  monthSel: Date = new Date();
  isShow: Boolean = false;

  async created() {
    this.$store.commit('RecordStore/modifyStaDate');
    this.$store.commit('RecordStore/modifyStaType');
    await service.get('/tag/get', {
      params: {
        userId: localStorage.getItem('userId')
      }
    }).then(res => {
      if (!res.data.tagsList) {
        this.$store.commit('TagStore/setTagList', defaultType);
      } else {
        const userTagList = defaultType.concat(res.data.tagsList);
        this.$store.commit('TagStore/setTagList', userTagList);
      }
    }).catch(err => {
      console.log(err);
    });
    await service.get('/record/get', {
      params: {userId: localStorage.getItem('userId')}
    }).then(res => {
      window.localStorage.setItem('recordList', JSON.stringify(res.data.recordList));
      this.$store.commit('RecordStore/fetchRecords');
      this.isShow = true;
    }).catch(err => {
      console.log(err);
    });
  }

  get recordList() {
    return this.$store.state.RecordStore.recordList;
  }
};
</script>

<style lang="scss" scoped>
.statistic-wrapper {
  margin-top: 8px;
  background: white;
  padding: 24px;

  .pay-income {
    padding: 24px 0;
    background: white;
  }
}

.line {
  border-bottom: 1px solid rgb(238, 238, 238);
  margin: 24px 0;
  border-top-color: rgb(238, 238, 238);
  border-right-color: rgb(238, 238, 238);
  border-left-color: rgb(238, 238, 238);
}

::v-deep .type-tabs-item {
  background: white;
}
</style>
