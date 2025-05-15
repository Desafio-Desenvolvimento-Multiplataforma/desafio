<script setup lang="ts">
// imports 
import Header from './components/Header.vue';
import Mapa from './components/Mapa.vue';
import Footer from './components/Footer.vue';
import SeletorSetor from './components/Seletores/Seletor-setor.vue';
import SeletorLocal from './components/Seletores/Seletor-local.vue';
</script>

<template>
  <div class="container">
    <Header></Header>
    <div class="container-body">
      <div class="body-seletores">
        <seletorSetor></seletorSetor>
        <seletorLocal></seletorLocal>
      </div>
      <Mapa></Mapa>
    </div>
    <Footer></Footer>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  background-color: #f5f5f5;
}

.container-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.body-seletores {
  display: flex;
  width: 50%;
  gap: 20px;
}
</style>
