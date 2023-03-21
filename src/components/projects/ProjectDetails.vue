<script>
    export default {
        props: ['id'],
        data() {
            return {
            repo: null
            };
        },
        async created() {
            const response = await fetch(`https://api.github.com/repositories/${this.id}`);
            this.repo = await response.json();
        }
    };
</script>

<template>
    <div class="container">
      <h1>{{ repo.name }}</h1>
      <p>{{ repo.description }}</p>
      <p>Language: {{ repo.language }}</p>
      <p>Stars: {{ repo.stargazers_count }}</p>
      <a :href="repo.html_url" class="text-indigo-500 hover:underline" target="_blank">View on GitHub</a>
    </div>
</template>

  
<style>
    .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
    }
</style>
