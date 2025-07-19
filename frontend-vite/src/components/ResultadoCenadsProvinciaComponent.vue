<template>
    <!-- muestra, si los hay, los cenad de esa provincia, con un enlace a su pagina principal -->
    <ul class="lista">
        <li>
          {{props.cenad.nombre}}
          <!-- pondremos un router link a la pagina principal del cenad <a [routerLink]='["principalCenad", cenad.idCenad]'> {{ cenad.nombre }} </a> -->
        </li>
    </ul>
</template>
<script setup>
const props = defineProps(['cenad'])
</script>
<style scoped lang="scss">
.lista { 
  color: #52796f; 
  font-weight: bold;
}
</style>