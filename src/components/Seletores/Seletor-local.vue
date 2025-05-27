<script setup lang="ts">
import { ref, watch } from 'vue';
import { setoresUnisinos } from './Setores';

// Props e emits para funcionar com v-model e receber setor selecionado
const props = defineProps<{
  setor: string;
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const localSelecionado = ref(props.modelValue);
const locais = ref<string[]>([]);

// Atualiza locais quando setor mudar
watch(() => props.setor, (novoSetor) => {
  const setor = setoresUnisinos.find(s => s.name === novoSetor);
  locais.value = setor ? setor.local.map(l => l.name) : [];
  localSelecionado.value = null;
  emit('update:modelValue', null);
}, { immediate: true });

// Emite valor quando localSelecionado mudar
watch(localSelecionado, (novoValor) => {
  emit('update:modelValue', novoValor);
});
</script>

<template>
  <v-select v-model="localSelecionado" no-data-text="Selecione um setor" clearable chips label="Local" :items="locais"
    hide-details density="comfortable" variant="outlined" />
</template>
