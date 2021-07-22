<template>
  <div class="container">
    <Titles></Titles>
    <div class="input-container">
      <div class="type-tab" @click="toggle">
        <span data-index="1" :class="isComponent==='SignIn' ? 'active' : ''">登录</span>
        <span data-index="2" :class="isComponent==='SignUp' ? 'active' : ''">注册</span>
      </div>
      <SignIn v-if="isComponent === 'SignIn'"/>
      <SignUp v-else @toSignIn="changeCom"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import SignIn from '@/components/Sign/SignIn.vue';
import SignUp from '@/components/Sign/SignUp.vue';

@Component({
  components: {SignIn, SignUp}
})
export default class Sign extends Vue {
  isComponent: string = 'SignIn';

  toggle(e: any) {
    let index = e.target.dataset.index;
    if (index === '1') {
      this.isComponent = 'SignIn';
    }
    if (index === '2') {
      this.isComponent = 'SignUp';
    }
  }

  changeCom(e: any) {
    this.isComponent = e;
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: #fff;

  .input-container {
    margin: 30px 10px 0 10px;

    .type-tab {
      margin-bottom: 12px;
      font-size: 14px;

      span {
        margin-right: 20px;
      }
    }
  }
}

.active {
  color: rgb(9, 114, 231);
}
</style>
