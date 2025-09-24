<script setup lang="ts">
import TaskNode from './components/nodes/TaskNode.vue';
import { useTasksStore } from './stores/tasks.store';
const { tasksFlow } = useTasksStore();

</script>

<template>
  <div class="p-4 min-w-screen min-h-screen w-fit">
    <TaskNode :parent="tasksFlow" :task="tasksFlow" />
  </div>
</template>

<style scoped></style>
