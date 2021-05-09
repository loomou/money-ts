<template>
  <section class="note">
    <div>
      <label class="form-item">
        <input type="text"
               :value="value"
               @input="onValueChange($event.target.value)"
               :placeholder="placeholder"
               maxlength="4">
      </label>
    </div>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class Remarks extends Vue{
    @Prop({type: String}) readonly placeholder!: string
    @Prop({default: ''}) readonly value!: string

    onValueChange(value: string) {
      this.$emit('update:value', value);
    }
  };
</script>

<style lang="scss" scoped>
  .note {
    padding: 12px 0;

    .form-item {
      font-size: 14px;
      display: flex;
      padding-left: 26px;
      align-items: center;
    }

    input {
      height: 40px;
      padding: 0 15px 0 0;
      flex-grow: 1;
      background: transparent;
      border: none;
    }
  }
</style>
