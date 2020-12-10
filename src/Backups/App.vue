<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
    <div id="root">
      A basic example of using a single infowindow for 3 markers.
      <GmapMap :center="center" :zoom="15" style="width: 100%; height: 500px">
        <GmapInfoWindow :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
        </GmapInfoWindow>
        <GmapMarker :key="i" v-for="(m,i) in markers" :position="m.position" :clickable="true" @click="toggleInfoWindow(m,i)"></GmapMarker>
      </GmapMap>
    </div>
  </div>
</template>

<script>
import {gmapApi} from 'vue2-google-maps'

export default {
  name: 'App',
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

      infoOptions: {
      content: '',
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
      infoText: '<strong>Marker 1</strong>'
      }, {
      position: {
          lat: 47.374592,
          lng: 8.548867
      },
      infoText: '<strong>Marker 2</strong>'
      }, {
      position: {
          lat: 47.379592,
          lng: 8.549867
      },
      infoText: '<strong>Marker 3</strong>'
      }]
    }
  },

  methods: {
      toggleInfoWindow: function(marker, idx) {
      this.infoWindowPos = marker.position;
      this.infoOptions.content = marker.infoText;
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
