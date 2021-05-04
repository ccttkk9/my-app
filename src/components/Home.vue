<template>
  <v-container fluid>
    <v-row align="center">
      <v-col align="center">
        <p>在開始之前，請先取得token</p>
        <p>Step1: 請先登入 <v-btn v-on:click="getToken()">start</v-btn></p>
        <p>
          Step2:將取得的token輸入
          <v-text-field v-model="code" type="text" cols='3' />
          <v-btn v-on:click="token(access_token)">input</v-btn>
        </p>
        <p>Step3:Token將顯示在下方:<br /></p>
        {{ this.access_token }}
        <br />
        <router-link :to="{ name: 'Work', params: { token: access_token } }">
          <v-btn>work</v-btn>
        </router-link>
        <v-btn @click="toWork">test_page</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      response_type: "Code",
      access_type: "offline",
      client_id:
        "324106375588-hhkk40jkdcu360spkqu2qitghqjdpprf.apps.googleusercontent.com",
      redirect_url: "https://example.com",
      scope: "https://www.googleapis.com/auth/cloud-platform",
      code: "",
      url: "",
      access_token: "",
    };
  },
  methods: {
    getToken() {
      //  axios.get('https://accounts.google.com/o/oauth2/auth?response_type=code&access_type=offline&client_id=324106375588-hhkk40jkdcu360spkqu2qitghqjdpprf.apps.googleusercontent.com&redirect_uri=https://example.com&scope=https://www.googleapis.com/auth/cloud-platform')
      window.open(
        "https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?response_type=code&access_type=offline&client_id=324106375588-hhkk40jkdcu360spkqu2qitghqjdpprf.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fexample.com&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcloud-platform&flowName=GeneralOAuthFlow"
      );
    },
    token() {
      this.url =
        "https://accounts.google.com/o/oauth2/token?code=" +
        this.code +
        "&client_id=324106375588-hhkk40jkdcu360spkqu2qitghqjdpprf.apps.googleusercontent.com&client_secret=_vigMI-twRrDYpxNkkZilUdX&redirect_uri=https://example.com&grant_type=authorization_code";
      axios.post(this.url).then((res) => {
        this.access_token = res.data.access_token;
      });
    },
    toWork() {
      this.$router.push({
        name: "TestPage",
        params: { token: this.access_token },
      });
    },
  },
};
</script>

<style>
.v-text-field{
      width: 400px;
}
</style>