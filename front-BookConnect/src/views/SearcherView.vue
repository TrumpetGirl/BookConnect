<script setup>
import Searcher from '../components/SearchTool.vue';
import Results from '../components/Results.vue';
  </script>

  <template>
  <div class="container">
    <div class="search-container">
      <Searcher></Searcher>
    </div>
    <div class="results-container">
      <Results></Results>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column; 
  justify-content: flex-start; 
  align-items: center;
  font-family: "Ubuntu Sans", sans-serif;
  font-optical-sizing: auto;
  font-weight: 100;
  font-style: normal;
}

.search-container, .results-container {
  margin-top: 20px; /* Agrega un poco de separación entre los contenedores */
  width: 800px;
}
</style>
