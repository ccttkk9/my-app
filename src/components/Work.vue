<template>
  <v-container fluid>
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
    <div>
      <v-spacer />

      <v-btn v-on:click="isEdit = true">add</v-btn>
      <v-btn v-on:click="check()">刷新</v-btn>
    </div>
    <p>共{{ list.length }}筆資料 資料更新後請等待一段時間再刷新</p>
    <!--    <v-table :data="list" border fit highlight-current-row>
      <v-table-column label="ID" width="200">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </v-table-column>
      <v-table-column width="100" label="name">
        <template slot-scope="scope">
          {{
            scope.row.instance.substring(scope.row.instance.indexOf("ces/") + 4)
          }}
        </template>
      </v-table-column>
      <v-table-column label="instance">
        <template slot-scope="scope">
          {{ scope.row.instance }}
        </template>
      </v-table-column>
      <v-table-column>
        <template slot-scope="scope">
          <v-btn v-on:click="Del(scope.row.instance)" icon="v-icon-delete" />
        </template>
      </v-table-column>
    </v-table>-->
    <v-data-table :headers="headers" :items="list">
      <template v-slot:item="row">
        <tr>
          <td>{{ row.item.id }}</td>
          <td>
            {{
              row.item.instance.substring(row.item.instance.indexOf("ces/") + 4)
            }}
          </td>
          <td>
            <v-btn icon v-on:click="Del(row.item.instance)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
    <v-dialog v-model="isEdit" width="500px">
      <v-card>
        <v-card-title>新增</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="text_name"
            type="text"
            placeholder="指定的instance名稱"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn v-on:click="add()" />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Work",

  data() {
    return {
      token: "",
      name: "",
      text_name: "",
      instance_name: "",
      headers: [
        { text: "Id", value: "id", },
        { text: "Instance", value: "instance" },
        { text: "Action", value: "action" },
      ],
      list: [],
      isEdit: false,
      payload: {
        instances: [
          {
            name: this.text_name,
          },
        ],
      },
      payload2: {
        instances: ["zones/asia-east1-b/instances/"],
      },
    };
  },
  created() {
    this.token = this.$route.params.token;
    this.check();
  },
  methods: {
    async check() {
      //this.payload.instances[0].name = this.text_name
      await axios
        .post(
          "https://compute.googleapis.com/compute/v1/projects/test-2021-309206/zones/asia-east1-b/instanceGroupManagers/mygroup/listManagedInstances",
          "",
          {
            headers: {
              Authorization:
                //"Bearer ya29.a0AfH6SMDWSqOa542dNmq9l1Y5aVxEN4Z_QiRgRU6APuHaDu2Zy3gbwhN7WaZGMp8OfhdugSIVk-cECIkXeWulgq44FA4JjSRqAhtWJ0jMnG16zduqSM93Ieacoe7QR210JuB5orJqW4Slcm8C-tspne3H8sc0cQ",
                "Bearer " + this.token,
            },
          }
        )
        .then((res) => {
          console.log(this.list);
          this.list = res.data.managedInstances;
          if (this.list == undefined) {
            this.list = [];
          }
          console.log(this.list);
        })
        .catch((error) => {
          console.log(error);
          alert("error!");
        });
    },
    add() {
      this.payload.instances[0].name = this.text_name;
      if (confirm("確認新增 " + this.text_name + " ?")) {
        axios
          .post(
            "https://compute.googleapis.com/compute/v1/projects/test-2021-309206/zones/asia-east1-b/instanceGroupManagers/mygroup/createInstances",
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
    del() {
      this.payload2.instances[0] += this.text_name;
      if (confirm("確認刪除 " + this.text_name + " ?")) {
        axios
          .post(
            "https://compute.googleapis.com/compute/v1/projects/test-2021-309206/zones/asia-east1-b/instanceGroupManagers/mygroup/deleteInstances",
            this.payload2,
            {
              headers: {
                Authorization: "Bearer " + this.token,
              },
            }
          )
          .then(alert("Delete success"));
      }
    },
    Del(name) {
      this.instance_name = name.substring(name.indexOf("ces/") + 4);
      this.payload2.instances[0] += this.instance_name;

      if (confirm("確認刪除 " + this.text_name + " ?")) {
        axios
          .post(
            "https://compute.googleapis.com/compute/v1/projects/test-2021-309206/zones/asia-east1-b/instanceGroupManagers/mygroup/deleteInstances",
            this.payload2,
            {
              headers: {
                Authorization: "Bearer " + this.token,
              },
            }
          )
          .then(alert("Delete success"));
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
textarea {
  width: 750px;
  height: 150px;
}
v-table {
  border: 1px;
  color: #42b983;
}
</style>
