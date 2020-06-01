<template>
  <div>
    <create-task />
    <list-tasks />

    <v-bottom-sheet persistent v-show="sheet">
      <v-sheet class="text-center" height="150px" :elevation="2">
        <v-btn class="mt-6" text color="error" @click="sheet=!sheet">close</v-btn>
        <div class="my-3">This is a bottom sheet using the inset prop</div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import CreateTask from "~/components/CreateTask.vue";
import ListTasks from "~/components/ListTasks.vue";
export default {
  components: { CreateTask, ListTasks },
  data() {
    return {
      sheet: true
    };
  }
};
</script>

<style>
</style>