<script>

  export default {
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

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        <div v-for="repo in paginatedRepos" :key="repo.id" class="card shadow-md rounded-lg overflow-hidden bg-white">
          <div class="card-body px-4 py-3">
            <h2 class="text-xl font-bold mb-2"><a :href="repo.html_url" class="text-indigo-500 hover:underline">{{ repo.name }}</a></h2>
            <p class="text-gray-700 mb-2">{{ repo.description }}</p>
            <p class="text-gray-700 mb-2">Language: {{ repo.language }}</p>
            <p class="text-gray-700 mb-2">Stars: {{ repo.stargazers_count }}</p>
            <a :href="repo.html_url" target="_blank" class="bg-gray-700 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-700 transition-colors duration-300">Project Details</a>
          </div>
        </div>

      </div>

      <div class="pagination flex justify-center mt-8">
        <button v-for="page in pageCount" :key="page" @click="currentPage = page" class="mx-2 py-2 px-4 rounded-lg text-gray-700 border border-gray-400 hover:bg-gray-200 focus:outline-none focus:shadow-outline">{{ page }}</button>
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
    grid-gap: 1rem;
  }
  
  .card {
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 0.5rem;
    transition: transform 0.2s;
  }
  
  .card:hover {
    transform: translateY(-2px);
  }
  
  .card-body {
    transition: background-color 0.2s;
  }
  
  .card:hover .card-body {
    background-color: #f9f9f9;
  }
  
  .pagination button {
    cursor: pointer;
  }

</style>