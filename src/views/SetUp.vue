<template>
  <div class="wrapper">
    <header class="title-bar">
      <router-link to="/my">
        <svg class="icon">
          <use xlink:href="#icon-left-arrow"></use>
        </svg>
      </router-link>
      <span class="information">
          个人信息
        </span>
    </header>
    <div class="content" v-if="isShow">
      <Avatar @changeImage="changeImage" :profile.sync="profile"/>
      <Nickname @changeName="changeName" :profile.sync="profile"/>
      <Gender @changeGender="changeGender" :profile.sync="profile"/>
      <div class="save" @click="saveProfile">
        保存
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Avatar from '@/components/SetUp/Avatar.vue';
import Nickname from '@/components/SetUp/Nickname.vue';
import Gender from '@/components/SetUp/Gender.vue';
import {files} from '@/interfaces/files';
import service from '@/libs/http';

@Component({
  components: {Avatar, Nickname, Gender}
})
export default class SetUp extends Vue {
  isShow: Boolean = false;

  created() {
    service.post('/user/find', {
      userId: localStorage.getItem('userId')
    }).then(res => {
      this.$store.commit('FileStore/fetchProfile', res.data.inf);
      this.$nextTick(function () {
        this.isShow = true;
      });
    }).catch(err => {
      console.log(err);
    });
  }

  get profile() {
    return this.$store.state.FileStore.profile as files;
  }

  changeImage(e: any) {
    const accepts = ['image/gif', 'image/jpeg', 'image/png'];
    const files = e.target;
    if (!files) {
      return;
    }
    const file = files.files[0];
    if (!file) {
      return;
    }
    if (!accepts.includes(file.type)) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.profile.avatar = reader.result;
    };
    reader.readAsDataURL(file);
  }

  changeName(name: string) {
    if (name.length < 0) {
      return;
    }
    this.profile.displayName = name;
  }

  changeGender(gender: string) {
    this.profile.gender = gender;
  }

  saveProfile() {
    service.post('/user/update', {
      id: localStorage.getItem('userId'),
      nickname: this.profile.displayName,
      gender: this.profile.gender
    }).then(res => {

    }).catch(err => {
      console.log(err);
    });
    this.$store.commit('FileStore/saveProfile', this.profile);
    alert('保存成功');
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
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

.content {
  overflow: auto;
  flex-grow: 1;
  background: rgb(236, 236, 236);
  font-size: 14px;

  .save {
    width: 90%;
    background: rgb(9, 114, 231);
    color: #fff;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-weight: 700;
    font-size: 16px;
    margin: 50px auto 0;
  }
}
</style>
