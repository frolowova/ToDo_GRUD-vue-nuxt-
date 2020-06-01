<template>
  <div class="wrapp">
    <div class="header-out">
      <div class="header">
        <div class="title" @click="openModal = true">
          Группа: {{groupname}}
          <v-icon>mdi-pencil</v-icon>
        </div>
        <div class="header__btn-del">
          <button @click="modalDel = !modalDel">
            <v-icon>mdi-delete</v-icon>
          </button>
        </div>
      </div>
    </div>

    <!-- Модальное окно подтверждения удаления группы -->
    <div class="modal-del" v-if="modalDel">
      <div class="modal-container">
        <div class="modal-content">
          <div class="modal-content__header">Удадение группы!</div>
          <div class="modal-content__text">
            Внимание все задачи этой группы будут из неё удалены без возможности восстановления!
            (удалится группа, сами задачи остануться)
            <p>Вы хотите удалить группу?</p>
          </div>
          <div class="modal-content__footer">
            <div class="yes">
              <button @click="delGroupName()">Да</button>
            </div>
            <div class="no" @click="modalDel = false">
              <button>Нет</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Компонент изменения группы -->
    <div v-if="openModal">
      <listgroup
        :groupname="groupname"
        v-on:addGroupName="addGroupName"
        v-on:close="openModal = false"
      />
    </div>

    <div v-for="(task, i) in listTasksFromGroup" :key="i" class="tasks">
      <div class="task-card" :class="{'done-task': task.status == 'done'}">
        <div class="task-card__header">
          <div class="task-card__ind">{{i+1}}.</div>
          <div class="task-card__title" @click="openTask(task.uid)">{{task.name}}</div>
          <div class="task-card__delete">
            <button class="btn-delete" @click="modalDelTask = true">
              <v-icon>mdi-delete</v-icon>
            </button>
          </div>
        </div>
        <!-- Модальное окно подтверждения удаления Задачи -->
        <div class="modal-del" v-if="modalDelTask">
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
                <div class="no" @click="modalDelTask = false">
                  <button>Нет</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="task-card__text" @click="openTask(task.uid)">{{task.body}}</div>
        <div class="task-card__footer">
          <div class="task-card__status">
            <div class="btn-status" v-if="task.status == 'done'">Статус: Выполнена</div>
            <div class="btn-status" v-else>Статус: Не выполнена</div>
          </div>
          <div class="task-card__remove-group" @click="delFromGroup(task.uid)">
            <button class="btn-remove-group">Убрать из группы</button>
          </div>
        </div>
      </div>
    </div>
    <div class="gohome">
      <nuxt-link to="/">
        <v-icon>mdi-arrow-left</v-icon>
        <button class="gohome__btn-back">Назад</button>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import listgroup from "~/components/ListGroup.vue";
export default {
  components: { listgroup },
  data() {
    return {
      groupname: "",
      newGroupname: "",
      openModal: false,
      modalDel: false,
      modalDelTask: false
    };
  },
  methods: {
    addGroupName(name) {
      this.newGroupname = name;
      this.openModal = false;
      // Логика, по которой мы всем задачам со старым названием присваиваем новые
      if (!this.newGroupname) return;
      let newName = {
        groupname: this.groupname,
        newGroupname: this.newGroupname
      };
      this.$store.dispatch("renameGroup", newName);
      this.groupname = this.newGroupname;
    },
    delGroupName() {
      let delName = {
        groupname: this.groupname,
        newGroupname: ""
      };
      this.$store.dispatch("renameGroup", delName);
      this.$router.push("/");
    },

    openTask(uid) {
      this.$store.dispatch("setSelectedTask", uid);
      this.$router.push("/taskHome");
    },
    taskDel(uid) {
      this.$store.dispatch("delTask", uid);
      this.modalDelTask = false;
      // Если задач не осталось, то выходим на главную страницу
      if (this.$store.getters.getTasksFromGroup(this.groupname).length == 0)
        this.$router.push("/");
    },
    delFromGroup(uid) {
      this.$store.dispatch("delFromGroup", uid);
    }
  },
  mounted() {
    this.groupname = this.$store.getters.getSelectedGroup;
  },
  computed: {
    listTasksFromGroup() {
      return this.$store.getters.getTasksFromGroup(this.groupname);
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapp {
  text-align: center;
}
.header-out {
  display: grid;
  justify-content: center;
}
.header {
  display: grid;
  grid-template-columns: max-content 30px 30px;
  align-items: center;
}
.header__btn-del {
  grid-column-start: 3;
  grid-column-end: 4;
}
.title {
  font-size: 24px;
  line-height: 2.5rem;
  margin-top: 20px;
  margin-bottom: 20px;
  cursor: pointer;
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
  // border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.task-card__header {
  display: grid;
  grid-template-columns: 50px 1fr 50px;
  align-items: center;
}
.task-card__title {
  font-size: 22px;
  color: rgb(60, 60, 60);
  line-height: 2rem;
  text-align: left;
  margin: 10px;
  cursor: pointer;
}
.task-card__text {
  margin-left: 50px;
  margin-right: 50px;
  margin-bottom: 30px;
  padding-bottom: 10px;
  text-align: left;
  font-size: 18px;
  line-height: 1.5rem;
  font-family: Arial, Helvetica, sans-serif;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
.task-card__footer {
  display: grid;
  grid-template-columns: max-content max-content;
  justify-content: space-between;
  font-family: "Montserrat", sans-serif;
  margin-bottom: 30px;
  align-items: center;
}
.task-card__status {
  margin-left: 50px;
  margin-right: 10px;
}
.btn-status {
  padding: 10px;
}
.task-card__remove-group {
  margin-right: 50px;
  margin-left: 10px;
}
.btn-remove-group {
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  padding: 10px;
}
.btn-remove-group:hover {
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}
.gohome {
  padding: 20px;
  padding-bottom: 20px;
}
.gohome a {
  display: grid;
  grid-template-columns: max-content;
  font-family: "Montserrat", sans-serif;
  text-decoration: none;
}
.gohome__btn-back {
  font-size: 14px;
  color: gray;
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

@media screen and (max-width: 530px) {
  .task-card__footer {
    display: grid;
    grid-template-columns: 1fr;
    justify-items: right;
  }
  .task-card__status {
    margin-left: 10px;
    margin-right: 50px;
    margin-bottom: 10px;
  }
}
</style>