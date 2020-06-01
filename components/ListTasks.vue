<template>
  <div class="wrapp">
    <h2 class="title">Список задач</h2>
    <div class="filter">
      <div class="filter-line" v-if="filterUp">
        <div data-app>
          <v-container fluid>
            <v-select :items="filterStatus" v-model="statusActive" label="Статус"></v-select>
          </v-container>
        </div>
        <div>
          <input
            type="text"
            name
            id="filter-input"
            v-model="filterText"
            placeholder="Введите название задачи"
          />
        </div>
      </div>
      <div class="filter__btn">
        <button @click="filterUp = !filterUp">
          <v-icon v-if="!filterUp">mdi-filter</v-icon>
          <v-icon v-else>mdi-filter-remove</v-icon>
        </button>
      </div>
    </div>
    <div class="lists-block">
      <div class="lists-block-in">
        <div class="lists-block__lists" v-if="items.length > 0">
          <div v-for="(item, i) in items" :key="i">
            <task :task="item" :id="i"></task>
          </div>
        </div>
        <div v-else>
          <p style="text-align: center;">Задач нет</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Task from "~/components/Task.vue";
export default {
  components: { Task },
  data() {
    return {
      filterUp: false,
      filterStatus: ["Все", "Выполненные", "Не выполненные"],
      filterText: "",
      statusActive: ""
    };
  },
  methods: {
    searchStatusTask(tasks, status) {
      if (status == "" || status == "Все") return tasks;
      // Так как статус программный и интерфейсный отличаются, приводим их к одному виду
      let stat = status == "Выполненные" ? "done" : "active";
      let readyList = tasks.filter(task => {
        if (task.status == stat) return task;
      });
      return readyList;
    },
    searchNameTask(getTasks, filterTxt) {
      let allTasks = getTasks;
      let readyList = [];
      if (filterTxt) {
        readyList = allTasks.filter(task => {
          let str = task.name.toLowerCase();
          if (str.startsWith(filterTxt.trim().toLowerCase())) return task;
        });
      } else readyList = getTasks;
      return readyList;
    }
  },
  computed: {
    items() {
      if (this.filterUp) {
        let tasks = this.$store.getters.tasks;
        let list = this.searchStatusTask(tasks, this.statusActive);
        list = this.searchNameTask(list, this.filterText);
        return list;
      } else {
        this.filterText = "";
        this.statusActive = "";
        return this.$store.getters.tasks;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  color: rgb(100, 100, 100);
}
.filter {
  display: grid;
  grid-template-columns: 1fr 50px;
  justify-items: right;
  align-items: center;
  height: 94px;
}
.filter-line {
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  width: 100%;
}
.filter-line input {
  width: 100%;
  line-height: 1.5rem;
  font-size: 18px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding-left: 12px;
  padding-right: 12px;
}
.filter__btn {
  grid-column-start: 2;
  grid-column-end: 3;
  padding-right: 10px;
  padding-left: 10px;
}
.lists-block {
  display: grid;
  line-height: 2rem;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 22px;
  color: rgb(100, 100, 100);
}
.lists-block-in {
  margin-left: 20px;
}
.lists-block__lists__group {
  padding-left: 20px;
  margin-bottom: 20px;
  background-color: rgb(240, 240, 240);
}

@media screen and (max-width: 450px) {
  .filter {
    grid-template-columns: 1fr;
    justify-items: right;
    align-items: center;
    height: max-content;
    margin-bottom: 20px;
  }
  .filter-line {
    grid-template-columns: 1fr;
    align-items: center;
    width: 100%;
  }
  .filter__btn {
    grid-column-start: 1;
    grid-column-end: 1;
    grid-row-start: 1;
    grid-row-end: 1;
  }
}
</style>