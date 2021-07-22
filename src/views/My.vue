<template>
  <Layout>
    <div v-if="isShow">
      <MyInf :info.sync="info"/>
      <LabelSet/>
    </div>
    <Toast types="loading" v-else/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import MyInf from '@/components/My/MyInf.vue';
import LabelSet from '@/components/My/LabelSet.vue';
import Toast from '@/components/Toast/Toast.vue';
import service from '@/libs/http';

@Component({
  components: {MyInf, LabelSet, Toast}
})
export default class My extends Vue {
  isShow: Boolean = false

  created() {
    service.post('/user/find', {
      userId: localStorage.getItem('userId')
    }).then(res => {
      this.$store.commit('FileStore/fetchProfile', res.data.inf);
      this.$nextTick(function () {
        this.isShow = true
      })
    }).catch(err => {
      console.log(err);
    });
  }

  get info() {
    return this.$store.state.FileStore.profile;
  }
};
</script>

<style scoped>

</style>
