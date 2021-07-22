<template>
  <div class="wrapper">
    <div>
      <header class="title-bar">
        <router-link to="/my">
          <svg class="icon">
            <use xlink:href="#icon-left-arrow"></use>
          </svg>
        </router-link>
        <span class="information">
        类型设置
      </span>
      </header>
      <section class="pi-btn">
        <span class="box" @click="selectType('pay')" :class="this.selType === 'pay' && 'selected'">支出</span>
        <span class="box" @click="selectType('income')" :class="this.selType === 'income' && 'selected'">收入</span>
      </section>
    </div>
    <div class="content">
      <div class="tags" v-for="tag in tags" :key="tag.id">
        <router-link class="tag" :to="`/label/edit/${tag.id}`">
          <div class="left-side">
            <span class="icon-type-lists">
              <svg class="icon">
                <use :xlink:href="'#icon-' + tag.icon"></use>
              </svg>
            </span>
            <span>{{ tag.name }}</span>
          </div>
          <svg class="icon icon-arrow">
            <use xlink:href="#icon-right-arrow"></use>
          </svg>
        </router-link>
      </div>
      <span class="xxx"></span>
    </div>
    <nav class="add-type" @click="showAdd">
      添加类型
    </nav>
    <div class="mass" v-show="isMask" @click="closeTag" @touchmove.prevent></div>
    <transition name="bottom">
      <AddTag @open="closeTag" :selectType="this.selType" v-if="isMask"/>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import clone from '@/libs/clone.ts';
import AddTag from '@/components/Label/AddTag.vue';
import {Tags} from '@/interfaces/tags';
import service from '@/libs/http';
import defaultType from '@/constant/defaultType';

@Component({
  components: {AddTag}
})
export default class Label extends Vue {
  selType: string = 'pay';
  isMask: boolean = false;

  created() {
    service.get('/tag/get', {
      params: {
        userId: localStorage.getItem('userId')
      }
    }).then(res => {
      if (!res.data.tagsList) {
        this.$store.commit('TagStore/setTagList', defaultType);
      } else {
        const userTagList = defaultType.concat(res.data.tagsList);
        this.$store.commit('TagStore/setTagList', userTagList);
      }
    }).catch(err => {
      console.log(err);
    });
  }

  get tags() {
    return clone(this.$store.state.TagStore.tagList).filter((t: Tags) => t.type === this.selType).filter((y: Tags) => y.id > 0);
  }

  selectType(e: string) {
    this.selType = e;
  }

  showAdd() {
    this.isMask = true;
  }

  closeTag() {
    this.isMask = false;
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .content {
    overflow: auto;
    flex-grow: 1;
    background: rgb(236, 236, 236);
    font-size: 14px;
  }
}

.pi-btn {
  width: 100%;
  padding: 10px 40px;
  display: flex;
  justify-content: center;
  background: rgb(9, 114, 231);

  > .box {
    width: 50%;
    border: 1px solid #fff;
    padding: 5px;
    text-align: center;
    color: #fff;
  }

  > .box.selected {
    background: #fff;
    color: rgb(9, 114, 231);
  }

  :first-child {
    border-radius: 5px 0 0 5px;
  }

  :last-child {
    border-radius: 0 5px 5px 0;
  }
}

.title-bar {
  width: 100%;
  padding: 15px 14px;
  background: rgb(9, 114, 231);
  text-align: center;
  font-size: 18px;
  color: #fff;

  .icon {
    position: absolute;
    color: #fff;
    top: 19px;
    left: 14px;
  }
}

.add-type {
  width: 100%;
  height: auto;
  background: rgb(9, 114, 231);
  position: fixed;
  left: 0;
  bottom: 0;
  color: #fff;
  text-align: center;
  line-height: 50px;
}

.tags {
  margin: 10px auto 0;
  background: white;
  padding: 10px 16px;
  font-size: 14px;

  .tag {
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left-side {
      display: flex;
      justify-content: center;
      align-items: center;

      .icon-type-lists {
        padding: 8px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: #ececec;
        border-radius: 50%;
        margin-right: 10px;

        .icon {
          width: 20px;
          height: 20px;
          fill: rgb(9, 114, 231);
        }
      }
    }

    .icon-arrow {
      color: #666;
      width: 18px;
      height: 24px;
    }
  }
}

.xxx {
  display: inline-block;
  width: 100%;
  height: 50px;
}

.mass {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .7);
  transition: all 0.2s ease-in;
  z-index: 3;
}

.bottom-enter-active {
  animation: .3s bottomInUp both ease-out;
}

.bottom-leave-active {
  animation: .3s bottomOutDown both ease-in;
}

@keyframes bottomInUp {
  0% {
    transform: translate3d(0, 100%, 0);
    visibility: visible;
  }

  to {
    transform: translateZ(0);
  }
}

@keyframes bottomOutDown {
  0% {
    transform: translateZ(0);
  }

  to {
    visibility: hidden;
    transform: translate3d(0, 100%, 0);
  }
}
</style>
