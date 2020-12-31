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
  export default {
    data: () => ({
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    }),
  }
</script>