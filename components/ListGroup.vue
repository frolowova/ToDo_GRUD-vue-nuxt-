<template>
  <div class="wrapp">
    <div class="container">
      <!-- <div class="title">Добавить</div> -->
      <!-- <hr style="width:60%; opacity: .4; text-align: center;" /> -->
      <div>
        <h3 class="title">Добавить в имеющуюся группу</h3>
      </div>
      <div class="listGroup">
        <ul class="list">
          <li v-for="(group, i) in groups" :key="i">
            <template v-if="group.length > 0">
              <input
                type="radio"
                :id="group"
                :value="group"
                :key="group"
                v-model="gr"
                :checked="group == groupname"
              />
              <label :for="group" @click="check($event)">{{group}}</label>
            </template>
          </li>
        </ul>
        <!-- <v-radio-group>
        <v-radio
          v-for="(group, i) in groups"
          v-if="group.length > 0"
          :key="i"
          :value="group"
          :label="group"
          @click="check($event)"
        ></v-radio>
        </v-radio-group>-->
      </div>

      <div class="addGroup">
        <div>
          <h3 class="title">Или создайте новую группу</h3>
        </div>
        <input type="text" id="createGroupInp" v-model="gr" placeholder="Название группы" />
        <!-- <button @click="createGroup">Создать</button> -->
      </div>
      <div class="btns">
        <div class="btn-back">
          <button @click="close">Отмена</button>
        </div>
        <div class="btn-apply">
          <button class="checkGroupsUp" @click="applyGroup">Применить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { groupname: String },
  data() {
    return {
      gr: ""
      // checkedGroups: []
    };
  },
  methods: {
    createGroup() {
      console.log(this.gr);
      // this.gr = "";
    },
    check(e) {
      if (e.target.checked) {
        this.gr = e.target.value;
      }
    },
    applyGroup() {
      let group = this.gr;
      // this.gr = "";
      this.$emit("addGroupName", group);
    },
    close() {
      this.gr = "";
      this.$emit("addGroupName", "");
    }
  },
  computed: {
    groups() {
      return this.$store.getters.getListGroups;
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapp {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: white;
  z-index: 1001;
  font-family: Arial, Helvetica, sans-serif;
}
.container {
  padding: 20px;
  width: 80%;
  max-width: 550px;
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  // margin: auto;
  background-color: white;
  // z-index: 1002;
}
.title {
  margin-top: 20px;
  margin-bottom: 10px;
  color: rgb(100, 100, 100);
}
.listGroup {
  margin-left: 10px;
  margin-top: 20px;
  font-size: 20px;
}
.list {
  list-style: none;
}
.list li {
  margin-bottom: 10px;
}
.addGroup {
  margin-top: 40px;
  margin-bottom: 10px;
}
#createGroupInp {
  line-height: 2rem;
  font-size: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  width: 100%;
}
.btns {
  display: flex;
  justify-content: space-between;
  margin: 20px;
  // margin-top: 20px;
  padding: 10px;
  font-size: 20px;
}
.btn-apply {
  color: #fe6637;
}
.btn-back {
  color: blue;
}

@media screen and (max-width: 380px) {
  .btns {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
  }
  .btn-back {
    margin-bottom: 10px;
  }
}
</style>