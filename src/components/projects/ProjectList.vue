<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        repos: [],
        currentPage: 1,
        itemsPerPage: 6,
      };
    },
    computed: {
      paginatedRepos() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.repos.slice(startIndex, endIndex);
      },
      pageCount() {
        return Math.ceil(this.repos.length / this.itemsPerPage);
      },
    },
    async created() {
      const response = await fetch('https://api.github.com/users/tijani-zainab/repos');
      this.repos = await response.json();
    },
  };
</script>

<template>
    <div class="container">
      <h1>My GitHub Repositories</h1>

      <div class="grid">
        
        <div v-for="repo in paginatedRepos" :key="repo.id" class="card">
          <h2><a :href="repo.html_url">{{ repo.name }}</a></h2>
          <p>{{ repo.description }}</p>
          <p>Language: {{ repo.language }}</p>
          <p>Stars: {{ repo.stargazers_count }}</p>
          <!-- <a class="view--button" :href="repo.html_url" target="_blank">View on GitHub</a> -->
        </div>
      </div>

      <div class="pagination">
        <button v-for="page in pageCount" :key="page" @click="currentPage = page">{{ page }}</button>
      </div>

    </div>
</template>
  

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1.5rem;
  }
  
  .card {
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 0.5rem;
  }

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }
  
  .pagination button {
    margin: 0 0.5rem;
    padding: 0.5rem;
    border: 1px solid #ccc;
    background-color: #f9f9f9;
    border-radius: 0.5rem;
    cursor: pointer;
  }
  
  .pagination button:hover {
    background-color: #ddd;
  }
</style>
  