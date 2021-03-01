<template>
<div>
<v-app>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <v-card>
          <v-icon>mdi-camera</v-icon>
          <v-file-input multiple
            accept="image/png, image/jpeg, image/bmp"
            id="images"
          >
          </v-file-input>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <v-file-input
          :rules="rules"
          accept="image/png, image/jpeg, image/bmp"
          placeholder="選擇一張圖片"
          prepend-icon="mdi-camera"
          label="圖片"
        ></v-file-input>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <v-text-field
          outlined
          v-model="name"
          label="櫃位名"
          placeholder="請輸入櫃位名"
          required
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <v-select
          :items="items"
          label="選擇百貨公司名稱"
          outlined
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <v-select
          :items="items"
          label="選擇分館"
          outlined
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="8"
        sm="4"
        class="py-2"
      >
        <div 
          style="display: flex; align-items: center; justify-content: center; height: 100%; flex-direction: row"
        >
          <p style="margin-bottom: 0; margin-right: 10px; color: grey">單一品牌：</p>
          <v-btn-toggle v-model="toggle_exclusive">
            <v-btn style="color: grey">
              是
            </v-btn>
            <v-btn style="color: grey">
              否
            </v-btn>
          </v-btn-toggle>
        </div>
      </v-col>
      <v-col
        cols="4"
        sm="4"
        class="py-2"
      >
        <div 
          style="display: flex; align-items: center; justify-content: center; height: 100%"
        >
          <v-text-field
            outlined
            v-model="floor"
            label="Floor"
            placeholder="請輸入樓層"
            required
          ></v-text-field>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        sm="4"
      >
        <div 
          style="display: flex; align-items: center; justify-content: center; height: 100%; flex-direction: row"
        >
          <p style="margin-bottom: 0; margin-right: 10px; color: grey">是否為GFK TW樣本店：</p>
          <v-btn-toggle v-model="toggle_exclusive">
            <v-btn style="color: grey">
              是
            </v-btn>
            <v-btn style="color: grey">
              否
            </v-btn>
          </v-btn-toggle>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <v-select
          :items="items"
          label="選擇品牌/PG"
          outlined
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="4"
        md="4"
      >
        <v-btn style="color: grey">
          清空
        </v-btn>
      </v-col>
      <v-col
        cols="8"
        md="8"
      >
        <v-btn block style="color: grey">
          新增櫃位
        </v-btn>
      </v-col>
    </v-row>
    <v-btn @click="showCam()">点击使用網頁拍攝</v-btn>
    <v-btn @click="downloadPics()">下載拍攝的照片</v-btn>
    <v-btn @click="readExif()">寫入exif信息</v-btn>
    <cam v-if="show" style="z-index: 2; position: absolute; top: 100px" @on-close="cancelOrRecord(arguments)"></cam>
  </v-container>
</v-app>
</div>
</template>

<style>
  .singleBrand{
    background-color: grey
  }
</style>

<script>
  import cam from '@/components/Cam'
  import Exif from '../../node_modules/exif-js'

  export default {
    components: { cam },
    data: () => ({
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      album: '',
      position: '',
      exif: '',
      show: false
    }),
    methods: {
      showCam () {
        this.show = true
      },
      cancelOrRecord (data) {
        if (data[0] == "save") {
          this.show = false
          this.album = data[1]
          this.position = data[2]
        } else {
          this.show = false
        }
      },
      downloadPics () {
        for (var i = 0; i < this.album.length; i++) {
          const photoName = `${new Date().getTime()}`
          const dataurl = this.album[i]
          const arr = dataurl.split(',')
          // 将base64编码转为字符串
          const bstr = window.atob(arr[1])
          let n = bstr.length
          const u8arr = new Uint8Array(n) // 创建初始化为0的，包含length个元素的无符号整型数组
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
          }
          const file = new File([u8arr], photoName, {type: 'image/jpeg',})
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(file);
          link.download = photoName;
          link.click();
          window.URL.revokeObjectURL(link.href);
        }
      },
      readExif () {
        var file = document.getElementById("images").files[0]
        let self = this
        Exif.getData(file, function(){
          //Orientation = Exif.getTag(this, 'Orientation');
          self.exif = Exif.getAllTags(this)
        })
      }
    }
  }
</script>