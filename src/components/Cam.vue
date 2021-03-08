<template>
    <div id = "Cam">
        <title>JS WebRTC</title>
        <div id="viewer">
            <span>取景器</span>
            <video 
              id="video" width=500 height=375
              webkit-playsinline="true"
              playsinline
            >
            </video>
        </div>
        <button @click="shutter()" id="shutter">拍照</button>
        <div id="photo--last">
            <span>上一張照片預覽</span>
            <canvas id="canvas"></canvas>
        </div>
        <span>本次相簿</span>
        <div v-for="(img,id) in album" :key="id" id="album">
            <div id="photo--single">
                <img v-bind:src="img" width=225 height=300>
                <button @click="deleteImg(id)">delete</button>
            </div>
        </div>
        <v-btn @click="closeAndSubmit()">Submit</v-btn>
        <v-btn @click="closeAndSubmit()">Cancel</v-btn>
        <v-btn id="start">Start Streaming</v-btn>
    </div>
</template>

<style>
    #viewer{
        display: flex;
        flex-direction: column;
        align-items: center
    }
    #shutter{
        margin-bottom: 30px
    }
    #photo--last{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 30px;
    }
    #album{
        display: flex;
        flex-direction: column;
        align-items: center
    }
    #photo--single{
        display: flex;
        flex-direction: row;
        align-items: center
    }
</style>

<script>
    export default {
      data () {
        return {
            album:[],
            geoinfo: '',
            //canvas: document.querySelector("#canvas"),
            //video: document.querySelector("#video"),
            width: 600,//视频和canvas的宽度
            height: 0,
            streaming: false
        }
      },
      mounted: function () {

        var canvas = document.querySelector("#canvas")
        var video = document.querySelector("#video")

        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
              console.log("success")
          }, function(err){
            // 获取失败
            console.debug(err);
          });
        } else {
          console.debug('不支持获取GPS地理位置');
        }
        
        // 思考：created和mounted和updated的區別以及何時使用this
        // 获取用户媒体,包含视频和音频
        navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(stream => {
          //{ video: { facingMode: { exact: "environment" } }, audio: false }
          video.srcObject = stream;// 将捕获的视频流传递给video，放弃window.URL.createObjectURL(stream)的使用
          var start = document.getElementById("start")
          //Chrome和Safari表現不同，需要研究
          start.addEventListener('click',() => {
            video.play()
          })
          //video.play();// 播放视频
          //audio.srcObject = stream;
          //audio.play();
        })
        // 监听视频流就位事件,即视频可以播放了（暂时放弃监听）
        canvas.setAttribute('width', 375);
        canvas.setAttribute('height', 500);
        this.streaming = !this.streaming;
        //video.addEventListener('canplay', function(ev){
        //  if (!this.streaming) {
        //    //height = video.videoHeight / (video.videoWidth/width);
        //    canvas.setAttribute('width', 375);
        //    canvas.setAttribute('height', 500);
        //    this.streaming = !this.streaming;
        //  }
        //}, false)
      },
      methods: {
        deleteImg(id) {
          this.album.splice(id,1)
        },
        shutter() {
          //需要判断媒体流是否就绪
          if(this.streaming){
            canvas.getContext("2d").drawImage(video, 0, 0, 450, 600);// 将视频画面捕捉后绘制到canvas里面
            this.album.push(canvas.toDataURL('image/png'))
            //img.src = canvas.toDataURL('image/png');// 将canvas的数据传送到img里
            //var parent = document.querySelector("#album");;// 添加div
            //var img = document.createElement("img");// 设置div属性，如id
            //photo_order = photo_order + 1;
            //img.setAttribute("id", photo_order);
            //img.src = canvas.toDataURL('image/png');
            //parent.appendChild(img);
          }
        },
        closeAndSubmit() {
          const videoElem = document.querySelector('video')
          const stream = videoElem.srcObject
          const tracks = stream.getTracks()
          tracks.forEach(function(track) {
            track.stop()
          })
          let self = this// 在裡面寫會撞車，需要把vue的實例換個詞
          if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
              // 获取成功
              console.log(position)
              //console.log(self)
              //先用consle.log去確認讀到了沒，沒讀到就先寫入會變成null（異步大坑）
              self.geoinfo = position
          }, function(err){
              // 获取失败
              console.debug(err);
            });
          } else {
            console.debug('不支持获取GPS地理位置');
          }
          const status = "save"
          this.$emit('on-close',status,this.album,this.geoinfo)
          this.album = null
          this.geoinfo = null
        },
        closeAndCancel() {
          const videoElem = document.querySelector('video')
          const stream = videoElem.srcObject
          const tracks = stream.getTracks()
          tracks.forEach(function(track) {
            track.stop()
          })
          const status = "cancel"
          this.$emit('on-close',status)
          this.album = null
          this.position = null
        }
      }
    }
</script>