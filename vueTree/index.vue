<template>
  <div>
    <!-- <h1>我是主页啊</h1>
    <span>111</span> -->
        <treeselect
          style="width:400px"
          :multiple="true"
          :options="dataChangeFirst"
          :normalizer="selectTreeNormalizer"
          placeholder="Select your favourite(s)..."
          v-model="value"
        />
  </div>
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  components: {
    Treeselect
  },
  data() {
    return {
      dataChangeFirst: [],
      dataStart: [
        {
          wxbs: "1",
          wxlx: "SAR城乡"
        },
        {
          wxbs: "2",
          wxlx: "SAR城乡"
        },
        {
          wxbs: "3",
          wxlx: "SAR城乡"
        },
        {
          wxbs: "4",
          wxlx: "光子城乡"
        },
        {
          wxbs: "5",
          wxlx: "光子城乡"
        }
      ],
      value: [],
      valueConsistsOf: "LEAF_PRIORITY",
    };
  },
  mounted() {
    const data = this.dataStart;
    console.log(data);
    console.log(this.classify(data));
    this.dataChangeFirst = this.classify(data);
    console.log(this.dataChangeFirst);
  },
  methods: {
    //标准化节点
    selectTreeNormalizer(node) {
      return {
        id: node.wxbs,
        label: node.wxbs,
        children: node.data
      };
    },
    classify(arr) {
      let map = {};
      let myArr = [];
      for (let i = 0; i < arr.length; i++) {
        if (!map[arr[i].wxlx]) {
          myArr.push({
            wxlx: arr[i].wxlx,
            data: [arr[i]],
            wxbs: arr[i].wxlx
          });
          map[arr[i].wxlx] = arr[i];
        } else {
          for (let j = 0; j < myArr.length; j++) {
            if (arr[i].wxlx === myArr[j].wxlx) {
              myArr[j].data.push(arr[i]);
              break;
            }
          }
        }
      }
      return myArr;
    }
  }
};
</script>

<style scoped>
</style>
