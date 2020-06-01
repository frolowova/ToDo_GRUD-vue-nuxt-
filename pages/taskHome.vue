<template>
  <div class="wrapp">
    <div class="task-card" :class="{'done-task': task.status == 'done'}">
      <div class="task-card__header">Карточка задачи</div>
      <div class="task-card__title">
        <p>заголовок</p>
        <v-textarea class="name" v-model="nameTask" auto-grow rows="1" rounded></v-textarea>
      </div>
      <div class="task-card__text">
        <p>текст</p>
        <v-textarea class="text" v-model="textTask" auto-grow rows="1" rounded counter></v-textarea>
      </div>
      <div class="task-card__group" v-if="groupnameTask.length > 0">
        <p>группа:</p>
        <div data-app>
          <v-container fluid>
            <v-select :items="groups" v-model="groupnameTask"></v-select>
          </v-container>
        </div>
        <p>Или создайте новую группу</p>
        <input type="text" v-model="groupnameTask" />
      </div>
      <div v-else class="task-card__group">
        <p>группа:</p>
        <div data-app>
          <v-container fluid>
            <v-select :items="groups" v-model="groupnameTask" label="Выбрать группу"></v-select>
          </v-container>
        </div>
        <p>Или создайте новую группу</p>
        <input type="text" v-model="groupnameTask" />
      </div>

      <div class="task-card__footer">
        <div class="task-card__gohome">
          <button @click="goBack()">
            <v-icon>mdi-arrow-left</v-icon>
            <p>Назад</p>
          </button>
        </div>
        <div class="task-card__delete">
          <button class="btn-delete" @click="modalDel = true">
            <div>
              <v-icon>mdi-delete</v-icon>
              <p>удалить</p>
            </div>
          </button>
        </div>
        <div class="task-card__status">
          <button class="btn-status" @click="changeStatus(task.uid)" v-if="task.status == 'done'">
            <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
            <p>статус</p>
          </button>
          <button class="btn-status" @click="changeStatus(task.uid)" v-else>
            <v-icon>mdi-checkbox-blank-circle-outline</v-icon>
            <p>статус</p>
          </button>
        </div>
        <div class="task-card__save">
          <button class="btn-save" @click="saveTask(task)">
            <v-icon>mdi-content-save-edit</v-icon>
            <p>Сохранить</p>
          </button>
        </div>
      </div>
    </div>

    <!-- Модальное окно подтверждения удаления -->
    <div class="modal-del" v-if="modalDel">
      <div class="modal-container">
        <div class="modal-content">
          <div class="modal-content__header">Удадение задачи!</div>
          <div class="modal-content__text">
            Удалённую задачу нельзя будет восстановить
            <p>Вы хотите удалить задачу?</p>
          </div>
          <div class="modal-content__footer">
            <div class="yes">
              <button @click="taskDel(task.uid)">Да</button>
            </div>
            <div class="no" @click="modalDel = false">
              <button>Нет</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textTask: "",
      nameTask: "",
      groupnameTask: "",
      modalDel: false
    };
  },
  methods: {
    taskClose(uid) {
      this.$store.dispatch("delTask", uid);
    },
    changeStatus(uid) {
      this.$store.dispatch("setStatus", uid);
    },
    saveTask(task) {
      let uid = task.uid;
      let newDateTask = {
        uid: uid,
        groupname: this.groupnameTask,
        name: this.nameTask,
        body: this.textTask
      };
      this.$store.dispatch("rewriteTask", newDateTask);
      this.$router.push("/");
    },
    goBack() {
      this.$router.go(-1);
    },
    taskDel(uid) {
      this.$store.dispatch("delTask", uid);
      this.$router.push("/");
    }
  },
  mounted() {
    this.groupname = this.$store.getters.getSelectedGroup;
  },
  computed: {
    task() {
      this.textTask = this.$store.getters.getSelectedTask[0].body;
      this.nameTask = this.$store.getters.getSelectedTask[0].name;
      this.groupnameTask = this.$store.getters.getSelectedTask[0].groupname;
      return this.$store.getters.getSelectedTask[0];
    },
    groups() {
      return this.$store.getters.getListGroups;
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapp {
  text-align: center;
}
.title {
  font-size: 24px;
  line-height: 2.5rem;
  margin-top: 20px;
  margin-bottom: 20px;
}
.tasks {
  display: grid;
  width: 80%;
  max-width: 600px;
  margin: 0 auto;
}
.done-task {
  color: rgb(65, 63, 49);
  background-color: rgb(146, 219, 168);
}
.task-card {
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  height: 100%;
}
.task-card__header {
  line-height: 2rem;
  font-size: 18px;
  background-color: #fe6637;
  color: white;
}
.task-card__title {
  font-size: 22px;
  line-height: 2rem;
  text-align: left;
  margin-left: 50px;
  margin-right: 50px;
  margin-top: 30px;
  padding-bottom: 10px;
}
.task-card__title p {
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  line-height: 1rem;
}
.task-card__title .name {
  font-size: 22px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
.task-card__text {
  margin-left: 50px;
  margin-right: 50px;
  margin-bottom: 10px;
  padding-bottom: 10px;
  text-align: left;
  font-size: 18px;
  line-height: 1.5rem;
  font-family: Arial, Helvetica, sans-serif;
}
.task-card__text p {
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  line-height: 1rem;
}
.task-card__text .text {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
.task-card__group {
  margin-left: 50px;
  margin-right: 50px;
  margin-bottom: 30px;
  padding-bottom: 10px;
  text-align: left;
  font-size: 18px;
  line-height: 1.5rem;
}
.task-card__group p {
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  line-height: 1rem;
}
.task-card__group input {
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.task-card__footer {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: space-between;
  font-family: "Montserrat", sans-serif;
  margin-bottom: 10px;
  margin-top: 30px;
  align-items: center;
  font-size: 12px;
}
.task-card__delete p {
  margin: 5px;
}
.task-card__status p {
  margin: 5px;
}
.btn-status {
  padding: 10px;
  outline: none;
}
.btn-save {
  outline: none;
}
.task-card__save p {
  margin: 5px;
}
.task-card__remove-group {
  margin-right: 50px;
  margin-left: 10px;
  display: grid;
  grid-template-columns: 150px 1fr;
}
.task-card__gohome p {
  margin: 5px;
}
.task-card__gohome a {
  text-decoration: none;
  color: black;
}

// Модальное окно подтверждения удаления
.modal-del {
  position: fixed;
  bottom: 0;
  right: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  z-index: 10;
}
.modal-container {
  text-align: center;
  display: grid;
  justify-content: center;
  align-items: center;
  height: 100%;
  z-index: 100;
}
.modal-content {
  width: 500px;
  background-color: white;
  text-align: center;
  box-shadow: 2px 2px 4px 4px rgba(0, 0, 0, 0.2);
}
.modal-content__header {
  line-height: 2rem;
  font-size: 22px;
  background-color: red;
  color: aliceblue;
  padding: 10px;
}
.modal-content__text {
  font-size: 18px;
  padding-top: 30px;
  padding-bottom: 30px;
  padding-right: 30px;
  padding-left: 30px;
}
.modal-content__footer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 40px;
}
.modal-content__footer .yes {
  color: red;
  padding: 10px;
}
.modal-content__footer .no {
  background-color: rgb(41, 41, 88);
  color: white;
  font-size: 18px;
  padding: 10px;
  cursor: pointer;
}
</style>