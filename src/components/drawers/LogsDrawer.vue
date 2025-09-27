<script setup lang="ts">
defineProps<{
  logs: string[];
  clearLogs: () => void;
}>();
</script>

<template>
  <div class="drawer drawer-end h-screen w-screen">
    <input id="logs-drawer" type="checkbox" class="drawer-toggle" />

    <div class="drawer-content h-full min-w-full w-fit p-4">
      <slot></slot>
    </div>

    <div class="drawer-side">
      <label for="logs-drawer" class="drawer-overlay"></label>

      <div class="menu p-4 w-96 min-h-full bg-base-200 text-base-content flex flex-col">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold">📜 Journal d'exécution</h2>
          <button class="btn btn-sm btn-error text-black" @click="clearLogs">🧹 Vider</button>
        </div>

        <ul class="steps steps-vertical w-full">
          <li v-for="(log, i) in logs" :key="i" class="step" :class="{
            'step-info': log.startsWith('▶️'),
            'step-success': log.startsWith('✅'),
            'step-error': log.startsWith('❌'),
            'step-neutral': !log.startsWith('✅') && !log.startsWith('❌') && !log.startsWith('▶️')
          }">
            <span class="text-sm font-mono">{{ log }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
