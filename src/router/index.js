import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: {
			title: 'Zainab - Home',
		},
	},
	{
		path: '/about',
		name: 'About',
		component: () =>
			import(/* webpackChunkName: "about" */ '../views/About.vue'),
		meta: {
			title: 'Zainab - About',
		},
	},
	{
		path: '/projects',
		name: 'Projects',
		component: () =>
			import(/* webpackChunkName: "projects" */ '../views/Projects.vue'),
		meta: {
			title: 'Zainab - Projects',
		},
	},
	{
		path: '/projects/single-project',
		name: 'Single Project',
		component: () =>
			import(
				/* webpackChunkName: "projects" */ '../views/SingleProject.vue'
			),
		meta: {
			title: 'Zainab - Single Project',
		},
	},
	{
		path: '/contact',
		name: 'Contact',
		component: () =>
			import(/* webpackChunkName: "projects" */ '../views/Contact.vue'),
		meta: {
			title: 'Zainab - Contact',
		},
	},

	// 404 page
	{
		path: '/:catchAll(.*)',
		name: 'NotFound',
		component: NotFound,
		meta: {
			title: 'Page Not Found - Zainab',
		},
	},

];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
	scrollBehavior() {
		document.getElementById('app').scrollIntoView();
	},
	
	// move this inside createRouter()
	beforeEach(to, from, next) {
		// This goes through the matched routes from last to first, finding the closest route with a title.
		// e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
		// `/nested`'s will be chosen.
		const nearestWithTitle = to.matched
			.slice()
			.reverse()
			.find((r) => r.meta && r.meta.title);

		// Find the nearest route element with meta tags.
		const nearestWithMeta = to.matched
			.slice()
			.reverse()
			.find((r) => r.meta && r.meta.metaTags);

		const previousNearestWithMeta = from.matched
			.slice()
			.reverse()
			.find((r) => r.meta && r.meta.metaTags);

		// If a route with a title was found, set the document (page) title to that value.
		if (nearestWithTitle) {
			document.title = nearestWithTitle.meta.title;
		} else if (previousNearestWithMeta) {
			document.title = previousNearestWithMeta.meta.title;
		}

		// Remove any stale meta tags from the document using the key attribute we set below.
		Array.from(
			document.querySelectorAll('[data-vue-router-controlled]')
		).map((el) => el.parentNode.removeChild(el));

		// Skip rendering meta tags if there are none.
		if (!nearestWithMeta) return next();

		// Turn the meta tag definitions into actual elements in the head.
		nearestWithMeta.meta.metaTags
			.map((tagDef) => {
				const tag = document.createElement('meta');

				Object.keys(tagDef).forEach((key) => {
					tag.setAttribute(key, tagDef[key]);
				});

				tag.setAttribute('data-vue-router-controlled', '');

				return tag;
			})
			// Add the meta tags to the document head.
			.forEach((tag) => document.head.appendChild(tag));

		next();
	}
});

export default router;
