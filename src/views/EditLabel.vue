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
          <Remarks :value="nameCurr"
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
      <div class="warning">{{ warnContent }}</div>
    </div>
    <div class="tip-mass" v-if="showWarn"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Remarks from '@/components/EditLabel/Remarks.vue';
import Button from '@/components/EditLabel/Button.vue';
import defaultIcon from '@/constant/defaultIcon';
import service from '@/libs/http';

@Component({
  components: {Remarks, Button},
})
export default class EditLabel extends Vue {
  tagName: string = '';
  iconName: string = '';
  show: boolean = false;
  showWarn: boolean = false;
  Icon: string[] = defaultIcon;
  warnContent: string = '';
  nameCurr: string = '';

  async created() {
    let id = this.$route.params.id;
    await service.post('/tag/find', {
      userId: localStorage.getItem('userId'),
      id: id
    }).then(res => {
      this.$store.commit('TagStore/setCurrentTag', res.data.inf);
      this.iconName = this.currentTag.icon;
      this.tagName = this.currentTag.name;
      this.nameCurr = this.currentTag.name;
    }).catch(err => {
      console.log(err);
    });
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
    service.post('/tag/update', {
      id: this.currentTag.id,
      userId: localStorage.getItem('userId'),
      type: this.currentTag.type,
      name: this.tagName,
      icon: this.iconName
    }).then(res => {
      this.$router.push('/label');
    }).catch(err => {
      console.log(err);
    });
  }

  showDialog() {
    this.show = true;
  }

  remove() {
    if (this.currentTag) {
      let id = this.$route.params.id;
      service.delete('/tag/delete', {
        params: {
          id: id,
          userId: localStorage.getItem('userId')
        }
      }).then(res => {
      }).catch(err => {
        console.log(err);
      });
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
  background: rgb(9, 114, 231);
  text-align: center;
  padding: 15px 14px;
  font-size: 18px;
  color: #fff;

  .icon {
    position: absolute;
    color: #fff;
    top: 19px;
    left: 14px;
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
