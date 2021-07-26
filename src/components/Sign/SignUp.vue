<template>
  <div class="input-wrapper">
    <input type="text"
           placeholder="用户名"
           v-model="username"
           @blur="checkUsername"
           @keyup.enter="signUp">
    <span>{{ usernameMessage }}</span>
    <form>
      <input type="password"
             placeholder="密码"
             v-model="password"
             autocomplete="off"
             @blur="checkPassword"
             @keyup.enter="signUp">
    </form>
    <span>{{ passwordMessage }}</span>
    <form>
      <input type="password"
             placeholder="确认密码"
             v-model="confirmPassword"
             autocomplete="off"
             @keyup.enter="signUp"
             @blur="checkConfirm">
    </form>
    <span>{{ confirmMessage }}</span>
    <input type="text"
           placeholder="内测码：qwer"
           @keyup.enter="signUp"
           v-model="check">
    <span>{{ checkMessage }}</span>
    <button @click="signUp">注册</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import service from '../../libs/http';

@Component
export default class SignUp extends Vue {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  check: string = '';
  usernameMessage: string = '';
  passwordMessage: string = '';
  confirmMessage: string = '';
  checkMessage: string = '';

  checkUsername() {
    const reg = /^[0-9a-zA-Z]{6,20}$/;
    if (!reg.test(this.username)) {
      this.usernameMessage = '用户名只能包含数字和字母，长度为6~20位';
      return;
    } else {
      this.usernameMessage = '';
    }
  }

  checkPassword() {
    if (this.password.length < 6 || this.password.length > 20) {
      this.passwordMessage = '密码长度为6~20位';
      return;
    } else {
      this.passwordMessage = '';
    }
  }

  checkConfirm() {
    if (this.password != this.confirmPassword) {
      this.confirmMessage = '确认密码不一致';
      return;
    } else {
      this.confirmMessage = '';
    }
  }

  signUp() {
    this.checkUsername();
    this.checkPassword();
    this.checkConfirm();
    if (this.usernameMessage.length != 0 || this.passwordMessage.length != 0 || this.confirmMessage.length != 0) {
      return;
    }
    if (this.check != 'qwer') {
      this.checkMessage = '内测码不正确';
      return;
    } else {
      this.checkMessage = '';
    }
    service.post('/user/signup', {
      username: this.username,
      password: this.password,
      confirmPassword: this.confirmPassword
    }).then(res => {
      this.$emit('toSignIn', 'SignIn');
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
