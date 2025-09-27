<script setup lang="ts">
import TaskNode from '@/components/nodes/TaskNode.vue';
import LogsDrawer from '@/components/drawers/LogsDrawer.vue';
import FlowerMenu from './components/fab/FlowerMenu.vue';

import { useTasksStore } from './stores/tasks.store';
import { useLogsStore } from './stores/logs.store';
import { useTasks } from './composables/tasks.composable';

const tasksStore = useTasksStore();
const logsStore = useLogsStore();
const { exportTasksFlow } = useTasks();

</script>

<template>
  <LogsDrawer :logs="logsStore.logs" :clearLogs="logsStore.clearLogs">
    <TaskNode v-model:parent="tasksStore.tasksFlow" v-model:task="tasksStore.tasksFlow" />
    <FlowerMenu :clearLogs="logsStore.clearLogs" :tasksFlow="tasksStore.tasksFlow"
      :runSimulation="tasksStore.runTaskFlowSimulation" :exportFlow="exportTasksFlow" />
  </LogsDrawer>
</template>


<style scoped></style>
