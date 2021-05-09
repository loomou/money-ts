<template>
  <div class="user-gender">
    <span>性别</span>
    <span class="gender-checkbox"></span>
    <div class="radio">
      <input type="radio" name="radio" id="男" value="男" v-model="gender" @change="changeGender($event)">
      <label for="男">男</label>
      <input type="radio" name="radio" id="女" value="女" v-model="gender" @change="changeGender($event)">
      <label for="女">女</label>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import {files} from '@/interfaces/files';

  @Component
  export default class Gender extends Vue {
    @Prop() readonly profile!: files;
    gender: string | null = this.profile.gender || null;

    changeGender(e: any) {
      this.$emit('changeGender', e.target.value);
    }
  };
</script>

<style lang="scss" scoped>
  .user-gender {
    width: 100%;
    background: #fff;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e5e5e5;
    margin: 5px 0;
    position: relative;
  }

  .radio input[type="radio"] {
    position: absolute;
    opacity: 0;
  }

  .radio {
    margin: 0.5rem;


    input + label:before {
      content: '';
      background: #f4f4f4;
      border-radius: 100%;
      border: 1px solid #b4b4b4;
      display: inline-block;
      width: 1.2em;
      height: 1.2em;
      position: relative;
      top: 0.1em;
      margin-right: 0.5em;
      vertical-align: top;
      cursor: pointer;
      text-align: center;
      -webkit-transition: all 250ms ease;
      transition: all 250ms ease;
    }

    input:checked + label:before {
      background-color: #3197EE;
      box-shadow: inset 0 0 0 4px #f4f4f4;
    }

    input:focus + label:before {
      outline: none;
      border-color: #3197EE;
    }

    input:disabled + label:before {
      box-shadow: inset 0 0 0 4px #f4f4f4;
      border-color: #b4b4b4;
      background: #b4b4b4;
    }

    input + label:empty:before {
      margin-right: 0;
    }

    label {
      margin-right: 0.5em;
    }
  }
</style>
