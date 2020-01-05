<template>
  <div class="home">
      <div>
        <img class="robot" src="../assets/robot-home.png" alt="" aria-hidden="true">
      </div>
      <div class="get-started">
          <router-link to="/build">Get started</router-link>
      </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  props: {
    msg: String,
  },
  beforeCreate() {
    console.log('asd', process.env.VUE_APP_TEST);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  text-align: center;
}
.robot {
  height: 300px;
}
</style>
