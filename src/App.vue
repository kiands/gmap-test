<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
    <div id="root">
      A basic example of using a single infowindow for 3 markers.
      <GmapMap 
        :center="center" 
        :zoom="15" 
        style="width: 100%; height: 500px"
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
  </div>
</template>

<script>
import {gmapApi} from 'vue2-google-maps'
import Counter from './components/Counter'
import InnerComponent from './components/InnerComponent'
import NewTodos from './components/NewTodos.vue'
//import NewTodos from './components/NewTodos'

export default {
  name: 'App',

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
      }
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
