<template>
    <div>
        <counter @parentShow="show"></counter>
        <new-todos @parentShow="show"></new-todos>
        {{banner}}
    </div>
</template>

<script>
import Counter from './Counter'
import NewTodos from './NewTodos.vue'

export default {
  name: 'parent',

  components: {
    Counter,NewTodos
  },

  data() {
      return{
          banner: 'no data received yet'
      }
  },

  methods: {
      show(data, origin) {
          this.banner = "data: " + data
      }
  }
}
</script>