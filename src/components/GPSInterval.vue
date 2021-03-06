<template>
    <div>
        <v-btn @click="startRecord()">start</v-btn>
        <v-btn @click="stopRecord()">stop</v-btn>
        <v-btn @click="writeRecords()">write</v-btn>
        {{this.location.length}}
        {{this.acceleration}}
    </div>
</template>

<script>
export default {
  name: 'Counter',
  data () {
    return {
      location: [],
      acceleration: [],
      start: false
    }
  },
  mounted: function () {
    console.log(this.start)
    let self = this
    var location = setInterval(function(){
      if (self.start == true) {
        if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position){
          // 获取成功
          //先用consle.log去確認讀到了沒，沒讀到就先寫入會變成null（異步大坑）
          var head = position["coords"]["heading"]
          var lat = position["coords"]["latitude"]
          var lon = position["coords"]["longitude"]
          var locobj = {lat:lat,lon:lon,head:head}
          //console.log(locobj)
          self.location.push(locobj)
        }, function(err){
            // 获取失败
            console.debug(err);
          });
        } else {
          console.debug('不支持获取GPS地理位置');
        }
      }
    },3000)
    window.addEventListener('devicemotion', function(event) {
      self.acceleration.push(event.acceleration.x + ' m/s2');
    });
  },
  methods: {
    startRecord () {
      this.start = true
      console.log(this.start)
    },
    stopRecord () {
      this.start = false
    },
    writeRecords: function () {
      //等待施工（需要换资料结构，不然会是null）
      var location = this.location.toString()
			this.axios.post('http://apitest.hzeven.com/api/gps/create',{records: location})
		}
  }
}
</script>