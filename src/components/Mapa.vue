<script setup lang="ts">

import { onMounted, ref } from 'vue';
import L from 'leaflet';

const lat = ref(0);
const lgn = ref(0);
const map = ref();
const mapaContainer = ref();
const latUnisinos = ref(-29.7947464);
const lgnUnisinos = ref(-51.1548982);

//função pegar localização
function getLocation() {
    map.value.setView([latUnisinos.value, lgnUnisinos.value], 16.25)
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            lat.value = position.coords.latitude
            lgn.value = position.coords.longitude

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