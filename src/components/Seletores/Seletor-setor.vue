<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue';
import { setoresUnisinos } from './Setores';

const props = defineProps<{ modelValue: string | null }>();
const emit = defineEmits(['update:modelValue']);

//Extrai apenas os nomes dos setores para usar no select
const setores = setoresUnisinos.map(s => s.name);
const setorLocal = ref(props.modelValue);

watch(setorLocal, (novoValor) => {
  emit('update:modelValue', novoValor);
});
</script>

<template>
  <v-select v-model="setorLocal" clearable chips label="Setor" :items="setores" hide-details density="comfortable"
    variant="outlined" />
</template>
