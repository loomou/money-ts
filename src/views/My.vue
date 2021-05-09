<template>
  <Layout>
    <MyInf :info.sync="info"/>
    <MonthDetail/>
    <LabelSet/>
  </Layout>
</template>

<script>
  import MyInf from "@/components/My/MyInf";
  import MonthDetail from "@/components/My/MonthDetail";
  import LabelSet from "@/components/My/LabelSet";

  export default {
    name: "My",
    components: {
      MyInf,
      MonthDetail,
      LabelSet
    },

    created() {
      this.$store.commit('FileStore/fetchProfile');
      this.$store.commit('RecordStore/fetchRecords');
    },

    computed: {
      info() {
        return this.$store.state.FileStore.profile;
      }
    }
  };
</script>

<style scoped>

</style>
