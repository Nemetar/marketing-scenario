<script setup lang="ts">
import type { Task } from '@/models/tasks.model';

defineProps<{
  clearLogs: () => void;
  tasksFlow: Task;
  runSimulation: () => void;
  exportFlow: (tasksFlow: Task) => void;
}>();
</script>

<template>
  <div class="fixed bottom-8 right-8 fab fab-flower">
    <div tabindex="0" role="button" class="btn btn-lg btn-primary btn-circle">M</div>

    <button class="fab-main-action btn btn-circle btn-lg btn-success">
      M
    </button>

    <div class="tooltip tooltip-left" data-tip="Lancer simulation">
      <label for="logs-drawer" class="btn btn-lg btn-circle btn-accent" @click="runSimulation">
        ▶️
      </label>
    </div>

    <div class="tooltip tooltip-left" data-tip="Voir les logs">
      <label for="logs-drawer" class="btn btn-lg btn-circle btn-primary">
        📜
      </label>
    </div>

    <div class="tooltip tooltip-left" data-tip="Vider logs">
      <button class="btn btn-lg btn-circle btn-error" @click="clearLogs">
        🧹
      </button>
    </div>

    <div class="tooltip tooltip-left" data-tip="Exporter en JSON">
      <button class="btn btn-lg btn-circle btn-secondary" @click="exportFlow(tasksFlow)">
        💾
      </button>
    </div>
  </div>
</template>
