<script setup lang="ts">
import TaskNode from './components/TaskNode.vue';
import { useTasksStore } from './stores/tasks.store';
const { tasksFlow } = useTasksStore();

</script>

<template>
  <div class="p-4">
    <TaskNode :parent="tasksFlow" :task="tasksFlow" />
  </div>
</template>

<style scoped></style>
