<script setup lang="ts">
import { onMounted, ref, watch, defineProps } from 'vue';
import L from 'leaflet';

//def a propriedade recebida - um objeto de coordenadas (latitude, longitude) ou null
const props = defineProps<{
  coordenadas: { latitude: number, longitude: number } | null;
}>();

//latitude e longitude da localização atual do usuário
const lat = ref(0);
const lgn = ref(0);

const map = ref<L.Map>();
const mapaContainer = ref();

//armazenar o marcador (marker) da coordenada passada via props
let marker: L.Marker | null = null;

onMounted(() => {
  //inicializa o mapa com a visao da unisinos
  map.value = L.map(mapaContainer.value!).setView([-29.7947464, -51.1548982], 15.5);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map.value);

  // localização do usuário - ícone
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lat.value = position.coords.latitude;
      lgn.value = position.coords.longitude;

      //ícone personalizado para representar o usuário
      const myIcon = L.icon({
        iconUrl: '/MinhaLocalizacao.svg',
        iconSize: [20, 20]
      });

      //marcador da localização do usuário no mapa
      L.marker([lat.value, lgn.value], { icon: myIcon }).addTo(map.value!);
    });
  }
});

//mudanças na prop coordenadas
watch(() => props.coordenadas, (novaCoordenada) => {
  if (novaCoordenada && map.value) {
    const { latitude, longitude } = novaCoordenada;

    //remove o marcador anterior, se existir
    if (marker) {
      map.value.removeLayer(marker);
    }

    //cria um novo marcador na nova coordenada
    marker = L.marker([latitude, longitude]).addTo(map.value);

    //centraliza o mapa na nova coordenada
    map.value.setView([latitude, longitude], 17);
  }
});
</script>

<template>
    <div ref="mapaContainer" class="mapa-container"></div>
</template>

<style scoped>
.mapa-container {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 75%;
    border: 1.5px solid #00796B;
    margin: 10px 0px;

}


@media screen and (min-width: 768px) {
    .mapa-container {
        width: 75%;
    }

}

@media screen and (min-width: 1024px) {
    .mapa-container {
        width: 50%;
    }

}
</style>
