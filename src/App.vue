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
  height: 100dvh;
  height: 100dvh;
  background-color: f5f5f5;
}

.container-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 20px;
}

.body-seletores {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  padding-bottom: 10px;
}



@media screen and (min-width:768px) {
  .container-body {
    width: 100%;
    justify-content: center;

  }

  .body-seletores {
    flex-direction: row;
    align-items: center;
    width: 75%;
  }
}

@media screen and (min-width: 1024px) {

  .container-body {
    width: 100%;

  }

  .body-seletores {
    flex-direction: row;
    align-items: center;
    width: 50%;
  }
}
</style>
