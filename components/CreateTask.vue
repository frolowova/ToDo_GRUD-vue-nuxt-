<template>
  <div>
    <h2 class="title">Создать задачу</h2>
    <div class="create-task">
      <!-- <div class="task-groupname">{{task.groupname}}</div> -->
      <input
        type="text"
        class="create-task__input"
        id="create-task-title"
        v-model="title"
        v-on:keydown.enter="focusToBody"
        placeholder="Название задачи"
      />
      <input
        type="text"
        class="create-task__input"
        id="create-task-body"
        v-model="body"
        v-on:keydown.enter="focusToBtn"
        placeholder="Опиши задачу подробнее"
      />
      <div class="group-add">
        <p @click="openModal = true">добавить в группу {{groupname}}</p>

        <div v-if="openModal">
          <listgroup
            :groupname="groupname"
            v-on:addGroupName="addGroupName"
            v-on:close="openModal = false"
          />
        </div>
      </div>
      <div class="validation-text" v-show="!valid">Заполните хотя бы одно из полей</div>
      <button class="create-task__btn" @click="taskCreate">Создать</button>
    </div>
  </div>
</template>

<script>
import listgroup from "~/components/ListGroup.vue";
export default {
  components: { listgroup },
  data() {
    return {
      title: "",
      body: "",
      groupname: "",
      valid: true,
      openModal: false
    };
  },
  methods: {
    addGroupName(name) {
      this.groupname = name;
      this.openModal = false;
    },
    taskCreate() {
      if (!this.body && !this.title) {
        this.valid = false;
        setTimeout(() => {
          this.valid = true;
        }, 3000);
        this.focusToTitle();
        return;
      }
      let task = {
        groupname: this.groupname,
        name: this.title,
        body: this.body,
        status: "active"
      };
      task.uid = new Date().getTime(); // добавляем уникальный идентификатор
      console.log("uid");
      console.log(task.uid);

      // this.$emit("taskCreate", task);
      this.$store.dispatch("addTask", task);
      this.title = "";
      this.body = "";
      document.querySelector(".create-task__btn").blur();
    },
    focusToTitle() {
      document.getElementById("create-task-title").focus();
    },
    focusToBody() {
      document.getElementById("create-task-body").focus();
    },
    focusToBtn() {
      document.querySelector(".create-task__btn").focus();
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  margin: 20px;
  margin-bottom: 30px;
  color: rgb(100, 100, 100);
}
.create-task {
  display: grid;
  justify-content: center;
  justify-items: center;
  margin: 30px;
}
.create-task__input {
  border-bottom: 1px solid rgb(218, 216, 216);
  font-size: 22px;
  line-height: 2rem;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 20px;
}
.create-task__btn {
  width: 125px;
  text-decoration: none;
  outline: none;
  display: inline-block;
  padding: 10px 30px;
  margin: 10px 20px;
  position: relative;
  overflow: hidden;
  border: 2px solid #fe6637;
  border-radius: 8px;
  font-family: "Montserrat", sans-serif;
  color: #fe6637;
  transition: 0.2s ease-in-out;
}
.create-task__btn:before {
  content: "";
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.5)
  );
  height: 50px;
  width: 50px;
  position: absolute;
  top: -8px;
  left: -75px;
  transform: skewX(-45deg);
}
.create-task__btn:hover {
  background: #fe6637;
  color: #fff;
}
.create-task__btn:hover:before {
  left: 150px;
  transition: 0.5s ease-in-out;
}
.create-task__btn:focus {
  border-bottom: 4px solid #fe6637;
}
.validation-text {
  color: red;
}
.group-add {
  justify-self: right;
  margin-bottom: 10px;
  // color: rgb(70, 70, 170);
  // color: red;
}
.group-add p {
  color: #fe6637;
  cursor: pointer;
}
</style>
