<template>
    <q-layout view="lHr lpR lfr">
      <q-header class="bg-secondary text-white" height-hint="98">
        <q-toolbar>
          <q-toolbar-title>UAS PBK AHMAD FADIL</q-toolbar-title>
          <q-tabs align="left">
            <q-route-tab to="/" label="TodoApp" />
            <q-route-tab to="/albums" label="Album" />
          </q-tabs>
        </q-toolbar>
      </q-header>
      <q-page-container>
        <router-view />
      </q-page-container>
      <q-footer class="bg-secondary text-white" height-hint="98">
        <q-toolbar>
          <q-toolbar-title>
            223510656
          </q-toolbar-title>
        </q-toolbar>
      </q-footer>
    </q-layout>
  </template>
  
  <script setup></script>
  
  <style>
  .q-toolbar {
    padding: 0 75px !important;
  }
  .q-toolbar__title:first-child {
    padding-left: 32px !important;
  }
  .q-tab {
    padding: 0 20px !important;
    min-height: 75px !important;
  }
  </style>