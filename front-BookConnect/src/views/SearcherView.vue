<script setup>
import Searcher from '../components/SearchTool.vue';
  </script>

  <template>
  <div class="container">
    <div class="search-container">
      <Searcher></Searcher>
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

.search-container {
  margin-top: 20px;
  width: 800px;
}
</style>
