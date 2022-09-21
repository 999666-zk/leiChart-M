<template>
  <div id="container"></div>
</template>

<script>
import { Radar } from "@antv/g2plot";

export default {
  components: {},
  data() {
    return {
      data: [],
      MaxNum: 50,
      MinNum: 0,
      selected: {},
      tags: [],
      // 记录相关参数
      queryObj: {
        userId: "",
        tags: "",
      },
    };
  },
  computed: {},
  methods: {
    // 获取id值
    getIDdata() {
      console.log(this.$route.query);
      const { qfExtUserId } = this.$route.query;
      if (!qfExtUserId) {
        this.$router.push("/403");
        // return;
      } else {
        this.queryObj.userId = qfExtUserId;
        // this.$router.push("/chart");
        this.getData();
      }
    },
    // 请求数据
    getData() {
      //params 参数
      this.axios({
        url: "https://ql.zjtobacco.cn/midback/radar",
        method: "get",
        params: this.queryObj,
      }).then(
        (res) => {
          //   处理返回的数据
          if (res.status === 200 && res.data.errCode === 0) {
            // console.log(res);
            //   返回接受到的数据
            this.data = res.data.result.data;
            this.tags = res.data.result.tagList;
            // 获取最值
            this.getMnum(this.data);
            this.defaultShow();
            this.renderLei();
          } else {
            this.$router.push("/nodata");
          }
        },
        (err) => {
          console.log("请求出错:", err);
        }
      );
    },
    // 获取最值
    getMnum(array) {
      let max = Math.max.apply(
        Math,
        array.map((item) => {
          return item.score;
        })
      );
      let min = Math.min.apply(
        Math,
        array.map((item) => {
          return item.score;
        })
      );

      this.MaxNum = max;
      this.MinNum = min;
    },

    // 渲染雷达图
    renderLei() {
      //   渲染雷达图
      const radarPlot = new Radar("container", {
        data: this.data,
        xField: "item",
        yField: "score",
        seriesField: "user",
        radius: 1,
        legend: {
          offsetY: 15,
          position: "bottom",
          selected: this.selected,
          // 两行分页
          maxRow: 2,
          pageNavigator: {
            marker: {
              style: {
                fill: "rgba(0,0,0,0.65)",
              },
            },
          },
        },
        meta: {
          score: {
            alias: "分数",
            min: this.MinNum,
            max: this.MaxNum,
          },
        },
        xAxis: {
          line: null,
          tickLine: null,
          grid: {
            line: {
              style: {
                lineDash: null,
              },
            },
          },
        },
        yAxis: {
          line: null,
          tickLine: null,
          grid: {
            line: {
              type: "line",
              style: {
                lineDash: null,
              },
            },
          },
        },
        // 开启辅助点
        point: {
          size: 3,
        },
      });
      radarPlot.render();
    },

    // 默认展示两条
    defaultShow() {
      // console.log(this.queryObj.tag);
      let data = this.tags;
      // let newArr = data.split(",").slice(2);
      let newArr = [];
      if (data.length < 2) {
        newArr = data;
      } else {
        newArr = data.slice(2);
        let newArrForSelect = newArr.map((item) => [item, false]);
        let selected = Object.fromEntries(newArrForSelect);
        this.selected = selected;
        // console.log(selected);
      }
    },
  },
  created() {
    this.getIDdata();
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
#container {
  margin-top: 0.1rem;
  width: 100%;
  height: 100%;
}
</style>
