<template>
  <div class="row">
    <div class="col-md-12">
      <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul class="navbar-nav">
          <li
            v-for="(ele, index) in menu"
            :class="ele.is_active? 'nav-item active':'nav-item'"
            :key="index"
          >
            <router-link :to="{name: ele.name}" class="nav-link">{{ele.link_name}}</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          name: "detect_everything",
          link_name: "Detect Everything",
          is_active: 0
        },
        {
          name: "detect_car",
          link_name: "Detect Car",
          is_active: 0
        },
        {
          name: "detect_football",
          link_name: "Detect Football",
          is_active: 0
        }
      ]
    };
  },
  watch: {
    $route: {
      handler() {
        let menu = this.menu.find(ele => ele.name === this.$route.name);
        this.menu.map(ele => (ele.is_active = 0));
        menu.is_active = 1;
      }
    }
  },
  mounted() {
    let menu = this.menu.find(ele => ele.name === this.$route.name);
    menu.is_active = 1;
  }
};
</script>
