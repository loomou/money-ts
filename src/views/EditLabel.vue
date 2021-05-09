<template>
  <div>
    <div class="wrapper">
      <header class="title-bar">
      <span @click="goBack">
        <svg class="icon">
          <use xlink:href="#icon-left-arrow"></use>
        </svg>
      </span>
        <span class="information">
        编辑标签
      </span>
      </header>
      <div class="content">
        <span style="display: inline-flex;flex-direction: row;align-items: center">
          <span>
            <svg class="icon" style="width: 35px;height: 35px;margin-left: 30px;fill: rgb(9, 114, 231)">
                <use :xlink:href="`#icon-` + iconName"></use>
            </svg>
          </span>
          <Remarks :value="currentTag.name"
                   @update:value="updateTag"
                   placeholder="请输入标签名"/>
        </span>
        <ul class="icon-wrapper">
          <li v-for="(item, index) in Icon"
              :key="index"
              class="xxx">
            <span class="yyy" @click="eee(item)">
              <svg class="icon">
                <use :xlink:href="`#icon-` + item"></use>
              </svg>
            </span>
          </li>
        </ul>
        <div class="button-wrapper">
          <span style="margin: 10px">
            <Button @click="showDialog">删除</Button>
          </span>
          <span style="margin: 10px">
            <Button @click="update">确定</Button>
          </span>
        </div>
      </div>
    </div>
    <van-dialog title="提示"
                message="删除后，给分类下的内容将归为“其他”分类"
                v-model="show"
                show-cancel-button
                @confirm="remove"/>
    <div class="tip" v-if="showWarn">
      <div class="warning">{{warnContent}}</div>
    </div>
    <div class="tip-mass" v-if="showWarn"></div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Remarks from '@/components/EditLabel/Remarks.vue';
  import Button from '@/components/EditLabel/Button.vue';
  // @ts-ignore
  import defaultIcon from '@/constant/defaultIcon';

  @Component({
    components: {Remarks, Button},
  })
  export default class EditLabel extends Vue {
    tagName: string = '';
    iconName: string = '';
    show: boolean = false;
    showWarn: boolean = false;
    Icon: any = defaultIcon;
    warnContent: string = '';


    beforeCreate() {
      this.$store.commit('TagStore/fetchTags');
    }

    created() {
      let id = this.$route.params.id;
      this.$store.commit('TagStore/setCurrentTag', id);
      if (!this.currentTag) {
        this.$router.replace('/404');
      }
    }

    mounted() {
      this.iconName = this.currentTag.icon;
      this.tagName = this.currentTag.name;
    }

    get currentTag() {
      return this.$store.state.TagStore.currentTag;
    }

    updateTag(name: string) {
      this.tagName = name;
    }

    update() {
      if (this.tagName.length === 0) {
        this.warnContent = '标签名不能空';
        this.showWarn = true;
        setTimeout(() => {
          this.showWarn = false;
        }, 1000);
        return;
      }
      this.$store.commit('TagStore/updateTag', {
        id: this.currentTag.id,
        name: this.tagName,
        icon: this.iconName,
        type: this.currentTag.type
      });
    }

    showDialog() {
      this.show = true;
    }

    remove() {
      if (this.currentTag) {
        this.$store.commit('RecordStore/modifyRecord', {id: this.currentTag.id, type: this.currentTag.type});
        this.$store.commit('TagStore/removeTag', this.currentTag.id);
      }
    }

    goBack() {
      this.$router.back();
    }

    eee(e: string) {
      this.iconName = e;
    }
  };
</script>

<style lang="scss" scoped>
  .wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;

    .content {
      overflow: auto;
      flex-grow: 1;
      background: #fff;
      font-size: 14px;
    }
  }

  .title-bar {
    width: 100%;
    height: 50px;
    background: rgb(9, 114, 231);
    top: 0;
    left: 0;
    text-align: center;
    line-height: 49px;
    font-size: 18px;
    color: #fff;
    z-index: 2;

    .icon {
      position: absolute;
      color: #fff;
      top: 13.5px;
      left: 20px;
    }
  }

  .button-wrapper {
    text-align: center;
    padding: 16px;

    ::v-deep {
      :first-child {
        button {
          background: #d91919;
        }
      }
    }
  }

  .icon-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .xxx {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 25%;
      height: 50px;
      margin: 10px 0;

      .yyy {
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background: rgb(245, 245, 245);

        :active {
          fill: rgb(9, 114, 231);
        }
      }
    }

    .icon {
      width: 25px;
      height: 25px;
    }
  }

  .tip {
    display: block;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.8);
    border-radius: 10px;
    z-index: 6;

    .warning {
      padding: 15px;
      color: white;
    }
  }

  .tip-mass {
    display: block;
    width: 100%;
    height: 100%;
    background: transparent;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 8;
  }
</style>
