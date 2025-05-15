<script setup lang="ts">

</script>

<template>
    <div class="header-container">
        <img src="/src/assets/logo-unisinos-branco.svg" alt="logo unisinos">
        <h1>Localize-se na Unisinos</h1>
    </div>

</template>

<style scoped>
.header-container {
    background-color: #00796B;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    gap: 15px;
}

.header-container img {
    width: 150px;
}

.header-container h1 {
    color: #f5f5f5;
    font-family: "Roboto", sans-serif;
    font-weight: 600;
    font-size: 1rem !important;
    padding-top: 5px;
    text-align: center;

}

@media screen and (min-width: 768px) {

    .header-container img {
        position: absolute;
        left: 1rem;
    }

    .header-container h1 {
        font-size: 1.25rem !important;
    }
}

@media screen and (min-width: 1024px) {

    .header-container img {
        position: absolute;
        left: 1rem;
    }

    .header-container h1 {
        font-size: 1.5rem !important;
    }
}
</style>