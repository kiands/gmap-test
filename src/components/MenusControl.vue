<template>
    <div style="width = 1536px">
        <div class="card__top">
          <div class="card--top__container" v-for="(meta,index) in slides" :key="index">
              <mpreview
              class="preview"
              @on-change="edit_or_delete(arguments)" 
              v-bind:data="meta"
              v-bind:visible="not_editing">
              </mpreview>
          </div>
        </div>
        <div class="card__bottom">
            <div class="editors">
                <span>title:</span>
                <input class="card--editor" type="text" v-model="placeholder.title" />
                <span>link:</span>
                <input class="card--editor" type="text" v-model="placeholder.link" />
                <span>order:</span>
                <input class="card--editor" type="text" v-model="placeholder.order" />
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
        margin: 10px
    }

    .editors {
        display: flex;
        justify-content: center;
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
import mpreview from '@/components/MenusPreview'

export default {
    components: { mpreview },
    data: () => ({
      not_editing: true,
      not_creating: true,
      slides: [
        {id:1, title: "t1",  link: "l1", order: 1},
        {id:2, title: "t2",  link: "l2", order: 2},
        {id:3, title: "t3",  link: "l3", order: 3}
      ],
      backup_placeholder: {title:"t0",order:0,link:"l0"},
      placeholder: {title:"t0",order:0,link:"l0"}
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
        this.placeholder = {title:"ct0",link:"cl0",order:"c0"}
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
