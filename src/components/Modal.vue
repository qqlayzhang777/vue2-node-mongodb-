<template>
  <div>
    <div class="md-modal modal-msg md-modal-transition" :class="[{'md-show':mdAll}]">
      <div class="md-modal-inner">
        <div class="md-top">
          <div class="md-title"></div>
          <button class="md-close" @click="closeModal">Close</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            <slot name="content"></slot>
          </div>
          <div class="login-wrap">
            <slot name="sure"></slot>
            <slot name="goOnShopping"></slot>
            <slot name="goCart"></slot>
            <!-- <a href="javascript:;" class="btn-login" @click="">确 定</a> -->
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-if="mdAll" @click="closeModal">
    </div>
  </div>
</template>

<script>
  export default {
    props: ['mdAll'],
    data () {
      return {

      }
    },
    methods: {
      closeModal () {
        this.$emit("close")
      }
    }
  }
</script>