<template>
  <div id="app">

  State:<br>
  root foo: {{rootFoo}} <br>
  robots foo: {{robotsFoo}} <br>
  users foo: {{usersFoo}} <br>
  Getters: <br>
  root getter foo: {{rootGetterFoo}}<br>
  robots getter foo: {{robotsGetterFoo}}<br>
  users getter foo: {{usersGetterFoo}}<br>
    <header>
      <nav>
        <ul>
          <li class="nav-item">
            <router-link active-class="active-link" class="nav-link" :to="{name: 'Home'}" exact>
              <img class="logo" src="../src/assets/build-a-bot-logo.png" alt="">
              Build-a-bot
            </router-link>
          </li>
          <li class="nav-item">
            <router-link active-class="active-link" class="nav-link" :to="{name: 'Build'}" exact>
              Builder
            </router-link>
          </li>
          <li class="nav-item">
            <router-link active-class="active-link" class="nav-link" to="/cart" exact>
              Cart
            </router-link>
          </li>
          <div cart-items>
            {{cart.length}}
          </div>
        </ul>
      </nav>
    </header>
    <div class="container">
      <aside class="aside">
        <router-view name="sidebar"></router-view>
      </aside>
      <main>
      <!-- <HomePage msg="Welcome to Your Vue.js App"/> -->
        <router-view/>
      </main>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'app',
  computed: {
    cart() {
      return this.$store.state.robots.cart;
    },
    ...mapState({
      // gettin 'foo' state from 'root(default)' namespace
      rootFoo: 'foo',
      // getting 'foo' state from 'robots' namespace, can be replaced with below mapState
      // mapState with namespace example below, cleaner aproach
      robotsFoo: state => state.robots.foo,
    }),
    // mapState with provided namespace 'users', only can be used with namespaced module
    ...mapState('users', {
      usersFoo: 'foo',
    }),

    // local property usersFoo

    // usersFoo() {
    //   return this.$store.state.users.foo;
    // },

    ...mapGetters({
      rootGetterFoo: 'foo',
    }),
    ...mapGetters('robots', {
      robotsGetterFoo: 'foo',
    }),
    usersGetterFoo() {
      return this.$store.getters['users/foo'];
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  margin: 10px auto 0 auto;
  justify-content: center;
}
.aside {
  padding: 30px;
  background-color: grey;
  width: 100px;
  min-height: 300px;
}
.content >>> .robot-name {
  color: red;
  border: 2px solid blue;
}
.robot-name {
  border: 1px solid blue;
  color: red;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
main {
  padding: 30px;
  background-color: white;
  width: 964px;
  min-height: 300px;
}
header {
  background-color: #999;
  width: 1184px;
  margin: 0 auto;
}
ul {
  padding: 3px;
  display: flex;
}
.nav-item {
  display: inline-block;
  padding: 5px 10px;
  font-size: 22px;
  border-right: 1px solid #bbb;
}
.logo {
  vertical-align: middle;
  height: 30px;
}
.nav-link {
  text-decoration: none;
  color: inherit;
}

.active-link {
  color: white;
}
</style>

<style>
body {
  background: linear-gradient(to bottom, #555, #999);
  background-attachment: fixed;
}
</style>
