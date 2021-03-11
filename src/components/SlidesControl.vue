<template>
    <div style="width = 1536px">
        <div class="card__top">
          <div class="card--top__container" v-for="(meta,index) in slides" :key="index">
              <preview
              class="preview"
              @on-change="edit_or_delete(arguments)" 
              v-bind:data="meta"
              v-bind:visible="not_editing">
              </preview>
          </div>
        </div>
        <div class="card__bottom">
            <div class="editors">
                <div class="editors__inside">
                  <span>title:</span>
                  <input class="card--editor editor__left" type="text" v-model="placeholder.title" />
                </div>
                <div class="editors__inside">
                  <span>description:</span>
                  <textarea class="card--editor editor__right" type="text" v-model="placeholder.description" />
                </div>
            </div>
            <div class="editors">
                <div class="editors__inside">
                  <span>link:</span>
                  <input class="card--editor editor__left" type="text" v-model="placeholder.link" />
                </div>
                <div class="editors__inside">
                  <span>cover:</span>
                  <textarea class="card--editor editor__right" type="text" />
                </div>
            </div>
            <div class="buttons">
              <button class="control" v-show="not_creating" @click="create_mode">Create</button>
              <button class="control" @click="submit">Submit</button>
              <button class="control" @click="cancel">Cancel</button>
            </div>
        </div>
    </div>
</template>

<style>
    .card__top {
        border: solid grey 1px;
        border-radius: 5px;
        margin: 10px
    }

    .card__bottom {
        display: flex;
        flex-direction: column;
        border: solid grey 1px;
        border-radius: 5px;
        margin: 10px
    }

    .card--top__container {
        border: solid grey 1px;
        border-radius: 5px;
        margin: 10px
    }

    .preview {
      margin: 5px
    }

    .card--editor {
        border: solid grey 1px;
        border-radius: 5px;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .editor__left {
      margin-right: 50px
    }

    .editor__right {
      margin-left: 50px
    }

    .editors {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 200px;
        padding-right: 200px
    }

    .editors__inside {
        display: flex;
        align-items: center
    }

    .buttons {
      display: flex;
      justify-content: center;
      margin: 10px
    }

    .control {
      border: solid grey 1px;
      border-radius: 5px;
      margin: 5px
    }
</style>

<script>
import preview from '@/components/SlidesPreview'

export default {
    components: { preview },
    data: () => ({
      not_editing: true,
      not_creating: true,
      slides: [
        {id:1, title: "t1", description: "d1", link: "l1", cover: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2106328784,1168031945&fm=26&gp=0.jpg"},
        {id:2,title:"t2",description:"d2",link:"l2", cover: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2106328784,1168031945&fm=26&gp=0.jpg"},
        {id:3,title:"t3",description:"d3",link:"l3", cover: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2106328784,1168031945&fm=26&gp=0.jpg"}
      ],
      backup_placeholder: {title:"t0",description:"d0",link:"l0"},
      placeholder: {title:"t0",description:"d0",link:"l0"}
    }),
    mounted: function() {
      
    },
    methods: {
      edit_or_delete: function (data) {
        if (data[0] == 0) {
          var idx = this.slides.indexOf(data[1])
          this.slides.splice(idx, 1);
        } else {
          var idx = this.slides.indexOf(data[1])
          this.placeholder = this.slides[idx]
          this.not_creating = false
        }
      },
      create_mode: function () {
        this.placeholder = {title:"ct0",description:"cd0",link:"cl0"}
        this.not_editing = false
      },
      submit: function () {
        if (this.not_editing == false || this.not_creating == false) {
          this.not_editing = true
          this.not_creating = true
          this.placeholder = this.backup_placeholder
        } else {
          console.log("not editing or creating")
        }
      },
      cancel: function () {
        this.not_editing = true
        this.not_creating = true
        this.placeholder = this.backup_placeholder
      }
    }
  }
</script>
