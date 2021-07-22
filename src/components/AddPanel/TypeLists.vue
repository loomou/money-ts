<template>
  <ul class="types-list">
    <li class="type"
        v-for="item in tagList"
        :key="item.name"
        @click="pick(item)"
        :class="indexes === item.id && yyy">
          <span class="icon-bar">
            <svg class="icon">
              <use :xlink:href="'#icon-' + item.icon"></use>
            </svg>
          </span>
      <span class="text">{{item.name}}</span>
    </li>
    <li class="type add-type" @click="$emit('open')">
      <span class="icon-bar">
        <svg class="icon">
          <use xlink:href="#icon-add"></use>
        </svg>
      </span>
      <span class="text">增加</span>
    </li>
  </ul>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import {Tags} from '@/interfaces/tags';

  @Component
  export default class TypeLists extends Vue {
    indexes: string | number = '-1';
    selectTags: string | number = '';

    mounted() {
      if (this.$route.params.id) {
        this.indexes = this.$store.state.RecordStore.currentList.icon;
        this.selectTags = this.$store.state.RecordStore.currentList.icon;
      }
    }

    get tagList() {
      this.$store.commit('TagStore/setFilterTag', this.$store.state.TypeStore.typePick);
      this.indexes = this.$store.state.TagStore.filterTag[0].id;
      this.selectTags = this.$store.state.TagStore.filterTag[0].id;
      return this.$store.state.TagStore.filterTag;
    }

    get yyy() {
      return this.$store.state.TypeStore.typePick;
    }

    pick(item: Tags) {
      this.indexes = item.id;
      this.selectTags = item.id;
      this.$store.commit('RecordStore/setIcon', item.id);
    }
  };
</script>

<style lang="scss" scoped>
  .types-list {
    padding: 24px;
    display: flex;
    align-items: center;
    overflow-x: scroll;

    .type {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 16px;

      .icon-bar {
        padding: 8px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: rgb(236, 236, 236);
        border-radius: 50%;

        .icon {
          width: 20px;
          height: 20px;
          fill: rgb(199, 199, 199);
        }
      }

      .text {
        font-size: 0.8em;
        margin-top: 8px;
        color: rgb(144, 147, 153);
        word-break: keep-all;
      }
    }

    .add-type {
      padding-right: 15px;
    }

    .pay {
      .icon-bar {
        background: rgb(9, 114, 231);

        .icon {
          fill: rgb(236, 236, 236);
        }
      }
    }

    .income {
      .icon-bar {
        background: rgb(240, 183, 57);

        .icon {
          fill: rgb(236, 236, 236);
        }
      }
    }
  }
</style>
