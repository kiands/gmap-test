<template>
    <div style="width: 100vw; height: 90vh;">
    <div id="container__top">
    <div style="display: flex; align-items: center">
    <v-toolbar
      dense
      floating
      style="width: 45vw"
    >
      <v-text-field
        hide-details
        prepend-icon="mdi-magnify"
        single-line
      ></v-text-field>
    </v-toolbar>
    </div>
    <v-btn 
      class="mx-2"
      fab
      color="indigo"
    >
      <v-icon dark>
        mdi-refresh
      </v-icon>
    </v-btn>
    </div>
    <div id="toolbar__bottom">
      <div id="bar__inner__top">
        <div style="width: 33%"></div>
        <div style="width: 33%; display: flex; justify-content: center">
          <div id="banner">土城區 完成度 58%</div>
        </div>
        <div style="width: 33%; display: flex; justify-content: flex-end">
        <v-btn
          class="mx-2"
          fab
          color="indigo"
          @click="addShop"
        >
          <v-icon dark>
            mdi-plus
          </v-icon>
        </v-btn>
        </div>
      </div>
      <div id="bar__inner__bottom">
        <v-btn
          class="mx-2"
          fab
          color="indigo"
          @click="login"
        >
          <v-icon dark>
            mdi-account-circle
          </v-icon>
        </v-btn>
        <v-btn-toggle v-model="toggle_exclusive">
          <v-btn>
            <v-icon>mdi-crosshairs-gps</v-icon>
          </v-btn>
          <v-btn>
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </v-btn-toggle>
        <v-btn
          class="mx-2"
          fab
          color="indigo"
        >
          <v-icon>
            mdi-switch
          </v-icon>
        </v-btn>
        </div>
    </div>
    <GmapMap 
    :center="center" 
    :zoom="15" 
    style="width: 100%; height: 100%; position: relative; top: -178px"
    >
    <div
        :key="i" 
        v-for="(m,i) in markers" 
    >
        <GmapInfoWindow
        :options="infoOptions" 
        :position="infoWindowPos" 
        :opened="infoWinOpen" 
        @closeclick="infoWinOpen=false"
        >
        <inner-component>
            {{dummyInfo}}
            <div style="display: felx; flex-direction:column; justify-content: center">
            <counter></counter>
            <br>
            <new-todos></new-todos>
            </div>
        </inner-component>
        </GmapInfoWindow>
        <GmapMarker 
        :position="m.position" 
        :icon ="m.icon"
        :clickable="true" 
        @click="toggleInfoWindow(m,i)"
        >
        </GmapMarker>
    </div>
    </GmapMap>
    </div>
</template>

<style scoped>
  #container__top{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: relative;
    top: 10vh;
    left: 10px;
    z-index: 2;
    margin-right: 15px
  }

  #toolbar__bottom{
    display: flex;
    flex-direction: column;
    position: relative;
    top: 60vh;
    left: 10px;
    z-index: 2;
    margin-right: 75px
  }

  #bar__inner__top{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px
  }

  #banner{
    display: flex;
    align-items: center;
    height: 25px;
    border-radius: 5px;
    color: white;
    font-size: 10px;
    background-color: grey
  }

  #bar__inner__bottom{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center
  }
</style>

<script>
import {gmapApi} from 'vue2-google-maps'
import Counter from './Counter'
import InnerComponent from './InnerComponent'
import NewTodos from './NewTodos.vue'

export default {
  name: 'Gmap',

  components: {
    Counter,InnerComponent,NewTodos
  },

  computed: {
    google: gmapApi
  },

  data() {
    return {
      center: {
      lat: 47.376332,
      lng: 8.547511
      },
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,
      dummyInfo: null,

      infoOptions: {
      //content: '',
      //optional: offset infowindow so it visually sits nicely on top of our marker
      pixelOffset: {
          width: 0,
          height: -35
      }
      },
      markers: [{
      position: {
          lat: 47.376332,
          lng: 8.547511
      },
      dummyInfo: 1,
      //infoText: '<strong>Marker 1</strong><br><a href="https://www.baidu.com">Jump to a link</a>',
      icon: { url: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2106328784,1168031945&fm=26&gp=0.jpg', scaledSize: { width: 50, height: 50 } }
      }, {
      position: {
          lat: 47.374592,
          lng: 8.548867
      },
      dummyInfo: 2,
      //infoText: '<strong>Marker 2</strong>'
      }, {
      position: {
          lat: 47.379592,
          lng: 8.549867
      },
      dummyInfo: 3,
      //infoText: '<strong>Marker 3</strong>'
      }]
    }
  },

  methods: {
      toggleInfoWindow: function(marker, idx) {
          this.infoWindowPos = marker.position;
          this.dummyInfo = marker.dummyInfo;
          //this.infoOptions.content = marker.infoText;
          //check if its the same marker that was selected if yes toggle
          if (this.currentMidx == idx) {
              this.infoWinOpen = !this.infoWinOpen;
          }
          //if different marker set infowindow to open and reset current marker index
          else {
              this.infoWinOpen = true;
              this.currentMidx = idx;
          }
      },
      login: function(){
        this.$router.push('/login')
      },
      addShop: function(){
        this.$router.push('/addShop')
      }
    }
  }
</script>