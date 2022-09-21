<template>
  <div class="out-box">
    <div class="middle-box">
      <div class="top">
        <img src="../assets/no-data.png" alt="nodata" class="nofound" />
      </div>
      <div class="bottom">用户未找到或用户评测数据未找到</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    getRouterData() {
      let res = this.$route;
      console.log(res);
    },
  },
  created() {
    this.getRouterData();
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.out-box {
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  .middle-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      height: 35vh;
    }
    .bottom {
      // margin-top: 20px;
      font-size: 20px;
      color: rgb(196, 196, 196);
      text-align: center;
    }
  }
}
</style>
