<script setup lang="ts">
import { ref } from 'vue';

import Header from './components/Header.vue';
import Mapa from './components/Mapa.vue';
import Footer from './components/Footer.vue';
import SeletorSetor from './components/Seletores/Seletor-setor.vue';
import SeletorLocal from './components/Seletores/Seletor-local.vue';
import { setoresUnisinos } from './components/Seletores/Setores';


//armazenar o setor e o local selecionados
const setorSelecionado = ref('');
const localSelecionado = ref('');

//armazenar as coordenadas (latitude e longitude) do local selecionado
const localCoordenadas = ref<{ latitude: number, longitude: number } | null>(null);

//atualiza coordenadas quando setor e local são definidos
function atualizarCoordenadas() {

  //encontra o setor selecionado na lista de setores
  const setor = setoresUnisinos.find(s => s.name === setorSelecionado.value);

  //encontra o local dentro do setor selecionado
  const local = setor?.local.find(l => l.name === localSelecionado.value);

  //se o local for encontrado, atualiza as coordenadas
  if (local) {
    localCoordenadas.value = {
      latitude: local.latitude,
      longitude: local.longitude
    };
  } else {
    //se o local não for encontrado, define as coordenadas como null
    localCoordenadas.value = null;
  }
}
</script>

<template>
  <div class="container">
    <Header />
    <div class="container-body">
      <div class="body-seletores">
        <SeletorSetor v-model="setorSelecionado" @update:modelValue="atualizarCoordenadas" />
        <SeletorLocal
          :setor="setorSelecionado"
          v-model="localSelecionado"
          @update:modelValue="atualizarCoordenadas"
        />
      </div>
      <Mapa :coordenadas="localCoordenadas" />
    </div>
    <Footer />
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
