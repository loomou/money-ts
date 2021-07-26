<template>
  <div class="not-found">
    <div>
      当前页面不存在，请检查网址是否正确
    </div>
    <div>
      <router-link to="/" class="return">返回首页</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound"
};
</script>

<style lang="scss" scoped>
  .not-found {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;

    .return {
      color: #3197EE;
    }
  }
</style>
