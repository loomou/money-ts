<template>
  <div class="remarkTag">
    <header class="remarkHeader">
      <span @click="closeTags">
        <svg class="icon">
          <use xlink:href="#icon-left-arrow"></use>
        </svg>
      </span>
      <span class="title">请添加类型</span>
    </header>
    <div class="tag-wrapper">
      <div class="all"
           @click="ooo('All')"
           :class="xxx === 'All' && 'selected'">全部类型</div>
      <div class="pi">支出</div>
      <span v-for="payTag in payList"
            :key="payTag.id"
            class="tag-name"
            @click="ooo(payTag.id)"
            :class="xxx === payTag.id && 'selected'">
        <span>
          {{payTag.name}}
        </span>
      </span>
      <div class="pi">收入</div>
      <div>
        <span v-for="incomeTag in incomeList"
              :key="incomeTag.id"
              class="tag-name"
              @click="ooo(incomeTag.id)"
              :class="xxx === incomeTag.id && 'selected'">
        <span>
          {{incomeTag.name}}
        </span>
      </span>
      </div>
    </div>
  </div>
</template>

<script>
  import clone from "../../libs/clone.ts";

  export default {
    name: 'tagPop',

    created() {
      this.$store.commit('TagStore/fetchTags');
    },

    computed: {
      payList() {
        return clone(this.$store.state.TagStore.tagList).filter(t => t.type === 'pay');
      },
      incomeList() {
        return clone(this.$store.state.TagStore.tagList).filter(t => t.type === 'income');
      },
      xxx() {
        return this.$store.state.RecordStore.filterType
      }
    },

    methods: {
      ooo(tagId) {
        this.$store.commit('RecordStore/queryType', tagId)
        this.$emit('closeTypeSelect',false)
      },

      closeTags() {
        this.$emit('closeTypeSelect',false)
      },

    }
  };
</script>

<style lang="scss" scoped>
  .remarkTag {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: auto;
    background: rgb(250, 250, 250);
    border-radius: 10px 10px 0 0;
    z-index: 8;

    .remarkHeader {
      width: 100%;
      padding: 10px;
      font-size: 20px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      border-bottom: 1px solid rgb(230, 230, 230);

      .icon {
        width: 20px;
        height: 20px;
      }

      .title {
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
      }

      .ok {
        padding-right: 5px;
        font-size: 16px;
        color: rgb(9, 114, 231);
      }
    }
  }

  .tag-wrapper {
    height: 300px;
    padding: 3px;
    overflow-y: scroll;

    .all {
      display: inline-flex;
      width: 31.6%;
      height: 40px;
      align-items: center;
      justify-content: center;
      margin-top: 10px;
      margin-left: 6px;
      background: white;

      &.selected {
        background: rgb(9, 114, 231);
        color: white;
      }
    }

    .pi {
      width: 100%;
      font-size: 14px;
      margin: 10px 20px;
      color: rgb(150, 150, 150);
    }

    .tag-name {
      display: inline-flex;
      width: 31.5%;
      height: 40px;
      align-items: center;
      justify-content: center;
      margin: 3px;
      background: white;
      border-radius: 5px;

      &.selected {
        background: rgb(9, 114, 231);
        color: white;
      }
    }
  }
</style>
