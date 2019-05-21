<template>
  <h1>Hello {{ godName() }}!</h1>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    godName() {
      return () => this.name.toUpperCase()
    }
  }
}
</script>
<style lang="stylus" scoped>
h1 {
  color: red;
}
</style>