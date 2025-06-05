<script setup lang="ts">
import { onMounted, ref, watch, defineProps } from 'vue';
import L from 'leaflet';

//def a propriedade recebida - um objeto de coordenadas (latitude, longitude) ou null
const props = defineProps<{
  coordenadas: { latitude: number, longitude: number, nome: string } | null;
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

  // Pegando a localização do usuário através do navigator.geolocation (API nativa do navegador)
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      // lat.value = position.coords.latitude;
      // lgn.value = position.coords.longitude;

      //Simulando localização dentro da Unisinos
      lat.value = -29.794782;
      lgn.value = -51.151863;

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
    const { nome, latitude, longitude } = novaCoordenada;

    //ícone personalizado para representar o local
    const localIcon = L.divIcon({
      html: `
  <div class = "icon-nome-local">
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle opacity="0.5" cx="15" cy="15" r="15" fill="#00796B"/>
  <circle cx="15" cy="15" r="10" fill="#00796B"/>
  </svg>
  <div class = "nome-local">${nome}</div>
  </div>
  `,
      iconSize: [250, 30],
      iconAnchor: [15, 15]
    });
    //Verifica se não há um marcador há ser criado
    if (!marker) {
      marker = L.marker([latitude, longitude], { icon: localIcon }).addTo(map.value);
    } else {
      //Se houver um marcador, é atualizado a posição e o ícone 
      marker?.setLatLng([latitude, longitude]);
      marker.setIcon(localIcon);
    }
    const positionBounds = L.latLngBounds(L.latLng(lat.value, lgn.value), L.latLng(latitude, longitude))
    //centraliza o mapa na nova coordenada
    map.value.flyToBounds(positionBounds);
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
