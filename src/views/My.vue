<template>
  <Layout>
    <MyInf :info.sync="info"/>
    <LabelSet/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import MyInf from '@/components/My/MyInf.vue';
  import LabelSet from '@/components/My/LabelSet.vue';

  @Component({
    components: {MyInf, LabelSet}
  })
  export default class My extends Vue {

    created() {
      this.$store.commit('FileStore/fetchProfile');
      this.$store.commit('RecordStore/fetchRecords');
    }

    get info() {
      return this.$store.state.FileStore.profile;
    }
  };
</script>

<style scoped>

</style>
