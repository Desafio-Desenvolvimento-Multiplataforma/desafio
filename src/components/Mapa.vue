<script setup lang="ts">

import { onMounted, ref } from 'vue';
import L from 'leaflet';

const lat = ref(0);
const lgn = ref(0);
const map = ref();
const mapaContainer = ref();
const latUnisinos = ref(-29.7944659);
const lgnUnisinos = ref(-51.155427);

//função pegar localização
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            lat.value = position.coords.latitude
            lgn.value = position.coords.longitude
            map.value.setView([latUnisinos.value, lgnUnisinos.value], 16.5)

            var myIcon = L.icon({
                iconUrl: 'MinhaLocalizacao.svg',
                iconSize: [20, 20]
            });

            L.marker([lat.value, lgn.value], { icon: myIcon })
                .addTo(map.value);
        })
    }

}
onMounted(() => {
    map.value = L.map(mapaContainer.value).setView([lat.value, lgn.value], 13)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map.value);
    getLocation();
})


</script>

<template>
    <div ref="mapaContainer" class="mapa-container"></div>
</template>

<style scoped>
.mapa-container {
    display: flex;
    justify-content: center;
    width: 675px;
    height: 355px;
    border: 1px solid #00796B;

}
</style>