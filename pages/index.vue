<template>
  <div>
    <create-task />
    <list-tasks />
  </div>
</template>

<script>
import CreateTask from "~/components/CreateTask";
import ListTasks from "~/components/ListTasks";
export default {
  components: { CreateTask, ListTasks },
  data() {
    return {};
  }
};
</script>

<style>
</style>