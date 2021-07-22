<template>
  <div class="input-wrapper">
    <input type="text"
           placeholder="用户名"
           v-model="username"
           @blur="checkUsername"
           @keyup.enter="signIn">
    <span>{{ userMessage }}</span>
    <form>
      <input type="password"
             placeholder="密码"
             v-model="password"
             autocomplete="off"
             @keyup.enter="signIn"
             @blur="checkPassword">
    </form>
    <span>{{ passMessage }}</span>
    <input type="text"
           placeholder="内测码"
           v-model="check"
           @keyup.enter="signIn">
    <span>{{ checkMessage }}</span>
    <button @click="signIn">登录</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import service from '@/libs/http';

@Component
export default class SignIn extends Vue {
  username: string = '';
  password: string = '';
  check: string = '';
  userMessage: string = '';
  passMessage: string = '';
  checkMessage: string = '';

  checkUsername() {
    if (this.username.length === 0) {
      this.userMessage = '用户名不能为空';
      return;
    } else {
      this.userMessage = '';
    }
  }

  checkPassword() {
    if (this.password.length === 0) {
      this.passMessage = '密码不能为空';
      return;
    } else {
      this.passMessage = '';
    }
  }

  signIn() {
    this.checkUsername();
    this.checkPassword();
    if (this.userMessage.length != 0 || this.passMessage.length != 0) {
      return;
    }
    if (this.check != 'qwer') {
      this.checkMessage = '内测码不正确';
      return;
    } else {
      this.checkMessage = '';
    }
    service.post('/user/login', {
      username: this.username,
      password: this.password,
    }).then(res => {
      localStorage.setItem('userId', res.data.UserId);
      localStorage.setItem('AuthToken', res.data.token);
      this.$router.push('/detailed');
    }).catch(err => {
      console.log(err.respond);
    });
  }
};
</script>

<style lang="scss" scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;

  input {
    box-sizing: border-box;
    width: 100%;
    border: 1px solid #ddd;
    color: #aaa;
    font-size: 14px;
    padding: 10px;
    height: 40px;
    vertical-align: middle;
    border-radius: 4px;
    transition: 0.1s all linear;
  }

  input:focus {
    border: 1px solid rgb(9, 114, 231);
  }

  span {
    margin: 6px;
    font-size: 12px;
    min-height: 20px;
    line-height: 20px;
    color: red;
  }

  button {
    display: block;
    color: #fff;
    background: rgb(9, 114, 231);
    padding: 6px 0;
    border-radius: 4px;
  }
}
</style>
