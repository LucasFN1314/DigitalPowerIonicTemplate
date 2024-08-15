<template>
  <ion-app>
    <div id="notification-container"></div>
    <ion-router-outlet/>
  </ion-app>
</template>

<script setup lang="ts">
import {IonApp, IonRouterOutlet} from '@ionic/vue';
</script>

<style>
:root {
  --primary: #2393ff;
  --ion-color-primary: var(--primary);
}

#notification-container {
  position: fixed;
  top: 0;
  right: 0;
  margin-right: 1em;
  z-index: 999999;

  pointer-events: none;
}

.notification {
  padding: 1em;
  background: #f45e02;
  color: white;
  margin: 1em 0;
  min-width: 200px;

  pointer-events: none;
  user-select: none;
  z-index: 1000;
}

.notification-enter {
  animation-name: notificationAnimationEnter;
  animation-duration: 0.25s;
}

.notification-exit {
  animation-name: notificationAnimationExit;
  animation-duration: 0.25s;
}

@keyframes notificationAnimationEnter {
  0% {
    transform: translateX(150%);
  }

  100% {
    transform: translateX(0%);
  }
}

@keyframes notificationAnimationExit {
  0% {
    transform: translateX(0%);
  }

  100% {
    transform: translateX(150%);
  }
}
</style>