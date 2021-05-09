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

<script>
  import {TagHelper} from "@/Mixins/TagHelper.js";

  export default {
    name: "TypeLists",
    data() {
      return {
        indexes: '-1',
        selectTags: '',
      };
    },

    mixins: [TagHelper],

    created() {
      this.$store.commit('TagStore/fetchTags');
    },

    mounted() {
      if (this.$route.params.id) {
        this.indexes = this.$store.state.RecordStore.currentList.icon;
        this.selectTags = this.$store.state.RecordStore.currentList.icon;
      }
    },

    computed: {
      tagList() {
        this.$store.commit('TagStore/setFilterTag', this.$store.state.TypeStore.typePick);
        this.indexes = this.$store.state.TagStore.filterTag[0].id;
        this.selectTags = this.$store.state.TagStore.filterTag[0].id;
        return this.$store.state.TagStore.filterTag;
      },

      yyy() {
        return this.$store.state.TypeStore.typePick;
      }
    },

    methods: {
      pick(item) {
        this.indexes = item.id;
        this.selectTags = item.id;
        this.$store.commit('RecordStore/setIcon', item.id);

      },
    }
  };
</script>

<style lang="scss" scoped>
  .types-list {
    padding: 24px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    overflow-x: scroll;

    .type {
      display: flex;
      flex-direction: column;
      -webkit-box-align: center;
      align-items: center;
      margin-right: 16px;

      .icon-bar {
        padding: 8px;
        display: inline-flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
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
