<template>
  <footer class="footer mt-5 w-100">
    <div class="row py-3 container-fluid">
      <div class="col-4 text-start ps-5">
        <a target="_blank" rel="noopener" href="assets/manual.pdf">
          <span>Manual de Usuario</span>
        </a>
      </div>
      <div class="col-4 text-center">
        <a target="_blank" rel="noopener"
          href="http://intra.mdef.es/portal/intradef/Ministerio_de_Defensa/Ejercito_de_Tierra">
          <span class="me-4">Ejército de Tierra</span>
        </a>
        <a target="_blank" rel="noopener"
          href="http://intra.mdef.es/portal/intradef/Ministerio_de_Defensa/Ejercito_de_Tierra_-_UCO/UCO/UCO:132">
          <span>CENAD San Gregorio</span>
        </a>
      </div>
      <div class="col-4 text-end pe-5">
        <RouterLink :to="{ name: 'superadministrador' }">
          <span>Superadministrador</span>
        </RouterLink>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
<style lang="scss">
footer {
  background: #A3B18A;
}

footer a {
  color: #344E41;
}

footer a:hover {
  color: white;
}
</style>
