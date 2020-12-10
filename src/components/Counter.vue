<template>
    <div>
        <button @click="minus()">-</button>
        <input id="value" v-model="info"/>
        <button @click="plus()">+</button>
    </div>
</template>

<script>
export default {
  name: 'Counter',
  data () {
    return {
      info: 0
    }
  },
  methods: {
    minus: function() {
      this.info = this.info - 1
    },
    plus: function() {
      this.info = this.info + 1
    }
  }
}
</script>