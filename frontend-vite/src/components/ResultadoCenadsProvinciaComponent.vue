<template>
    <!-- muestra, si los hay, los cenad de esa provincia, con un enlace a su pagina principal -->
    <ul>
        <li>
            <router-link :to="{ name: 'cenad-home', params: { id: props.cenad.idString } }" class="enlace">
                    {{ props.cenad.nombre }}
            </router-link>
        </li>
    </ul>
</template>
<script setup>
const props = defineProps(['cenad'])
</script>
<style scoped lang="scss">
.enlace {
    color: #52796f;
    font-weight: bold;
    text-decoration: none;
}
.enlace:hover {
    text-decoration: underline;
    color: #354f52;
}
</style>