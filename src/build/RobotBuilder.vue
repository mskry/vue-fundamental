<template>
  <div v-if="avaliableParts" class="content">
     <div class="preview">
      <CollapsibleSection>
        <div class="preview-content">
          <div class="top-row">
            <img :src="selectedRobot.head.src"/>
          </div>
          <div class="middle-row">
            <img :src="selectedRobot.leftArm.src" class="rotate-left"/>
            <img :src="selectedRobot.torso.src"/>
            <img :src="selectedRobot.rightArm.src" class="rotate-right"/>
          </div>
          <div class="bottom-row">
            <img :src="selectedRobot.base.src"/>
          </div>
        </div>
      </CollapsibleSection>
    </div>
    <button @click="addToCart()" class="add-to-cart">Add to cart</button>
    <div class="top-row">
      <div :class="[saleBorderClass, 'top', 'part']">
        <!-- <div class="robot-name">{{selectedRobot.head.title}}
            <div v-if="selectedRobot.head.onSale" class="badge badge-sale">on sale</div>
        </div> -->
        <PartSelector :parts="avaliableParts.heads" position="top"
        @partSelected="part => selectedRobot.head=part"/>
      </div>
    </div>
    <div class="middle-row">
      <PartSelector :parts="avaliableParts.arms" position="left"
      @partSelected="part => selectedRobot.leftArm=part"/>
      <PartSelector :parts="avaliableParts.torsos" position="center"
      @partSelected="part => selectedRobot.torso=part"/>
      <PartSelector :parts="avaliableParts.arms" position="right"
      @partSelected="part => selectedRobot.rightArm=part"/>
    </div>
    <div class="bottom-row">
      <PartSelector :parts="avaliableParts.bases" position="bottom"
      @partSelected="part => selectedRobot.base=part"/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
// import { mapMutations } from 'vuex';
import createdHookMixin from './create-hook-mixin';
import PartSelector from './PartSelector.vue';
import CollapsibleSection from '../shared/CollapsibleSection.vue';


export default {
  name: 'RobotBuilder',
  beforeRouteLeave(to, from, next) {
    if (this.addedToCart) {
      next(true);
    } else {
      /* eslint no-alert: 0 */
      /* eslint no-restricted-globals: 0 */
      const response = confirm('You have not added the robot to the cart');
      next(response);
    }
  },
  mixins: [createdHookMixin],
  components: { PartSelector, CollapsibleSection },
  created() {
    this.getParts();
  },
  data() {
    return {
      addedToCart: false,
      selectedRobot: {
        head: {},
        leftArm: {},
        rightArm: {},
        torso: {},
        base: {},
      },
    };
  },
  computed: {
    avaliableParts() {
      return this.$store.state.robots.parts;
    },
    saleBorderClass() {
      return this.selectedRobot.head.onSale ? 'sale-border' : '';
    },
    headBorderStyle() {
      return {
        border: this.selectedRobot.head.onSale ? '3px solid red' : '3px solid grey',
      };
    },
  },
  methods: {
    ...mapActions('robots', ['getParts', 'addRobotToCart']),
    // ...mapMutations('robots', ['someMutation']);
    addToCart() {
      const robot = this.selectedRobot;
      const cost = robot.head.cost + robot.leftArm.cost + robot.torso.cost
       + robot.rightArm.cost + robot.base.cost;
      this.addRobotToCart(Object.assign({}, robot, { cost }))
        .then(
          () => this.$router.push('/cart'),
        );
      this.addedToCart = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.preview {
  position: absolute;
  top: -20px;
  right: 0;
  width: 210px;
  height: 210px;
  padding: 5px;
}
.preview-content {
  border: 1px solid #999;
}
.preview img {
  width: 50px;
  height: 50px;
}
.rotate-right {
  transform: rotate(90deg);
}
.rotate-left {
  transform: rotate(-90deg);
}
.part {
  position: relative;
  width: 165px;
  height: 165px;
  border: 3px solid #aaa;
  img {
    width: 165px;
  }
}
.top-row {
  display: flex;
  justify-content: space-around;
}
.middle-row {
  display: flex;
  justify-content: center;
}
.bottom-row {
  display: flex;
  justify-content: space-around;
  border-top: none;
}
.head {
  border-bottom: none;
}
.left {
  border-right: none;
}
.right {
  border-left: none;
}
.left img {
  transform: rotate(-90deg);
}
.right img {
  transform: rotate(90deg);
}
.bottom {
  border-top: none;
}
.prev-selector {
  position: absolute;
  z-index: 1;
  top: -3px;
  left: -28px;
  width: 25px;
  height: 171px;
}
.next-selector {
  position: absolute;
  z-index: 1;
  top: -3px;
  right: -28px;
  width: 25px;
  height: 171px;
}
.center .prev-selector,
.center .next-selector {
  opacity: 0.8;
}
.left .prev-selector {
  top: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}
.left .next-selector {
  top: auto;
  bottom: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}
.right .prev-selector {
  top: -28px;
  left: 24px;
  width: 144px;
  height: 25px;
}
.right .next-selector {
  top: auto;
  bottom: -28px;
  left: 24px;
  width: 144px;
  height: 25px;
}
.right .next-selector {
  right: -3px;
}

.robot-name {
    position: absolute;
    top: -25px;
    text-align: center;
    width: 100%;
}

.badge {
    padding: 2px;
    display: inline;
    margin-left: 10px;
    background-color: inherit;
}
.badge-sale {
    background-color: red;
    border: 1px solid redred;
    color: #fff;
}
.content {
    position: relative;
}
.add-to-cart {
    position: abosolute;
    right: 30px;
    width: 200px;
    padding: 20px;
    font-size: 15px;
}
td, th {
  text-align: left;
  padding: 5px;
  padding-right: 20px;
}
.cost {
  text-align: right
}
.sale-border {
  border: 3px solid red;
}
</style>
