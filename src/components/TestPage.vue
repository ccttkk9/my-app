<template>
  <div>
    <p>
      *token要定時更新
      <router-link to="/">
        <v-btn>取得token</v-btn>
      </router-link>
    </p>
    <br />
    <p>下班前要把測試用instance全刪掉*重要</p>
    <br />
    <p>
      token:<v-text-field v-model="token" type="text" />
      <br />
    </p>
    <v-row>
      <v-col cols="12" v-for="(item, index) in instanceGroup" :key="index">
        <v-card>
          <v-card-title>{{ item.name }}</v-card-title>
          <v-card-text>{{ item.name }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>

  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      token: this.$route.params.token,
      instanceGroup: [],
      instances: [],
      dataList: [],
      resourceId: "",
      text: [],
      isEdit: false,
      text_name: "",
      payload: {
        instances: [
          {
            name: this.text_name,
          },
        ],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      axios
        .get(
          "https://compute.googleapis.com/compute/v1/projects/test-2021-309206/zones/asia-east1-b/instanceGroupManagers",
          {
            headers: {
              Authorization: "Bearer " + this.token,
            },
          }
        )
        .then((res) => {
          this.instanceGroup = res.data.items;
          this.getData();
        });
    },
    getData(name) {
      axios.post(
        "https://compute.googleapis.com/compute/v1/projects/test-2021-309206/zones/asia-east1-b/instanceGroupManagers/" +
          name +
          "/listManagedInstances",
        "",
        {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        }
      ).then((res) => {
        console.log(res.data)
      });
    },
    add(name) {
      this.payload.instances[0].name = this.text_name;
      if (confirm("確認新增 " + this.text_name + " ?")) {
        axios
          .post(
            "https://compute.googleapis.com/compute/v1/projects/test-2021-309206/zones/asia-east1-b/instanceGroupManagers/" +
              name +
              "/createInstances",
            this.payload,
            {
              headers: {
                Authorization: "Bearer " + this.token,
              },
            }
          )
          .then((this.isEdit = false), alert("Create success"));
      }
    },
  },
};
</script>

<style>
</style>