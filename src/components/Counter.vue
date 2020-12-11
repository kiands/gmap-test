<template>
    <div>
        <button v-bind:disabled="minus_isDisabled" @click="minus()">-</button>
        <input v-model="info" v-bind:class="{ input1: isDisabled }" />
        <button v-bind:disabled="plus_isDisabled" @click="plus()">+</button>
    </div>
</template>

<script>
export default {
  name: 'Counter',
  data () {
    return {
      info: 0,
      isDisabled: true,
      minus_isDisabled: true,
      plus_isDisabled: false
    }
  },
  methods: {
    minus: function() {
      this.info = this.info - 1
      if ( this.info == 0) {
        this.isDisabled = true
        this.minus_isDisabled = true
      } else {
        this.isDisabled = false
        this.plus_isDisabled = false
      }
    },
    plus: function() {
      this.info = this.info + 1
      if ( this.info == 10 ) {
        this.isDisabled = true
        this.plus_isDisabled = true
      } else {
        this.isDisabled = false
        this.minus_isDisabled = false
      }
    }
  }
}
</script>

<style>
  .input1 {
    background-color: red
  }
</style>