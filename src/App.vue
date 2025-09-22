<script setup lang="ts">
import { useTasks } from './composables/useTasks';
import type { TaskType } from './models/tasks.model';
import { useTasksStore } from './stores/tasks.store';

const { createTask } = useTasks();
const { tasksFlow } = useTasksStore();

const addWorkflowTask = (type: TaskType) => {
  tasksFlow.subTasks.push(createTask(type));
};

</script>

<template>
  <div>
    {{ console.log(tasksFlow) }}
    <h2>NAME : {{ tasksFlow.name }}</h2>
    <p>TYPE : {{ tasksFlow.type }}</p>
    <button @click="addWorkflowTask('email')">Add Email Subtask</button>
    <div v-for="task in tasksFlow.subTasks" :key="task.id">
      <h2>NAME : {{ task.name }}</h2>
      <p>TYPE : {{ task.type }}</p>
      <button @click="addWorkflowTask('email')">Add Email Subtask</button>
    </div>
  </div>
</template>

<style scoped></style>
