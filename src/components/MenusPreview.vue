<template>
    <div class="container">
        <div class="container--preview">
            <span>id:</span>
            <span class="preview--capsule">{{data.id}}</span>
            <span>title:</span>
            <span class="preview--capsule">{{data.title}}</span>
            <span>link:</span>
            <span class="preview--capsule">{{data.link}}</span>
            <span>order:</span>
            <span class="preview--capsule">{{data.order}}</span>
        </div>
        <div class="container--preview">
            <button class="preview--capsule capsule__border" v-show="visible" @click="edit(data)">Edit</button>
            <button class="preview--capsule capsule__border" v-show="visible" @click="remove(data)">Delete</button>
        </div>
    </div>
</template>

<style>
    .container {
        display: flex;
        justify-content: space-between
    }

    .container--preview {
        display: flex;
        flex-direction: row;
        align-items: center
    }

    .preview--capsule {
        margin-left: 20px;
        margin-right: 20px
    }

    .capsule__border {
        border: solid grey 1px;
        border-radius: 5px
    }
</style>

<script>
export default {
    props: ['data','visible'],
    methods: {
        edit: function (data) {
            const status = 1
            this.$emit('on-change',status,data)
        },
        remove: function (data) {
            const status = 0
            this.$emit('on-change',status,data)
        },
        show_status (status) {
            console.log(status)
        }
    }
  }
</script>