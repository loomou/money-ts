<template>
  <div>
    <DetailedLayout @isTypeSelect="showType">
      <RecordList/>
    </DetailedLayout>
    <div class="add" @click="showAddPanel">
      <Addition/>
    </div>
    <div class="add-wrapper">
      <transition name="bottom">
        <div v-if="this.ifAddPanel">
          <transition name="bottom">
            <AddPanel v-show="this.isAddPanel"
                      @closeAddPanel="closeAdd"
                      @showPopupWin="openRemarkWin"
                      @openAddTag="showAddTag"/>
          </transition>
        </div>
      </transition>
      <transition name="bottom">
        <PopupWin v-if="this.isPopupWin" @closePopupWin="closeNote"/>
      </transition>
      <transition name="bottom">
        <TagPop v-if="isType" @closeTypeSelect="closeType"/>
      </transition>
    </div>
    <div class="mass" v-show="this.isMask" @click="closeAll"></div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import DetailedLayout from '@/components/Detailed/DetailedLayout.vue';
  import RecordList from '@/components/Detailed/RecordList.vue';
  import TagPop from '@/components/Detailed/TagPop.vue';
  import Addition from '@/components/Detailed/Addition.vue';
  import AddPanel from '@/components/AddPanel/AddPanel.vue';
  import PopupWin from '@/components/AddPanel/PopupWin.vue';

  @Component({
    components: {TagPop, DetailedLayout, RecordList, Addition, AddPanel, PopupWin},
  })
  export default class Detailed extends Vue {
    isAddPanel: boolean = true;
    isPopupWin: boolean = false;
    isMask: boolean = false;
    ifAddPanel: boolean = false;
    isType: boolean = false;
    isTag: boolean = false;

    beforeCreate() {
      this.$store.commit('RecordStore/fetchRecords');
    }

    created() {
      this.$store.commit('TagStore/modifyCurrentTag')
      this.$store.commit('RecordStore/modifyFilterType')
      this.$store.commit('RecordStore/modifyFilterDate')
    }

    get currentType() {
      return this.$store.state.TagStore.currentTag;
    }

    closeAll() {
      if (this.$route.params.id) {
        // this.$store.state.RecordStore.setRecord = clone(this.$store.state.RecordStore.currentList);
        this.$store.commit('RecordStore/cloneCurrentList');
      } else {
        this.$store.commit('RecordStore/clearRecord');
      }
      this.isPopupWin = this.isMask = this.ifAddPanel = this.isType = this.isTag = false;
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
        // this.$store.state.RecordStore.setRecord = clone(this.$store.state.RecordStore.currentList);
        this.$store.commit('RecordStore/cloneCurrentList');
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

    showType(e: boolean) {
      this.isType = this.isMask = e;
    }

    closeType(e: boolean) {
      this.isType = this.isMask = e;
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
  @import "../assets/style/helper.scss";

  .add {
    @extend %outerShadow;
    position: fixed;
    bottom: 90px;
    right: 20px;
    z-index: 2;
    border-radius: 50%;
    background: #f6f6f6;
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
