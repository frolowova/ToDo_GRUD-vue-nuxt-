<template>
  <div class="task">
    <div class="task-block" v-if="!deleteTask">
      <div class="task__message-block">
        <div class="task-group" v-if="task.groupname.length > 0">
          <nuxt-link to="/groupHome">
            <p @click="openGroup(task.groupname)">Группа: {{task.groupname}}</p>
          </nuxt-link>
        </div>
        <div class="task-card" @click="openTask(task.uid)">
          <div class="task-title" :class="{'task-done': task.status == 'done'}">{{task.name}}</div>
          <div class="task-text" :class="{'task-done': task.status == 'done'}">{{task.body}}</div>
        </div>
      </div>
      <div class="task__btn-block">
        <div class="task-btn__done">
          <button @click="taskDone(task.uid)">
            <v-icon>mdi-check</v-icon>
          </button>
        </div>
        <div class="task-btn__close">
          <button @click="taskClose(task.uid)">
            <v-icon>mdi-close</v-icon>
          </button>
        </div>
      </div>
    </div>

    <!-- Отображаем этот блок когда удаляем карточку -->
    <div v-else class="restore-task">
      <div class="restore-task__text">Задача удалена</div>
      <div class="restore-task__btn" @click="taskRestore()">
        <v-icon color="white">mdi-undo</v-icon>
        <button>Отменить</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { task: Object, id: Number },
  data() {
    return {
      deltask: false
    };
  },
  computed: {
    deleteTask() {
      return this.deltask;
    }
  },
  methods: {
    openTask(uid) {
      this.$store.dispatch("setSelectedTask", uid);
      this.$router.push("/taskHome");
    },
    taskDone(uid) {
      // Отправляем в STORE инфор о статусе задачи
      this.$store.dispatch("setStatus", uid);
    },
    taskClose(uid) {
      this.deltask = true;
      // Делаем паузу, чтобы пользователь мог откатить удаление
      setTimeout(() => {
        if (this.deltask) {
          this.deltask = false;
          this.$store.dispatch("delTask", uid);
        }
      }, 5000);
    },
    taskRestore() {
      this.deltask = false;
    },
    openGroup(name) {
      this.$store.dispatch("setSelectedGroup", name);
    }
  }
};
</script>

<style lang="scss" scoped>
.task-block {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  background-color: rgba(250, 250, 250, 0.5);
  border-radius: 10px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}
.task__message-block {
  display: flex;
  flex-direction: column;
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
}
.task-done {
  text-decoration: line-through;
}
.task-group {
  font-size: 18px;
  background-color: #f7ece9;
  text-align: center;
  height: 36px;
}
.task-group a {
  text-decoration: none;
}
.task-group p {
  margin-left: 10px;
  margin-right: 10px;
  color: rgb(53, 58, 102);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  line-height: 30px;
  max-height: 30px;
}
.task-card {
  cursor: pointer;
}
.task-title {
  padding-left: 12px;
  overflow: hidden;

  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.task-text {
  font-size: 16px;
  line-height: 1.5rem;
  margin-bottom: 10px;
  padding-left: 16px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.task__btn-block {
  display: flex;
  align-items: center;
}
.task-btn__done {
  justify-content: center;
  text-align: center;
}

.restore-task {
  background-color: rgb(253, 101, 101);
  color: black;
  line-height: 2rem;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: 1fr 80px;
}
.restore-task__text {
  font-size: 22px;
  text-align: center;
}
.restore-task__btn {
  display: grid;
  font-size: 14px;
}
</style>