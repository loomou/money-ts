<template>
  <div class="mask">
    <div class="toast">
      <div class="success" v-if="types === 'success'">
        <svg class="icon icon-vertical">
          <use xlink:href="#icon-success"></use>
        </svg>
      </div>
      <div class="fail" v-else-if="types === 'fail'">
        <svg class="icon icon-vertical">
          <use xlink:href="#icon-fail"></use>
        </svg>
      </div>
      <div class="loading" v-else>
        <div class="spinner">
          <div class="spinner-container container1">
            <div class="circle1"></div>
            <div class="circle2"></div>
            <div class="circle3"></div>
            <div class="circle4"></div>
          </div>
          <div class="spinner-container container2">
            <div class="circle1"></div>
            <div class="circle2"></div>
            <div class="circle3"></div>
            <div class="circle4"></div>
          </div>
          <div class="spinner-container container3">
            <div class="circle1"></div>
            <div class="circle2"></div>
            <div class="circle3"></div>
            <div class="circle4"></div>
          </div>
        </div>
      </div>
      <span class="message">{{ message }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Toast extends Vue {
  @Prop({type: String, default: '加载中...'}) readonly message !: string;
  @Prop({type: Boolean, default: false}) readonly show !: Boolean;
  @Prop({type: String, default: 'loading'}) readonly types!: String;
};
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 5;

  .toast {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 70%;
    width: 124px;
    min-height: 88px;
    padding: 30px;
    border-radius: 8px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.7);
    z-index: 6;

    .spinner {
      margin: 10px;
      width: 30px;
      height: 30px;
      position: relative;

      .container1 > div, .container2 > div, .container3 > div {
        width: 6px;
        height: 6px;
        background-color: #fff;
        border-radius: 100%;
        position: absolute;
        animation: bouncedelay 1.2s infinite ease-in-out;
        animation-fill-mode: both;
      }

      .spinner-container {
        position: absolute;
        width: 100%;
        height: 100%;
      }

      .container2 {
        transform: rotateZ(45deg);
      }

      .container3 {
        transform: rotateZ(90deg);
      }

      .circle1 {
        top: 0;
        left: 0;
      }

      .circle2 {
        top: 0;
        right: 0;
      }

      .circle3 {
        right: 0;
        bottom: 0;
      }

      .circle4 {
        left: 0;
        bottom: 0;
      }

      .container2 .circle1 {
        animation-delay: -1.1s;
      }

      .container3 .circle1 {
        animation-delay: -1.0s;
      }

      .container1 .circle2 {
        animation-delay: -0.9s;
      }

      .container2 .circle2 {
        animation-delay: -0.8s;
      }

      .container3 .circle2 {
        animation-delay: -0.7s;
      }

      .container1 .circle3 {
        animation-delay: -0.6s;
      }

      .container2 .circle3 {
        animation-delay: -0.5s;
      }

      .container3 .circle3 {
        animation-delay: -0.4s;
      }

      .container1 .circle4 {
        animation-delay: -0.3s;
      }

      .container2 .circle4 {
        animation-delay: -0.2s;
      }

      .container3 .circle4 {
        animation-delay: -0.1s;
      }
    }

    .message {
      font-size: 16px;
      color: #fff;
      padding-top: 10px;
    }
  }
}

.icon {
  width: 40px;
  height: 40px;
  fill: #fff;
}

@keyframes bouncedelay {
  0%, 80%, 100% {
    transform: scale(0.0);
  }
  40% {
    transform: scale(1.0);
  }
}
</style>
