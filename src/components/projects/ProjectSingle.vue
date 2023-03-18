<script>
	export default {
		props: ['project'],
	};
</script>

<template>
	<router-link
		to="/projects/single-project"
		class="rounded-xl shadow-lg hover:shadow-xl cursor-pointer mb-10 sm:mb-0 bg-secondary-light dark:bg-ternary-dark"
		aria-label="Single Project"
	>
		<div>
			<img
				:src="project.img"
				:alt="project.title"
				class="rounded-t-xl border-none"
			/>
		</div>
		<div class="text-center px-4 py-6">
			<p
				class="font-general-semibold text-xl text-ternary-dark dark:text-ternary-light font-semibold mb-2"
			>
				{{ project.title }}
			</p>
			<span
				class="font-general-medium text-lg text-ternary-dark dark:text-ternary-light"
				>{{ project.category }}</span
			>
		</div>
	</router-link>
</template>

<style lang="scss" scoped></style>

<!-- <script>
  export default {
    data() {
      return {
        repo: null,
      };
    },

    async created() {
      const response = await fetch(`https://api.github.com/repos/${this.$route.params.repoName}`);
      this.repo = await response.json();
    },
  };
</script>

<template>

	<router-link
		to="/projects/single-project"
		class="rounded-xl shadow-lg hover:shadow-xl cursor-pointer mb-10 sm:mb-0 bg-secondary-light dark:bg-ternary-dark"
		aria-label="Single Project"
	>	

		<div v-if="repo" class="container">
			<div class="card shadow-md rounded-lg overflow-hidden bg-white">
			<div class="card-body px-4 py-3">
				<h2 class="text-xl font-bold mb-2"><a :href="repo.html_url" class="text-indigo-500 hover:underline">{{ repo.name }}</a></h2>
				<p class="text-gray-700 mb-2">{{ repo.description }}</p>
				<p class="text-gray-700 mb-2">Language: {{ repo.language }}</p>
				<p class="text-gray-700 mb-2">Stars: {{ repo.stargazers_count }}</p>
				<a :href="repo.html_url" target="_blank" class="bg-gray-700 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-700 transition-colors duration-300">View on GitHub</a>
			</div>
			</div>
		</div>
	</router-link>

  
</template>
 -->
