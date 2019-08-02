<template>
  <div class="divWrap">
    <div class="mask">
      <div class="inputWrap">
        <input type="text" v-model="url" placeholder="此处输入播放地址" />
        <select class="option" v-model="options">
          <option value>请选通道</option>
          <option
            v-for="items in proxys"
            :key="items.key"
            :value="items.value"
            selected="selected"
          >通道{{items.key}}</option>
        </select>
        <span @click="playVideo">播放</span>
      </div>
    </div>
    <div class="tips">
      <span>操作指南:</span>
      <br />&nbsp;&nbsp;&nbsp;&nbsp;第 一 步 进入各大视频网站，找到想要观看的VIP视频vip会员，然后复制链接（浏览器上的视频地址）
      <br />&nbsp;&nbsp;&nbsp;&nbsp;第 二 步 将复制的链接粘贴到本站播放地址，并点击开始解析
      <br />&nbsp;&nbsp;&nbsp;&nbsp;第 三 步 等待解析完成，即可免费观看VIP视频vip会员
      <br />&nbsp;&nbsp;&nbsp;&nbsp;想要找会员电影免费看，下方搜索电影名，就能免费观看vip会员vip付费电影电视剧
      <br />
    </div>
    <div class="header">
      <a href="http://www.bobozhaoquan.cn">每天限量淘宝内部优惠券+返现红包🧧</a>
    </div>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      url: "",
      options: "",
      proxys: [
        { key: "1", value: "http://api.smq1.com/?url=", select: "selected" },
        { key: "2", value: "http://jx.598110.com/?url=", select: "selected1" },
        { key: "3", value: "https://api.smq1.com/?url=", select: "selected" },
        { key: "4", value: "https://jx.hezeshi.net/ce/jlexi.php?url=", select: "selected" },
        { key: "5", value: "http://api.hellosex.cc/jlexi.php?url=", select: "selected" },
      ]
    };
  },
  methods: {
    playVideo() {
      if (this.url) {
        if (this.options === "") {
          alert("请选择通道");
          return
        }
        window.open(`${this.options}${this.url}`);
        console.log(`${this.options}${this.url}`)
      } else {
        alert("请输入vip视频链接");
      }
    }
  }
};
</script>

<style scoped>
.divWrap {
  height: 98vh;
  background: url("../assets/bg.jpg");
  /* background-size: cover;      覆盖:图片成比例填满盒子。可用于适配 */
  background-size: contain;
  position: relative;
}
.mask {
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  top: 10px;
  right: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.inputWrap {
  display: flex;
  color: wheat;
}
.inputWrap > span {
  border: 1px solid #ccc;
  border-radius: 0px 6px 6px 0px;
  cursor: pointer;
  width: 9vw;
  text-align: center;
}
.inputWrap > input {
  width: 400px;
}
.tips {
  position: fixed;
  bottom: 0px;
  right: 0px;
  color: #ccc;
  font-size: 12px;
}
.tips > span {
  color: red;
  font-weight: bold;
  font-size: 20px;
}
.header {
  text-align: center;
  position: fixed;
  top: 0;
  left: 15%;
}
.option {
  color: yellowgreen;
  border: 1px dashed #ccc;
  width: 130px;
}
</style>

