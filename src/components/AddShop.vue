<template>
<div>
<v-app>
  <v-container class="grey lighten-5">
    <v-row>
      <v-col
        cols="12"
        md="12"
        align-self="center"
      >
        <v-text-field outlined></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <v-select
          :items="items"
          label="Outlined style"
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
          label="Outlined style"
          outlined
        ></v-select>
      </v-col>
    </v-row>
    <v-row justify="space-around" align="center">
      <v-col>
        <div style="display: flex; align-items: center">
          <div style="width: 60%; display: flex; justify-content: space-between">
            <v-btn></v-btn><v-btn></v-btn>
          </div>
          <div style="width: 40%">
            <v-text-field></v-text-field>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="n in 2"
        :key="n"
        cols="6"
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >
          .col-6
        </v-card>
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