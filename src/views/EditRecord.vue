<template>
  <div>
    <header class="title-bar">
      <router-link to="/detailed">
        <svg class="icon">
          <use xlink:href="#icon-left-arrow"></use>
        </svg>
      </router-link>
    </header>
    <section class="edit-wrapper">
      <div class="edit-win">
        <div class="type">
          <span class="icon-wrapper" :class="currentList.type === 'pay' ? 'pay' : 'income'">
            <svg class="icon">
              <use :xlink:href="'#icon-' + findIcon(currentList.icon).icon"></use>
            </svg>
          </span>
          <span class="type-name">
            {{findIcon(currentList.icon).name}}
          </span>
        </div>
        <h3 class="money">
          {{currentList.type === 'pay' ? '-' : '+'}}{{currentList.amount.toFixed(2)}}
        </h3>
        <div class="time-note">
          <div class="time">
            <span class="time-title">记录时间</span>
            <span>{{formatDate(currentList.createdAt)}}</span>
          </div>
          <div class="note">
            <span class="note-title">备注</span>
            <span>{{currentList.note}}</span>
          </div>
        </div>
        <div class="edit-bar">
          <span class="delete" @click="remove">
            删除
          </span>
          <span class="edit" @click="showAddPanel">
            编辑
          </span>
        </div>
      </div>
    </section>
    <div class="add-wrapper">
      <transition name="bottom">
        <div v-if="this.ifAddPanel">
          <transition name="bottom">
            <AddPanel v-show="this.isAddPanel"
                      @closeAddPanel="closeAdd"
                      @showPopupWin="openRemarkWin"
                      @openAddTag="showAddTag"
                      :current-type="this.setList.type"/>
          </transition>
        </div>
      </transition>
      <transition>
        <PopupWin v-if="this.isPopupWin" @closePopupWin="closeNote"/>
      </transition>
    </div>
    <div class="mass" v-show="this.isMask" @click="closeAll"></div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import AddPanel from '@/components/AddPanel/AddPanel.vue';
  import PopupWin from '@/components/AddPanel/PopupWin.vue';
  import AddTag from '@/components/Label/AddTag.vue';
  import dayjs from 'dayjs';
  import clone from '@/libs/clone';
  import {Record} from '@/interfaces/details';

  @Component({
    components: {AddPanel, PopupWin, AddTag}
  })
  export default class EditRecord extends Vue {
    isAddPanel: boolean = true;
    isPopupWin: boolean = false;
    isMask: boolean = false;
    ifAddPanel: boolean = false;
    isTag: boolean = false;

    created() {
      const id = this.$route.params.id;
      this.$store.commit('RecordStore/fetchRecords');
      this.$store.commit('TagStore/fetchTags');
      this.$store.commit('RecordStore/setCurrentRecord', id);
      this.$store.commit('RecordStore/cloneCurrentList');
      if (!this.currentList) {
        this.$router.replace('/404');
      }
    }

    get currentList() {
      return this.$store.state.RecordStore.currentList;
    }

    get setList() {
      return this.$store.state.RecordStore.setRecord;
    }

    formatDate(e: string | Date) {
      return dayjs(e).format('YYYY年M月DD日 HH:mm:ss');
    }

    remove() {
      if (this.currentList) {
        this.$store.commit('RecordStore/removeList', this.currentList.id);
      }
    }

    findIcon(icon: string) {
      const def = clone(this.$store.state.TagStore.tagList);
      return def.filter((t: Record) => t.id === icon)[0];
    }

    closeAll() {
      if (this.$route.params.id) {
        this.$store.state.RecordStore.setRecord = clone(this.$store.state.RecordStore.currentList);
      } else {
        this.$store.commit('RecordStore/clearRecord');
      }
      this.isPopupWin = this.isMask = this.ifAddPanel = false;
      this.isAddPanel = true;
    }

    showAddPanel() {
      if (!this.$route.params.id) {
        this.$store.commit('RecordStore/clearRecord');
      }
      this.ifAddPanel = true;
      this.isMask = true;
    }

    closeAdd(e: boolean) {
      if (this.$route.params.id) {
        this.$store.state.RecordStore.setRecord = clone(this.$store.state.RecordStore.currentList);
      } else {
        this.$store.commit('RecordStore/clearRecord');
      }
      this.isMask = this.ifAddPanel = e;
      this.isAddPanel = !e;
    }

    openRemarkWin(e: boolean) {
      this.isAddPanel = !e;
      this.isPopupWin = e;
    }

    closeNote(e: boolean) {
      this.isAddPanel = !e;
      this.isPopupWin = e;
    }

    closeTag() {
      this.isTag = false;
      this.isAddPanel = true;
    }

    showAddTag() {
      this.isAddPanel = false;
      this.isTag = true;
    }
  };
</script>

<style lang="scss" scoped>
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
    z-index: 3;

    .icon {
      position: absolute;
      color: #fff;
      top: 16px;
      left: 20px;
    }
  }

  .edit-wrapper {
    padding: 12px 12px;

    .edit-win {
      padding: 16px;
      background: white;
      border-radius: 8px;
      text-align: center;

      .type {
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        margin-top: 12px;

        .icon-wrapper {
          padding: 8px;
          display: inline-flex;
          -webkit-box-align: center;
          align-items: center;
          -webkit-box-pack: center;
          justify-content: center;
          border-radius: 50%;

          .icon {
            fill: white;
          }

          &.pay {
            background: rgb(9, 114, 231);
          }

          &.income {
            background: rgb(240, 183, 57);
          }
        }

        .type-name {
          margin-left: 8px;
          font-size: 14px;
        }
      }

      .money {
        margin: 16px 0;
        font-size: 1.8em;
        font-weight: normal;
        letter-spacing: 1px;
      }

      .time-note {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: 26px;
        font-size: 14px;

        .time {
          margin-bottom: 10px;

          .time-title {
            display: inline-block;
            width: 100px;
            text-align: left;
            padding-left: 10px;
            color: rgb(144, 147, 153);
          }
        }

        .note {
          .note-title {
            display: inline-block;
            width: 100px;
            text-align: left;
            padding-left: 10px;
            color: rgb(144, 147, 153);
          }
        }
      }

      .edit-bar {
        display: flex;
        padding: 16px 0 0;
        border-top: 1px solid rgb(198, 198, 198);

        span {
          -webkit-box-flex: 1;
          flex-grow: 1;
        }

        .delete {
          color: red;
          border-right: 1px solid rgb(198, 198, 198);
        }
      }
    }
  }

  .add-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    max-height: 100%;
    overflow-y: auto;
    background-color: transparent;
    z-index: 4;
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
