<template>
  <div class="ignore">
    这是一个VUE2.0工程搭建的VW移动端适配方案工程模版
    <header>我是头部</header>
    <span class="iconfont iconkehuishou-jinshulei" @click="changePoints">点我</span>
  </div>
</template>
<script>
import Gcj from '@/views/changeToGcj'
let ToGcj = ''
export default {
  name: 'Home',
  data(){
    return{
      
    }
  },
  mounted() {
    ToGcj = new Gcj(1, 2)
  },
  methods: {
    changePoints() {
      const testArray = [
        {
          "gcjLat": 24, 
          "gcjLon": 114
        }
      ]
      const location = ToGcj.gcj_decrypt(testArray)
      console.log('转换后的坐标', location)
      const exactLocation = ToGcj.gcj_decrypt_exact(testArray)
      console.log('精确转换后的坐标', exactLocation)
      const distance = ToGcj.distance(24.1, 114, 23, 114.2)
      console.log('俩点之间的距离', distance)
    }
  }
}
</script>

<style>
  div{
    width:750px;
    height: 1300px;
    background-color: yellowgreen;
  }
  .ignore{
    font-size: 25px;
  }
  header{
    width: 100%;
    height: 20px;
    font-size: 20px;
    color:greenyellow;
  }
  .iconkehuishou-jinshulei:before{
    content: "\e61e";
    width:10px;
    height:10px;
  }
</style>

