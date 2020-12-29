<template>
<div>
<v-app>
  <v-row align-content="center">
  <v-col cols="12">
  <h2 style="margin-bottom: 50px; color:grey">登入</h2>
  <form style="margin: 50px">
    <v-text-field
      outlined
      v-model="email"
      placeholder="請輸入電子郵件"
      :error-messages="emailErrors"
      label="Email"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>
    <v-text-field
      outlined
      v-model="password"
      placeholder="請輸入密碼"
      :error-messages="passwordErrors"
      label="Password"
      required
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
    ></v-text-field>
    <v-btn
      block
      class="mr-4"
      style="color: white; background-color: grey"
      @click="submit"
    >
      登入
    </v-btn>
  </form>
  </v-col>
  </v-row>
</v-app>
</div>
</template>