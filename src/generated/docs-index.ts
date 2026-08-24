/**
 * GENERATED FILE — do not edit by hand.
 *
 * Produced by scripts/generate-docs-index.ts from Runable's own source
 * documentation. Re-run `pnpm generate:docs-index` (requires a
 * `../runable` sibling checkout) to refresh it, and commit the result —
 * this file itself has no further dependency on `../runable` and is what
 * ships in the published package.
 */

import type { DocsIndexEntry, DocsIndexMeta } from "../search/types.js";

export const DOCS_INDEX_META: DocsIndexMeta = {
  runableVersion: "1.0.0-alpha.3",
  generatedAt: "2026-08-24T10:54:50.725Z",
  sourceFileCount: 90,
};

export const DOCS_INDEX: DocsIndexEntry[] = [
  {
    title: "ClientOnly",
    url: "https://runable.netlify.app/docs/api/components/client-only",
    section: "Render browser-dependent content only after Vue has mounted.",
    excerpt:
      '`ClientOnly` prevents its default slot from being rendered on the server. Use it for libraries that access `window`, the DOM, or browser-only APIs. ```vue <ClientOnly fallback="Loading…" fallback-tag="span"> <BrowserChar…',
    content:
      '`ClientOnly` prevents its default slot from being rendered on the server. Use it for libraries that access `window`, the DOM, or browser-only APIs.\n\n```vue\n<ClientOnly fallback="Loading…" fallback-tag="span">\n  <BrowserChart />\n</ClientOnly>\n```',
    category: "api",
  },
  {
    title: "ClientOnly",
    url: "https://runable.netlify.app/docs/api/components/client-only",
    section: "Props",
    excerpt:
      "| Prop | Type | Description | | --- | --- | --- | | `fallback` | `string` | Text displayed before mounting | | `fallbackTag` | `string` | Fallback element, `span` by default | | `placeholder` | `string` | Alias for `fall…",
    content:
      "| Prop | Type | Description |\n| --- | --- | --- |\n| `fallback` | `string` | Text displayed before mounting |\n| `fallbackTag` | `string` | Fallback element, `span` by default |\n| `placeholder` | `string` | Alias for `fallback` |\n| `placeholderTag` | `string` | Alias for `fallbackTag` |\n\nThe `fallback` or `placeholder` slot replaces the text:\n\n```vue\n<ClientOnly>\n  <Map />\n\n  <template #fallback>\n    <p>Preparing the map…</p>\n  </template>\n</ClientOnly>\n```",
    category: "api",
  },
  {
    title: "Components",
    url: "https://runable.netlify.app/docs/api/components/index",
    section:
      "Reference for the global components built into the Runable runtime.",
    excerpt:
      "Runable registers its internal components globally. Use them directly in a template. | Component | Purpose | | --- | --- | | `RunablePage` | Display the current route | | `RunableLink` | Navigate with Vue Router | | `Run…",
    content:
      "Runable registers its internal components globally. Use them directly in a template.\n\n| Component | Purpose |\n| --- | --- |\n| `RunablePage` | Display the current route |\n| `RunableLink` | Navigate with Vue Router |\n| `RunableLayout` | Apply the page layout |\n| `ClientOnly` | Delay rendering until the client has mounted |\n\n```vue\n<template>\n  <RunableLayout>\n    <RunablePage />\n  </RunableLayout>\n</template>\n```",
    category: "api",
  },
  {
    title: "RunableLayout",
    url: "https://runable.netlify.app/docs/api/components/runable-layout",
    section: "Load and apply the layout selected in the route metadata.",
    excerpt:
      "`RunableLayout` reads `route.meta.layout`, loads the matching layout, then renders its default slot inside it. ```vue <template> <RunableLayout> <RunablePage /> </RunableLayout> </template> ``` Select the layout from a p…",
    content:
      '`RunableLayout` reads `route.meta.layout`, loads the matching layout, then renders its default slot inside it.\n\n```vue\n<template>\n  <RunableLayout>\n    <RunablePage />\n  </RunableLayout>\n</template>\n```\n\nSelect the layout from a page:\n\n```ts\ndefinePageMeta({ layout: "dashboard" });\n```\n\nThe value accepts four forms:\n\n| Value | Effect |\n| --- | --- |\n| omitted | Loads `default.vue` |\n| `"dashboard"` | Loads `app/layouts/dashboard.vue` |\n| `{ name, props }` | Loads the layout and passes props to it |\n| `false` | Renders the content directly without a layout |',
    category: "api",
  },
  {
    title: "RunableLink",
    url: "https://runable.netlify.app/docs/api/components/runable-link",
    section: "Create typed links that navigate with Vue Router.",
    excerpt:
      '`RunableLink` wraps `RouterLink` and preserves its props, HTML attributes, and slots. ```vue <RunableLink to="/projects">Projects</RunableLink> ```',
    content:
      '`RunableLink` wraps `RouterLink` and preserves its props, HTML attributes, and slots.\n\n```vue\n<RunableLink to="/projects">Projects</RunableLink>\n```',
    category: "api",
  },
  {
    title: "RunableLink",
    url: "https://runable.netlify.app/docs/api/components/runable-link",
    section: "Main props",
    excerpt:
      "| Prop | Type | Description | | --- | --- | --- | | `to` | `RouteLocationRaw` | Link destination | | `replace` | `boolean` | Replaces the current history entry | | `custom` | `boolean` | Disables the automatic `<a>` elem…",
    content:
      "| Prop | Type | Description |\n| --- | --- | --- |\n| `to` | `RouteLocationRaw` | Link destination |\n| `replace` | `boolean` | Replaces the current history entry |\n| `custom` | `boolean` | Disables the automatic `<a>` element |\n| `activeClass` | `string` | Class applied when the link is active |\n| `exactActiveClass` | `string` | Class applied on an exact match |\n| `viewTransition` | `boolean` | Uses View Transitions when available |\n\nThe custom slot exposes `href`, `route`, `navigate`, `isActive`, and `isExactActive`.",
    category: "api",
  },
  {
    title: "RunablePage",
    url: "https://runable.netlify.app/docs/api/components/runable-page",
    section:
      "Display the component associated with the current Vue Router route.",
    excerpt:
      "`RunablePage` is Runable's facade for `RouterView`. It forwards its props, attributes, and slots to the Vue Router component. ```vue <template> <RunablePage /> </template> ```",
    content:
      "`RunablePage` is Runable's facade for `RouterView`. It forwards its props, attributes, and slots to the Vue Router component.\n\n```vue\n<template>\n  <RunablePage />\n</template>\n```",
    category: "api",
  },
  {
    title: "RunablePage",
    url: "https://runable.netlify.app/docs/api/components/runable-page",
    section: "Props",
    excerpt:
      "| Prop | Type | Description | | --- | --- | --- | | `name` | `string` | Name of the view to display for a named route | | `route` | `RouteLocationNormalized` | Route to render instead of the current route | The default s…",
    content:
      '| Prop | Type | Description |\n| --- | --- | --- |\n| `name` | `string` | Name of the view to display for a named route |\n| `route` | `RouteLocationNormalized` | Route to render instead of the current route |\n\nThe default slot receives `Component` and `route`:\n\n```vue\n<RunablePage v-slot="{ Component, route }">\n  <Transition :name="String(route.meta.transition ?? \'fade\')">\n    <component :is="Component" />\n  </Transition>\n</RunablePage>\n```',
    category: "api",
  },
  {
    title: "Composables",
    url: "https://runable.netlify.app/docs/api/composables/index",
    section:
      "Reference for the auto-imported Runable, Vue Router, Unhead, and Schema.org composables.",
    excerpt:
      "Composables are available without imports in components, pages, layouts, middleware, and plugins scanned by Runable. | Area | API | | --- | --- | | Data | `useAsyncData`, `useFetch` | | Configuration | `useConfig`, `useR…",
    content:
      "Composables are available without imports in components, pages, layouts, middleware, and plugins scanned by Runable.\n\n| Area | API |\n| --- | --- |\n| Data | `useAsyncData`, `useFetch` |\n| Configuration | `useConfig`, `useRuntime` |\n| Application | `useApp`, `useAppError` |\n| Navigation | `useRouter`, `useRoute`, `navigateTo`, `onBeforeRouteUpdate` |\n| Head | `injectHead`, `useHead`, `useSeoMeta`, `useHeadSafe` |\n| Structured data | `useSchemaOrg` |",
    category: "api",
  },
  {
    title: "injectHead",
    url: "https://runable.netlify.app/docs/api/composables/inject-head",
    section:
      "Access the Unhead instance installed in the application directly.",
    excerpt:
      "`injectHead()` returns the Unhead instance injected by Runable. Use this API for advanced integrations that need direct access to the head manager. ```ts const head = injectHead(); ``` To define metadata for a page or co…",
    content:
      "`injectHead()` returns the Unhead instance injected by Runable. Use this API for advanced integrations that need direct access to the head manager.\n\n```ts\nconst head = injectHead();\n```\n\nTo define metadata for a page or component, prefer `useHead()`, `useSeoMeta()`, or `useHeadSafe()`. These composables manage their Vue lifecycle automatically.",
    category: "api",
  },
  {
    title: "navigateTo",
    url: "https://runable.netlify.app/docs/api/composables/navigate-to",
    section:
      "Navigate to another route from a component, composable, or plugin.",
    excerpt:
      "```ts function navigateTo( to: RouteLocationRaw | undefined | null, options?: { replace?: boolean }, ): Promise<void | NavigationFailure> | undefined ``` By default, `navigateTo()` adds an entry to the browser history wi…",
    content:
      '```ts\nfunction navigateTo(\n  to: RouteLocationRaw | undefined | null,\n  options?: { replace?: boolean },\n): Promise<void | NavigationFailure> | undefined\n```\n\nBy default, `navigateTo()` adds an entry to the browser history with `router.push()`:\n\n```ts\nawait navigateTo("/projects");\nawait navigateTo({\n  name: "project-details",\n  params: { id: "42" },\n});\n```\n\nSet `replace` to avoid keeping the current URL in the history:\n\n```ts\nawait navigateTo("/login", { replace: true });\n```\n\nPassing `null` or `undefined` does nothing and returns `undefined`. Navigation failures and errors are returned or rejected by Vue Router, so callers can handle them normally.',
    category: "api",
  },
  {
    title: "onBeforeRouteUpdate",
    url: "https://runable.netlify.app/docs/api/composables/on-before-route-update",
    section:
      "Register a guard that is removed automatically when its Vue scope ends.",
    excerpt:
      "```ts function onBeforeRouteUpdate(guard: NavigationGuard): void ``` ```ts onBeforeRouteUpdate((to, from) => { if (to.params.id !== from.params.id) { refresh(); } }); ``` In the current implementation, Runable registers…",
    content:
      "```ts\nfunction onBeforeRouteUpdate(guard: NavigationGuard): void\n```\n\n```ts\nonBeforeRouteUpdate((to, from) => {\n  if (to.params.id !== from.params.id) {\n    refresh();\n  }\n});\n```\n\nIn the current implementation, Runable registers the guard with `router.beforeEach()` and removes it with `onScopeDispose()`. It is therefore a global guard whose lifetime follows the calling scope.",
    category: "api",
  },
  {
    title: "useAppError",
    url: "https://runable.netlify.app/docs/api/composables/use-app-error",
    section: "Read, display, and clear errors captured by the Vue application.",
    excerpt:
      "```ts const { error, showError, clearError } = useAppError(); ``` | Property | Type | Purpose | | --- | --- | --- | | `error` | `ShallowRef<AppError \\| null>` | Active error | | `showError()` | `(error, options?) => AppE…",
    content:
      '```ts\nconst { error, showError, clearError } = useAppError();\n```\n\n| Property | Type | Purpose |\n| --- | --- | --- |\n| `error` | `ShallowRef<AppError \\| null>` | Active error |\n| `showError()` | `(error, options?) => AppError` | Normalizes and displays an error |\n| `clearError()` | `() => void` | Clears the active error |\n\n```ts\nshowError(new Error("Project not found"), {\n  code: "PROJECT_NOT_FOUND",\n  statusCode: 404,\n  source: "manual",\n});\n```\n\nPossible sources are `vue`, `router`, `window`, `unhandled-rejection`, and `manual`.',
    category: "api",
  },
  {
    title: "useApp",
    url: "https://runable.netlify.app/docs/api/composables/use-app",
    section:
      "Retrieve the current Vue application, its global properties, and Runable hooks.",
    excerpt:
      "```ts function useApp(): AppContext ``` ```ts const app = useApp(); app.$router; app.$route; app.config.globalProperties; ``` Call `useApp()` from `setup()`, a composable, or after installing the context plugin. The func…",
    content:
      "```ts\nfunction useApp(): AppContext\n```\n\n```ts\nconst app = useApp();\n\napp.$router;\napp.$route;\napp.config.globalProperties;\n```\n\nCall `useApp()` from `setup()`, a composable, or after installing the context plugin. The function throws when no current or global application is available.\n\nDuring SSR, do not keep this result in a module variable: the application must remain isolated per request.",
    category: "api",
  },
  {
    title: "useAsyncData",
    url: "https://runable.netlify.app/docs/api/composables/use-async-data",
    section: "Load, cache, and hydrate asynchronous data during SSR.",
    excerpt:
      "```ts function useAsyncData<Data, TransformedData = Data>( key: string, fetcher: (signal?: AbortSignal) => Promise<Data>, options?: AsyncDataOptions<Data, TransformedData>, ): AsyncDataResult<TransformedData, Error> & Pr…",
    content:
      '```ts\nfunction useAsyncData<Data, TransformedData = Data>(\n  key: string,\n  fetcher: (signal?: AbortSignal) => Promise<Data>,\n  options?: AsyncDataOptions<Data, TransformedData>,\n): AsyncDataResult<TransformedData, Error> & PromiseLike<AsyncDataResult<TransformedData, Error>>\n```\n\n```ts\nconst { data, pending, error, refresh } = await useAsyncData(\n  "projects",\n  async (signal) => {\n    const response = await fetch("/api/projects", { signal });\n    return response.json() as Promise<Project[]>;\n  },\n);\n```',
    category: "api",
  },
  {
    title: "useAsyncData",
    url: "https://runable.netlify.app/docs/api/composables/use-async-data",
    section: "Options",
    excerpt:
      "| Option | Default | Purpose | | --- | --- | --- | | `server` | `true` | Allows execution during SSR | | `lazy` | `false` | Does not wait for the result before completing the render | | `immediate` | `true` | Starts the…",
    content:
      "| Option | Default | Purpose |\n| --- | --- | --- |\n| `server` | `true` | Allows execution during SSR |\n| `lazy` | `false` | Does not wait for the result before completing the render |\n| `immediate` | `true` | Starts the fetcher immediately |\n| `ttl` | `300000` | Cache duration in milliseconds |\n| `default` | `() => null` | Initial value |\n| `transform` | — | Transforms the result before caching it |\n| `watch` | — | Re-runs the request when a source changes |\n\nThe result exposes `data`, `pending`, `error`, `status`, `execute()`, and `refresh()`. The key is used for caching and deduplication: include every parameter that changes the resource.",
    category: "api",
  },
  {
    title: "useConfig",
    url: "https://runable.netlify.app/docs/api/composables/use-config",
    section:
      "Read the public part of the Runable configuration in the Vue application.",
    excerpt:
      "```ts function useConfig(): ClientConfig ``` The result contains only options that are safe to send to the client: ```ts const config = useConfig(); console.log(config.ssr); console.log(config.siteUrl); console.log(confi…",
    content:
      "```ts\nfunction useConfig(): ClientConfig\n```\n\nThe result contains only options that are safe to send to the client:\n\n```ts\nconst config = useConfig();\n\nconsole.log(config.ssr);\nconsole.log(config.siteUrl);\nconsole.log(config.baseUrl);\nconsole.log(config.head);\n```\n\n`ClientConfig` includes `head`, `ssr`, `siteUrl`, and `baseUrl`. Absolute paths, modules, and Vite settings remain on the server.",
    category: "api",
  },
  {
    title: "useFetch",
    url: "https://runable.netlify.app/docs/api/composables/use-fetch",
    section: "Retrieve the ofetch HTTP client exposed by Runable.",
    excerpt:
      '```ts function useFetch(): typeof $fetch ``` `useFetch()` currently returns the `ofetch` client used by `$fetch`. ```ts const fetcher = useFetch(); const projects = await fetcher<Project[]>("/api/projects"); ``` ::u-tip…',
    content:
      '```ts\nfunction useFetch(): typeof $fetch\n```\n\n`useFetch()` currently returns the `ofetch` client used by `$fetch`.\n\n```ts\nconst fetcher = useFetch();\nconst projects = await fetcher<Project[]>("/api/projects");\n```\n\n::u-tip\n---\nvariant: warning\ntitle: Not a reactive data composable\n---\n\nThis API returns no `data`, `pending`, or SSR cache. Wrap `$fetch` with `useAsyncData()` when you need these features.\n\n::',
    category: "api",
  },
  {
    title: "useHeadSafe",
    url: "https://runable.netlify.app/docs/api/composables/use-head-safe",
    section: "Add only tags and attributes allowed by Unhead's safe policy.",
    excerpt:
      '`useHeadSafe()` works like `useHead()`, but filters potentially dangerous entries. ```ts useHeadSafe({ title: "Profile", meta: [ { name: "description", content: profile.value.summary }, ], }); ``` Choose this function wh…',
    content:
      '`useHeadSafe()` works like `useHead()`, but filters potentially dangerous entries.\n\n```ts\nuseHeadSafe({\n  title: "Profile",\n  meta: [\n    { name: "description", content: profile.value.summary },\n  ],\n});\n```\n\nChoose this function when values come from a CMS or another source that must not be able to inject arbitrary scripts and attributes into the document.',
    category: "api",
  },
  {
    title: "useHead",
    url: "https://runable.netlify.app/docs/api/composables/use-head",
    section: "Add reactive tags to the document head with Unhead.",
    excerpt:
      '```ts useHead({ title: "Projects", meta: [ { name: "description", content: "Project list" }, ], link: [ { rel: "canonical", href: "https://example.com/projects" }, ], }); ``` Values can be reactive: ```ts const project =…',
    content:
      '```ts\nuseHead({\n  title: "Projects",\n  meta: [\n    { name: "description", content: "Project list" },\n  ],\n  link: [\n    { rel: "canonical", href: "https://example.com/projects" },\n  ],\n});\n```\n\nValues can be reactive:\n\n```ts\nconst project = ref<Project | null>(null);\n\nuseHead(() => ({\n  title: project.value?.name ?? "Loading…",\n}));\n```\n\nUnhead collects entries during SSR, then updates them on the client when their dependencies change.',
    category: "api",
  },
  {
    title: "useRoute",
    url: "https://runable.netlify.app/docs/api/composables/use-route",
    section: "Read the currently resolved Vue Router route.",
    excerpt:
      "`useRoute()` returns the current reactive route with the Vue Router signature. ```ts const route = useRoute(); const projectId = computed(() => String(route.params.id)); ``` The result includes `path`, `name`, `params`,…",
    content:
      "`useRoute()` returns the current reactive route with the Vue Router signature.\n\n```ts\nconst route = useRoute();\n\nconst projectId = computed(() => String(route.params.id));\n```\n\nThe result includes `path`, `name`, `params`, `query`, `hash`, `meta`, and `matched`. Do not destructure a property if it must remain reactive; use a computed property or `toRefs()`.",
    category: "api",
  },
  {
    title: "useRouter",
    url: "https://runable.netlify.app/docs/api/composables/use-router",
    section:
      "Access the Vue Router instance installed in the Runable application.",
    excerpt:
      '`useRouter()` has the same signature as the Vue Router composable. ```ts const router = useRouter(); await router.push("/projects"); await router.replace({ name: "project", params: { id: "42" } }); ``` Runable retrieves…',
    content:
      '`useRouter()` has the same signature as the Vue Router composable.\n\n```ts\nconst router = useRouter();\n\nawait router.push("/projects");\nawait router.replace({ name: "project", params: { id: "42" } });\n```\n\nRunable retrieves the router from the application context. Call this function where the Vue application has been installed.',
    category: "api",
  },
  {
    title: "useRuntime",
    url: "https://runable.netlify.app/docs/api/composables/use-runtime",
    section:
      "Access public and private environment variables loaded by Runable.",
    excerpt:
      "```ts function useRuntime(): RuntimeValues ``` ```dotenv RUN_PUBLIC_API_BASE=/api RUN_DATABASE_URL=postgres://localhost/acme ``` ```ts const runtime = useRuntime(); runtime.public.apiBase; if (import.meta.server) { runti…",
    content:
      "```ts\nfunction useRuntime(): RuntimeValues\n```\n\n```dotenv\nRUN_PUBLIC_API_BASE=/api\nRUN_DATABASE_URL=postgres://localhost/acme\n```\n\n```ts\nconst runtime = useRuntime();\n\nruntime.public.apiBase;\n\nif (import.meta.server) {\n  runtime.databaseUrl;\n}\n```\n\n`*_PUBLIC_*` variables are grouped under `public` and included in both client and server bundles. Other recognized variables are available only on the server. Properties are converted to `camelCase` and typed in `.app/runtime.d.ts`.",
    category: "api",
  },
  {
    title: "useSchemaOrg",
    url: "https://runable.netlify.app/docs/api/composables/use-schema-org",
    section: "Add Schema.org structured data to the document with Unhead.",
    excerpt:
      '`useSchemaOrg()` registers Schema.org nodes and generates their JSON-LD representation in the head. ```ts useSchemaOrg([ defineWebSite({ name: "Runable", url: "https://example.com", }), defineWebPage({ name: "Documentati…',
    content:
      '`useSchemaOrg()` registers Schema.org nodes and generates their JSON-LD representation in the head.\n\n```ts\nuseSchemaOrg([\n  defineWebSite({\n    name: "Runable",\n    url: "https://example.com",\n  }),\n  defineWebPage({\n    name: "Documentation",\n  }),\n]);\n```\n\nRunable installs the Schema.org integration using the configured `siteUrl` as its host:\n\n```ts\nexport default defineConfig({\n  siteUrl: "https://example.com",\n});\n```\n\nHelpers such as `defineWebSite`, `defineWebPage`, `defineArticle`, and `defineProduct` are also auto-imported, but `useSchemaOrg()` remains the entry point for registering nodes.',
    category: "api",
  },
  {
    title: "useSeoMeta",
    url: "https://runable.netlify.app/docs/api/composables/use-seo-meta",
    section: "Declare SEO metadata with a flat, typed API.",
    excerpt:
      '`useSeoMeta()` simplifies the creation of SEO, Open Graph, and Twitter tags. ```ts useSeoMeta({ title: "Runable", description: "A Vue framework for your backend.", ogTitle: "Runable", ogDescription: "A Vue framework for…',
    content:
      '`useSeoMeta()` simplifies the creation of SEO, Open Graph, and Twitter tags.\n\n```ts\nuseSeoMeta({\n  title: "Runable",\n  description: "A Vue framework for your backend.",\n  ogTitle: "Runable",\n  ogDescription: "A Vue framework for your backend.",\n  ogImage: "https://example.com/og.png",\n  twitterCard: "summary_large_image",\n});\n```\n\nKeys are typed and converted to `<meta>` tags by Unhead. Use `useHead()` when you need other elements such as `link`, `script`, `style`, or `htmlAttrs`.',
    category: "api",
  },
  {
    title: "definePageMeta",
    url: "https://runable.netlify.app/docs/api/globals/define-page-meta",
    section:
      "Associate a layout, middleware, and Vue Router metadata with a page.",
    excerpt:
      '```ts function definePageMeta(meta: RouteMeta): RouteMeta ``` Use this macro in a page\'s `<script setup>`: ```vue <script setup lang="ts"> definePageMeta({ layout: "dashboard", middleware: ["auth"], transition: "fade", }…',
    content:
      '```ts\nfunction definePageMeta(meta: RouteMeta): RouteMeta\n```\n\nUse this macro in a page\'s `<script setup>`:\n\n```vue\n<script setup lang="ts">\ndefinePageMeta({\n  layout: "dashboard",\n  middleware: ["auth"],\n  transition: "fade",\n});\n</script>\n```\n\nRunable extracts this call statically when generating routes. Pass a serializable object directly; do not build metadata from a runtime-computed value.\n\nModules can extend `RouteMeta` to type their own properties.',
    category: "api",
  },
  {
    title: "defineVueMiddleware",
    url: "https://runable.netlify.app/docs/api/globals/define-vue-middleware",
    section: "Declare one or more typed navigation middleware functions.",
    excerpt:
      "```ts function defineVueMiddleware( middleware: VueRouterMiddleware | VueRouterMiddleware[], ): VueRouterMiddleware[] ``` ```ts // app/middlewares/auth.ts export default defineVueMiddleware((to) => { const user = useCurr…",
    content:
      '```ts\nfunction defineVueMiddleware(\n  middleware: VueRouterMiddleware | VueRouterMiddleware[],\n): VueRouterMiddleware[]\n```\n\n```ts\n// app/middlewares/auth.ts\nexport default defineVueMiddleware((to) => {\n  const user = useCurrentUser();\n\n  if (!user.value && to.path !== "/login") {\n    return "/login";\n  }\n});\n```\n\nThe function always normalizes its argument into an array. Each middleware receives `to` and `from`, then can return the same values as a Vue Router guard: a destination, `false`, `true`, `undefined`, or a promise.\n\nSuffix the file with `.global.ts` to run it on every route.',
    category: "api",
  },
  {
    title: "defineVuePlugin",
    url: "https://runable.netlify.app/docs/api/globals/define-vue-plugin",
    section:
      "Declare a Runable plugin with injections, dependencies, and application hooks.",
    excerpt:
      'The short form receives a setup function directly: ```ts // app/plugins/api.ts export default defineVuePlugin(() => { return { provide: { apiBase: "/api", }, }; }); ``` The object form controls order and dependencies: ``…',
    content:
      'The short form receives a setup function directly:\n\n```ts\n// app/plugins/api.ts\nexport default defineVuePlugin(() => {\n  return {\n    provide: {\n      apiBase: "/api",\n    },\n  };\n});\n```\n\nThe object form controls order and dependencies:\n\n```ts\nexport default defineVuePlugin({\n  name: "analytics",\n  enforce: "post",\n  dependsOn: ["auth"],\n  setup(app) {\n    app.provide("analytics", createAnalytics());\n  },\n  hooks: {\n    "app:mounted"(app) {\n      console.log("Application mounted", app);\n    },\n  },\n});\n```\n\n`enforce` accepts `pre` or `post`. Values returned in `provide` are injected into Vue and added to global properties with a `$` prefix.',
    category: "api",
  },
  {
    title: "$fetch",
    url: "https://runable.netlify.app/docs/api/globals/dollar-fetch",
    section: "Send HTTP requests with the auto-imported ofetch client.",
    excerpt:
      '`$fetch` is a direct reference to `ofetch`. ```ts const project = await $fetch<Project>("/api/projects/42"); ``` ```ts const created = await $fetch<Project>("/api/projects", { method: "POST", body: { name: "Documentation…',
    content:
      '`$fetch` is a direct reference to `ofetch`.\n\n```ts\nconst project = await $fetch<Project>("/api/projects/42");\n```\n\n```ts\nconst created = await $fetch<Project>("/api/projects", {\n  method: "POST",\n  body: {\n    name: "Documentation",\n  },\n});\n```\n\nThe client parses JSON responses automatically and throws on failed HTTP responses. To get caching, reactive state, and SSR hydration, call `$fetch` inside `useAsyncData()`.',
    category: "api",
  },
  {
    title: "Globals",
    url: "https://runable.netlify.app/docs/api/globals/index",
    section:
      "Reference for global functions injected automatically by Runable.",
    excerpt:
      "Runable makes several functions available without manual imports. | API | Purpose | | --- | --- | | `$fetch` | Send an HTTP request with ofetch | | `definePageMeta` | Declare page metadata | | `defineVueMiddleware` | Def…",
    content:
      "Runable makes several functions available without manual imports.\n\n| API | Purpose |\n| --- | --- |\n| `$fetch` | Send an HTTP request with ofetch |\n| `definePageMeta` | Declare page metadata |\n| `defineVueMiddleware` | Define one or more navigation guards |\n| `defineVuePlugin` | Declare a Runable application plugin |\n| Vue APIs | Use common Vue exports without imports |",
    category: "api",
  },
  {
    title: "Vue APIs",
    url: "https://runable.netlify.app/docs/api/globals/vue-apis",
    section:
      "Use common Vue functions without manual imports in a Runable application.",
    excerpt:
      "Runable auto-imports the most frequently used Vue APIs. Their behavior and signatures remain unchanged.",
    content:
      "Runable auto-imports the most frequently used Vue APIs. Their behavior and signatures remain unchanged.",
    category: "api",
  },
  {
    title: "Vue APIs",
    url: "https://runable.netlify.app/docs/api/globals/vue-apis",
    section: "Reactivity",
    excerpt:
      "`ref`, `shallowRef`, `reactive`, `shallowReactive`, `readonly`, `computed`, `watch`, `watchEffect`, `watchPostEffect`, `watchSyncEffect`, `toRef`, `toRefs`, `toValue`, `unref`, `isRef`, `isReactive`, `isReadonly`, `isPro…",
    content:
      "`ref`, `shallowRef`, `reactive`, `shallowReactive`, `readonly`, `computed`, `watch`, `watchEffect`, `watchPostEffect`, `watchSyncEffect`, `toRef`, `toRefs`, `toValue`, `unref`, `isRef`, `isReactive`, `isReadonly`, `isProxy`, `markRaw`, and `triggerRef`.\n\n```ts\nconst count = ref(0);\nconst doubled = computed(() => count.value * 2);\n```",
    category: "api",
  },
  {
    title: "Vue APIs",
    url: "https://runable.netlify.app/docs/api/globals/vue-apis",
    section: "Lifecycle",
    excerpt:
      "`onMounted`, `onBeforeMount`, `onUpdated`, `onBeforeUpdate`, `onUnmounted`, `onBeforeUnmount`, `onActivated`, `onDeactivated`, `onErrorCaptured`, `onServerPrefetch`, `onRenderTracked`, and `onRenderTriggered`.",
    content:
      "`onMounted`, `onBeforeMount`, `onUpdated`, `onBeforeUpdate`, `onUnmounted`, `onBeforeUnmount`, `onActivated`, `onDeactivated`, `onErrorCaptured`, `onServerPrefetch`, `onRenderTracked`, and `onRenderTriggered`.",
    category: "api",
  },
  {
    title: "Vue APIs",
    url: "https://runable.netlify.app/docs/api/globals/vue-apis",
    section: "Components and context",
    excerpt:
      "`defineComponent`, `defineAsyncComponent`, `h`, `inject`, `provide`, `nextTick`, `getCurrentInstance`, `useAttrs`, `useSlots`, `useTemplateRef`, `useId`, `resolveComponent`, `withDirectives`, `withModifiers`, and `withKe…",
    content:
      '`defineComponent`, `defineAsyncComponent`, `h`, `inject`, `provide`, `nextTick`, `getCurrentInstance`, `useAttrs`, `useSlots`, `useTemplateRef`, `useId`, `resolveComponent`, `withDirectives`, `withModifiers`, and `withKeys`.\n\nImport any Vue API that is not auto-imported normally:\n\n```ts\nimport { createApp } from "vue";\n```',
    category: "api",
  },
  {
    title: "API",
    url: "https://runable.netlify.app/docs/api/index",
    section:
      "Reference for the components, composables, and global functions provided by Runable.",
    excerpt:
      "This section describes APIs that are automatically available in the Vue application. | Family | Content | | --- | --- | | Components | Page rendering, layouts, links, and client-only content | | Composables | Data, route…",
    content:
      'This section describes APIs that are automatically available in the Vue application.\n\n| Family | Content |\n| --- | --- |\n| Components | Page rendering, layouts, links, and client-only content |\n| Composables | Data, router, configuration, head, and Schema.org |\n| Globals | Fetch, page metadata, middleware, plugins, and Vue APIs |\n\nThe components and functions documented here are auto-imported into application code scanned by Runable (`app/`) — that scan is their only wiring. Most of them have no explicit `import ... from "runable"` path at all; `useRuntime()` is the one exception, re-exported from the package root for use in backend code (see <a href="/docs/api/composables/use-runtime.md">useRuntime</a>).\n\n::u-tip\n---\nvariant: warning\ntitle: Alpha API\n---\n\nSome signatures may still change. Individual pages identify functions whose implementation is incomplete.\n\n::',
    category: "api",
  },
  {
    title: "Concepts",
    url: "https://runable.netlify.app/docs/getting-started/concepts",
    section:
      "Understand the backend, Runable engine, Vue application, generated files, and SSR lifecycle.",
    excerpt:
      "Runable connects three layers: your HTTP server, the framework engine, and your Vue application.",
    content:
      "Runable connects three layers: your HTTP server, the framework engine, and your Vue application.",
    category: "getting-started",
  },
  {
    title: "Concepts",
    url: "https://runable.netlify.app/docs/getting-started/concepts",
    section: "Three responsibilities",
    excerpt:
      "| Layer | Responsibility | | --- | --- | | Your backend | Listen on the network, run API routes, and handle application logic | | Runable | Prepare the application, generate conventions, and produce the frontend response…",
    content:
      "| Layer | Responsibility |\n| --- | --- |\n| Your backend | Listen on the network, run API routes, and handle application logic |\n| Runable | Prepare the application, generate conventions, and produce the frontend response |\n| Your Vue application | Define pages, components, layouts, and user interactions |\n\nThis separation lets you replace Express with Fastify or Hono without reorganizing Vue files.",
    category: "getting-started",
  },
  {
    title: "Concepts",
    url: "https://runable.netlify.app/docs/getting-started/concepts",
    section: "The backend remains the entry point",
    excerpt:
      'Runable does not automatically start your application server. You create the server, then forward frontend requests to it. ```ts // server.ts import Express from "express"; import { express } from "runable/adapters/expre…',
    content:
      'Runable does not automatically start your application server. You create the server, then forward frontend requests to it.\n\n```ts\n// server.ts\nimport Express from "express";\nimport { express } from "runable/adapters/express";\n\nconst server = Express();\n\nserver.get("/api/orders", ordersController);\nserver.use(express());\n\nserver.listen(3000);\n```\n\nYou control the order. Place API routes before the Runable adapter so the backend handles them first.',
    category: "getting-started",
  },
  {
    title: "Concepts",
    url: "https://runable.netlify.app/docs/getting-started/concepts",
    section: "Adapters for each backend",
    excerpt:
      "Each adapter initializes Runable once and translates framework objects for the rendering engine: | Adapter | Environment | | --- | --- | | `express()` | Express middleware | | `fastify()` | Fastify plugin | | `hono()` |…",
    content:
      "Each adapter initializes Runable once and translates framework objects for the rendering engine:\n\n| Adapter | Environment |\n| --- | --- |\n| `express()` | Express middleware |\n| `fastify()` | Fastify plugin |\n| `hono()` | Hono middleware |\n| `koa()` | Koa middleware |\n| `nestjs()` | NestJS middleware on the Express platform |\n| `adonis()` | AdonisJS catch-all route handler |\n| `bun()` | `fetch` function for `Bun.serve()` |\n| `deno()` | `fetch` function for `Deno.serve()` |\n\nNode adapters use Node request and response objects internally. Bun and Deno adapters use standard `Request` and `Response` objects.",
    category: "getting-started",
  },
  {
    title: "Concepts",
    url: "https://runable.netlify.app/docs/getting-started/concepts",
    section: "Connect other backends",
    excerpt:
      'Always place the adapter after API routes or as the router\'s final fallback. ::u-code-group ```ts [Express] import Express from "express"; import { express } from "runable/adapters/express"; const app = Express(); app.us…',
    content:
      'Always place the adapter after API routes or as the router\'s final fallback.\n\n::u-code-group\n\n```ts [Express]\nimport Express from "express";\nimport { express } from "runable/adapters/express";\n\nconst app = Express();\napp.use(express());\napp.listen(3000);\n```\n\n```ts [Fastify]\nimport Fastify from "fastify";\nimport { fastify } from "runable/adapters/fastify";\n\nconst app = Fastify();\nawait app.register(fastify());\nawait app.listen({ port: 3000 });\n```\n\n```ts [Hono]\nimport { Hono } from "hono";\nimport { hono } from "runable/adapters/hono";\n\nconst app = new Hono();\napp.use("*", hono());\n\nexport default app;\n```\n\n```ts [Koa]\nimport Koa from "koa";\nimport { koa } from "runable/adapters/koa";\n\nconst app = new Koa();\napp.use(koa());\napp.listen(3000);\n```\n\n```ts [NestJS]\nimport { NestFactory } from "@nestjs/core";\nimport { nestjs } from "runable/adapters/nestjs";\nimport { AppModule } from "./app.module.js";\n\nconst app = await NestFactory.create(AppModule);\napp.use(nestjs());\nawait app.listen(3000);\n```\n\n```ts [AdonisJS]\nimport router from "@adonisjs/core/services/router";\nimport { adonis } from "runable/adapters/adonis";\n\nrouter.any("*", adonis());\n```\n\n```ts [Bun]\nimport { bun } from "runable/adapters/bun";\n\nBun.serve({ port: 3000, fetch: bun() });\n```\n\n```ts [Deno]\nimport { deno } from "runable/adapters/deno";\n\nDeno.serve({ port: 3000 }, deno());\n```\n\n::',
    category: "getting-started",
  },
  {
    title: "Concepts",
    url: "https://runable.netlify.app/docs/getting-started/concepts",
    section: "Conventions become generated code",
    excerpt:
      "At startup, Runable reads `runable.config.ts`, resolves paths, and configures several Vite plugins. ```text app/pages/ ──► Vue Router routes app/layouts/ ──► layout registry app/components/ ──► available components app/c…",
    content:
      "At startup, Runable reads `runable.config.ts`, resolves paths, and configures several Vite plugins.\n\n```text\napp/pages/          ──► Vue Router routes\napp/layouts/        ──► layout registry\napp/components/     ──► available components\napp/composables/    ──► automatic imports\napp/globals/        ──► auto-imported global functions and variables\napp/middlewares/    ──► navigation guards\napp/plugins/        ──► plugins installed in Vue\n```\n\nRequired declarations and virtual files are written to `.app/`. This directory is generated; do not use it for source code.",
    category: "getting-started",
  },
  {
    title: "Concepts",
    url: "https://runable.netlify.app/docs/getting-started/concepts",
    section: "One Vue application per server render",
    excerpt:
      "For every SSR render, Runable creates a new Vue application, then installs the router, layouts, plugins, data manager, and Unhead. This isolation prevents request-specific state from being shared with another user. ```te…",
    content:
      "For every SSR render, Runable creates a new Vue application, then installs the router, layouts, plugins, data manager, and Unhead.\n\nThis isolation prevents request-specific state from being shared with another user.\n\n```text\nRequest A ──► Vue App A ──► Cache A ──► HTML A\nRequest B ──► Vue App B ──► Cache B ──► HTML B\n```\n\nDo not store user-specific data in a global module variable. Use state created in the application context.",
    category: "getting-started",
  },
  {
    title: "Concepts",
    url: "https://runable.netlify.app/docs/getting-started/concepts",
    section: "The SSR lifecycle",
    excerpt:
      'When `ssr` is `true`, a request follows these steps: <div class="py-3 space-y-2"> <div class="flex flex-wrap items-center gap-2"><u-icon name="tabler:circle-1-filled" class="size-5 text-muted-foreground"></u-icon><span>t…',
    content:
      'When `ssr` is `true`, a request follows these steps:\n\n<div class="py-3 space-y-2">\n  <div class="flex flex-wrap items-center gap-2"><u-icon name="tabler:circle-1-filled" class="size-5 text-muted-foreground"></u-icon><span>the backend forwards the URL to Runable;</span></div>\n  <div class="flex flex-wrap items-center gap-2"><u-icon name="tabler:circle-2-filled" class="size-5 text-muted-foreground"></u-icon><span>Vue Router resolves the page and its middleware;</span></div>\n  <div class="flex flex-wrap items-center gap-2"><u-icon name="tabler:circle-3-filled" class="size-5 text-muted-foreground"></u-icon><span><code>useAsyncData()</code> waits for non-lazy data;</span></div>\n  <div class="flex flex-wrap items-center gap-2"><u-icon name="tabler:circle-4-filled" class="size-5 text-muted-foreground"></u-icon><span>Vue produces HTML and Unhead injects the head;</span></div>\n  <div class="flex flex-wrap items-center gap-2"><u-icon name="tabler:circle-5-filled" class="size-5 text-muted-foreground"></u-icon><span>Runable serializes the data cache into the response;</span></div>\n  <div class="flex flex-wrap items-center gap-2"><u-icon name="tabler:circle-6-filled" class="size-5 text-muted-foreground"></u-icon><span>the browser restores the cache and hydrates the application.</span></div>\n</div>\n\nWith `ssr: false`, Runable returns the client template without rendering components on the server.',
    category: "getting-started",
  },
  {
    title: "Concepts",
    url: "https://runable.netlify.app/docs/getting-started/concepts",
    section: "Pages and metadata",
    excerpt:
      "A file in `app/pages/` becomes a route: ```text app/pages/ ├── index.vue → / ├── account.vue → /account ├── users/[id].vue → /users/:id └── docs/[...slug].vue → /docs/:slug* ``` `definePageMeta()` supplements file-name c…",
    content:
      'A file in `app/pages/` becomes a route:\n\n```text\napp/pages/\n├── index.vue            → /\n├── account.vue          → /account\n├── users/[id].vue       → /users/:id\n└── docs/[...slug].vue   → /docs/:slug*\n```\n\n`definePageMeta()` supplements file-name conventions:\n\n```vue\n<!-- app/pages/account.vue -->\n<script setup lang="ts">\ndefinePageMeta({\n  layout: "dashboard",\n  middleware: ["auth"],\n});\n</script>\n\n<template>\n  <h1>My account</h1>\n</template>\n```\n\nGlobal middleware runs on every navigation. Named middleware is loaded when referenced by a page.',
    category: "getting-started",
  },
  {
    title: "Concepts",
    url: "https://runable.netlify.app/docs/getting-started/concepts",
    section: "Plugins and modules",
    excerpt:
      'A plugin runs when the Vue application is created. It can provide values, register hooks, or install a client integration. ```ts // app/plugins/api.ts export default defineVuePlugin(() => { return { provide: { apiBase: "…',
    content:
      'A plugin runs when the Vue application is created. It can provide values, register hooks, or install a client integration.\n\n```ts\n// app/plugins/api.ts\nexport default defineVuePlugin(() => {\n  return {\n    provide: {\n      apiBase: "/api",\n    },\n  };\n});\n```\n\nA module runs earlier, while configuration loads. It can add directories, plugins, or Vite options to an application.\n\n| Extension | Execution time | Typical use |\n| --- | --- | --- |\n| Plugin | Vue application creation | Injection, client SDK, runtime hooks |\n| Module | Configuration loading | Reusable feature, generation, and configuration |',
    category: "getting-started",
  },
  {
    title: "Concepts",
    url: "https://runable.netlify.app/docs/getting-started/concepts",
    section: "Development and production",
    excerpt:
      "In development, `createRunableApp()` returns a Vite instance in middleware mode. Your backend uses it for HMR and module transformation. In production, `createRunableApp()` loads configuration without creating a Vite ser…",
    content:
      "In development, `createRunableApp()` returns a Vite instance in middleware mode. Your backend uses it for HMR and module transformation.\n\nIn production, `createRunableApp()` loads configuration without creating a Vite server. `runable build` must generate the expected files in `.output/` before startup.\n\n| Directory | Status | Content |\n| --- | --- | --- |\n| `app/` | Source | Your Vue application |\n| `public/` | Source | Static assets |\n| `.app/` | Generated | Types, routes, and virtual registries |\n| `.output/` | Generated | Production build artifacts |",
    category: "getting-started",
  },
  {
    title: "Concepts",
    url: "https://runable.netlify.app/docs/getting-started/concepts",
    section: "Mental model",
    excerpt:
      "Remember this rule: your backend owns HTTP, Runable owns application assembly, and Vue owns the interface. ::u-tip --- variant: success title: Getting Started complete --- You can now browse the Structure section to unde…",
    content:
      "Remember this rule: your backend owns HTTP, Runable owns application assembly, and Vue owns the interface.\n\n::u-tip\n---\nvariant: success\ntitle: Getting Started complete\n---\n\nYou can now browse the Structure section to understand every directory in a Runable project.\n\n::",
    category: "getting-started",
  },
  {
    title: "Configuration",
    url: "https://runable.netlify.app/docs/getting-started/configuration",
    section:
      "Configure directories, SSR, metadata, aliases, modules, and Vite options for your application.",
    excerpt:
      "`runable.config.ts` defines the application structure, rendering mode, and extensions loaded at startup.",
    content:
      "`runable.config.ts` defines the application structure, rendering mode, and extensions loaded at startup.",
    category: "getting-started",
  },
  {
    title: "Configuration",
    url: "https://runable.netlify.app/docs/getting-started/configuration",
    section: "Minimal configuration",
    excerpt:
      'Place this file at the project root: ```ts // runable.config.ts import { defineConfig } from "runable"; export default defineConfig({}); ``` `defineConfig()` preserves the object while providing TypeScript types and auto…',
    content:
      'Place this file at the project root:\n\n```ts\n// runable.config.ts\nimport { defineConfig } from "runable";\n\nexport default defineConfig({});\n```\n\n`defineConfig()` preserves the object while providing TypeScript types and autocomplete.',
    category: "getting-started",
  },
  {
    title: "Configuration",
    url: "https://runable.netlify.app/docs/getting-started/configuration",
    section: "Default values",
    excerpt:
      "Without additional options, Runable uses this structure: | Option | Type | Default | Purpose | | --- | --- | --- | --- | | `appDir` | `string` | `app` | Root of Vue sources | | `output` | `string` | `.app` | Files genera…",
    content:
      "Without additional options, Runable uses this structure:\n\n| Option | Type | Default | Purpose |\n| --- | --- | --- | --- |\n| `appDir` | `string` | `app` | Root of Vue sources |\n| `output` | `string` | `.app` | Files generated for development and typing |\n| `distdir` | `string` | `.output` | Production build |\n| `publicDir` | `string \\| false` | `public` | Assets served as-is |\n| `ssr` | `boolean` | `true` | Enables server rendering |\n| `pages` | `string \\| array` | `app/pages` | Page files |\n| `layouts` | `string \\| array` | `app/layouts` | Available layouts |\n| `components` | `string \\| array` | `app/components` | Auto-registered components |\n| `composables` | `string \\| array` | `app/composables` | Auto-imported composables |\n| `globals` | `string \\| array` | `app/globals` | Auto-imported global functions |\n| `middlewares` | `string \\| array` | `app/middlewares` | Navigation middleware |\n| `plugins` | `string \\| array` | `app/plugins` | Application plugins |\n| `css` | `string \\| array` | `[]` | Global stylesheets |\n| `modules` | `string[]` | `[]` | Loaded Runable modules |\n\nThe full option set, with its exact TypeScript shape, is the `RunableConfig` interface in `packages/runable/src/config/types.ts`.\n\nRelative paths are resolved from the directory containing the configuration.",
    category: "getting-started",
  },
  {
    title: "Configuration",
    url: "https://runable.netlify.app/docs/getting-started/configuration",
    section: "Define main directories",
    excerpt:
      '```ts // runable.config.ts import { defineConfig } from "runable"; export default defineConfig({ appDir: "frontend", output: ".runable", distdir: "dist", publicDir: "static", }); ``` Use `publicDir: false` when your back…',
    content:
      '```ts\n// runable.config.ts\nimport { defineConfig } from "runable";\n\nexport default defineConfig({\n  appDir: "frontend",\n  output: ".runable",\n  distdir: "dist",\n  publicDir: "static",\n});\n```\n\nUse `publicDir: false` when your backend or a CDN handles all static assets.',
    category: "getting-started",
  },
  {
    title: "Configuration",
    url: "https://runable.netlify.app/docs/getting-started/configuration",
    section: "Enable or disable SSR",
    excerpt:
      "```ts export default defineConfig({ ssr: false, }); ``` With `ssr: false`, Runable returns the HTML document without rendering the Vue tree on the server. The client then creates the application in the browser. | Mode |…",
    content:
      "```ts\nexport default defineConfig({\n  ssr: false,\n});\n```\n\nWith `ssr: false`, Runable returns the HTML document without rendering the Vue tree on the server. The client then creates the application in the browser.\n\n| Mode | Choose it for |\n| --- | --- |\n| `ssr: true` | SEO, a rendered first display, and preloaded data |\n| `ssr: false` | Internal SPAs or interfaces that depend entirely on the browser |",
    category: "getting-started",
  },
  {
    title: "Configuration",
    url: "https://runable.netlify.app/docs/getting-started/configuration",
    section: "Configure HTML metadata",
    excerpt:
      '```ts export default defineConfig({ siteUrl: "https://example.com", head: { title: "My application", meta: [ { name: "description", content: "A Vue application rendered with Runable.", }, ], link: [{ rel: "icon", href: "…',
    content:
      '```ts\nexport default defineConfig({\n  siteUrl: "https://example.com",\n  head: {\n    title: "My application",\n    meta: [\n      {\n        name: "description",\n        content: "A Vue application rendered with Runable.",\n      },\n    ],\n    link: [{ rel: "icon", href: "/favicon.svg" }],\n  },\n});\n```\n\n`siteUrl` supplies the origin used to produce some absolute URLs. `head` is passed to Unhead when the application is created.',
    category: "getting-started",
  },
  {
    title: "Configuration",
    url: "https://runable.netlify.app/docs/getting-started/configuration",
    section: "Add global styles",
    excerpt:
      '```ts export default defineConfig({ css: ["./app/css/reset.css", "./app/css/main.css"], }); ``` The `css` array accepts files Vite can process. Install the matching preprocessor when using Sass, Less, or Stylus.',
    content:
      '```ts\nexport default defineConfig({\n  css: ["./app/css/reset.css", "./app/css/main.css"],\n});\n```\n\nThe `css` array accepts files Vite can process. Install the matching preprocessor when using Sass, Less, or Stylus.',
    category: "getting-started",
  },
  {
    title: "Configuration",
    url: "https://runable.netlify.app/docs/getting-started/configuration",
    section: "Define aliases",
    excerpt:
      '```ts import { join } from "node:path"; export default defineConfig({ alias: { "@": join(import.meta.dirname, "app"), "@shared": join(import.meta.dirname, "shared"), }, }); ``` Runable also adds the internal `#build` ali…',
    content:
      '```ts\nimport { join } from "node:path";\n\nexport default defineConfig({\n  alias: {\n    "@": join(import.meta.dirname, "app"),\n    "@shared": join(import.meta.dirname, "shared"),\n  },\n});\n```\n\nRunable also adds the internal `#build` alias, which points to the generated directory defined by `output`.',
    category: "getting-started",
  },
  {
    title: "Configuration",
    url: "https://runable.netlify.app/docs/getting-started/configuration",
    section: "Extend scanned directories",
    excerpt:
      'Replace conventional locations with your own paths: ```ts export default defineConfig({ pages: ["./frontend/views"], layouts: ["./frontend/shells"], composables: ["./frontend/composables", "./shared/composables"], global…',
    content:
      'Replace conventional locations with your own paths:\n\n```ts\nexport default defineConfig({\n  pages: ["./frontend/views"],\n  layouts: ["./frontend/shells"],\n  composables: ["./frontend/composables", "./shared/composables"],\n  globals: ["./frontend/globals"],\n  middlewares: ["./frontend/middlewares"],\n  plugins: ["./frontend/plugins"],\n});\n```\n\n::u-tip\n---\nvariant: info\ntitle: Replacing defaults\n---\n\nWhen you provide a directory option, treat it as the new source to scan. Explicitly include the conventional directory if you want to keep it in the list.\n\n::',
    category: "getting-started",
  },
  {
    title: "Configuration",
    url: "https://runable.netlify.app/docs/getting-started/configuration",
    section: "Configure components",
    excerpt:
      'An object entry controls the generated name: ```ts export default defineConfig({ components: [ "./app/components", { dirs: "./app/components/ui", prefix: "Ui", pathPrefix: false, }, ], }); ``` `app/components/ui/Button.v…',
    content:
      'An object entry controls the generated name:\n\n```ts\nexport default defineConfig({\n  components: [\n    "./app/components",\n    {\n      dirs: "./app/components/ui",\n      prefix: "Ui",\n      pathPrefix: false,\n    },\n  ],\n});\n```\n\n`app/components/ui/Button.vue` can therefore be exposed under a prefixed name according to the directory options.',
    category: "getting-started",
  },
  {
    title: "Configuration",
    url: "https://runable.netlify.app/docs/getting-started/configuration",
    section: "Load modules",
    excerpt:
      '```ts export default defineConfig({ modules: ["@acme/runable-auth", "./modules/content"], auth: { redirectTo: "/login", }, }); ``` A module can add its own pages, components, layouts, plugins, or Vite options. Module-spe…',
    content:
      '```ts\nexport default defineConfig({\n  modules: ["@acme/runable-auth", "./modules/content"],\n\n  auth: {\n    redirectTo: "/login",\n  },\n});\n```\n\nA module can add its own pages, components, layouts, plugins, or Vite options. Module-specific options live under the key declared by that module.',
    category: "getting-started",
  },
  {
    title: "Configuration",
    url: "https://runable.netlify.app/docs/getting-started/configuration",
    section: "Extend Vite",
    excerpt:
      '```ts import inspect from "vite-plugin-inspect"; export default defineConfig({ vite: { plugins: [inspect()], define: { __BUILD_TARGET__: JSON.stringify("web"), }, }, }); ``` Runable merges this with its internal Vite con…',
    content:
      '```ts\nimport inspect from "vite-plugin-inspect";\n\nexport default defineConfig({\n  vite: {\n    plugins: [inspect()],\n    define: {\n      __BUILD_TARGET__: JSON.stringify("web"),\n    },\n  },\n});\n```\n\nRunable merges this with its internal Vite configuration. Fields that define framework behavior, including `root`, `appType`, `ssr`, and `server.middlewareMode`, remain under Runable\'s control.',
    category: "getting-started",
  },
  {
    title: "Configuration",
    url: "https://runable.netlify.app/docs/getting-started/configuration",
    section: "Complete example",
    excerpt:
      '```ts import { join } from "node:path"; import { defineConfig } from "runable"; export default defineConfig({ appDir: "app", output: ".app", distdir: ".output", publicDir: "public", ssr: true, siteUrl: "https://example.c…',
    content:
      '```ts\nimport { join } from "node:path";\nimport { defineConfig } from "runable";\n\nexport default defineConfig({\n  appDir: "app",\n  output: ".app",\n  distdir: ".output",\n  publicDir: "public",\n\n  ssr: true,\n  siteUrl: "https://example.com",\n\n  head: {\n    title: "My application",\n    meta: [{ name: "description", content: "My Runable application" }],\n  },\n\n  css: ["./app/css/main.css"],\n  modules: [],\n\n  alias: {\n    "@": join(import.meta.dirname, "app"),\n  },\n});\n```\n\n::u-tip\n---\nvariant: info\ntitle: Next step\n---\n\nLearn how these options become an application in <a href="/docs/getting-started/concepts.md">Concepts</a>.\n\n::',
    category: "getting-started",
  },
  {
    title: "Installation",
    url: "https://runable.netlify.app/docs/getting-started/installation",
    section:
      "Install Runable in an existing backend project and prepare a minimal Vue application with Express.",
    excerpt:
      "Add Runable to your backend, create the Vue directory, then connect HTTP requests to the rendering engine.",
    content:
      "Add Runable to your backend, create the Vue directory, then connect HTTP requests to the rendering engine.",
    category: "getting-started",
  },
  {
    title: "Installation",
    url: "https://runable.netlify.app/docs/getting-started/installation",
    section: "Prerequisites",
    excerpt:
      "Use a Node.js version supported by `runable`: | Tool | Version | | --- | --- | | Node.js | `22.18.0` or newer, or `24.12.0` and later | | Vue | `3.5` or newer | This page uses Express and TypeScript. The same principle a…",
    content:
      'Use a Node.js version supported by `runable`:\n\n| Tool | Version |\n| --- | --- |\n| Node.js | `22.18.0` or newer, or `24.12.0` and later |\n| Vue | `3.5` or newer |\n\nThis page uses Express and TypeScript. The same principle applies to other backends.\n\n::u-tip\n---\nvariant: info\ntitle: Prefer an automated setup?\n---\n\nThe steps below are manual, to show exactly what\'s involved. <a href="/docs/guide/cli/create.md">`runable create`</a> automates most of them interactively.\n\n::',
    category: "getting-started",
  },
  {
    title: "Installation",
    url: "https://runable.netlify.app/docs/getting-started/installation",
    section: "Install dependencies",
    excerpt:
      "::u-code-group ```bash [pnpm] pnpm add runable vue vue-router express pnpm add -D @runablejs/cli tsx typescript @types/node @types/express ``` ```bash [npm] npm install runable vue vue-router express npm install --save-d…",
    content:
      "::u-code-group\n\n```bash [pnpm]\npnpm add runable vue vue-router express\npnpm add -D @runablejs/cli tsx typescript @types/node @types/express\n```\n\n```bash [npm]\nnpm install runable vue vue-router express\nnpm install --save-dev @runablejs/cli tsx typescript @types/node @types/express\n```\n\n```bash [yarn]\nyarn add runable vue vue-router express\nyarn add --dev @runablejs/cli tsx typescript @types/node @types/express\n```\n\n```bash [Bun]\nbun add runable vue vue-router express\nbun add --dev @runablejs/cli tsx typescript @types/node @types/express\n```\n\n::",
    category: "getting-started",
  },
  {
    title: "Installation",
    url: "https://runable.netlify.app/docs/getting-started/installation",
    section: "Add scripts",
    excerpt:
      'Configure development, type preparation, and the production build: ```json { "type": "module", "scripts": { "dev": "tsx watch server.ts", "app:prepare": "runable prepare", "app:build": "runable build" } } ``` `runable pr…',
    content:
      'Configure development, type preparation, and the production build:\n\n```json\n{\n  "type": "module",\n  "scripts": {\n    "dev": "tsx watch server.ts",\n    "app:prepare": "runable prepare",\n    "app:build": "runable build"\n  }\n}\n```\n\n`runable prepare` generates files required during development. `runable build` produces the application build. See <a href="/docs/guide/cli/index.md">CLI</a> for the full command reference.',
    category: "getting-started",
  },
  {
    title: "Installation",
    url: "https://runable.netlify.app/docs/getting-started/installation",
    section: "Create the configuration",
    excerpt:
      'Add `runable.config.ts` at the project root: ```ts // runable.config.ts import { defineConfig } from "runable"; export default defineConfig({ ssr: true, }); ``` With this minimal configuration, Runable uses these convent…',
    content:
      'Add `runable.config.ts` at the project root:\n\n```ts\n// runable.config.ts\nimport { defineConfig } from "runable";\n\nexport default defineConfig({\n  ssr: true,\n});\n```\n\nWith this minimal configuration, Runable uses these conventions:\n\n| Item | Default location |\n| --- | --- |\n| Vue sources | `app/` |\n| Pages | `app/pages/` |\n| Static assets | `public/` |\n| Generated files | `.app/` |\n| Production build | `.output/` |',
    category: "getting-started",
  },
  {
    title: "Installation",
    url: "https://runable.netlify.app/docs/getting-started/installation",
    section: "Create the first page",
    excerpt:
      "```vue <!-- app/pages/index.vue --> <template> <main> <h1>Hello Runable</h1> <p>This page is generated from app/pages/index.vue.</p> </main> </template> ``` You do not need to declare the `/` route. Runable creates it fr…",
    content:
      "```vue\n<!-- app/pages/index.vue -->\n<template>\n  <main>\n    <h1>Hello Runable</h1>\n    <p>This page is generated from app/pages/index.vue.</p>\n  </main>\n</template>\n```\n\nYou do not need to declare the `/` route. Runable creates it from `index.vue`.",
    category: "getting-started",
  },
  {
    title: "Installation",
    url: "https://runable.netlify.app/docs/getting-started/installation",
    section: "Connect Express to Runable",
    excerpt:
      '```ts // server.ts import Express from "express"; import { express } from "runable/adapters/express"; const server = Express(); server.get("/api/health", (_req, res) => { res.json({ status: "ok" }); }); // The adapter in…',
    content:
      '```ts\n// server.ts\nimport Express from "express";\nimport { express } from "runable/adapters/express";\n\nconst server = Express();\n\nserver.get("/api/health", (_req, res) => {\n  res.json({ status: "ok" });\n});\n\n// The adapter initializes Runable once and serves the frontend.\nserver.use(express());\n\nserver.listen(3000, () => {\n  console.log("http://localhost:3000");\n});\n```\n\nPlace the Runable adapter after your API routes. `/api/health` remains handled by Express, while `/` is rendered by Vue.\n\nThe adapter calls `createRunableApp()` once. In development, it lets Vite respond to modules and assets before rendering the page.',
    category: "getting-started",
  },
  {
    title: "Installation",
    url: "https://runable.netlify.app/docs/getting-started/installation",
    section: "Install only your backend",
    excerpt:
      "Supported frameworks are not runtime dependencies of `runable`. Install the one used by your application: | Adapter | Consuming project dependency | | --- | --- | | `express()` | `express` | | `fastify()` | `fastify` | |…",
    content:
      "Supported frameworks are not runtime dependencies of `runable`. Install the one used by your application:\n\n| Adapter | Consuming project dependency |\n| --- | --- |\n| `express()` | `express` |\n| `fastify()` | `fastify` |\n| `hono()` | `hono` |\n| `koa()` | `koa` |\n| `nestjs()` | `@nestjs/common`, `@nestjs/core`, and the Express platform |\n| `adonis()` | `@adonisjs/core` |\n| `bun()` | No additional npm dependency |\n| `deno()` | No additional npm dependency |",
    category: "getting-started",
  },
  {
    title: "Installation",
    url: "https://runable.netlify.app/docs/getting-started/installation",
    section: "Start the project",
    excerpt:
      "```bash pnpm app:prepare pnpm dev ``` Open `http://localhost:3000`. The page should display “Hello Runable”. ::u-tip --- variant: warning title: Alpha CLI --- The interactive `create-runable` command exists, but its star…",
    content:
      '```bash\npnpm app:prepare\npnpm dev\n```\n\nOpen `http://localhost:3000`. The page should display “Hello Runable”.\n\n::u-tip\n---\nvariant: warning\ntitle: Alpha CLI\n---\n\nThe interactive `create-runable` command exists, but its starters are still evolving. The manual installation above shows every file added to your backend.\n\n::\n\n::u-tip\n---\nvariant: success\ntitle: Installation complete\n---\n\nNow build a small application with <a href="/docs/getting-started/quickstart.md">Quick Start</a>.\n\n::',
    category: "getting-started",
  },
  {
    title: "Quick Start",
    url: "https://runable.netlify.app/docs/getting-started/quickstart",
    section:
      "Create a Runable application with two pages, a layout, an API route, and server-rendered data.",
    excerpt:
      'Build a small application that combines automatic routing, a shared layout, and SSR data loading. This page starts from the Express project created in <a href="/docs/getting-started/installation.md">Installation</a>.',
    content:
      'Build a small application that combines automatic routing, a shared layout, and SSR data loading.\n\nThis page starts from the Express project created in <a href="/docs/getting-started/installation.md">Installation</a>.',
    category: "getting-started",
  },
  {
    title: "Quick Start",
    url: "https://runable.netlify.app/docs/getting-started/quickstart",
    section: "Add an API route",
    excerpt:
      'Replace `server.ts` with this example: ```ts // server.ts import Express from "express"; import { express } from "runable/adapters/express"; const server = Express(); server.get("/api/projects", (_req, res) => { res.json…',
    content:
      'Replace `server.ts` with this example:\n\n```ts\n// server.ts\nimport Express from "express";\nimport { express } from "runable/adapters/express";\n\nconst server = Express();\n\nserver.get("/api/projects", (_req, res) => {\n  res.json([\n    { id: 1, name: "Documentation" },\n    { id: 2, name: "Dashboard" },\n  ]);\n});\n\nserver.use(express());\n\nserver.listen(3000, () => {\n  console.log("http://localhost:3000");\n});\n```\n\nYour API remains a regular Express route. Runable does not move it into the frontend.',
    category: "getting-started",
  },
  {
    title: "Quick Start",
    url: "https://runable.netlify.app/docs/getting-started/quickstart",
    section: "Create a layout",
    excerpt:
      '```vue <!-- app/layouts/default.vue --> <template> <div> <header> <strong>My application</strong> <nav> <RouterLink to="/">Home</RouterLink> <RouterLink to="/projects">Projects</RouterLink> </nav> </header> <main> <slot…',
    content:
      '```vue\n<!-- app/layouts/default.vue -->\n<template>\n  <div>\n    <header>\n      <strong>My application</strong>\n\n      <nav>\n        <RouterLink to="/">Home</RouterLink>\n        <RouterLink to="/projects">Projects</RouterLink>\n      </nav>\n    </header>\n\n    <main>\n      <slot />\n    </main>\n  </div>\n</template>\n```\n\nThe `default.vue` layout wraps pages that do not explicitly request another layout.',
    category: "getting-started",
  },
  {
    title: "Quick Start",
    url: "https://runable.netlify.app/docs/getting-started/quickstart",
    section: "Create the home page",
    excerpt:
      "```vue <!-- app/pages/index.vue --> <template> <section> <h1>Welcome</h1> <p>The Express backend and Vue application live in the same project.</p> </section> </template> ``` `app/pages/index.vue` automatically maps to `/…",
    content:
      "```vue\n<!-- app/pages/index.vue -->\n<template>\n  <section>\n    <h1>Welcome</h1>\n    <p>The Express backend and Vue application live in the same project.</p>\n  </section>\n</template>\n```\n\n`app/pages/index.vue` automatically maps to `/`.",
    category: "getting-started",
  },
  {
    title: "Quick Start",
    url: "https://runable.netlify.app/docs/getting-started/quickstart",
    section: "Load data",
    excerpt:
      'Create a second page: ```vue <!-- app/pages/projects.vue --> <script setup lang="ts"> type Project = { id: number; name: string; }; const { data: projects, pending, error, refresh } = await useAsyncData( "projects", asyn…',
    content:
      'Create a second page:\n\n```vue\n<!-- app/pages/projects.vue -->\n<script setup lang="ts">\ntype Project = {\n  id: number;\n  name: string;\n};\n\nconst { data: projects, pending, error, refresh } = await useAsyncData(\n  "projects",\n  async (signal) => {\n    const response = await fetch("http://localhost:3000/api/projects", {\n      signal,\n    });\n\n    if (!response.ok) {\n      throw new Error("Unable to load projects");\n    }\n\n    return response.json() as Promise<Project[]>;\n  },\n);\n</script>\n\n<template>\n  <section>\n    <h1>Projects</h1>\n\n    <p v-if="pending">Loading…</p>\n    <p v-else-if="error">{{ error.message }}</p>\n\n    <ul v-else>\n      <li v-for="project in projects" :key="project.id">\n        {{ project.name }}\n      </li>\n    </ul>\n\n    <button type="button" @click="refresh">Refresh</button>\n  </section>\n</template>\n```\n\n`useAsyncData()` runs the fetch during server rendering. Runable embeds the result in the HTML and restores the cache on the client, so the browser does not immediately repeat the request during hydration.\n\n::u-tip\n---\nvariant: info\ntitle: One stable key per resource\n---\n\nThe `projects` key identifies the cache entry and deduplicates simultaneous calls. Use a different key when request parameters change.\n\n::',
    category: "getting-started",
  },
  {
    title: "Quick Start",
    url: "https://runable.netlify.app/docs/getting-started/quickstart",
    section: "Observe automatic routing",
    excerpt:
      "Your directory now contains two routes: ```text app/pages/ ├── index.vue → / └── projects.vue → /projects ``` Add a file to `app/pages/` to create a route. There is no route table to maintain.",
    content:
      "Your directory now contains two routes:\n\n```text\napp/pages/\n├── index.vue       → /\n└── projects.vue    → /projects\n```\n\nAdd a file to `app/pages/` to create a route. There is no route table to maintain.",
    category: "getting-started",
  },
  {
    title: "Quick Start",
    url: "https://runable.netlify.app/docs/getting-started/quickstart",
    section: "What you just used",
    excerpt:
      "| Need | Runable solution | | --- | --- | | Display several screens | Routing based on `app/pages/` | | Share navigation | `default.vue` layout | | Keep application routes | `/api/projects` route in Express | | Preload d…",
    content:
      '| Need | Runable solution |\n| --- | --- |\n| Display several screens | Routing based on `app/pages/` |\n| Share navigation | `default.vue` layout |\n| Keep application routes | `/api/projects` route in Express |\n| Preload data during SSR | `useAsyncData()` |\n| Avoid a second fetch on mount | Cache serialization and hydration |\n\n::u-tip\n---\nvariant: info\ntitle: Next step\n---\n\nCompare this model with Nuxt in <a href="/docs/getting-started/vs-nuxt.md">Runable vs Nuxt</a>.\n\n::',
    category: "getting-started",
  },
  {
    title: "Runable vs Nuxt",
    url: "https://runable.netlify.app/docs/getting-started/vs-nuxt",
    section:
      "Compare Runable and Nuxt by server runtime, backend integration, Vue conventions, and ecosystem maturity.",
    excerpt:
      "Runable and Nuxt both provide a structured Vue experience. Their main difference is who owns the server.",
    content:
      "Runable and Nuxt both provide a structured Vue experience. Their main difference is who owns the server.",
    category: "getting-started",
  },
  {
    title: "Runable vs Nuxt",
    url: "https://runable.netlify.app/docs/getting-started/vs-nuxt",
    section: "The difference in one sentence",
    excerpt:
      "Nuxt provides a complete application around Nitro. Runable adds a Vue application to a backend that you choose and operate yourself. ```text Nuxt Runable ┌──────────────────────┐ ┌────────────────────────────┐ │ Vue appl…",
    content:
      "Nuxt provides a complete application around Nitro. Runable adds a Vue application to a backend that you choose and operate yourself.\n\n```text\nNuxt                          Runable\n┌──────────────────────┐      ┌────────────────────────────┐\n│ Vue application      │      │ Your backend               │\n│ Nuxt                 │      │ Express, Fastify, Hono…    │\n│ Nitro                │      │ └─ Runable ─ Vue application │\n└──────────────────────┘      └────────────────────────────┘\n```",
    category: "getting-started",
  },
  {
    title: "Runable vs Nuxt",
    url: "https://runable.netlify.app/docs/getting-started/vs-nuxt",
    section: "Quick comparison",
    excerpt:
      "| Topic | Nuxt | Runable | | --- | --- | --- | | Server runtime | Nitro | Your HTTP server | | File-based pages | Yes | Yes | | Layouts | Yes | Yes | | Auto-imports | Yes | Yes | | Route middleware | Yes | Yes | | SSR an…",
    content:
      "| Topic | Nuxt | Runable |\n| --- | --- | --- |\n| Server runtime | Nitro | Your HTTP server |\n| File-based pages | Yes | Yes |\n| Layouts | Yes | Yes |\n| Auto-imports | Yes | Yes |\n| Route middleware | Yes | Yes |\n| SSR and hydration | Yes | Yes |\n| Data loading | `useAsyncData()` | `useAsyncData()` |\n| Modules and plugins | Nuxt ecosystem | Runable's own systems |\n| Documented deployments | Many Nitro presets | Depends on your backend |\n| Maturity | Established ecosystem | Alpha project |\n\nFeatures with the same name do not guarantee identical APIs. Always check the Runable reference before reusing Nuxt code.",
    category: "getting-started",
  },
  {
    title: "Runable vs Nuxt",
    url: "https://runable.netlify.app/docs/getting-started/vs-nuxt",
    section: "Choose Nuxt",
    excerpt:
      'Choose Nuxt when you want an integrated solution and Nitro fits your architecture. Nuxt is generally a better fit when: <div class="py-3 space-y-2"> <div class="flex flex-wrap items-center gap-2"><u-icon name="tabler:cir…',
    content:
      'Choose Nuxt when you want an integrated solution and Nitro fits your architecture.\n\nNuxt is generally a better fit when:\n\n<div class="py-3 space-y-2">\n  <div class="flex flex-wrap items-center gap-2"><u-icon name="tabler:circle-check-filled" class="size-5 text-success"></u-icon><span>you are starting a new project without runtime constraints;</span></div>\n  <div class="flex flex-wrap items-center gap-2"><u-icon name="tabler:circle-check-filled" class="size-5 text-success"></u-icon><span>you want a mature, extensive ecosystem;</span></div>\n  <div class="flex flex-wrap items-center gap-2"><u-icon name="tabler:circle-check-filled" class="size-5 text-success"></u-icon><span>you prefer integrated deployment presets;</span></div>\n  <div class="flex flex-wrap items-center gap-2"><u-icon name="tabler:circle-check-filled" class="size-5 text-success"></u-icon><span>your team already knows Nuxt conventions.</span></div>\n</div>',
    category: "getting-started",
  },
  {
    title: "Runable vs Nuxt",
    url: "https://runable.netlify.app/docs/getting-started/vs-nuxt",
    section: "Choose Runable",
    excerpt:
      'Choose Runable when the backend is a foundational decision that must not be replaced. Runable is generally a better fit when: <div class="py-3 space-y-2"> <div class="flex flex-wrap items-center gap-2"><u-icon name="tabl…',
    content:
      'Choose Runable when the backend is a foundational decision that must not be replaced.\n\nRunable is generally a better fit when:\n\n<div class="py-3 space-y-2">\n  <div class="flex flex-wrap items-center gap-2"><u-icon name="tabler:circle-check-filled" class="size-5 text-success"></u-icon><span>Express, Fastify, NestJS, AdonisJS, Koa, or Hono already hosts your application logic;</span></div>\n  <div class="flex flex-wrap items-center gap-2"><u-icon name="tabler:circle-check-filled" class="size-5 text-success"></u-icon><span>you must keep an IoC container, middleware stack, or specific server lifecycle;</span></div>\n  <div class="flex flex-wrap items-center gap-2"><u-icon name="tabler:circle-check-filled" class="size-5 text-success"></u-icon><span>you want to serve the API and interface from the same application;</span></div>\n  <div class="flex flex-wrap items-center gap-2"><u-icon name="tabler:circle-check-filled" class="size-5 text-success"></u-icon><span>your infrastructure directly depends on the selected runtime.</span></div>\n</div>',
    category: "getting-started",
  },
  {
    title: "Runable vs Nuxt",
    url: "https://runable.netlify.app/docs/getting-started/vs-nuxt",
    section: "What changes in server code",
    excerpt:
      'With Runable, you own the HTTP entry point: ```ts // server.ts import Express from "express"; import { express } from "runable/adapters/express"; const server = Express(); server.get("/api/users", usersController); serve…',
    content:
      'With Runable, you own the HTTP entry point:\n\n```ts\n// server.ts\nimport Express from "express";\nimport { express } from "runable/adapters/express";\n\nconst server = Express();\n\nserver.get("/api/users", usersController);\nserver.use(express());\n\nserver.listen(3000);\n```\n\nYou decide middleware order, API routes, observability, and server startup. The adapter initializes Runable and handles requests that reach it.',
    category: "getting-started",
  },
  {
    title: "Runable vs Nuxt",
    url: "https://runable.netlify.app/docs/getting-started/vs-nuxt",
    section: "What remains familiar",
    excerpt:
      "A Nuxt developer will recognize several conventions: | Nuxt | Runable | | --- | --- | | `pages/` | `app/pages/` | | `layouts/` | `app/layouts/` | | `components/` | `app/components/` | | `composables/` | `app/composables/…",
    content:
      "A Nuxt developer will recognize several conventions:\n\n| Nuxt | Runable |\n| --- | --- |\n| `pages/` | `app/pages/` |\n| `layouts/` | `app/layouts/` |\n| `components/` | `app/components/` |\n| `composables/` | `app/composables/` |\n| `plugins/` | `app/plugins/` |\n| `middleware/` | `app/middlewares/` |\n| `definePageMeta()` | `definePageMeta()` |\n| `useAsyncData()` | `useAsyncData()` |\n| `defineNuxtPlugin()` | `defineVuePlugin()` |\n| `defineNuxtModule()` | `defineModule()` |\n\n::u-tip\n---\nvariant: warning\ntitle: Not a drop-in replacement\n---\n\nRunable adopts useful conventions, not all of Nuxt. Nuxt modules, Nitro APIs, and Nitro deployment presets are not directly compatible.\n\n::",
    category: "getting-started",
  },
  {
    title: "Runable vs Nuxt",
    url: "https://runable.netlify.app/docs/getting-started/vs-nuxt",
    section: "Decide quickly",
    excerpt:
      "| Question | If the answer is yes | | --- | --- | | Does Nitro meet your server needs? | Evaluate Nuxt first | | Must an existing backend remain in control of the server? | Evaluate Runable | | Do you only need a lightwe…",
    content:
      '| Question | If the answer is yes |\n| --- | --- |\n| Does Nitro meet your server needs? | Evaluate Nuxt first |\n| Must an existing backend remain in control of the server? | Evaluate Runable |\n| Do you only need a lightweight SPA? | Vue and Vite may be enough |\n| Is production stability more important than runtime freedom? | Account for Runable\'s alpha status |\n\n::u-tip\n---\nvariant: info\ntitle: Next step\n---\n\nCustomize directories, SSR, and Vite in <a href="/docs/getting-started/configuration.md">Configuration</a>.\n\n::',
    category: "getting-started",
  },
  {
    title: "Why Runable?",
    url: "https://runable.netlify.app/docs/getting-started/why-runable",
    section:
      "Get a Nuxt-like experience in Vue while keeping the backend and HTTP server of your choice.",
    excerpt:
      "Runable brings full-stack framework conventions to Vue without imposing a specific server runtime.",
    content:
      "Runable brings full-stack framework conventions to Vue without imposing a specific server runtime.",
    category: "getting-started",
  },
  {
    title: "Why Runable?",
    url: "https://runable.netlify.app/docs/getting-started/why-runable",
    section: "The problem",
    excerpt:
      'Vue and Vite provide a simple, flexible foundation. As an application grows, you still have to select, integrate, and maintain several pieces: <div class="py-3 space-y-2"> <div class="flex flex-wrap items-center gap-2"><…',
    content:
      'Vue and Vite provide a simple, flexible foundation. As an application grows, you still have to select, integrate, and maintain several pieces:\n\n<div class="py-3 space-y-2">\n  <div class="flex flex-wrap items-center gap-2"><u-icon name="tabler:circle-1-filled" class="size-5 text-muted-foreground"></u-icon><span>a router and conventions for organizing pages;</span></div>\n  <div class="flex flex-wrap items-center gap-2"><u-icon name="tabler:circle-2-filled" class="size-5 text-muted-foreground"></u-icon><span>layouts, middleware, and auto-imports;</span></div>\n  <div class="flex flex-wrap items-center gap-2"><u-icon name="tabler:circle-3-filled" class="size-5 text-muted-foreground"></u-icon><span>server rendering, hydration, and data loading;</span></div>\n  <div class="flex flex-wrap items-center gap-2"><u-icon name="tabler:circle-4-filled" class="size-5 text-muted-foreground"></u-icon><span>a reusable plugin and module system.</span></div>\n</div>\n\nNuxt already provides this experience, but relies on Nitro for its server layer. That choice suits many projects, but not those that must keep Express, Fastify, NestJS, AdonisJS, Koa, Hono, or an internal HTTP server.\n\nWithout a middle ground, you usually choose between two architectures:\n\n| Choice | Advantage | Trade-off |\n| --- | --- | --- |\n| Vue and Vite alone | Complete server control | Conventions and features must be assembled manually |\n| Separate backend and Nuxt frontend | Complete Nuxt experience | Two applications to build, connect, and deploy |',
    category: "getting-started",
  },
  {
    title: "Why Runable?",
    url: "https://runable.netlify.app/docs/getting-started/why-runable",
    section: "What Runable changes",
    excerpt:
      "Runable places a Vue application layer inside your existing server. Your backend continues to handle HTTP, API routes, authentication, and application logic. Runable renders the interface. ```text HTTP request │ ▼ Your b…",
    content:
      'Runable places a Vue application layer inside your existing server. Your backend continues to handle HTTP, API routes, authentication, and application logic. Runable renders the interface.\n\n```text\nHTTP request\n    │\n    ▼\nYour backend ──────► API routes and application logic\n    │\n    └───────────────► Runable ──► Vue application\n```\n\nYour server forwards frontend requests to Runable:\n\n```ts\n// server.ts\nimport Express from "express";\nimport { express } from "runable/adapters/express";\n\nconst server = Express();\n\n// Your backend remains responsible for its API routes.\nserver.get("/api/health", (_req, res) => {\n  res.json({ status: "ok" });\n});\n\n// The adapter initializes Runable and renders other requests with Vue.\nserver.use(express());\n\nserver.listen(3000);\n```\n\n::u-tip\n---\nvariant: info\ntitle: An additive integration\n---\n\nYou do not need to rewrite your backend. Add Runable where your server should render the Vue application.\n\n::',
    category: "getting-started",
  },
  {
    title: "Why Runable?",
    url: "https://runable.netlify.app/docs/getting-started/why-runable",
    section: "What Runable provides",
    excerpt:
      "| Feature | Convention or API | | --- | --- | | File-system routing | `app/pages/` | | Layouts | `app/layouts/` | | Auto-imported components and composables | `app/components/` and `app/composables/` | | Navigation middl…",
    content:
      "| Feature | Convention or API |\n| --- | --- |\n| File-system routing | `app/pages/` |\n| Layouts | `app/layouts/` |\n| Auto-imported components and composables | `app/components/` and `app/composables/` |\n| Navigation middleware | `app/middlewares/` and `definePageMeta()` |\n| Data loading | `useAsyncData()` |\n| SSR and hydration | Server rendering and client cache restoration |\n| Application plugins | `defineVuePlugin()` |\n| Configurable modules | `defineModule()` |\n\nThis separation lets you choose a backend for its own capabilities without rebuilding the entire frontend developer experience.",
    category: "getting-started",
  },
  {
    title: "Why Runable?",
    url: "https://runable.netlify.app/docs/getting-started/why-runable",
    section: "When should you choose Runable?",
    excerpt:
      'Runable is a good fit when: <div class="py-3 space-y-2"> <div class="flex flex-wrap items-center gap-2"><u-icon name="tabler:circle-check-filled" class="size-5 text-success"></u-icon><span>you already have a <strong>prod…',
    content:
      'Runable is a good fit when:\n\n<div class="py-3 space-y-2">\n  <div class="flex flex-wrap items-center gap-2"><u-icon name="tabler:circle-check-filled" class="size-5 text-success"></u-icon><span>you already have a <strong>production backend</strong>;</span></div>\n  <div class="flex flex-wrap items-center gap-2"><u-icon name="tabler:circle-check-filled" class="size-5 text-success"></u-icon><span>your team relies on that backend\'s conventions, plugins, or tools;</span></div>\n  <div class="flex flex-wrap items-center gap-2"><u-icon name="tabler:circle-check-filled" class="size-5 text-success"></u-icon><span>you want SSR and Nuxt-like organization in the same application;</span></div>\n  <div class="flex flex-wrap items-center gap-2"><u-icon name="tabler:circle-check-filled" class="size-5 text-success"></u-icon><span>you need control over the server lifecycle and deployment.</span></div>\n</div>\n\nAnother choice may be simpler in these cases:\n\n| Need | Consider |\n| --- | --- |\n| An integrated solution with its own server runtime | Nuxt |\n| A lightweight SPA without SSR or extra conventions | Vue and Vite |\n| A frontend completely independent from the backend | Two separate applications |\n\n::u-tip\n---\nvariant: warning\ntitle: Alpha project\n---\n\nRunable is currently in alpha. Check the availability of features your application depends on before using it in production.\n\n::',
    category: "getting-started",
  },
  {
    title: "Why Runable?",
    url: "https://runable.netlify.app/docs/getting-started/why-runable",
    section: "Key takeaway",
    excerpt:
      "Runable does not replace your backend. It adds a structured Vue application that can render on the server or client, with ready-to-use conventions. ::u-tip --- variant: info title: Next step --- Install the required depe…",
    content:
      'Runable does not replace your backend. It adds a structured Vue application that can render on the server or client, with ready-to-use conventions.\n\n::u-tip\n---\nvariant: info\ntitle: Next step\n---\n\nInstall the required dependencies in <a href="/docs/getting-started/installation.md">Installation</a>.\n\n::',
    category: "getting-started",
  },
  {
    title: "Auto-imports",
    url: "https://runable.netlify.app/docs/guide/auto-imports",
    section:
      "Automatically use application components, composables, and global functions.",
    excerpt:
      "Runable generates the required imports from three collections. Your files remain modular without repeating imports in every component.",
    content:
      "Runable generates the required imports from three collections. Your files remain modular without repeating imports in every component.",
    category: "guide",
  },
  {
    title: "Auto-imports",
    url: "https://runable.netlify.app/docs/guide/auto-imports",
    section: "Auto-imported components",
    excerpt:
      "Files in `app/components/` are available in templates: ```text app/components/base/Button.vue → <BaseButton /> app/components/UserCard.vue → <UserCard /> ``` The path contributes to the default name. A component can decl…",
    content:
      'Files in `app/components/` are available in templates:\n\n```text\napp/components/base/Button.vue → <BaseButton />\napp/components/UserCard.vue    → <UserCard />\n```\n\nThe path contributes to the default name. A component can declare its own name:\n\n```vue\n<script setup lang="ts">\ndefineOptions({ name: "PrimaryButton" });\n</script>\n```\n\nWith the Options API:\n\n```ts\nexport default defineComponent({\n  name: "PrimaryButton",\n});\n```\n\nThe explicit name takes precedence over the file name.',
    category: "guide",
  },
  {
    title: "Auto-imports",
    url: "https://runable.netlify.app/docs/guide/auto-imports",
    section: "Auto-imported composables",
    excerpt:
      'Every export from `app/composables/` can be used in Vue scripts: ```ts // app/composables/useCurrency.ts export function useCurrency() { return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", }); } `…',
    content:
      'Every export from `app/composables/` can be used in Vue scripts:\n\n```ts\n// app/composables/useCurrency.ts\nexport function useCurrency() {\n  return new Intl.NumberFormat("en-US", {\n    style: "currency",\n    currency: "USD",\n  });\n}\n```\n\n```vue\n<script setup lang="ts">\nconst currency = useCurrency();\n</script>\n```',
    category: "guide",
  },
  {
    title: "Auto-imports",
    url: "https://runable.netlify.app/docs/guide/auto-imports",
    section: "Auto-imported globals",
    excerpt:
      'Place functions that do not depend on the Vue lifecycle in `app/globals/`: ```ts // app/globals/formatDate.ts export function formatDate(value: string) { return new Intl.DateTimeFormat("en-US").format(new Date(value)); }…',
    content:
      'Place functions that do not depend on the Vue lifecycle in `app/globals/`:\n\n```ts\n// app/globals/formatDate.ts\nexport function formatDate(value: string) {\n  return new Intl.DateTimeFormat("en-US").format(new Date(value));\n}\n```',
    category: "guide",
  },
  {
    title: "Auto-imports",
    url: "https://runable.netlify.app/docs/guide/auto-imports",
    section: "Add other sources",
    excerpt:
      '```ts export default defineConfig({ components: ["app/components", { dirs: "app/components/ui", prefix: "Ui" }], composables: ["app/composables", "shared/composables"], globals: ["app/globals", "shared/utils"], }); ``` R…',
    content:
      '```ts\nexport default defineConfig({\n  components: ["app/components", { dirs: "app/components/ui", prefix: "Ui" }],\n  composables: ["app/composables", "shared/composables"],\n  globals: ["app/globals", "shared/utils"],\n});\n```\n\nRunable generates TypeScript declarations in `.app`. Extend `.app/tsconfig.app.json` from your TypeScript configuration so the editor knows these symbols.\n\n::u-tip\n---\nvariant: warning\ntitle: Keep side effects in plugins\n---\n\nAn auto-imported file should primarily export values. Use a plugin when code must run during application startup.\n\n::',
    category: "guide",
  },
  {
    title: "runable build",
    url: "https://runable.netlify.app/docs/guide/cli/build",
    section:
      "Produce the production client and server bundles Runable serves from .output/.",
    excerpt:
      '```bash runable build ``` `runable build` produces the production bundle: always the client (HTML template and hashed assets), and a server bundle too when <a href="/docs/getting-started/configuration.md">`ssr`</a> is en…',
    content:
      '```bash\nrunable build\n```\n\n`runable build` produces the production bundle: always the client (HTML template and hashed assets), and a server bundle too when <a href="/docs/getting-started/configuration.md">`ssr`</a> is enabled. Output goes to `distdir` — `.output/` by default — alongside a `manifest.js` connecting the running server to the built client and, for SSR, the compiled server entry.\n\nFor the full output layout, how to start a built application, and a deployment checklist, see <a href="/docs/guide/production-build.md">Production build</a> and <a href="/docs/structure/output.md">`.output/`</a> — this page only covers the command itself.\n\nA generated `package.json` from <a href="/docs/guide/cli/create.md">`runable create`</a> wires this up as the `app:build` script.\n\n::u-tip\n---\nvariant: warning\ntitle: .output/ is generated\n---\n\nNever edit files inside `.output/` directly — they\'re overwritten on the next build. Change the application source or `runable.config.ts`, then rebuild.\n\n::',
    category: "guide",
  },
  {
    title: "runable create",
    url: "https://runable.netlify.app/docs/guide/cli/create",
    section:
      "Scaffold a new Runable project, add Runable to an existing backend, or create a Runable module.",
    excerpt:
      "`runable create` is interactive. It asks what you want to create, then a series of questions specific to that choice. ```bash runable create ```",
    content:
      "`runable create` is interactive. It asks what you want to create, then a series of questions specific to that choice.\n\n```bash\nrunable create\n```",
    category: "guide",
  },
  {
    title: "runable create",
    url: "https://runable.netlify.app/docs/guide/cli/create",
    section: "What to create",
    excerpt:
      "The first prompt offers three modes: - **Add to an existing project** — wires Runable into a backend project you already have. - **Start with a starter** — scaffolds a new project from a full starter template. - **Create…",
    content:
      'The first prompt offers three modes:\n\n- **Add to an existing project** — wires Runable into a backend project you already have.\n- **Start with a starter** — scaffolds a new project from a full starter template.\n- **Create a Runable module** — scaffolds a reusable, publishable Runable module (see <a href="/docs/guide/modules.md">Modules</a>).\n\n::u-tip\n---\nvariant: warning\ntitle: Starter templates\n---\n\nThe starter option is present in the menu, but no starter templates are currently bundled with the CLI. Use "Add to an existing project" if you\'re starting fresh with one of the supported backends.\n\n::',
    category: "guide",
  },
  {
    title: "runable create",
    url: "https://runable.netlify.app/docs/guide/cli/create",
    section: "Add to an existing project",
    excerpt:
      'Prompts, in order: 1. **Backend framework** — Express, Fastify, NestJS, AdonisJS, Hono, Koa, or "Other" (you configure the adapter yourself). 2. **Directories** — `appDir` (default `app`), `outputDir` (default `.app`), `…',
    content:
      'Prompts, in order:\n\n1. **Backend framework** — Express, Fastify, NestJS, AdonisJS, Hono, Koa, or "Other" (you configure the adapter yourself).\n2. **Directories** — `appDir` (default `app`), `outputDir` (default `.app`), `distDir` (default `.output`), `publicDir` (default `public`). Press enter to accept the default.\n3. **Server entry file** — offered only when a template exists for the selected framework (currently Express only). Declining, or picking another framework, skips this step; wire the adapter into your existing entry point manually — see <a href="/docs/integrations/index.md">Integrations</a> for your backend.\n4. **Package manager** — auto-detected from a lockfile in the current directory when possible.\n5. **Install dependencies now?**\n\nThis mode then:\n\n- copies the default Vue application into `appDir` (see <a href="/docs/structure/app.md">app/</a>);\n- creates `AGENTS.md` at the project root;\n- generates `runable.config.ts` with the chosen directories (see <a href="/docs/structure/runable-config.md">runable.config.ts</a>);\n- adds `runable`, `vue`, and `vue-router` to `dependencies`, and `@runablejs/cli` plus `app:build`/`app:prepare` scripts, into an existing `package.json` — without touching anything already declared there (see <a href="/docs/structure/package-json.md">package.json</a>);\n- copies the server entry file, if requested;\n- installs dependencies, if requested.\n\nAny file that already exists (an app directory, `server.ts`, `AGENTS.md`, `runable.config.ts`) triggers an overwrite confirmation instead of being silently replaced.',
    category: "guide",
  },
  {
    title: "runable create",
    url: "https://runable.netlify.app/docs/guide/cli/create",
    section: "Create a Runable module",
    excerpt:
      "Prompts for a module name and a `configKey` (the key consumers use to configure the module in their own `runable.config.ts`), then the same directory/package-manager/install prompts as above. This mode creates a **new**…",
    content:
      'Prompts for a module name and a `configKey` (the key consumers use to configure the module in their own `runable.config.ts`), then the same directory/package-manager/install prompts as above.\n\nThis mode creates a **new** directory named after the module — it doesn\'t touch the current directory — containing the app template, a fresh `package.json` (with `exports`, `files: ["dist"]`, and `build`/`app:prepare` scripts), and a `runable.config.ts` built with `defineModule()` instead of `defineConfig()`.',
    category: "guide",
  },
  {
    title: "CLI",
    url: "https://runable.netlify.app/docs/guide/cli/index",
    section:
      "The runable command line — scaffold a project, regenerate framework internals, build for production, and install Agent Skills.",
    excerpt:
      "`@runablejs/cli` provides the `runable` command. It scaffolds a project, regenerates Runable's internal types and registries, produces a production build, and installs Agent Skills for AI coding agents.",
    content:
      "`@runablejs/cli` provides the `runable` command. It scaffolds a project, regenerates Runable's internal types and registries, produces a production build, and installs Agent Skills for AI coding agents.",
    category: "guide",
  },
  {
    title: "CLI",
    url: "https://runable.netlify.app/docs/guide/cli/index",
    section: "Commands",
    excerpt:
      '| Command | Purpose | | --- | --- | | <a href="/docs/guide/cli/create.md">`runable create`</a> | Scaffold a new Runable project, or add Runable to an existing backend | | <a href="/docs/guide/cli/prepare.md">`runable pre…',
    content:
      '| Command | Purpose |\n| --- | --- |\n| <a href="/docs/guide/cli/create.md">`runable create`</a> | Scaffold a new Runable project, or add Runable to an existing backend |\n| <a href="/docs/guide/cli/prepare.md">`runable prepare`</a> | Regenerate `.app/` — types, routes, and auto-import registries |\n| <a href="/docs/guide/cli/build.md">`runable build`</a> | Produce the production client (and server, when SSR is enabled) bundle |\n| <a href="/docs/guide/cli/skills.md">`runable skills install`</a> | Install Runable\'s Agent Skills for your AI coding agent |\n| <a href="/docs/guide/cli/skills.md">`runable skills list`</a> | List the Agent Skills bundled with the installed CLI version |',
    category: "guide",
  },
  {
    title: "CLI",
    url: "https://runable.netlify.app/docs/guide/cli/index",
    section: "What the CLI does not do",
    excerpt:
      "There is no `runable dev` command. Runable does not provide its own HTTP runtime — your backend (Express, Fastify, NestJS, AdonisJS, Hono, Koa, Bun, Deno, or a custom server) owns the development server, so the way you s…",
    content:
      "There is no `runable dev` command. Runable does not provide its own HTTP runtime — your backend (Express, Fastify, NestJS, AdonisJS, Hono, Koa, Bun, Deno, or a custom server) owns the development server, so the way you start development depends on your backend, not on Runable's CLI. A scaffolded project typically runs its own dev script (for example `tsx watch server.ts`) directly.\n\n::u-tip\n---\nvariant: warning\ntitle: Don't assume a Nuxt-like workflow\n---\n\nRunable's CLI intentionally has a small surface. It doesn't manage a dev server, a plugin ecosystem, or deployment targets the way some other frameworks' CLIs do — those responsibilities stay with your backend and your own tooling.\n\n::",
    category: "guide",
  },
  {
    title: "runable prepare",
    url: "https://runable.netlify.app/docs/guide/cli/prepare",
    section:
      "Regenerate .app/ — the types, routes, and auto-import registries Runable derives from your project.",
    excerpt:
      '```bash runable prepare ``` `runable prepare` reads `runable.config.ts` and your application\'s conventional directories, then regenerates <a href="/docs/structure/dot-app.md">`.app/`</a>: route declarations, layout and c…',
    content:
      '```bash\nrunable prepare\n```\n\n`runable prepare` reads `runable.config.ts` and your application\'s conventional directories, then regenerates <a href="/docs/structure/dot-app.md">`.app/`</a>: route declarations, layout and component registries, auto-import types, and runtime configuration types.',
    category: "guide",
  },
  {
    title: "runable prepare",
    url: "https://runable.netlify.app/docs/guide/cli/prepare",
    section: "When to run it",
    excerpt:
      "- After cloning a project, or right after `runable create`, before the editor or a typecheck needs `.app/` to exist. - After adding, removing, or renaming a page, layout, component, composable, global, middleware, or plu…",
    content:
      '- After cloning a project, or right after `runable create`, before the editor or a typecheck needs `.app/` to exist.\n- After adding, removing, or renaming a page, layout, component, composable, global, middleware, or plugin — the dev server keeps `.app/` up to date automatically while it\'s running, but a one-off `prepare` is needed otherwise (for example in CI, before `tsc`).\n- After changing `runable.config.ts`.\n\nA generated `package.json` from <a href="/docs/guide/cli/create.md">`runable create`</a> wires this up as the `app:prepare` script.\n\n::u-tip\n---\nvariant: warning\ntitle: .app/ is generated\n---\n\nNever edit files inside `.app/` directly — the next `prepare` (or the dev server) overwrites them. Fix the source file or `runable.config.ts` instead, then regenerate.\n\n::',
    category: "guide",
  },
  {
    title: "AI Skills",
    url: "https://runable.netlify.app/docs/guide/cli/skills",
    section:
      "Install Runable's Agent Skills — procedural instructions that teach compatible AI coding agents how to work with a Runable project.",
    excerpt:
      "Runable ships a collection of [Agent Skills](https://agentskills.io) — an open, portable format compatible AI coding agents load on demand. Documentation explains Runable; Agent Skills give a coding agent step-by-step in…",
    content:
      "Runable ships a collection of [Agent Skills](https://agentskills.io) — an open, portable format compatible AI coding agents load on demand. Documentation explains Runable; Agent Skills give a coding agent step-by-step instructions for working safely with a Runable project: where conventions live, which APIs actually exist, and what mistakes to avoid.\n\nAn agent loads only the Skill relevant to the current task instead of every Runable convention at once — working on routes loads routing/layout knowledge, connecting a backend loads adapter knowledge, and so on.",
    category: "guide",
  },
  {
    title: "AI Skills",
    url: "https://runable.netlify.app/docs/guide/cli/skills",
    section: "Bundled Skills",
    excerpt:
      "| Skill | Covers | | --- | --- | | `runable-project` | Understanding and safely modifying an existing Runable project | | `runable-pages` | Pages, routes, layouts, and navigation middleware | | `runable-data-fetching` |…",
    content:
      "| Skill | Covers |\n| --- | --- |\n| `runable-project` | Understanding and safely modifying an existing Runable project |\n| `runable-pages` | Pages, routes, layouts, and navigation middleware |\n| `runable-data-fetching` | Loading data with `useAsyncData`, SSR/CSR, and application errors |\n| `runable-configuration` | Runtime environment variables, styles, assets, and the production build |\n| `runable-extend` | Plugins, modules, and auto-imports |\n| `runable-head` | Page titles, meta tags, and structured data |\n| `runable-integrations` | Connecting Runable to a backend server |\n\nThese are the Skills bundled with the current CLI version — run `runable skills list` to see exactly what your installed version ships, since this set can grow over time.",
    category: "guide",
  },
  {
    title: "AI Skills",
    url: "https://runable.netlify.app/docs/guide/cli/skills",
    section: "Install",
    excerpt:
      "```bash runable skills install ``` Without arguments, this is interactive: it detects which AI coding agents are already in use in the project (from markers like `.claude/`, `.cursor/`, or `.github/copilot-instructions.m…",
    content:
      "```bash\nrunable skills install\n```\n\nWithout arguments, this is interactive: it detects which AI coding agents are already in use in the project (from markers like `.claude/`, `.cursor/`, or `.github/copilot-instructions.md`), pre-selects them in a multi-select prompt, and lets you adjust the selection before confirming.\n\n```text\nDetected AI coding agents:\n\n  Claude Code\n  Cursor\n\n? Install Runable Skills for:\n  ◉ Claude Code\n  ◉ Cursor\n  ◯ OpenAI Codex\n  ◯ GitHub Copilot\n  ◯ Gemini CLI\n  ◯ OpenCode\n  ◯ Cline\n  ◯ Other Agent Skills-compatible agent\n\nRunable Skills will be installed to:\n\n  .claude/skills/\n    Claude Code\n  .agents/skills/\n    Cursor\n\n? Continue?\n```",
    category: "guide",
  },
  {
    title: "AI Skills",
    url: "https://runable.netlify.app/docs/guide/cli/skills",
    section: "Supported agents and destinations",
    excerpt:
      "| Agent | Installation directory | | --- | --- | | OpenAI Codex | `.agents/skills/` | | Cursor | `.agents/skills/` | | GitHub Copilot | `.agents/skills/` | | Gemini CLI | `.agents/skills/` | | OpenCode | `.agents/skills/…",
    content:
      "| Agent | Installation directory |\n| --- | --- |\n| OpenAI Codex | `.agents/skills/` |\n| Cursor | `.agents/skills/` |\n| GitHub Copilot | `.agents/skills/` |\n| Gemini CLI | `.agents/skills/` |\n| OpenCode | `.agents/skills/` |\n| Other Agent Skills-compatible agent | `.agents/skills/` |\n| Claude Code | `.claude/skills/` |\n| Cline | `.cline/skills/` |\n\nSeveral agents share `.agents/skills/` — selecting Cursor, Codex, and Gemini CLI, for example, does not create three copies. They install once into that shared directory. Claude Code and Cline each get their own destination: neither reads `.agents/skills/`.",
    category: "guide",
  },
  {
    title: "AI Skills",
    url: "https://runable.netlify.app/docs/guide/cli/skills",
    section: "Non-interactive use",
    excerpt:
      "```bash runable skills install --target agents runable skills install --target claude runable skills install --target agents,claude runable skills install --target all ``` `--target` accepts a comma-separated list of des…",
    content:
      "```bash\nrunable skills install --target agents\nrunable skills install --target claude\nrunable skills install --target agents,claude\nrunable skills install --target all\n```\n\n`--target` accepts a comma-separated list of destinations — `agents`, `claude`, `cline` — or `all` for every destination. Passing it skips the interactive prompt entirely, so it's safe to run in a script or CI.",
    category: "guide",
  },
  {
    title: "AI Skills",
    url: "https://runable.netlify.app/docs/guide/cli/skills",
    section: "Existing Skills",
    excerpt:
      "| Situation | Result | | --- | --- | | Not installed yet | Installed | | Installed, identical to the bundled version | Left as-is, reported as up to date | | Installed, but different from the bundled version | Interactiv…",
    content:
      "| Situation | Result |\n| --- | --- |\n| Not installed yet | Installed |\n| Installed, identical to the bundled version | Left as-is, reported as up to date |\n| Installed, but different from the bundled version | Interactive: asks before overwriting. Non-interactive: skipped, with a warning |\n| Installed, different, with `--force` | Overwritten without asking |\n\n```bash\nrunable skills install --force\n```\n\n`--force` replaces an existing **Runable** Skill that differs from the bundled version, without asking — it never touches anything else. A hand-written Skill in the same directory (`.agents/skills/company-conventions/`, for example) is never installed, overwritten, or removed by Runable, with or without `--force`.\n\nInstalled Skills are regular project files — Runable never adds them to `.gitignore`. Commit them so the whole team's AI coding agents follow the same instructions.",
    category: "guide",
  },
  {
    title: "AI Skills",
    url: "https://runable.netlify.app/docs/guide/cli/skills",
    section: "Works offline, matches your installed version",
    excerpt:
      "Skills are distributed with the `@runablejs/cli` package itself, not downloaded from GitHub or the Runable website at install time. `runable skills install` works without network access, installs deterministically, and a…",
    content:
      "Skills are distributed with the `@runablejs/cli` package itself, not downloaded from GitHub or the Runable website at install time. `runable skills install` works without network access, installs deterministically, and always installs the Skills that ship with the CLI version you actually have installed — never a version mismatched with your toolchain.",
    category: "guide",
  },
  {
    title: "AI Skills",
    url: "https://runable.netlify.app/docs/guide/cli/skills",
    section: "List",
    excerpt:
      "```bash runable skills list runable skills list --json ``` Prints every Skill bundled with the installed CLI version, with its name and description read directly from each Skill's own frontmatter. `--json` prints the sam…",
    content:
      '```bash\nrunable skills list\nrunable skills list --json\n```\n\nPrints every Skill bundled with the installed CLI version, with its name and description read directly from each Skill\'s own frontmatter. `--json` prints the same data as a JSON array (`[{ "name": ..., "description": ... }]`) for scripting.',
    category: "guide",
  },
  {
    title: "CSS and assets",
    url: "https://runable.netlify.app/docs/guide/css-and-assets",
    section: "Load global styles and serve the application's static files.",
    excerpt:
      "Runable distinguishes files transformed by Vite from files served as-is.",
    content:
      "Runable distinguishes files transformed by Vite from files served as-is.",
    category: "guide",
  },
  {
    title: "CSS and assets",
    url: "https://runable.netlify.app/docs/guide/css-and-assets",
    section: "Load global styles",
    excerpt:
      'Declare them in `runable.config.ts`: ```ts export default defineConfig({ css: [ "app/css/reset.css", "app/css/main.css", ], }); ``` Runable combines project and module styles, removes duplicates, and imports them into th…',
    content:
      'Declare them in `runable.config.ts`:\n\n```ts\nexport default defineConfig({\n  css: [\n    "app/css/reset.css",\n    "app/css/main.css",\n  ],\n});\n```\n\nRunable combines project and module styles, removes duplicates, and imports them into the client entry. Vite processes imports, URLs, and installed preprocessors.\n\nYou can also scan a directory:\n\n```ts\nexport default defineConfig({\n  css: [{ dirs: "app/css" }],\n});\n```',
    category: "guide",
  },
  {
    title: "CSS and assets",
    url: "https://runable.netlify.app/docs/guide/css-and-assets",
    section: "Keep styles local",
    excerpt:
      "Component-specific styles remain in the Vue file: ```vue <style scoped> .card { border: 1px solid #ddd; } </style> ``` Add only globally loaded stylesheets to `css`.",
    content:
      "Component-specific styles remain in the Vue file:\n\n```vue\n<style scoped>\n.card {\n  border: 1px solid #ddd;\n}\n</style>\n```\n\nAdd only globally loaded stylesheets to `css`.",
    category: "guide",
  },
  {
    title: "CSS and assets",
    url: "https://runable.netlify.app/docs/guide/css-and-assets",
    section: "Serve a public file",
    excerpt:
      'Put untransformed files in `public/`: ```text public/ ├── favicon.svg └── images/logo.png ``` Reference them from the root: ```vue <img src="/images/logo.png" alt="Acme" /> ``` To import an asset and let Vite version it,…',
    content:
      'Put untransformed files in `public/`:\n\n```text\npublic/\n├── favicon.svg\n└── images/logo.png\n```\n\nReference them from the root:\n\n```vue\n<img src="/images/logo.png" alt="Acme" />\n```\n\nTo import an asset and let Vite version it, keep it in source code:\n\n```vue\n<script setup lang="ts">\nimport logoUrl from "../assets/logo.svg";\n</script>\n\n<template><img :src="logoUrl" alt="Acme" /></template>\n```',
    category: "guide",
  },
  {
    title: "CSS and assets",
    url: "https://runable.netlify.app/docs/guide/css-and-assets",
    section: "Change the public directory",
    excerpt:
      '```ts export default defineConfig({ publicDir: "static", }); ``` Use `publicDir: false` to disable it. ::u-tip --- variant: info title: Public file or import? --- Use `public/` to keep a stable name such as `robots.txt`.…',
    content:
      '```ts\nexport default defineConfig({\n  publicDir: "static",\n});\n```\n\nUse `publicDir: false` to disable it.\n\n::u-tip\n---\nvariant: info\ntitle: Public file or import?\n---\n\nUse `public/` to keep a stable name such as `robots.txt`. Use an import to let Vite create a versioned name and optimize the reference.\n\n::',
    category: "guide",
  },
  {
    title: "Data Fetching",
    url: "https://runable.netlify.app/docs/guide/data-fetching",
    section:
      "Load data with caching, deduplication, cancellation, and SSR hydration.",
    excerpt:
      "Use `useAsyncData()` to load a resource required to render a page. Runable waits during SSR, serializes the cache into the HTML, then restores it before hydration.",
    content:
      "Use `useAsyncData()` to load a resource required to render a page. Runable waits during SSR, serializes the cache into the HTML, then restores it before hydration.",
    category: "guide",
  },
  {
    title: "Data Fetching",
    url: "https://runable.netlify.app/docs/guide/data-fetching",
    section: "Load a resource",
    excerpt:
      '```vue <script setup lang="ts"> type Project = { id: number; name: string }; const { data: projects, pending, error, refresh } = await useAsyncData( "projects", async (signal) => { return $fetch<Project[]>("/api/projects…',
    content:
      '```vue\n<script setup lang="ts">\ntype Project = { id: number; name: string };\n\nconst { data: projects, pending, error, refresh } = await useAsyncData(\n  "projects",\n  async (signal) => {\n    return $fetch<Project[]>("/api/projects", { signal });\n  },\n);\n</script>\n\n<template>\n  <p v-if="pending">Loading…</p>\n  <p v-else-if="error">{{ error.message }}</p>\n  <ul v-else>\n    <li v-for="project in projects" :key="project.id">{{ project.name }}</li>\n  </ul>\n  <button type="button" @click="refresh">Refresh</button>\n</template>\n```',
    category: "guide",
  },
  {
    title: "Data Fetching",
    url: "https://runable.netlify.app/docs/guide/data-fetching",
    section: "Choose a stable key",
    excerpt:
      "The key identifies the cache entry and deduplicates simultaneous requests. Include parameters that change the result: ```ts const route = useRoute(); const id = computed(() => String(route.params.id)); const project = aw…",
    content:
      "The key identifies the cache entry and deduplicates simultaneous requests. Include parameters that change the result:\n\n```ts\nconst route = useRoute();\nconst id = computed(() => String(route.params.id));\n\nconst project = await useAsyncData(\n  `project:${id.value}`,\n  (signal) => $fetch(`/api/projects/${id.value}`, { signal }),\n  { watch: [id] },\n);\n```",
    category: "guide",
  },
  {
    title: "Data Fetching",
    url: "https://runable.netlify.app/docs/guide/data-fetching",
    section: "Adjust execution",
    excerpt:
      '```ts const result = await useAsyncData("stats", loadStats, { server: true, lazy: false, immediate: true, ttl: 60_000, default: () => [], transform: (items) => items.slice(0, 10), }); ``` | Option | Use it to | | --- | -…',
    content:
      '```ts\nconst result = await useAsyncData("stats", loadStats, {\n  server: true,\n  lazy: false,\n  immediate: true,\n  ttl: 60_000,\n  default: () => [],\n  transform: (items) => items.slice(0, 10),\n});\n```\n\n| Option | Use it to |\n| --- | --- |\n| `server: false` | Run the call only in the browser |\n| `lazy: true` | Avoid blocking SSR |\n| `immediate: false` | Trigger the call with `execute()` |\n| `ttl` | Set the cache duration |\n| `default` | Provide an initial value |\n| `transform` | Transform before caching |\n| `watch` | Reload after a reactive change |\n\n`refresh()` forces a new call. `execute()` uses the same execution engine.\n\n::u-tip\n---\nvariant: warning\ntitle: URLs during SSR\n---\n\nA relative URL is not always resolved as it is in the browser when the fetcher runs on the server. Use an origin from runtime configuration if your HTTP backend requires one.\n\n::',
    category: "guide",
  },
  {
    title: "Error handling",
    url: "https://runable.netlify.app/docs/guide/error-handling",
    section:
      "Capture Vue, Router, and browser errors in a consistent interface.",
    excerpt:
      "Runable installs error state isolated to each Vue application. It captures Vue rendering errors, Vue Router errors, global browser errors, and unhandled promise rejections.",
    content:
      "Runable installs error state isolated to each Vue application. It captures Vue rendering errors, Vue Router errors, global browser errors, and unhandled promise rejections.",
    category: "guide",
  },
  {
    title: "Error handling",
    url: "https://runable.netlify.app/docs/guide/error-handling",
    section: "Display an error manually",
    excerpt:
      '```vue <script setup lang="ts"> const { showError } = useAppError(); async function save() { try { await saveProject(); } catch (error) { showError(error, { code: "PROJECT_SAVE_FAILED", statusCode: 500, info: "Unable to…',
    content:
      '```vue\n<script setup lang="ts">\nconst { showError } = useAppError();\n\nasync function save() {\n  try {\n    await saveProject();\n  } catch (error) {\n    showError(error, {\n      code: "PROJECT_SAVE_FAILED",\n      statusCode: 500,\n      info: "Unable to save the project",\n    });\n  }\n}\n</script>\n```\n\nWhen the state contains an error, `RunableApp` replaces the current interface with the error screen.',
    category: "guide",
  },
  {
    title: "Error handling",
    url: "https://runable.netlify.app/docs/guide/error-handling",
    section: "Customize the screen",
    excerpt:
      'Create `app/error.vue`: ```vue <script setup lang="ts"> defineProps<{ error: { code: string; message: string } }>(); defineEmits<{ clear: [] }>(); </script> <template> <main> <p>{{ error.code }}</p> <h1>{{ error.message…',
    content:
      'Create `app/error.vue`:\n\n```vue\n<script setup lang="ts">\ndefineProps<{ error: { code: string; message: string } }>();\ndefineEmits<{ clear: [] }>();\n</script>\n\n<template>\n  <main>\n    <p>{{ error.code }}</p>\n    <h1>{{ error.message }}</h1>\n    <button type="button" @click="$emit(\'clear\')">Try again</button>\n  </main>\n</template>\n```\n\nThe `clear` event resets the error and restores the application.',
    category: "guide",
  },
  {
    title: "Error handling",
    url: "https://runable.netlify.app/docs/guide/error-handling",
    section: "Read and clear state",
    excerpt:
      "```ts const { error, showError, clearError } = useAppError(); console.log(error.value?.source); clearError(); ``` An error includes `code`, `statusCode`, `message`, `stack`, `source`, `info`, `url`, and `timestamp`.",
    content:
      "```ts\nconst { error, showError, clearError } = useAppError();\n\nconsole.log(error.value?.source);\nclearError();\n```\n\nAn error includes `code`, `statusCode`, `message`, `stack`, `source`, `info`, `url`, and `timestamp`.",
    category: "guide",
  },
  {
    title: "Error handling",
    url: "https://runable.netlify.app/docs/guide/error-handling",
    section: "Errors during SSR",
    excerpt:
      "If server rendering fails, Runable records the error and renders `app/error.vue` in a second pass. The exception therefore does not automatically produce an empty HTML page. ::u-tip --- variant: info title: API errors re…",
    content:
      "If server rendering fails, Runable records the error and renders `app/error.vue` in a second pass. The exception therefore does not automatically produce an empty HTML page.\n\n::u-tip\n---\nvariant: info\ntitle: API errors remain in the backend\n---\n\nExpress, Fastify, or Hono errors must be converted into HTTP responses by those frameworks. This system concerns the Vue application.\n\n::",
    category: "guide",
  },
  {
    title: "Head and SEO",
    url: "https://runable.netlify.app/docs/guide/head-and-seo",
    section: "Define global and page-specific HTML metadata with Unhead.",
    excerpt:
      "Runable installs Unhead and its Schema.org integration. Metadata produced during SSR is injected into the document before it is sent.",
    content:
      "Runable installs Unhead and its Schema.org integration. Metadata produced during SSR is injected into the document before it is sent.",
    category: "guide",
  },
  {
    title: "Head and SEO",
    url: "https://runable.netlify.app/docs/guide/head-and-seo",
    section: "Define global values",
    excerpt:
      '```ts // runable.config.ts export default defineConfig({ siteUrl: "https://example.com", head: { titleTemplate: "%s · Acme", meta: [{ name: "description", content: "Manage your projects with Acme." }], link: [{ rel: "ico…',
    content:
      '```ts\n// runable.config.ts\nexport default defineConfig({\n  siteUrl: "https://example.com",\n  head: {\n    titleTemplate: "%s · Acme",\n    meta: [{ name: "description", content: "Manage your projects with Acme." }],\n    link: [{ rel: "icon", href: "/favicon.svg" }],\n  },\n});\n```\n\n`siteUrl` provides the origin Schema.org uses to build absolute URLs.',
    category: "guide",
  },
  {
    title: "Head and SEO",
    url: "https://runable.netlify.app/docs/guide/head-and-seo",
    section: "Configure a page",
    excerpt:
      '```vue <script setup lang="ts"> const project = ref({ name: "Runable", summary: "A Vue application with your backend." }); useSeoMeta({ title: () => project.value.name, description: () => project.value.summary, ogTitle:…',
    content:
      '```vue\n<script setup lang="ts">\nconst project = ref({ name: "Runable", summary: "A Vue application with your backend." });\n\nuseSeoMeta({\n  title: () => project.value.name,\n  description: () => project.value.summary,\n  ogTitle: () => project.value.name,\n  ogDescription: () => project.value.summary,\n});\n</script>\n```\n\nGetters keep metadata synchronized with reactive values.',
    category: "guide",
  },
  {
    title: "Head and SEO",
    url: "https://runable.netlify.app/docs/guide/head-and-seo",
    section: "Add arbitrary elements",
    excerpt:
      '```ts useHead({ htmlAttrs: { lang: "en" }, link: [{ rel: "canonical", href: "https://example.com/projects" }], }); ``` Use `useHeadSafe()` when values come from an untrusted source. `injectHead()` gives advanced integrat…',
    content:
      '```ts\nuseHead({\n  htmlAttrs: { lang: "en" },\n  link: [{ rel: "canonical", href: "https://example.com/projects" }],\n});\n```\n\nUse `useHeadSafe()` when values come from an untrusted source. `injectHead()` gives advanced integrations direct access to the Unhead instance.',
    category: "guide",
  },
  {
    title: "Head and SEO",
    url: "https://runable.netlify.app/docs/guide/head-and-seo",
    section: "Declare structured data",
    excerpt:
      '```ts import { defineWebPage } from "@unhead/schema-org"; useSchemaOrg([ defineWebPage({ name: "Projects", description: "List of public projects", }), ]); ``` `useSchemaOrg()` is auto-imported. Explicitly import the Sche…',
    content:
      '```ts\nimport { defineWebPage } from "@unhead/schema-org";\n\nuseSchemaOrg([\n  defineWebPage({\n    name: "Projects",\n    description: "List of public projects",\n  }),\n]);\n```\n\n`useSchemaOrg()` is auto-imported. Explicitly import the Schema.org node helpers your page needs when your configuration does not expose them.\n\n::u-tip\n---\nvariant: info\ntitle: One global source, local overrides\n---\n\nPut shared values in `head` and declare only route- or content-specific data in pages.\n\n::',
    category: "guide",
  },
  {
    title: "Guide",
    url: "https://runable.netlify.app/docs/guide/index",
    section: "Build, render, extend, and ship a Runable application.",
    excerpt:
      "This guide explains how to use Runable in a real application. Each page starts from a concrete need and shows the code to write.",
    content:
      "This guide explains how to use Runable in a real application. Each page starts from a concrete need and shows the code to write.",
    category: "guide",
  },
  {
    title: "Guide",
    url: "https://runable.netlify.app/docs/guide/index",
    section: "Build the interface",
    excerpt:
      'Start here to organize page navigation and display. | Need | Page | | --- | --- | | Turn Vue files into routes | <a href="/docs/guide/routing.md">Routing</a> | | Share a structure across pages | <a href="/docs/guide/layo…',
    content:
      'Start here to organize page navigation and display.\n\n| Need | Page |\n| --- | --- |\n| Turn Vue files into routes | <a href="/docs/guide/routing.md">Routing</a> |\n| Share a structure across pages | <a href="/docs/guide/layouts.md">Layouts</a> |\n| Control navigation | <a href="/docs/guide/middlewares.md">Middleware</a> |\n| Display and reset an error | <a href="/docs/guide/error-handling.md">Error handling</a> |',
    category: "guide",
  },
  {
    title: "Guide",
    url: "https://runable.netlify.app/docs/guide/index",
    section: "Load and render",
    excerpt:
      'These pages cover data, SSR, and HTML metadata. | Need | Page | | --- | --- | | Load data with caching and hydration | <a href="/docs/guide/data-fetching.md">Data Fetching</a> | | Choose between SSR and CSR | <a href="/d…',
    content:
      'These pages cover data, SSR, and HTML metadata.\n\n| Need | Page |\n| --- | --- |\n| Load data with caching and hydration | <a href="/docs/guide/data-fetching.md">Data Fetching</a> |\n| Choose between SSR and CSR | <a href="/docs/guide/rendering-modes.md">SSR and CSR</a> |\n| Define titles, SEO, and structured data | <a href="/docs/guide/head-and-seo.md">Head and SEO</a> |',
    category: "guide",
  },
  {
    title: "Guide",
    url: "https://runable.netlify.app/docs/guide/index",
    section: "Extend Runable",
    excerpt:
      'Use auto-imports for application code, plugins to initialize Vue, and modules to distribute a complete set of conventions. | Scope | Solution | | --- | --- | | A reusable function or component | <a href="/docs/guide/auto…',
    content:
      'Use auto-imports for application code, plugins to initialize Vue, and modules to distribute a complete set of conventions.\n\n| Scope | Solution |\n| --- | --- |\n| A reusable function or component | <a href="/docs/guide/auto-imports.md">Auto-imports</a> |\n| Initialization tied to the Vue application | <a href="/docs/guide/plugins.md">Plugins</a> |\n| A configurable, distributable feature | <a href="/docs/guide/modules.md">Modules</a> |',
    category: "guide",
  },
  {
    title: "Guide",
    url: "https://runable.netlify.app/docs/guide/index",
    section: "Configure and ship",
    excerpt:
      'Finish with <a href="/docs/guide/runtime-config.md">runtime configuration</a>, <a href="/docs/guide/css-and-assets.md">styles and assets</a>, then the <a href="/docs/guide/production-build.md">production build</a>. ::u-t…',
    content:
      'Finish with <a href="/docs/guide/runtime-config.md">runtime configuration</a>, <a href="/docs/guide/css-and-assets.md">styles and assets</a>, then the <a href="/docs/guide/production-build.md">production build</a>.\n\n::u-tip\n---\nvariant: info\ntitle: Guide or API reference?\n---\n\nUse the Guide to learn a complete workflow. Use the API section when you need the exact signature of a composable, component, or global.\n\n::',
    category: "guide",
  },
  {
    title: "Inspector",
    url: "https://runable.netlify.app/docs/guide/inspector",
    section:
      "Programmatically inspect how Runable resolves a project — routes, layouts, middleware, plugins, modules, and auto-imports.",
    excerpt:
      "`runable/inspector` is a read-only, public API that answers one question: **how does Runable currently interpret this project?** It reuses Runable's own resolution — the same conventions that turn `app/pages/users/[id].v…",
    content:
      "`runable/inspector` is a read-only, public API that answers one question: **how does Runable currently interpret this project?** It reuses Runable's own resolution — the same conventions that turn `app/pages/users/[id].vue` into a route, or a `composables/` directory into auto-imports — instead of a second, separate implementation of them.\n\nIt's meant as a building block for external tooling — a CLI diagnostic, an IDE extension, a DevTools panel, a test — anything that needs a structured, JSON-serializable view of a Runable project. It is not itself an MCP server, a DevTools UI, or an IDE extension; those can be built on top of it.",
    category: "guide",
  },
  {
    title: "Inspector",
    url: "https://runable.netlify.app/docs/guide/inspector",
    section: "Create an inspector",
    excerpt:
      '```ts import { createRunableInspector } from "runable/inspector"; const inspector = await createRunableInspector({ rootDir: process.cwd(), // optional, this is the default }); ``` `rootDir` must directly contain a `runab…',
    content:
      "```ts\nimport { createRunableInspector } from \"runable/inspector\";\n\nconst inspector = await createRunableInspector({\n  rootDir: process.cwd(), // optional, this is the default\n});\n```\n\n`rootDir` must directly contain a `runable.config.*` file — the Inspector does not search parent directories. Pointing it at a directory that isn't a Runable project rejects with a `RunableInspectorError` describing exactly what's missing.",
    category: "guide",
  },
  {
    title: "Inspector",
    url: "https://runable.netlify.app/docs/guide/inspector",
    section: "Read the project",
    excerpt:
      "Every method is async and returns a plain, `JSON.stringify()`-safe value — no Vue instances, no Vite/Rollup objects, no functions. ```ts const project = await inspector.getProject(); // { rootDir, runableVersion, ssr, pa…",
    content:
      'Every method is async and returns a plain, `JSON.stringify()`-safe value — no Vue instances, no Vite/Rollup objects, no functions.\n\n```ts\nconst project = await inspector.getProject();\n// { rootDir, runableVersion, ssr, paths: { appDir, generatedDir, outputDir, publicDir } }\n\nconst routes = await inspector.getRoutes();\n// [{ name: "users-id", path: "/users/:id", file: "app/pages/users/[id].vue", parent: "app/pages/users.vue" }, ...]\n\nconst layouts = await inspector.getLayouts();\nconst middlewares = await inspector.getMiddlewares();\nconst plugins = await inspector.getPlugins();\nconst modules = await inspector.getModules();\n\nconst { components, composables, globals } = await inspector.getAutoImports();\n// answers "does useCurrency() exist in this project?" or "what file is BaseButton?"\n```\n\nFile paths are relative to `rootDir` (a file outside it, e.g. a dependency package, stays absolute) — pair them with `project.rootDir` to get an absolute path back.',
    category: "guide",
  },
  {
    title: "Inspector",
    url: "https://runable.netlify.app/docs/guide/inspector",
    section: "Resolving a route",
    excerpt:
      'Given a path, `resolveRoute()` answers "which route matches this, and with what params?" — using Vue Router\'s own matcher against the routes `getRoutes()` would return, so dynamic (`:id`), optional (`:slug?`), catch-all…',
    content:
      'Given a path, `resolveRoute()` answers "which route matches this, and with what params?" — using Vue Router\'s own matcher against the routes `getRoutes()` would return, so dynamic (`:id`), optional (`:slug?`), catch-all (`:slug(.*)`), and nested routes all resolve exactly as a real navigation would.\n\n```ts\nconst match = await inspector.resolveRoute("/users/42");\n\nif (match) {\n  console.log(match.route.file); // "app/pages/users/[id].vue"\n  console.log(match.params); // { id: "42" }\n}\n```\n\n`path` must be absolute (start with `/`); anything else rejects with a `RunableInspectorError`. When nothing matches, `resolveRoute()` returns `null` — it never throws for that. A `?query` and `#hash` on `path` are parsed and returned (`match.query`, `match.hash`) but don\'t affect which route matches; matching itself only considers the path.\n\nLike every other getter, `resolveRoute()` reflects the state as of the last `refresh()` — it doesn\'t reach out to the filesystem on every call.',
    category: "guide",
  },
  {
    title: "Inspector",
    url: "https://runable.netlify.app/docs/guide/inspector",
    section: "Configuration and runtime privacy",
    excerpt:
      "`getConfig()` returns a stable, public subset of the resolved configuration — not Runable's full internal config object, which carries Vite plugins, functions, and other values that don't belong on a public boundary. Run…",
    content:
      '`getConfig()` returns a stable, public subset of the resolved configuration — not Runable\'s full internal config object, which carries Vite plugins, functions, and other values that don\'t belong on a public boundary.\n\nRuntime environment variables follow the same public/private split Runable itself uses everywhere else (`RUN_PUBLIC_*`/`VITE_PUBLIC_*` vs. everything else): public values are returned as-is, private ones are exposed **by key name only**, never their value.\n\n```ts\nconst config = await inspector.getConfig();\nconsole.log(config.runtime.public); // { apiBase: "/api" }\nconsole.log(config.runtime.privateKeys); // ["databaseUrl", "secretKey"]\n```',
    category: "guide",
  },
  {
    title: "Inspector",
    url: "https://runable.netlify.app/docs/guide/inspector",
    section: "Refreshing",
    excerpt:
      "An Inspector snapshots the project when it's created and caches each result the first time it's requested. If the project changes while it stays open (a page added, the config edited, a module changed), call `refresh()`…",
    content:
      "An Inspector snapshots the project when it's created and caches each result the first time it's requested. If the project changes while it stays open (a page added, the config edited, a module changed), call `refresh()` to re-resolve everything before reading again:\n\n```ts\nawait inspector.refresh();\nconst routes = await inspector.getRoutes(); // reflects the new state\n```\n\nThere's no background watcher — `refresh()` is explicit, so the Inspector stays cheap to create and doesn't hold a file watcher open for callers that only need a one-off snapshot (a CLI command, a test).",
    category: "guide",
  },
  {
    title: "Inspector",
    url: "https://runable.netlify.app/docs/guide/inspector",
    section: 'What "read-only" actually guarantees',
    excerpt:
      '"Read-only" describes what the Inspector **itself** does, not a sandbox around the project it inspects: - The Inspector itself does not generate or modify a Runable project/build file — not even `.app/`, which `runable p…',
    content:
      "\"Read-only\" describes what the Inspector **itself** does, not a sandbox around the project it inspects:\n\n- The Inspector itself does not generate or modify a Runable project/build file — not even `.app/`, which `runable prepare`/`build` do write to.\n- It does not mutate `process.cwd()`.\n- It does not touch the process-wide cache `loadConfig()`/`useConfig()`/`useAllConfigs()` use elsewhere in your process — a live dev server running alongside it is unaffected, in both directions.\n- Because of that, Inspector instances don't share Runable's resolved configuration state or caches, and don't interfere with each other through `process.cwd()`.\n\nNone of that means \"never executes project code\", and the Inspector is **not a sandbox**. Resolving a project's configuration executes every `runable.config.*` file in its module graph, including each module's `setup()` hook — this is unavoidable (loading a config file *is* running it; there's no static alternative) and, for `setup()` specifically, deliberate: a module's `setup()` is part of what Runable itself resolves a project's configuration with, so skipping it would make the Inspector answer a different question than \"how does Runable actually see this project\". `runable.config.*` is already trusted, project-owned code — resolving it isn't running something foreign.\n\nThat code runs in your Node.js process, though, so its side effects are real: `process.env` writes, filesystem writes, `globalThis` or third-party-singleton mutation from a module's `setup()` are all possible, and are outside the Inspector's isolation guarantee — two Inspectors running concurrently can still observe or race on each other's *project* code's side effects, even though neither can observe or disturb the other's Runable-owned state.\n\nWhat the Inspector never executes itself is a **page** or **plugin** file — those need a live Vue app/router to run meaningfully, so their metadata (`definePageMeta()`, a plugin's `name`/`enforce`/`dependsOn`) is read statically from source instead of imported.\n\n::u-tip\n---\nvariant: info\ntitle: What the Inspector deliberately does not do\n---\n\nIt never starts a Vite dev server, never rescans routes/layouts/plugins/modules from scratch outside of already-resolved config, and never executes a page or plugin file just to read its metadata. `resolveRoute()` matches against already-discovered routes; it doesn't change how those routes are discovered. Broader diagnostics and IDE/MCP integrations are intentionally left for tooling built on top of this API, not part of it.\n\n::",
    category: "guide",
  },
  {
    title: "Layouts",
    url: "https://runable.netlify.app/docs/guide/layouts",
    section:
      "Share an interface structure across pages without duplicating templates.",
    excerpt:
      "A layout wraps page content. Use it for primary navigation, a sidebar, or a structure specific to one application area.",
    content:
      "A layout wraps page content. Use it for primary navigation, a sidebar, or a structure specific to one application area.",
    category: "guide",
  },
  {
    title: "Layouts",
    url: "https://runable.netlify.app/docs/guide/layouts",
    section: "Create the default layout",
    excerpt:
      '```vue <!-- app/layouts/default.vue --> <template> <div class="shell"> <header>My application</header> <main><slot /></main> </div> </template> ``` Every page uses `default` unless it declares another layout.',
    content:
      '```vue\n<!-- app/layouts/default.vue -->\n<template>\n  <div class="shell">\n    <header>My application</header>\n    <main><slot /></main>\n  </div>\n</template>\n```\n\nEvery page uses `default` unless it declares another layout.',
    category: "guide",
  },
  {
    title: "Layouts",
    url: "https://runable.netlify.app/docs/guide/layouts",
    section: "Select a layout",
    excerpt:
      '```vue <!-- app/pages/admin/index.vue --> <script setup lang="ts"> definePageMeta({ layout: "admin" }); </script> <template> <h1>Administration</h1> </template> ``` Runable then looks for `app/layouts/admin.vue`.',
    content:
      '```vue\n<!-- app/pages/admin/index.vue -->\n<script setup lang="ts">\ndefinePageMeta({ layout: "admin" });\n</script>\n\n<template>\n  <h1>Administration</h1>\n</template>\n```\n\nRunable then looks for `app/layouts/admin.vue`.',
    category: "guide",
  },
  {
    title: "Layouts",
    url: "https://runable.netlify.app/docs/guide/layouts",
    section: "Pass properties",
    excerpt:
      'Declare an object to pass props to the layout: ```vue <script setup lang="ts"> definePageMeta({ layout: { name: "dashboard", props: { compact: true }, }, }); </script> ``` ```vue <!-- app/layouts/dashboard.vue --> <scrip…',
    content:
      'Declare an object to pass props to the layout:\n\n```vue\n<script setup lang="ts">\ndefinePageMeta({\n  layout: {\n    name: "dashboard",\n    props: { compact: true },\n  },\n});\n</script>\n```\n\n```vue\n<!-- app/layouts/dashboard.vue -->\n<script setup lang="ts">\ndefineProps<{ compact?: boolean }>();\n</script>\n\n<template>\n  <div :class="{ compact }"><slot /></div>\n</template>\n```',
    category: "guide",
  },
  {
    title: "Layouts",
    url: "https://runable.netlify.app/docs/guide/layouts",
    section: "Disable the layout",
    excerpt:
      "```ts definePageMeta({ layout: false }); ``` The page content is then rendered directly. ::u-tip --- variant: warning title: Layout not found --- If the name matches no loaded layout, Runable displays the page without a…",
    content:
      "```ts\ndefinePageMeta({ layout: false });\n```\n\nThe page content is then rendered directly.\n\n::u-tip\n---\nvariant: warning\ntitle: Layout not found\n---\n\nIf the name matches no loaded layout, Runable displays the page without a wrapper. Check the file name and `layout` value.\n\n::",
    category: "guide",
  },
  {
    title: "Middleware",
    url: "https://runable.netlify.app/docs/guide/middlewares",
    section: "Allow, block, or redirect navigation before displaying a page.",
    excerpt:
      "Files in `app/middlewares/` are Vue Router guards. They run in the browser and during SSR navigation.",
    content:
      "Files in `app/middlewares/` are Vue Router guards. They run in the browser and during SSR navigation.",
    category: "guide",
  },
  {
    title: "Middleware",
    url: "https://runable.netlify.app/docs/guide/middlewares",
    section: "Create named middleware",
    excerpt:
      '```ts // app/middlewares/auth.ts export default defineVueMiddleware((to) => { const authenticated = false; if (!authenticated) { return { path: "/login", query: { redirect: to.fullPath } }; } }); ``` Attach it to a page…',
    content:
      '```ts\n// app/middlewares/auth.ts\nexport default defineVueMiddleware((to) => {\n  const authenticated = false;\n\n  if (!authenticated) {\n    return { path: "/login", query: { redirect: to.fullPath } };\n  }\n});\n```\n\nAttach it to a page using its file name:\n\n```vue\n<script setup lang="ts">\ndefinePageMeta({ middleware: ["auth"] });\n</script>\n```',
    category: "guide",
  },
  {
    title: "Middleware",
    url: "https://runable.netlify.app/docs/guide/middlewares",
    section: "Create global middleware",
    excerpt:
      'Add the `.global` suffix to run it on every navigation: ```ts // app/middlewares/analytics.global.ts export default defineVueMiddleware((to, from) => { console.debug("navigation", from.fullPath, to.fullPath); }); ```',
    content:
      'Add the `.global` suffix to run it on every navigation:\n\n```ts\n// app/middlewares/analytics.global.ts\nexport default defineVueMiddleware((to, from) => {\n  console.debug("navigation", from.fullPath, to.fullPath);\n});\n```',
    category: "guide",
  },
  {
    title: "Middleware",
    url: "https://runable.netlify.app/docs/guide/middlewares",
    section: "Control navigation",
    excerpt:
      "Middleware can return: | Return value | Result | | --- | --- | | `undefined` or `true` | Continue navigation | | `false` | Cancel navigation | | A route | Redirect to that route | | A thrown error | Trigger router error…",
    content:
      'Middleware can return:\n\n| Return value | Result |\n| --- | --- |\n| `undefined` or `true` | Continue navigation |\n| `false` | Cancel navigation |\n| A route | Redirect to that route |\n| A thrown error | Trigger router error handling |\n\nYou can declare several middleware functions:\n\n```ts\ndefinePageMeta({ middleware: ["auth", "admin"] });\n```\n\nRunable loads required middleware, removes duplicates, and runs them in order. Global middleware runs before route middleware.\n\n::u-tip\n---\nvariant: warning\ntitle: Vue middleware, not HTTP middleware\n---\n\nThis mechanism controls interface navigation. Keep real authentication and API-route protection in Express, Fastify, Hono, or your backend.\n\n::',
    category: "guide",
  },
  {
    title: "Modules",
    url: "https://runable.netlify.app/docs/guide/modules",
    section: "Group and distribute a configurable Runable feature.",
    excerpt:
      "A module is reusable Runable configuration. It can add components, composables, layouts, plugins, middleware, styles, and even other modules.",
    content:
      "A module is reusable Runable configuration. It can add components, composables, layouts, plugins, middleware, styles, and even other modules.",
    category: "guide",
  },
  {
    title: "Modules",
    url: "https://runable.netlify.app/docs/guide/modules",
    section: "Create a local module",
    excerpt:
      '```text modules/analytics/ ├── runable.config.ts └── runtime/ └── plugin.ts ``` ```ts // modules/analytics/runable.config.ts import { defineModule } from "runable"; export default defineModule<{ endpoint: string }>({ met…',
    content:
      '```text\nmodules/analytics/\n├── runable.config.ts\n└── runtime/\n    └── plugin.ts\n```\n\n```ts\n// modules/analytics/runable.config.ts\nimport { defineModule } from "runable";\n\nexport default defineModule<{ endpoint: string }>({\n  meta: { name: "analytics", version: "1.0.0" },\n  configKey: "analytics",\n  defaults: { endpoint: "/api/events" },\n  plugins: ["./runtime/plugin.ts"],\n\n  setup(options) {\n    process.env.RUN_ANALYTICS_ENDPOINT ??= options.endpoint;\n  },\n});\n```\n\nDeclare it in the project:\n\n```ts\n// runable.config.ts\nexport default defineConfig({\n  modules: ["./modules/analytics"],\n  analytics: {\n    endpoint: "https://events.example.com",\n  },\n});\n```\n\n`configKey` identifies where to read consumer options. Runable merges `defaults` with these options before calling `setup()`.',
    category: "guide",
  },
  {
    title: "Modules",
    url: "https://runable.netlify.app/docs/guide/modules",
    section: "Add collections without setup",
    excerpt:
      'A module can extend Runable configuration directly: ```ts export default defineModule({ meta: { name: "design-system" }, components: ["./components"], css: ["./styles/index.css"], }); ``` Paths are resolved from the modu…',
    content:
      'A module can extend Runable configuration directly:\n\n```ts\nexport default defineModule({\n  meta: { name: "design-system" },\n  components: ["./components"],\n  css: ["./styles/index.css"],\n});\n```\n\nPaths are resolved from the module directory.',
    category: "guide",
  },
  {
    title: "Modules",
    url: "https://runable.netlify.app/docs/guide/modules",
    section: "Order several modules",
    excerpt:
      '```ts export default defineModule({ meta: { name: "analytics-ui" }, dependOn: ["analytics"], enforce: "post", async setup() {}, }); ``` Groups run in `pre`, normal, then `post` order. `dependOn` imposes order within a gr…',
    content:
      '```ts\nexport default defineModule({\n  meta: { name: "analytics-ui" },\n  dependOn: ["analytics"],\n  enforce: "post",\n  async setup() {},\n});\n```\n\nGroups run in `pre`, normal, then `post` order. `dependOn` imposes order within a group or toward an earlier group. Runable rejects unknown dependencies, cycles, and dependencies on a later group.',
    category: "guide",
  },
  {
    title: "Modules",
    url: "https://runable.netlify.app/docs/guide/modules",
    section: "Publish a module",
    excerpt:
      "Build the module before publishing it. For an installed package, Runable resolves its `runable.config` from the package's `dist` directory. Then add its name to the consuming project's `modules` array. ::u-tip --- varian…",
    content:
      "Build the module before publishing it. For an installed package, Runable resolves its `runable.config` from the package's `dist` directory. Then add its name to the consuming project's `modules` array.\n\n::u-tip\n---\nvariant: warning\ntitle: The modules directory is not scanned automatically\n---\n\nA local module is loaded only when it appears in `modules` with a relative path.\n\n::",
    category: "guide",
  },
  {
    title: "Plugins",
    url: "https://runable.netlify.app/docs/guide/plugins",
    section:
      "Initialize libraries, provide dependencies, and order Vue application startup.",
    excerpt:
      "A plugin runs while the Vue application is created, before rendering. Put it in `app/plugins/` when a feature must be installed once per instance.",
    content:
      "A plugin runs while the Vue application is created, before rendering. Put it in `app/plugins/` when a feature must be installed once per instance.",
    category: "guide",
  },
  {
    title: "Plugins",
    url: "https://runable.netlify.app/docs/guide/plugins",
    section: "Create a plugin",
    excerpt:
      '```ts // app/plugins/api.ts export default defineVuePlugin((vueApp) => { vueApp.directive("focus", { mounted(element) { element.focus(); }, }); return { provide: { apiBase: "/api", }, }; }); ``` Values in `provide` are r…',
    content:
      '```ts\n// app/plugins/api.ts\nexport default defineVuePlugin((vueApp) => {\n  vueApp.directive("focus", {\n    mounted(element) {\n      element.focus();\n    },\n  });\n\n  return {\n    provide: {\n      apiBase: "/api",\n    },\n  };\n});\n```\n\nValues in `provide` are registered with `app.provide()` and as `$`-prefixed global properties.',
    category: "guide",
  },
  {
    title: "Plugins",
    url: "https://runable.netlify.app/docs/guide/plugins",
    section: "Declare order",
    excerpt:
      '```ts // app/plugins/tracking.ts export default defineVuePlugin({ name: "tracking", enforce: "post", dependsOn: ["api"], setup() { // Initialization }, }); ``` | Option | Purpose | | --- | --- | | `name` | Identifies the…',
    content:
      '```ts\n// app/plugins/tracking.ts\nexport default defineVuePlugin({\n  name: "tracking",\n  enforce: "post",\n  dependsOn: ["api"],\n  setup() {\n    // Initialization\n  },\n});\n```\n\n| Option | Purpose |\n| --- | --- |\n| `name` | Identifies the plugin in dependencies |\n| `enforce: "pre"` | Runs before plugins without priority |\n| `enforce: "post"` | Runs after plugins without priority |\n| `dependsOn` | Waits for named plugins in the same group |\n| `setup` | Configures the Vue application |\n| `hooks` | Registers Runable runtime hooks |\n\nRunable sorts `pre`, normal, and `post` groups separately, then resolves `dependsOn`. A circular dependency throws an explicit error. A missing dependency produces a warning.',
    category: "guide",
  },
  {
    title: "Plugins",
    url: "https://runable.netlify.app/docs/guide/plugins",
    section: "Keep SSR isolated",
    excerpt:
      "During SSR, Runable creates one Vue application per render. Create mutable state inside `setup()`: ```ts export default defineVuePlugin(() => { const state = reactive({ user: null }); return { provide: { session: state }…",
    content:
      "During SSR, Runable creates one Vue application per render. Create mutable state inside `setup()`:\n\n```ts\nexport default defineVuePlugin(() => {\n  const state = reactive({ user: null });\n  return { provide: { session: state } };\n});\n```\n\nDo not store user state in a mutable module-level variable because requests could share it.\n\n::u-tip\n---\nvariant: info\ntitle: Plugin or module?\n---\n\nA plugin initializes Vue at runtime. A module configures Runable and can provide several plugins, components, layouts, or other collections.\n\n::",
    category: "guide",
  },
  {
    title: "Production build",
    url: "https://runable.netlify.app/docs/guide/production-build",
    section:
      "Generate client and server bundles, then run Runable without a Vite server.",
    excerpt:
      "The production build generates the client and, when SSR is enabled, a server bundle. Runable then uses these files without starting the Vite development server. ::u-tip --- variant: info title: Simpler equivalent --- <a…",
    content:
      'The production build generates the client and, when SSR is enabled, a server bundle. Runable then uses these files without starting the Vite development server.\n\n::u-tip\n---\nvariant: info\ntitle: Simpler equivalent\n---\n\n<a href="/docs/guide/cli/build.md">`runable build`</a> runs this same `loadConfig()` + `buildProduction()` sequence for you. Write your own build script, as shown below, only when you need to run other steps around it.\n\n::',
    category: "guide",
  },
  {
    title: "Production build",
    url: "https://runable.netlify.app/docs/guide/production-build",
    section: "Create the build script",
    excerpt:
      '```ts // scripts/build.ts import { buildProduction, loadConfig } from "runable"; await loadConfig(); await buildProduction(); ``` Add project commands: ```json { "scripts": { "build": "tsx scripts/build.ts", "start": "NO…',
    content:
      '```ts\n// scripts/build.ts\nimport { buildProduction, loadConfig } from "runable";\n\nawait loadConfig();\nawait buildProduction();\n```\n\nAdd project commands:\n\n```json\n{\n  "scripts": {\n    "build": "tsx scripts/build.ts",\n    "start": "NODE_ENV=production tsx server.ts"\n  }\n}\n```\n\nInstall `tsx` as a development dependency when your server and script remain in TypeScript.',
    category: "guide",
  },
  {
    title: "Production build",
    url: "https://runable.netlify.app/docs/guide/production-build",
    section: "Understand the output",
    excerpt:
      "With the default `distdir`, Runable writes to `.output/`: ```text .output/ ├── client/ │ ├── index.html │ └── assets/ ├── server/ # present when ssr: true └── manifest.js ``` `manifest.js` connects the Runable server to…",
    content:
      "With the default `distdir`, Runable writes to `.output/`:\n\n```text\n.output/\n├── client/\n│   ├── index.html\n│   └── assets/\n├── server/          # present when ssr: true\n└── manifest.js\n```\n\n`manifest.js` connects the Runable server to the client template and compiled SSR entry point.",
    category: "guide",
  },
  {
    title: "Production build",
    url: "https://runable.netlify.app/docs/guide/production-build",
    section: "Start the existing server",
    excerpt:
      'Your `server.ts` does not change: ```ts import Express from "express"; import { express } from "runable/adapters/express"; const server = Express(); server.get("/api/health", (_req, res) => { res.json({ status: "ok" });…',
    content:
      'Your `server.ts` does not change:\n\n```ts\nimport Express from "express";\nimport { express } from "runable/adapters/express";\n\nconst server = Express();\n\nserver.get("/api/health", (_req, res) => {\n  res.json({ status: "ok" });\n});\n\nserver.use(express());\nserver.listen(Number(process.env.PORT ?? 3000));\n```\n\nWith `NODE_ENV=production`, the adapter loads configuration but does not create a Vite server. It renders the application from `.output`.',
    category: "guide",
  },
  {
    title: "Production build",
    url: "https://runable.netlify.app/docs/guide/production-build",
    section: "Prepare deployment",
    excerpt:
      "Copy into the production environment: - `.output/`; - the server and its runtime dependencies; - `runable.config.ts` or its compiled version; - required environment variables. Always test the startup command with `NODE_E…",
    content:
      "Copy into the production environment:\n\n- `.output/`;\n- the server and its runtime dependencies;\n- `runable.config.ts` or its compiled version;\n- required environment variables.\n\nAlways test the startup command with `NODE_ENV=production` before deployment.\n\n::u-tip\n---\nvariant: warning\ntitle: Build before startup\n---\n\nThe production server expects `.output/manifest.js`. If it is missing, run the build or check `distdir`.\n\n::",
    category: "guide",
  },
  {
    title: "SSR and CSR",
    url: "https://runable.netlify.app/docs/guide/rendering-modes",
    section:
      "Choose the application's rendering mode and isolate browser-only code.",
    excerpt:
      "Runable enables server-side rendering by default. Each request creates a Vue application, resolves the route, loads awaited data, and injects generated HTML into the page.",
    content:
      "Runable enables server-side rendering by default. Each request creates a Vue application, resolves the route, loads awaited data, and injects generated HTML into the page.",
    category: "guide",
  },
  {
    title: "SSR and CSR",
    url: "https://runable.netlify.app/docs/guide/rendering-modes",
    section: "Choose the mode",
    excerpt:
      '```ts // runable.config.ts import { defineConfig } from "runable"; export default defineConfig({ ssr: true, }); ``` With `ssr: false`, Runable serves the client template and Vue builds the interface in the browser. | Mod…',
    content:
      '```ts\n// runable.config.ts\nimport { defineConfig } from "runable";\n\nexport default defineConfig({\n  ssr: true,\n});\n```\n\nWith `ssr: false`, Runable serves the client template and Vue builds the interface in the browser.\n\n| Mode | Choose it for |\n| --- | --- |\n| SSR | Indexable content, prefilled first render, data loaded before the response |\n| CSR | Private interfaces, heavy browser-API usage, no need for a rendering server |',
    category: "guide",
  },
  {
    title: "SSR and CSR",
    url: "https://runable.netlify.app/docs/guide/rendering-modes",
    section: "Write SSR-compatible code",
    excerpt:
      '`window`, `document`, `localStorage`, and `navigator` do not exist on the server. Access them after mounting: ```vue <script setup lang="ts"> const width = ref<number>(); onMounted(() => { width.value = window.innerWidth…',
    content:
      '`window`, `document`, `localStorage`, and `navigator` do not exist on the server. Access them after mounting:\n\n```vue\n<script setup lang="ts">\nconst width = ref<number>();\n\nonMounted(() => {\n  width.value = window.innerWidth;\n});\n</script>\n```',
    category: "guide",
  },
  {
    title: "SSR and CSR",
    url: "https://runable.netlify.app/docs/guide/rendering-modes",
    section: "Isolate a client component",
    excerpt:
      '```vue <ClientOnly fallback="Loading the map…" fallback-tag="p"> <InteractiveMap /> </ClientOnly> ``` You can also provide a slot: ```vue <ClientOnly> <Chart /> <template #fallback> <ChartSkeleton /> </template> </Client…',
    content:
      '```vue\n<ClientOnly fallback="Loading the map…" fallback-tag="p">\n  <InteractiveMap />\n</ClientOnly>\n```\n\nYou can also provide a slot:\n\n```vue\n<ClientOnly>\n  <Chart />\n\n  <template #fallback>\n    <ChartSkeleton />\n  </template>\n</ClientOnly>\n```\n\nThe fallback is rendered on the server. Main content appears after client mounting.',
    category: "guide",
  },
  {
    title: "SSR and CSR",
    url: "https://runable.netlify.app/docs/guide/rendering-modes",
    section: "Understand hydration",
    excerpt:
      "During SSR, Vue takes over existing HTML instead of recreating it. The first client render must therefore produce the same structure as the server. Use `ClientOnly` when a library cannot meet this constraint. ::u-tip ---…",
    content:
      "During SSR, Vue takes over existing HTML instead of recreating it. The first client render must therefore produce the same structure as the server. Use `ClientOnly` when a library cannot meet this constraint.\n\n::u-tip\n---\nvariant: warning\ntitle: Avoid unstable values during the first render\n---\n\nA local date, random number, or viewport measurement may differ between server and browser. Compute it after `onMounted()` or provide a stable initial value.\n\n::",
    category: "guide",
  },
  {
    title: "Routing",
    url: "https://runable.netlify.app/docs/guide/routing",
    section: "Create application routes from files in app/pages.",
    excerpt:
      "Runable turns components in `app/pages/` into Vue Router routes. Add, move, or delete a file and the route table follows automatically.",
    content:
      "Runable turns components in `app/pages/` into Vue Router routes. Add, move, or delete a file and the route table follows automatically.",
    category: "guide",
  },
  {
    title: "Routing",
    url: "https://runable.netlify.app/docs/guide/routing",
    section: "Create routes",
    excerpt:
      "```text app/pages/ ├── index.vue → / ├── about.vue → /about ├── projects/ │ ├── index.vue → /projects │ └── [id].vue → /projects/:id ├── blog/[[page]].vue → /blog/:page? └── docs/[...path].vue → /docs/:path* ``` Read par…",
    content:
      '```text\napp/pages/\n├── index.vue                 → /\n├── about.vue                 → /about\n├── projects/\n│   ├── index.vue             → /projects\n│   └── [id].vue              → /projects/:id\n├── blog/[[page]].vue         → /blog/:page?\n└── docs/[...path].vue        → /docs/:path*\n```\n\nRead parameters from a dynamic route with `useRoute()`:\n\n```vue\n<script setup lang="ts">\nconst route = useRoute();\nconst projectId = computed(() => String(route.params.id));\n</script>\n\n<template>\n  <h1>Project {{ projectId }}</h1>\n</template>\n```',
    category: "guide",
  },
  {
    title: "Routing",
    url: "https://runable.netlify.app/docs/guide/routing",
    section: "Define page metadata",
    excerpt:
      '`definePageMeta()` is auto-imported into pages. ```vue <script setup lang="ts"> definePageMeta({ name: "project-details", layout: "dashboard", middleware: ["auth"], }); </script> ``` Use these fields to control the route…',
    content:
      '`definePageMeta()` is auto-imported into pages.\n\n```vue\n<script setup lang="ts">\ndefinePageMeta({\n  name: "project-details",\n  layout: "dashboard",\n  middleware: ["auth"],\n});\n</script>\n```\n\nUse these fields to control the route:\n\n| Field | Effect |\n| --- | --- |\n| `name` | Replaces the generated name |\n| `path` | Replaces the generated path |\n| `alias` | Adds one or more alternate paths |\n| `layout` | Selects the layout |\n| `middleware` | Runs named middleware |\n\nParent route metadata is passed to children. A value defined by the child takes precedence.',
    category: "guide",
  },
  {
    title: "Routing",
    url: "https://runable.netlify.app/docs/guide/routing",
    section: "Navigate",
    excerpt:
      'Use `RunableLink` in templates or `navigateTo()` in scripts: ```vue <template> <RunableLink to="/projects">View projects</RunableLink> </template> ``` ```ts await navigateTo({ name: "project-details", params: { id: "42"…',
    content:
      'Use `RunableLink` in templates or `navigateTo()` in scripts:\n\n```vue\n<template>\n  <RunableLink to="/projects">View projects</RunableLink>\n</template>\n```\n\n```ts\nawait navigateTo({ name: "project-details", params: { id: "42" } });\n```\n\nFor direct Vue Router access, use `useRoute()` and `useRouter()`.',
    category: "guide",
  },
  {
    title: "Routing",
    url: "https://runable.netlify.app/docs/guide/routing",
    section: "Display nested pages",
    excerpt:
      "Place `RunablePage` in a parent page to display its child route: ```vue <!-- app/pages/projects.vue --> <template> <section> <h1>Projects</h1> <RunablePage /> </section> </template> ``` ::u-tip --- variant: info title: H…",
    content:
      "Place `RunablePage` in a parent page to display its child route:\n\n```vue\n<!-- app/pages/projects.vue -->\n<template>\n  <section>\n    <h1>Projects</h1>\n    <RunablePage />\n  </section>\n</template>\n```\n\n::u-tip\n---\nvariant: info\ntitle: Hot reload\n---\n\nVue Router handles changes in `app/pages/`. You do not need to restart the server after adding a page.\n\n::",
    category: "guide",
  },
  {
    title: "Runtime configuration",
    url: "https://runable.netlify.app/docs/guide/runtime-config",
    section: "Load typed variables without exposing secrets to the browser.",
    excerpt:
      "Runable reads `.env` files for the active Vite mode and variables from `process.env`. It keeps names prefixed with `RUN_`, or `VITE_`.",
    content:
      "Runable reads `.env` files for the active Vite mode and variables from `process.env`. It keeps names prefixed with `RUN_`, or `VITE_`.",
    category: "guide",
  },
  {
    title: "Runtime configuration",
    url: "https://runable.netlify.app/docs/guide/runtime-config",
    section: "Declare values",
    excerpt:
      "```dotenv RUN_PUBLIC_API_BASE=/api RUN_PUBLIC_FEATURE_ENABLED=true RUN_DATABASE_URL=postgres://localhost/acme RUN_RETRY_COUNT=3 ``` The `PUBLIC_` segment determines visibility: | Variable | Generated access | Client | Se…",
    content:
      "```dotenv\nRUN_PUBLIC_API_BASE=/api\nRUN_PUBLIC_FEATURE_ENABLED=true\nRUN_DATABASE_URL=postgres://localhost/acme\nRUN_RETRY_COUNT=3\n```\n\nThe `PUBLIC_` segment determines visibility:\n\n| Variable | Generated access | Client | Server |\n| --- | --- | --- | --- |\n| `RUN_PUBLIC_API_BASE` | `runtime.public.apiBase` | Yes | Yes |\n| `RUN_PUBLIC_FEATURE_ENABLED` | `runtime.public.featureEnabled` | Yes | Yes |\n| `RUN_DATABASE_URL` | `runtime.databaseUrl` | No | Yes |\n| `RUN_RETRY_COUNT` | `runtime.retryCount` | No | Yes |",
    category: "guide",
  },
  {
    title: "Runtime configuration",
    url: "https://runable.netlify.app/docs/guide/runtime-config",
    section: "Read values",
    excerpt:
      "```ts const runtime = useRuntime(); const apiBase = runtime.public.apiBase; if (import.meta.server) { console.log(runtime.databaseUrl); } ``` Runable removes the prefix, converts names to `camelCase`, and infers booleans…",
    content:
      "```ts\nconst runtime = useRuntime();\n\nconst apiBase = runtime.public.apiBase;\n\nif (import.meta.server) {\n  console.log(runtime.databaseUrl);\n}\n```\n\nRunable removes the prefix, converts names to `camelCase`, and infers booleans, numbers, arrays, JSON objects, `null`, and `undefined`.",
    category: "guide",
  },
  {
    title: "Runtime configuration",
    url: "https://runable.netlify.app/docs/guide/runtime-config",
    section: "Use import.meta.env",
    excerpt:
      "Static accesses are also replaced during compilation: ```ts const apiBase = import.meta.env.RUN_PUBLIC_API_BASE; ``` Dynamic notation such as `import.meta.env[key]` is not transformed. Prefer `useRuntime()` for the `publ…",
    content:
      "Static accesses are also replaced during compilation:\n\n```ts\nconst apiBase = import.meta.env.RUN_PUBLIC_API_BASE;\n```\n\nDynamic notation such as `import.meta.env[key]` is not transformed. Prefer `useRuntime()` for the `public` separation and generated types.",
    category: "guide",
  },
  {
    title: "Runtime configuration",
    url: "https://runable.netlify.app/docs/guide/runtime-config",
    section: "Provide editor types",
    excerpt:
      "Runable writes `.app/runtime.d.ts` at startup. Restart the server after adding or renaming a variable to regenerate the declaration. ::u-tip --- variant: destructive title: A public variable is never secret --- Every `*_…",
    content:
      "Runable writes `.app/runtime.d.ts` at startup. Restart the server after adding or renaming a variable to regenerate the declaration.\n\n::u-tip\n---\nvariant: destructive\ntitle: A public variable is never secret\n---\n\nEvery `*_PUBLIC_*` value is included in the client bundle. Never use one for a password, private token, or connection string.\n\n::",
    category: "guide",
  },
  {
    title: "AdonisJS",
    url: "https://runable.netlify.app/docs/integrations/adonisjs",
    section: "Installation",
    excerpt: "```bash pnpm add runable vue vue-router @adonisjs/core ```",
    content: "```bash\npnpm add runable vue vue-router @adonisjs/core\n```",
    category: "integrations",
  },
  {
    title: "AdonisJS",
    url: "https://runable.netlify.app/docs/integrations/adonisjs",
    section: "Configuration",
    excerpt:
      '```ts // start/routes.ts import router from "@adonisjs/core/services/router"; import { adonis } from "runable/adapters/adonis"; router.get("/api/health", async () => ({ status: "ok" })); router.any("*", adonis()); ``` `a…',
    content:
      '```ts\n// start/routes.ts\nimport router from "@adonisjs/core/services/router";\nimport { adonis } from "runable/adapters/adonis";\n\nrouter.get("/api/health", async () => ({ status: "ok" }));\n\nrouter.any("*", adonis());\n```\n\n`adonis()` returns a handler that reads the internal Node objects from `HttpContext`, lets Vite handle development assets, then renders the Runable page.\n\nDeclare the catch-all route after more specific AdonisJS routes.',
    category: "integrations",
  },
  {
    title: "Bun",
    url: "https://runable.netlify.app/docs/integrations/bun",
    section: "Installation",
    excerpt: "```bash bun add runable vue vue-router ```",
    content: "```bash\nbun add runable vue vue-router\n```",
    category: "integrations",
  },
  {
    title: "Bun",
    url: "https://runable.netlify.app/docs/integrations/bun",
    section: "Configuration",
    excerpt:
      '```ts // server.ts import { bun } from "runable/adapters/bun"; Bun.serve({ port: 3000, fetch: bun(), }); ``` `bun()` returns a `(request: Request) => Response | Promise<Response>` function. It uses Fetch API objects dire…',
    content:
      '```ts\n// server.ts\nimport { bun } from "runable/adapters/bun";\n\nBun.serve({\n  port: 3000,\n  fetch: bun(),\n});\n```\n\n`bun()` returns a `(request: Request) => Response | Promise<Response>` function. It uses Fetch API objects directly, with no conversion to Node HTTP classes.\n\nTo keep API routes, use the adapter as a fallback:\n\n```ts\nconst renderRunable = bun();\n\nBun.serve({\n  async fetch(request) {\n    const url = new URL(request.url);\n    if (url.pathname === "/api/health") {\n      return Response.json({ status: "ok" });\n    }\n\n    return renderRunable(request);\n  },\n});\n```',
    category: "integrations",
  },
  {
    title: "Custom adapter",
    url: "https://runable.netlify.app/docs/integrations/custom",
    section:
      "Connect Runable to a Node or Fetch API server without a dedicated adapter.",
    excerpt:
      "Create the application once, then pass each frontend request to the primitive that matches your runtime.",
    content:
      "Create the application once, then pass each frontend request to the primitive that matches your runtime.",
    category: "integrations",
  },
  {
    title: "Custom adapter",
    url: "https://runable.netlify.app/docs/integrations/custom",
    section: "Node server",
    excerpt:
      '```ts import { createServer } from "node:http"; import { createRunableApp, requestNode } from "runable"; const runableApp = createRunableApp(); createServer(async (req, res) => { await requestNode({ runableApp: await run…',
    content:
      '```ts\nimport { createServer } from "node:http";\nimport { createRunableApp, requestNode } from "runable";\n\nconst runableApp = createRunableApp();\n\ncreateServer(async (req, res) => {\n  await requestNode({\n    runableApp: await runableApp,\n    req,\n    res,\n  });\n}).listen(3000);\n```',
    category: "integrations",
  },
  {
    title: "Custom adapter",
    url: "https://runable.netlify.app/docs/integrations/custom",
    section: "Fetch API runtime",
    excerpt:
      '```ts import { createRunableApp, requestWeb } from "runable"; const runableApp = createRunableApp(); export async function fetch(request: Request) { return requestWeb({ runableApp: await runableApp, req: request, }); } `…',
    content:
      '```ts\nimport { createRunableApp, requestWeb } from "runable";\n\nconst runableApp = createRunableApp();\n\nexport async function fetch(request: Request) {\n  return requestWeb({\n    runableApp: await runableApp,\n    req: request,\n  });\n}\n```\n\n`requestNode()` writes directly to `ServerResponse`. `requestWeb()` returns a `Response`. In both cases, handle API routes before calling Runable.\n\n::u-tip\n---\nvariant: info\ntitle: Development with a Node server\n---\n\nOfficial Node adapters run Vite\'s Connect middleware before `requestNode()`. If you write a custom Node adapter, reproduce this step so development modules and assets are served correctly.\n\n::',
    category: "integrations",
  },
  {
    title: "Deno",
    url: "https://runable.netlify.app/docs/integrations/deno",
    section: "Configuration",
    excerpt:
      '```ts // server.ts import { deno } from "runable/adapters/deno"; Deno.serve({ port: 3000 }, deno()); ``` `deno()` has the same Fetch API signature as the Bun adapter. ```ts const renderRunable = deno(); Deno.serve({ port…',
    content:
      '```ts\n// server.ts\nimport { deno } from "runable/adapters/deno";\n\nDeno.serve({ port: 3000 }, deno());\n```\n\n`deno()` has the same Fetch API signature as the Bun adapter.\n\n```ts\nconst renderRunable = deno();\n\nDeno.serve({ port: 3000 }, (request) => {\n  const url = new URL(request.url);\n\n  if (url.pathname === "/api/health") {\n    return Response.json({ status: "ok" });\n  }\n\n  return renderRunable(request);\n});\n```\n\nConfigure the `runable` npm import according to your Deno project\'s chosen strategy.',
    category: "integrations",
  },
  {
    title: "Express",
    url: "https://runable.netlify.app/docs/integrations/express",
    section: "Installation",
    excerpt:
      "```bash pnpm add runable vue vue-router express pnpm add -D @types/express ```",
    content:
      "```bash\npnpm add runable vue vue-router express\npnpm add -D @types/express\n```",
    category: "integrations",
  },
  {
    title: "Express",
    url: "https://runable.netlify.app/docs/integrations/express",
    section: "Configuration",
    excerpt:
      '```ts // server.ts import Express from "express"; import { express } from "runable/adapters/express"; const app = Express(); app.get("/api/health", (_req, res) => { res.json({ status: "ok" }); }); app.use(express()); app…',
    content:
      '```ts\n// server.ts\nimport Express from "express";\nimport { express } from "runable/adapters/express";\n\nconst app = Express();\n\napp.get("/api/health", (_req, res) => {\n  res.json({ status: "ok" });\n});\n\napp.use(express());\n\napp.listen(3000);\n```\n\n`express()` returns a `RequestHandler`. Place it after API routes and any middleware that must process requests before the frontend. Initialization and rendering errors are forwarded to the next Express error middleware.',
    category: "integrations",
  },
  {
    title: "Express",
    url: "https://runable.netlify.app/docs/integrations/express",
    section: "Reuse an instance",
    excerpt:
      '```ts import { createRunableApp } from "runable"; import { express } from "runable/adapters/express"; const runableApp = createRunableApp(); app.use(express({ runableApp })); ```',
    content:
      '```ts\nimport { createRunableApp } from "runable";\nimport { express } from "runable/adapters/express";\n\nconst runableApp = createRunableApp();\n\napp.use(express({ runableApp }));\n```',
    category: "integrations",
  },
  {
    title: "Fastify",
    url: "https://runable.netlify.app/docs/integrations/fastify",
    section: "Installation",
    excerpt: "```bash pnpm add runable vue vue-router fastify ```",
    content: "```bash\npnpm add runable vue vue-router fastify\n```",
    category: "integrations",
  },
  {
    title: "Fastify",
    url: "https://runable.netlify.app/docs/integrations/fastify",
    section: "Configuration",
    excerpt:
      '```ts // server.ts import Fastify from "fastify"; import { fastify } from "runable/adapters/fastify"; const app = Fastify(); app.get("/api/health", async () => ({ status: "ok" })); await app.register(fastify()); await ap…',
    content:
      '```ts\n// server.ts\nimport Fastify from "fastify";\nimport { fastify } from "runable/adapters/fastify";\n\nconst app = Fastify();\n\napp.get("/api/health", async () => ({ status: "ok" }));\n\nawait app.register(fastify());\nawait app.listen({ port: 3000 });\n```\n\n`fastify()` returns a `FastifyPluginAsync`. The plugin adds a catch-all route, passes the raw Node objects to Runable, then calls `reply.hijack()` because Runable writes directly to the response.\n\nRegister your application routes before the plugin so they retain priority.',
    category: "integrations",
  },
  {
    title: "h3",
    url: "https://runable.netlify.app/docs/integrations/h3",
    section:
      "Connect h3 to Runable manually with the Node or Fetch API primitives.",
    excerpt:
      'Runable does not yet provide a dedicated `h3()` function. Use the low-level primitives in a catch-all handler. ```ts import { defineEventHandler } from "h3"; import { createRunableApp, requestNode } from "runable"; const…',
    content:
      'Runable does not yet provide a dedicated `h3()` function. Use the low-level primitives in a catch-all handler.\n\n```ts\nimport { defineEventHandler } from "h3";\nimport { createRunableApp, requestNode } from "runable";\n\nconst runableApp = createRunableApp();\n\nexport default defineEventHandler(async (event) => {\n  await requestNode({\n    runableApp: await runableApp,\n    req: event.node.req,\n    res: event.node.res,\n  });\n});\n```\n\nThis example targets h3 versions that expose `event.node.req` and `event.node.res`. If your runtime provides a standard `Request`, use `requestWeb()` and return its `Response`.\n\nMount this handler after your API routes.',
    category: "integrations",
  },
  {
    title: "Hono",
    url: "https://runable.netlify.app/docs/integrations/hono",
    section: "Installation",
    excerpt:
      "```bash pnpm add runable vue vue-router hono ``` Add `@hono/node-server` when running Hono on Node.js.",
    content:
      "```bash\npnpm add runable vue vue-router hono\n```\n\nAdd `@hono/node-server` when running Hono on Node.js.",
    category: "integrations",
  },
  {
    title: "Hono",
    url: "https://runable.netlify.app/docs/integrations/hono",
    section: "Configuration",
    excerpt:
      '```ts // server.ts import { Hono } from "hono"; import { serve } from "@hono/node-server"; import { hono } from "runable/adapters/hono"; const app = new Hono(); app.use("*", hono()); app.get("/api/health", (context) => {…',
    content:
      '```ts\n// server.ts\nimport { Hono } from "hono";\nimport { serve } from "@hono/node-server";\nimport { hono } from "runable/adapters/hono";\n\nconst app = new Hono();\n\napp.use("*", hono());\n\napp.get("/api/health", (context) => {\n  return context.json({ status: "ok" });\n});\n\nserve({ fetch: app.fetch, port: 3000 });\n```\n\nThe middleware calls `next()` first. It therefore preserves every response other than `404` and renders Runable only when no Hono route has responded.\n\nWhen the Node `incoming` and `outgoing` bindings are present, the adapter also lets Vite\'s Connect middleware process development assets. Otherwise, it uses standard `Request` and `Response` objects.',
    category: "integrations",
  },
  {
    title: "Integrations",
    url: "https://runable.netlify.app/docs/integrations/index",
    section:
      "Connect Runable to Express, Fastify, Hono, Koa, NestJS, AdonisJS, Bun, Deno, or a custom server.",
    excerpt:
      "An adapter connects requests from your backend to the Runable rendering engine. It initializes the application once, lets Vite serve development assets when the runtime allows it, then produces the Vue response.",
    content:
      "An adapter connects requests from your backend to the Runable rendering engine. It initializes the application once, lets Vite serve development assets when the runtime allows it, then produces the Vue response.",
    category: "integrations",
  },
  {
    title: "Integrations",
    url: "https://runable.netlify.app/docs/integrations/index",
    section: "Available adapters",
    excerpt:
      "| Backend | Runable API | Form | | --- | --- | --- | | Express | `express()` | Middleware | | Fastify | `fastify()` | Plugin | | Hono | `hono()` | Middleware | | Koa | `koa()` | Middleware | | NestJS | `nestjs()` | Expre…",
    content:
      "| Backend | Runable API | Form |\n| --- | --- | --- |\n| Express | `express()` | Middleware |\n| Fastify | `fastify()` | Plugin |\n| Hono | `hono()` | Middleware |\n| Koa | `koa()` | Middleware |\n| NestJS | `nestjs()` | Express platform middleware |\n| AdonisJS | `adonis()` | Catch-all handler |\n| Bun | `bun()` | Fetch API handler |\n| Deno | `deno()` | Fetch API handler |\n\nh3 and other servers currently use the low-level `createRunableApp()`, `requestNode()`, or `requestWeb()` functions.",
    category: "integrations",
  },
  {
    title: "Integrations",
    url: "https://runable.netlify.app/docs/integrations/index",
    section: "Shared option",
    excerpt:
      "Every adapter accepts an already initialized instance: ```ts type RunableAdapterOptions = { runableApp?: Promise<ViteDevServer | null> | ViteDevServer | null; }; ``` Without this option, the adapter calls `createRunableA…",
    content:
      "Every adapter accepts an already initialized instance:\n\n```ts\ntype RunableAdapterOptions = {\n  runableApp?: Promise<ViteDevServer | null> | ViteDevServer | null;\n};\n```\n\nWithout this option, the adapter calls `createRunableApp()` itself once.\n\n::u-tip\n---\nvariant: warning\ntitle: Keep your API routes first\n---\n\nMount the adapter as a fallback after application routes, unless the framework requires middleware to run before routes so it can call `next()`.\n\n::",
    category: "integrations",
  },
  {
    title: "Koa",
    url: "https://runable.netlify.app/docs/integrations/koa",
    section: "Installation",
    excerpt:
      "```bash pnpm add runable vue vue-router koa pnpm add -D @types/koa ```",
    content:
      "```bash\npnpm add runable vue vue-router koa\npnpm add -D @types/koa\n```",
    category: "integrations",
  },
  {
    title: "Koa",
    url: "https://runable.netlify.app/docs/integrations/koa",
    section: "Configuration",
    excerpt:
      '```ts // server.ts import Koa from "koa"; import { koa } from "runable/adapters/koa"; const app = new Koa(); app.use(async (context, next) => { if (context.path === "/api/health") { context.body = { status: "ok" }; retur…',
    content:
      '```ts\n// server.ts\nimport Koa from "koa";\nimport { koa } from "runable/adapters/koa";\n\nconst app = new Koa();\n\napp.use(async (context, next) => {\n  if (context.path === "/api/health") {\n    context.body = { status: "ok" };\n    return;\n  }\n\n  await next();\n});\n\napp.use(koa());\napp.listen(3000);\n```\n\nThe adapter disables Koa\'s automatic response with `context.respond = false`, then writes directly to `context.res`. Mount it last: it does not forward the request to subsequent middleware.',
    category: "integrations",
  },
  {
    title: "NestJS",
    url: "https://runable.netlify.app/docs/integrations/nestjs",
    section:
      "Connect Runable after the controllers of a NestJS application using Express.",
    excerpt: "The current adapter targets the NestJS Express platform.",
    content: "The current adapter targets the NestJS Express platform.",
    category: "integrations",
  },
  {
    title: "NestJS",
    url: "https://runable.netlify.app/docs/integrations/nestjs",
    section: "Installation",
    excerpt:
      "```bash pnpm add runable vue vue-router @nestjs/common @nestjs/core @nestjs/platform-express ```",
    content:
      "```bash\npnpm add runable vue vue-router @nestjs/common @nestjs/core @nestjs/platform-express\n```",
    category: "integrations",
  },
  {
    title: "NestJS",
    url: "https://runable.netlify.app/docs/integrations/nestjs",
    section: "Configuration",
    excerpt:
      '```ts // main.ts import { NestFactory } from "@nestjs/core"; import { nestjs } from "runable/adapters/nestjs"; import { AppModule } from "./app.module.js"; const app = await NestFactory.create(AppModule); // Register Nes…',
    content:
      '```ts\n// main.ts\nimport { NestFactory } from "@nestjs/core";\nimport { nestjs } from "runable/adapters/nestjs";\nimport { AppModule } from "./app.module.js";\n\nconst app = await NestFactory.create(AppModule);\n\n// Register Nest controllers on Express first.\nawait app.init();\n\napp.use(nestjs());\nawait app.listen(3000);\n```\n\n`nestjs()` returns a function compatible with `NestMiddleware["use"]`. Calling `app.init()` before `app.use()` ensures controller routes are registered before the Runable fallback.\n\n::u-tip\n---\nvariant: warning\ntitle: Fastify is not supported by this adapter\n---\n\nA Nest application built with `FastifyAdapter` does not expose the Express request and response objects expected by `nestjs()`.\n\n::',
    category: "integrations",
  },
  {
    title: "app/components",
    url: "https://runable.netlify.app/docs/structure/app-components",
    section: "Create Vue components that are available without manual imports.",
    excerpt:
      "Runable detects Vue components in this directory and makes them available in templates. ```vue <!-- app/components/AppLogo.vue --> <template> <strong>Acme</strong> </template> ``` ```vue <!-- app/pages/index.vue --> <tem…",
    content:
      'Runable detects Vue components in this directory and makes them available in templates.\n\n```vue\n<!-- app/components/AppLogo.vue -->\n<template>\n  <strong>Acme</strong>\n</template>\n```\n\n```vue\n<!-- app/pages/index.vue -->\n<template>\n  <AppLogo />\n</template>\n```\n\nYou can add multiple sources and control generated names:\n\n```ts\nexport default defineConfig({\n  components: [\n    "./app/components",\n    {\n      dirs: "./app/components/ui",\n      prefix: "U",\n      pathPrefix: false,\n    },\n  ],\n});\n```\n\nRunable writes declarations to `.app/components.d.ts`. If autocomplete does not reflect a new component, restart `runable prepare` or the development server.',
    category: "structure",
  },
  {
    title: "app/components",
    url: "https://runable.netlify.app/docs/structure/app-components",
    section: "Define the name inside the component",
    excerpt:
      'A name declared in the file replaces the name inferred from its path: ```vue <!-- app/components/button.vue --> <script setup lang="ts"> defineOptions({ name: "PrimaryAction", }); </script> <template> <button type="butto…',
    content:
      'A name declared in the file replaces the name inferred from its path:\n\n```vue\n<!-- app/components/button.vue -->\n<script setup lang="ts">\ndefineOptions({\n  name: "PrimaryAction",\n});\n</script>\n\n<template>\n  <button type="button"><slot /></button>\n</template>\n```\n\nThe component is then available as `<PrimaryAction />`, even though the file is named `button.vue`. Runable also recognizes the Options API and `defineComponent()`:\n\n```ts\nexport default defineComponent({\n  name: "PrimaryAction",\n});\n```\n\nThe name must be a static string. A `componentName` function defined in `runable.config.ts` takes priority. Without a declared or configured name, Runable uses the file name and, depending on `pathPrefix`, its parent directories.\n\nThis detection also applies to components written directly in JavaScript or TypeScript files:\n\n```ts\n// app/components/layout.ts\nexport default defineComponent({\n  name: "RunableLayout",\n  setup() {\n    // ...\n  },\n});\n```',
    category: "structure",
  },
  {
    title: "app/components",
    url: "https://runable.netlify.app/docs/structure/app-components",
    section: "Components provided by Runable",
    excerpt:
      "Runable registers several internal components alongside project components: | Component | Purpose | | --- | --- | | `RunablePage` | Displays the current Vue Router route | | `RunableLink` | Creates a navigation link with…",
    content:
      'Runable registers several internal components alongside project components:\n\n| Component | Purpose |\n| --- | --- |\n| `RunablePage` | Displays the current Vue Router route |\n| `RunableLink` | Creates a navigation link with `RouterLink` props |\n| `RunableLayout` | Applies the layout associated with the page |\n| `ClientOnly` | Renders its content only in the browser |\n\n```vue\n<template>\n  <nav>\n    <RunableLink to="/projects">Projects</RunableLink>\n  </nav>\n\n  <RunablePage />\n</template>\n```',
    category: "structure",
  },
  {
    title: "app/composables",
    url: "https://runable.netlify.app/docs/structure/app-composables",
    section: "Share auto-imported Vue logic across components and pages.",
    excerpt:
      "Place functions that compose Vue state and APIs here. Named exports are auto-imported into the application. ```ts // app/composables/useCounter.ts export function useCounter() { const count = ref(0); return { count, incr…",
    content:
      'Place functions that compose Vue state and APIs here. Named exports are auto-imported into the application.\n\n```ts\n// app/composables/useCounter.ts\nexport function useCounter() {\n  const count = ref(0);\n\n  return {\n    count,\n    increment: () => count.value++,\n  };\n}\n```\n\n```vue\n<script setup lang="ts">\nconst { count, increment } = useCounter();\n</script>\n```\n\nUse `app/composables/` for Vue-related functions: reactive state, lifecycle, injections, or application context. Put Vue-independent TypeScript utilities in an explicit domain directory.\n\nTo scan multiple directories:\n\n```ts\nexport default defineConfig({\n  composables: ["./app/composables", "./shared/composables"],\n});\n```',
    category: "structure",
  },
  {
    title: "app/css",
    url: "https://runable.netlify.app/docs/structure/app-css",
    section: "Organize global stylesheets loaded by Runable.",
    excerpt:
      "`app/css/` is an organizational convention, but its files are not loaded automatically. Declare each global entry in `runable.config.ts`. ```css /* app/css/main.css */ :root { font-family: system-ui, sans-serif; } ``` ``…",
    content:
      '`app/css/` is an organizational convention, but its files are not loaded automatically. Declare each global entry in `runable.config.ts`.\n\n```css\n/* app/css/main.css */\n:root {\n  font-family: system-ui, sans-serif;\n}\n```\n\n```ts\nexport default defineConfig({\n  css: ["./app/css/main.css"],\n});\n```\n\nImport component-specific styles from the component\'s `<style>` block. Reserve the `css` option for resets, tokens, themes, and truly global styles.\n\nVite processes declared files. To use Sass, Less, or Stylus, install the matching preprocessor in the consuming project.',
    category: "structure",
  },
  {
    title: "app.vue",
    url: "https://runable.netlify.app/docs/structure/app-dot-vue",
    section: "Customize the root component of the Vue application.",
    excerpt:
      "`app.vue` is the root component shared by every page. Use it for structures that must live above layouts, such as a theme provider, notifications, or accessibility elements. ```vue <!-- app/app.vue --> <template> <Runabl…",
    content:
      "`app.vue` is the root component shared by every page. Use it for structures that must live above layouts, such as a theme provider, notifications, or accessibility elements.\n\n```vue\n<!-- app/app.vue -->\n<template>\n  <RunableLayout>\n    <RunablePage />\n  </RunableLayout>\n</template>\n```\n\nIn most applications, visual structures specific to an area belong in `app/layouts/`. Keep `app.vue` lightweight so all routes share the same behavior.\n\n`RunablePage` displays the current route. `RunableLayout` applies the layout selected with `definePageMeta()` around its content.\n\nThis file is optional. When absent, Runable uses this structure in its internal root component.",
    category: "structure",
  },
  {
    title: "app/globals",
    url: "https://runable.netlify.app/docs/structure/app-globals",
    section:
      "Make functions and variables automatically available in application code.",
    excerpt:
      'Exports from `app/globals/` can be used without manual imports in the Vue application. ```ts // app/globals/formatPrice.ts export function formatPrice(value: number) { return new Intl.NumberFormat("en-US", { style: "curr…',
    content:
      'Exports from `app/globals/` can be used without manual imports in the Vue application.\n\n```ts\n// app/globals/formatPrice.ts\nexport function formatPrice(value: number) {\n  return new Intl.NumberFormat("en-US", {\n    style: "currency",\n    currency: "USD",\n  }).format(value);\n}\n```\n\n```vue\n<template>\n  <span>{{ formatPrice(29.9) }}</span>\n</template>\n```\n\nUnlike a composable, a global does not need reactive state or the Vue lifecycle. Prefer pure, easily tested functions.\n\nRunable scans JavaScript and TypeScript files, generates `.app/globals.d.ts`, then transforms free references into imports. Avoid overly generic names that could conflict with local variables or browser APIs.',
    category: "structure",
  },
  {
    title: "app/layouts",
    url: "https://runable.netlify.app/docs/structure/app-layouts",
    section: "Share an interface structure across several pages.",
    excerpt:
      "A layout wraps page content. `default.vue` is used when a page does not explicitly select another layout. ```vue <!-- app/layouts/default.vue --> <template> <div> <header>My application</header> <main><slot /></main> </d…",
    content:
      'A layout wraps page content. `default.vue` is used when a page does not explicitly select another layout.\n\n```vue\n<!-- app/layouts/default.vue -->\n<template>\n  <div>\n    <header>My application</header>\n    <main><slot /></main>\n  </div>\n</template>\n```\n\nCreate a named layout for a specific area:\n\n```vue\n<!-- app/pages/admin.vue -->\n<script setup lang="ts">\ndefinePageMeta({ layout: "dashboard" });\n</script>\n\n<template>\n  <h1>Administration</h1>\n</template>\n```\n\nThe `dashboard` name maps to `app/layouts/dashboard.vue`. Runable generates the registry and related types in `.app/layouts.d.ts`.\n\nLayouts can use composables, auto-imported components, and `RouterLink` like the rest of the application.',
    category: "structure",
  },
  {
    title: "app/middlewares",
    url: "https://runable.netlify.app/docs/structure/app-middlewares",
    section: "Control Vue navigation with global or named middleware.",
    excerpt:
      "Middleware runs during Vue Router navigation. Use it to check a session, redirect, or block access to a page. ```ts // app/middlewares/auth.ts export default defineVueMiddleware((to) => { const user = useCurrentUser(); i…",
    content:
      'Middleware runs during Vue Router navigation. Use it to check a session, redirect, or block access to a page.\n\n```ts\n// app/middlewares/auth.ts\nexport default defineVueMiddleware((to) => {\n  const user = useCurrentUser();\n\n  if (!user.value && to.path !== "/login") {\n    return "/login";\n  }\n});\n```\n\nThen reference its name from the page:\n\n```ts\ndefinePageMeta({\n  middleware: ["auth"],\n});\n```\n\nA file with the `.global.ts` suffix applies to every navigation:\n\n```text\napp/middlewares/analytics.global.ts\n```\n\nThese middleware functions belong to the Vue router. HTTP middleware, API-route authentication, and request validation remain in your backend.',
    category: "structure",
  },
  {
    title: "app/pages",
    url: "https://runable.netlify.app/docs/structure/app-pages",
    section: "Create Vue routes from the file tree.",
    excerpt:
      "Every Vue component in `app/pages/` becomes a route. Its file path determines the URL. ```text app/pages/ ├── index.vue → / ├── about.vue → /about ├── users/[id].vue → /users/:id └── docs/[...slug].vue → /docs/:slug* ```…",
    content:
      'Every Vue component in `app/pages/` becomes a route. Its file path determines the URL.\n\n```text\napp/pages/\n├── index.vue             → /\n├── about.vue             → /about\n├── users/[id].vue        → /users/:id\n└── docs/[...slug].vue    → /docs/:slug*\n```\n\nCreate a page like a regular Vue component:\n\n```vue\n<!-- app/pages/users/[id].vue -->\n<script setup lang="ts">\nconst route = useRoute();\n</script>\n\n<template>\n  <h1>User {{ route.params.id }}</h1>\n</template>\n```\n\nAdd a layout or middleware with `definePageMeta()`:\n\n```ts\ndefinePageMeta({\n  layout: "dashboard",\n  middleware: ["auth"],\n});\n```\n\nRunable delegates page detection and reloading to Vue Router. Configure `pages` in `runable.config.ts` only when your views live elsewhere.',
    category: "structure",
  },
  {
    title: "app/plugins",
    url: "https://runable.netlify.app/docs/structure/app-plugins",
    section: "Run code when each Vue application is created.",
    excerpt:
      "A plugin configures the Vue application before rendering. Use `defineVuePlugin()` to install a library, provide a value, or register hooks. ```ts // app/plugins/api.ts export default defineVuePlugin(() => { return { prov…",
    content:
      'A plugin configures the Vue application before rendering. Use `defineVuePlugin()` to install a library, provide a value, or register hooks.\n\n```ts\n// app/plugins/api.ts\nexport default defineVuePlugin(() => {\n  return {\n    provide: {\n      apiBase: "/api",\n    },\n  };\n});\n```\n\nDuring SSR, a new Vue application is created for every render. Do not store user state in a shared module variable.\n\nSuffix files to restrict their environment:\n\n```text\napp/plugins/\n├── analytics.client.ts\n├── database.server.ts\n└── api.ts\n```\n\nThe development server watches this directory and regenerates the registry when a plugin is added, renamed, or removed.',
    category: "structure",
  },
  {
    title: "app",
    url: "https://runable.netlify.app/docs/structure/app",
    section: "Organize your Vue application sources in the app directory.",
    excerpt:
      "The `app/` directory contains the Vue application. Runable scans its conventional subdirectories and generates the required registries. ```text app/ ├── pages/ ├── layouts/ ├── components/ ├── composables/ ├── globals/ ├…",
    content:
      'The `app/` directory contains the Vue application. Runable scans its conventional subdirectories and generates the required registries.\n\n```text\napp/\n├── pages/\n├── layouts/\n├── components/\n├── composables/\n├── globals/\n├── plugins/\n├── middlewares/\n├── css/\n├── app.vue\n└── error.vue\n```\n\nEvery item is optional. A minimal application can contain only `app/pages/index.vue`.\n\n`css/` is an organizational convention only — unlike the other directories, Runable does not scan it automatically. Declare each stylesheet explicitly in `runable.config.ts`\'s `css` option (see <a href="/docs/structure/app-css.md">app/css</a>).',
    category: "structure",
  },
  {
    title: "app",
    url: "https://runable.netlify.app/docs/structure/app",
    section: "Use another name",
    excerpt:
      '```ts // runable.config.ts export default defineConfig({ appDir: "frontend", }); ``` Conventions then become `frontend/pages`, `frontend/layouts`, and so on. A more specific option such as `pages` or `components` can ove…',
    content:
      '```ts\n// runable.config.ts\nexport default defineConfig({\n  appDir: "frontend",\n});\n```\n\nConventions then become `frontend/pages`, `frontend/layouts`, and so on. A more specific option such as `pages` or `components` can override only the corresponding directory.\n\n::u-tip\n---\nvariant: info\ntitle: Development reloading\n---\n\nVite watches configuration directories such as components, layouts, composables, globals, plugins, and middleware. Vue Router handles changes in `pages/` directly.\n\n::',
    category: "structure",
  },
  {
    title: ".app",
    url: "https://runable.netlify.app/docs/structure/dot-app",
    section:
      "Understand the types, registries, and virtual files prepared by Runable.",
    excerpt:
      "Runable turns conventions into code and TypeScript declarations in `.app/`. The `runable prepare` command creates this directory; the development server then keeps it up to date. Depending on the features used, it may co…",
    content:
      "Runable turns conventions into code and TypeScript declarations in `.app/`. The `runable prepare` command creates this directory; the development server then keeps it up to date.\n\nDepending on the features used, it may contain:\n\n```text\n.app/\n├── components.d.ts\n├── globals.d.ts\n├── layouts.d.ts\n├── modules-options.d.ts\n├── plugins.d.ts\n├── router.d.ts\n├── runtime.d.ts\n└── tsconfig.app.json\n```\n\nThese files tell TypeScript and your editor which components, functions, routes, layouts, and injections are available without manual imports.",
    category: "structure",
  },
  {
    title: ".app",
    url: "https://runable.netlify.app/docs/structure/dot-app",
    section: "Prepare types",
    excerpt:
      '```bash pnpm app:prepare ``` Run this command after installing the project and in CI before type checking when `.app/` does not exist yet. See <a href="/docs/guide/cli/prepare.md">`runable prepare`</a> for the command it…',
    content:
      '```bash\npnpm app:prepare\n```\n\nRun this command after installing the project and in CI before type checking when `.app/` does not exist yet. See <a href="/docs/guide/cli/prepare.md">`runable prepare`</a> for the command itself.\n\nThe internal `#build` alias points to this directory. It lets the runtime and extensions reference generated files without depending on the configured `output` name.\n\n::u-tip\n---\nvariant: warning\ntitle: Ephemeral directory\n---\n\nDo not place application code in `.app/` or edit its declarations manually. The next generation would overwrite your changes.\n\n::',
    category: "structure",
  },
  {
    title: ".env",
    url: "https://runable.netlify.app/docs/structure/env",
    section:
      "Load typed environment variables and control which values Runable exposes to the browser.",
    excerpt:
      "Runable loads environment files for the active Vite mode and variables already present in `process.env`. Use `useRuntime()` to read them from the application.",
    content:
      "Runable loads environment files for the active Vite mode and variables already present in `process.env`. Use `useRuntime()` to read them from the application.",
    category: "structure",
  },
  {
    title: ".env",
    url: "https://runable.netlify.app/docs/structure/env",
    section: "Declare variables",
    excerpt:
      "Runable recognizes two prefixes: `RUN_` and `VITE_`. Prefer `RUN_` in new projects to distinguish Runable configuration clearly. ```dotenv",
    content:
      "Runable recognizes two prefixes: `RUN_` and `VITE_`. Prefer `RUN_` in new projects to distinguish Runable configuration clearly.\n\n```dotenv",
    category: "structure",
  },
  {
    title: ".env",
    url: "https://runable.netlify.app/docs/structure/env",
    section: "Available in the browser and during SSR",
    excerpt: "RUN_PUBLIC_API_BASE=/api RUN_PUBLIC_FEATURE_ENABLED=true",
    content: "RUN_PUBLIC_API_BASE=/api\nRUN_PUBLIC_FEATURE_ENABLED=true",
    category: "structure",
  },
  {
    title: ".env",
    url: "https://runable.netlify.app/docs/structure/env",
    section: "Available only on the server",
    excerpt:
      "RUN_DATABASE_URL=postgres://localhost/acme RUN_RETRY_COUNT=3 ``` The `PUBLIC_` segment controls client exposure: | Name in `.env` | Generated property | Client | Server | | --- | --- | --- | --- | | `RUN_PUBLIC_API_BASE`…",
    content:
      "RUN_DATABASE_URL=postgres://localhost/acme\nRUN_RETRY_COUNT=3\n```\n\nThe `PUBLIC_` segment controls client exposure:\n\n| Name in `.env` | Generated property | Client | Server |\n| --- | --- | --- | --- |\n| `RUN_PUBLIC_API_BASE` | `runtime.public.apiBase` | Yes | Yes |\n| `RUN_PUBLIC_APP_NAME` | `runtime.public.appName` | Yes | Yes |\n| `RUN_DATABASE_URL` | `runtime.databaseUrl` | No | Yes |\n| `RUN_RETRY_COUNT` | `runtime.retryCount` | No | Yes |\n\nRunable removes the prefix and converts the name to `camelCase`.",
    category: "structure",
  },
  {
    title: ".env",
    url: "https://runable.netlify.app/docs/structure/env",
    section: "Read configuration",
    excerpt:
      '`useRuntime()` is auto-imported into the Vue application: ```vue <script setup lang="ts"> const runtime = useRuntime(); const apiBase = runtime.public.apiBase; </script> <template> <a :href="`${apiBase}/projects`">View p…',
    content:
      '`useRuntime()` is auto-imported into the Vue application:\n\n```vue\n<script setup lang="ts">\nconst runtime = useRuntime();\n\nconst apiBase = runtime.public.apiBase;\n</script>\n\n<template>\n  <a :href="`${apiBase}/projects`">View projects</a>\n</template>\n```\n\nA private variable exists in the object produced for the SSR bundle, but not in the client bundle. Read it only in server code:\n\n```ts\nif (import.meta.server) {\n  const runtime = useRuntime();\n  console.log(runtime.databaseUrl);\n}\n```\n\nYou can also import `useRuntime` from `runable` in backend code. This version loads `.env`, merges values with `process.env`, and gives process variables priority.',
    category: "structure",
  },
  {
    title: ".env",
    url: "https://runable.netlify.app/docs/structure/env",
    section: "Generated types",
    excerpt:
      "At startup, Runable analyzes values and writes declarations to `.app/runtime.d.ts`. Your editor therefore knows the available properties without a manual TypeScript interface. ```dotenv RUN_PUBLIC_ENABLED=true RUN_PORT=3…",
    content:
      'At startup, Runable analyzes values and writes declarations to `.app/runtime.d.ts`. Your editor therefore knows the available properties without a manual TypeScript interface.\n\n```dotenv\nRUN_PUBLIC_ENABLED=true\nRUN_PORT=3000\nRUN_TAGS=["documentation","dashboard"]\n```\n\nThese values become a boolean, number, and array respectively. Runable also recognizes `null`, `undefined`, and valid JSON objects. Every other value remains a string.\n\nRestart the development server after adding or renaming a variable to regenerate types and injected values.',
    category: "structure",
  },
  {
    title: ".env",
    url: "https://runable.netlify.app/docs/structure/env",
    section: "Direct access with import.meta.env",
    excerpt:
      "Runable also replaces static accesses using the `RUN_` and `VITE_` prefixes: ```ts const apiBase = import.meta.env.RUN_PUBLIC_API_BASE; ``` Use dot notation and the full variable name. Dynamic access such as `import.meta…",
    content:
      "Runable also replaces static accesses using the `RUN_` and `VITE_` prefixes:\n\n```ts\nconst apiBase = import.meta.env.RUN_PUBLIC_API_BASE;\n```\n\nUse dot notation and the full variable name. Dynamic access such as `import.meta.env[key]` is not transformed.\n\n`useRuntime()` remains preferable: it clearly separates `public`, converts names, and provides generated types.\n\n::u-tip\n---\nvariant: destructive\nsurface: solid\ntitle: Never put a secret in a public variable\n---\n\nEvery `RUN_PUBLIC_*` or `VITE_PUBLIC_*` variable is bundled for the client. Treat its value as public.\n\nAlso avoid the `VITE_` prefix for secrets: Vite exposes `VITE_*` variables through `import.meta.env` independently of the object built by `useRuntime()`.\n\n::",
    category: "structure",
  },
  {
    title: ".env",
    url: "https://runable.netlify.app/docs/structure/env",
    section: "Files to commit",
    excerpt:
      "Keep local values in `.env` or standard Vite mode variants such as `.env.development` and `.env.production`. Commit a secret-free `.env.example` that describes the expected configuration. ```dotenv",
    content:
      "Keep local values in `.env` or standard Vite mode variants such as `.env.development` and `.env.production`. Commit a secret-free `.env.example` that describes the expected configuration.\n\n```dotenv",
    category: "structure",
  },
  {
    title: ".env",
    url: "https://runable.netlify.app/docs/structure/env",
    section: ".env.example",
    excerpt: "RUN_PUBLIC_API_BASE= RUN_DATABASE_URL= ```",
    content: "RUN_PUBLIC_API_BASE=\nRUN_DATABASE_URL=\n```",
    category: "structure",
  },
  {
    title: "error.vue",
    url: "https://runable.netlify.app/docs/structure/error-dot-vue",
    section:
      "Display a consistent interface when an error reaches the Vue application.",
    excerpt:
      'Create `app/error.vue` to customize the application\'s error screen. ```vue <!-- app/error.vue --> <script setup lang="ts"> const { error, clearError } = useAppError(); </script> <template> <main> <h1>An error occurred</h…',
    content:
      'Create `app/error.vue` to customize the application\'s error screen.\n\n```vue\n<!-- app/error.vue -->\n<script setup lang="ts">\nconst { error, clearError } = useAppError();\n</script>\n\n<template>\n  <main>\n    <h1>An error occurred</h1>\n    <p>{{ error?.message }}</p>\n    <button type="button" @click="clearError()">Try again</button>\n  </main>\n</template>\n```\n\nRunable captures Vue errors passed to the application handler and exposes their state through `useAppError()`. Keep the error component robust: avoid reusing logic that may have caused the failure.\n\n::u-tip\n---\nvariant: info\ntitle: HTTP errors remain in the backend\n---\n\n`error.vue` concerns the Vue interface. An error produced by an API route must still be converted into an HTTP response by Express, Fastify, Hono, or your other backend.\n\n::',
    category: "structure",
  },
  {
    title: ".gitignore",
    url: "https://runable.netlify.app/docs/structure/gitignore",
    section: "Ignore dependencies, builds, generated files, and local secrets.",
    excerpt:
      "A Runable project should at least ignore its dependencies, generated output, and local variables. ```gitignore node_modules/ .app/ .output/ .env .env.* !.env.example *.log .DS_Store ``` Adjust `.output/` and `.app/` if y…",
    content:
      "A Runable project should at least ignore its dependencies, generated output, and local variables.\n\n```gitignore\nnode_modules/\n.app/\n.output/\n\n.env\n.env.*\n!.env.example\n\n*.log\n.DS_Store\n```\n\nAdjust `.output/` and `.app/` if you changed `distdir` or `output` in `runable.config.ts`.\n\nCommit sources, configuration, `package.json`, the lockfile, and `.env.example`. Generated directories must be reproducible with `pnpm install`, `runable prepare`, and `runable build`.",
    category: "structure",
  },
  {
    title: "Project structure",
    url: "https://runable.netlify.app/docs/structure/index",
    section:
      "Quickly locate application code, configuration, generated files, and the production build in a Runable project.",
    excerpt:
      "Runable separates the code you write from the files it generates. Most of your work happens in `app/`, `server.ts`, and `runable.config.ts`. ```text my-app/ ├── app/ # Vue application ├── modules/ # Optional local Runabl…",
    content:
      "Runable separates the code you write from the files it generates. Most of your work happens in `app/`, `server.ts`, and `runable.config.ts`.\n\n```text\nmy-app/\n├── app/                 # Vue application\n├── modules/             # Optional local Runable modules\n├── public/              # Static files\n├── .app/                # Generated types and registries\n├── .output/             # Production build\n├── server.ts            # HTTP entry point\n├── runable.config.ts      # Runable configuration\n├── package.json\n└── tsconfig.json\n```",
    category: "structure",
  },
  {
    title: "Project structure",
    url: "https://runable.netlify.app/docs/structure/index",
    section: "Where should code go?",
    excerpt:
      "| Need | Location | | --- | --- | | Create a screen | `app/pages/` | | Share a visual structure | `app/layouts/` | | Reuse an interface | `app/components/` | | Reuse Vue logic | `app/composables/` | | Expose an auto-impo…",
    content:
      "| Need | Location |\n| --- | --- |\n| Create a screen | `app/pages/` |\n| Share a visual structure | `app/layouts/` |\n| Reuse an interface | `app/components/` |\n| Reuse Vue logic | `app/composables/` |\n| Expose an auto-imported function | `app/globals/` |\n| Install a Vue integration | `app/plugins/` |\n| Control navigation | `app/middlewares/` |\n| Add an API route | Your backend, often from `server.ts` |\n| Extend Runable | `modules/` or a dedicated package |\n\n::u-tip\n---\nvariant: warning\ntitle: Do not edit generated directories\n---\n\nRunable may rewrite `.app/` during preparation and `.output/` during builds. Always fix the source file or configuration that produced the generated content.\n\n::",
    category: "structure",
  },
  {
    title: "Project structure",
    url: "https://runable.netlify.app/docs/structure/index",
    section: "Optional directories",
    excerpt:
      "Conventional directories are scanned even when they do not exist yet. Create only those your application needs. You can also relocate each convention from `runable.config.ts`.",
    content:
      "Conventional directories are scanned even when they do not exist yet. Create only those your application needs. You can also relocate each convention from `runable.config.ts`.",
    category: "structure",
  },
  {
    title: "modules",
    url: "https://runable.netlify.app/docs/structure/modules",
    section:
      "Develop local Runable modules before extracting them into a package.",
    excerpt:
      "The `modules/` directory is a recommended location for project-specific Runable extensions. It is not scanned automatically: declare each module in the configuration. ```text modules/ └── analytics/ └── runable.config.ts…",
    content:
      'The `modules/` directory is a recommended location for project-specific Runable extensions. It is not scanned automatically: declare each module in the configuration.\n\n```text\nmodules/\n└── analytics/\n    └── runable.config.ts\n```\n\n```ts\n// runable.config.ts\nexport default defineConfig({\n  modules: ["./modules/analytics"],\n});\n```\n\nA module can provide components, composables, globals, layouts, and plugins, then expose its own typed options. Use a local module to group cross-cutting functionality. Extract it into an npm package when several projects need to share it.\n\nThe directory may use another name; only the `modules` array value matters.',
    category: "structure",
  },
  {
    title: "node_modules",
    url: "https://runable.netlify.app/docs/structure/node-modules",
    section: "Manage dependencies installed by the package manager.",
    excerpt:
      "The package manager creates `node_modules/` from `package.json` and the lockfile. Runable, Vue, Vite, and the selected backend are installed there. Never edit a file in this directory. Add or update the relevant dependen…",
    content:
      "The package manager creates `node_modules/` from `package.json` and the lockfile. Runable, Vue, Vite, and the selected backend are installed there.\n\nNever edit a file in this directory. Add or update the relevant dependency, then reinstall:\n\n```bash\npnpm install\n```\n\nFrameworks supported by Runable adapters are dependencies of the consuming project. For example, an application that calls `express()` installs `express`, while a Hono application installs `hono`.\n\nAlways add `node_modules/` to `.gitignore`. Commit `package.json` and the lockfile instead to get reproducible installations.",
    category: "structure",
  },
  {
    title: ".output",
    url: "https://runable.netlify.app/docs/structure/output",
    section: "Understand the production build generated by Runable.",
    excerpt:
      "`runable build` writes the production build to `.output/` by default. ```text .output/ ├── client/ │ ├── assets/ # Hashed JavaScript, CSS, and assets │ └── index.html ├── server/ # SSR bundle when SSR is enabled └── mani…",
    content:
      "`runable build` writes the production build to `.output/` by default.\n\n```text\n.output/\n├── client/\n│   ├── assets/          # Hashed JavaScript, CSS, and assets\n│   └── index.html\n├── server/              # SSR bundle when SSR is enabled\n└── manifest.js          # Entries used by the Runable runtime\n```\n\nWith `ssr: false`, Runable does not produce a server bundle. The `client/` directory is enough to start the application in the browser.",
    category: "structure",
  },
  {
    title: ".output",
    url: "https://runable.netlify.app/docs/structure/output",
    section: "Change the location",
    excerpt:
      '```ts // runable.config.ts export default defineConfig({ distdir: "dist", }); ``` Add the selected directory to `.gitignore`. Your deployment pipeline should rebuild it rather than commit it. ::u-tip --- variant: info ti…',
    content:
      '```ts\n// runable.config.ts\nexport default defineConfig({\n  distdir: "dist",\n});\n```\n\nAdd the selected directory to `.gitignore`. Your deployment pipeline should rebuild it rather than commit it.\n\n::u-tip\n---\nvariant: info\ntitle: Do not confuse .app and .output\n---\n\n`.app/` supports development and typing. `.output/` contains files executed or served in production.\n\n::',
    category: "structure",
  },
  {
    title: "package.json",
    url: "https://runable.netlify.app/docs/structure/package-json",
    section:
      "Declare scripts, dependencies, and runtime constraints for a Runable project.",
    excerpt:
      '`package.json` describes the project and commands used in development or production. ```json { "name": "my-runable-app", "private": true, "type": "module", "scripts": { "dev": "tsx watch server.ts", "app:prepare": "runab…',
    content:
      '`package.json` describes the project and commands used in development or production.\n\n```json\n{\n  "name": "my-runable-app",\n  "private": true,\n  "type": "module",\n  "scripts": {\n    "dev": "tsx watch server.ts",\n    "app:prepare": "runable prepare",\n    "app:build": "runable build",\n    "typecheck": "vue-tsc --noEmit"\n  },\n  "dependencies": {\n    "runable": "latest",\n    "express": "latest",\n    "vue": "latest",\n    "vue-router": "latest"\n  },\n  "devDependencies": {\n    "@runablejs/cli": "latest",\n    "@types/express": "latest",\n    "tsx": "latest",\n    "typescript": "latest",\n    "vue-tsc": "latest"\n  }\n}\n```\n\nKeep `runable`, Vue, and the backend in `dependencies`: they are needed at runtime. Types, the CLI, and checking tools generally belong in `devDependencies`.\n\nThe `"type": "module"` field enables ES modules in `server.ts` and `runable.config.ts`.',
    category: "structure",
  },
  {
    title: "public",
    url: "https://runable.netlify.app/docs/structure/public",
    section: "Serve static files without importing them into Vue code.",
    excerpt:
      "Put files that must keep their name and be served directly from the site root in `public/`. ```text public/ ├── favicon.svg → /favicon.svg └── robots.txt → /robots.txt ``` Reference them with an absolute URL from the roo…",
    content:
      'Put files that must keep their name and be served directly from the site root in `public/`.\n\n```text\npublic/\n├── favicon.svg       → /favicon.svg\n└── robots.txt        → /robots.txt\n```\n\nReference them with an absolute URL from the root:\n\n```vue\n<img src="/logo.svg" alt="Acme" />\n```\n\nFor images imported by a component and optimized by Vite, prefer a source directory such as `app/assets/` and a JavaScript import.\n\nYou can relocate or disable this directory:\n\n```ts\nexport default defineConfig({\n  publicDir: "static",\n  // publicDir: false,\n});\n```\n\nUse `false` when your backend, a proxy, or a CDN already serves every static file.',
    category: "structure",
  },
  {
    title: "runable.config.ts",
    url: "https://runable.netlify.app/docs/structure/runable-config",
    section:
      "Configure conventions, SSR, modules, and Vite from the project's central file.",
    excerpt:
      'This file is Runable\'s source of truth. Place it at the root and export the result of `defineConfig()`. ```ts // runable.config.ts import { defineConfig } from "runable"; export default defineConfig({ ssr: true, head: {…',
    content:
      'This file is Runable\'s source of truth. Place it at the root and export the result of `defineConfig()`.\n\n```ts\n// runable.config.ts\nimport { defineConfig } from "runable";\n\nexport default defineConfig({\n  ssr: true,\n  head: {\n    title: "My application",\n  },\n  css: ["./app/css/main.css"],\n  modules: [],\n});\n```\n\nRelative paths are resolved from the configuration directory. Main conventions use these defaults:\n\n| Option | Value |\n| --- | --- |\n| `appDir` | `app` |\n| `output` | `.app` |\n| `distdir` | `.output` |\n| `publicDir` | `public` |\n| `ssr` | `true` |\n\nThe `pages`, `layouts`, `components`, `composables`, `globals`, `plugins`, and `middlewares` options replace their conventional sources when defined.\n\nUse `vite` to add an allowed Vite plugin or option:\n\n```ts\nexport default defineConfig({\n  vite: {\n    server: { port: 5173 },\n  },\n});\n```\n\nSee <a href="/docs/getting-started/configuration.md">Configuration</a> for all options.',
    category: "structure",
  },
  {
    title: "server.ts",
    url: "https://runable.netlify.app/docs/structure/server",
    section:
      "Start your backend and mount the Runable adapter as the last middleware.",
    excerpt:
      '`server.ts` is your backend entry point. It configures the HTTP server, API routes, and Runable adapter. ```ts // server.ts import Express from "express"; import { express } from "runable/adapters/express"; const server…',
    content:
      '`server.ts` is your backend entry point. It configures the HTTP server, API routes, and Runable adapter.\n\n```ts\n// server.ts\nimport Express from "express";\nimport { express } from "runable/adapters/express";\n\nconst server = Express();\n\nserver.get("/api/health", (_req, res) => {\n  res.json({ status: "ok" });\n});\n\nserver.use(express());\n\nserver.listen(3000, () => {\n  console.log("http://localhost:3000");\n});\n```\n\nPlace API routes and application middleware before the adapter. Runable then receives only requests that have not already produced a response.\n\nThe `server.ts` name is a project convention, not a framework requirement. You can split the backend across files or use the entry point required by NestJS, AdonisJS, Bun, or Deno.\n\nThe adapter initializes the Runable instance once, connects Vite in development, and uses the `.output/` build in production.',
    category: "structure",
  },
  {
    title: ".app/tsconfig.app.json",
    url: "https://runable.netlify.app/docs/structure/tsconfig-app",
    section:
      "Use the TypeScript configuration generated by Runable and extend it only when the project needs to.",
    excerpt:
      "Runable generates this configuration with `runable prepare`. It covers Vue components, `app/` sources, and declarations produced in `.app/`. It configures strict mode, `Bundler` resolution, browser libraries, Vue JSX, `n…",
    content:
      "Runable generates this configuration with `runable prepare`. It covers Vue components, `app/` sources, and declarations produced in `.app/`.\n\nIt configures strict mode, `Bundler` resolution, browser libraries, Vue JSX, `noEmit`, project aliases, and `#build/*`.\n\nRun `runable prepare` before the first type check. This command generates declarations for routes, components, layouts, plugins, and auto-imports.\n\n::u-tip\n---\nvariant: warning\ntitle: Do not edit the generated file\n---\n\nRunable may rewrite `.app/tsconfig.app.json`. Direct customizations will be lost during the next preparation.\n\n::",
    category: "structure",
  },
  {
    title: ".app/tsconfig.app.json",
    url: "https://runable.netlify.app/docs/structure/tsconfig-app",
    section: "Recommended minimal configuration",
    excerpt:
      'When the generated settings suit your project, reference the file directly from `tsconfig.json`: ```json { "files": [], "references": [ { "path": "./.app/tsconfig.app.json" }, { "path": "./tsconfig.node.json" } ] } ``` I…',
    content:
      'When the generated settings suit your project, reference the file directly from `tsconfig.json`:\n\n```json\n{\n  "files": [],\n  "references": [\n    { "path": "./.app/tsconfig.app.json" },\n    { "path": "./tsconfig.node.json" }\n  ]\n}\n```\n\nIn this case, do not create a root `tsconfig.app.json`.',
    category: "structure",
  },
  {
    title: ".app/tsconfig.app.json",
    url: "https://runable.netlify.app/docs/structure/tsconfig-app",
    section: "Add project options",
    excerpt:
      'Create a root file only when the application needs additional options: ```json { "extends": "./.app/tsconfig.app.json", "compilerOptions": { "exactOptionalPropertyTypes": true } } ``` Then update the root reference: ```j…',
    content:
      'Create a root file only when the application needs additional options:\n\n```json\n{\n  "extends": "./.app/tsconfig.app.json",\n  "compilerOptions": {\n    "exactOptionalPropertyTypes": true\n  }\n}\n```\n\nThen update the root reference:\n\n```json\n{\n  "files": [],\n  "references": [\n    { "path": "./tsconfig.app.json" },\n    { "path": "./tsconfig.node.json" }\n  ]\n}\n```\n\nKeep this layer short. Do not duplicate aliases or files already included by Runable.',
    category: "structure",
  },
  {
    title: "tsconfig.node.json",
    url: "https://runable.netlify.app/docs/structure/tsconfig-node",
    section:
      "Type the server, Runable configuration, and scripts executed by Node.js.",
    excerpt:
      'This configuration covers `server.ts`, `runable.config.ts`, and other server-side tools. ```json { "compilerOptions": { "strict": true, "noEmit": true, "target": "ESNext", "module": "NodeNext", "moduleResolution": "NodeN…',
    content:
      'This configuration covers `server.ts`, `runable.config.ts`, and other server-side tools.\n\n```json\n{\n  "compilerOptions": {\n    "strict": true,\n    "noEmit": true,\n    "target": "ESNext",\n    "module": "NodeNext",\n    "moduleResolution": "NodeNext",\n    "types": ["node"]\n  },\n  "include": [\n    "server.ts",\n    "runable.config.ts",\n    "scripts/**/*.ts"\n  ]\n}\n```\n\nInstall `@types/node` to type `process`, paths, the file system, and other Node.js APIs.\n\nIf your server uses Bun or Deno, replace types and resolution options with those recommended by that runtime. The Vue application configuration remains separate in `.app/tsconfig.app.json` or the optional root file that extends it.',
    category: "structure",
  },
  {
    title: "tsconfig.json",
    url: "https://runable.netlify.app/docs/structure/tsconfig",
    section: "Connect the frontend and server TypeScript configurations.",
    excerpt:
      'The root configuration coordinates frontend and server environments without mixing their types. ```json { "files": [], "references": [ { "path": "./.app/tsconfig.app.json" }, { "path": "./tsconfig.node.json" } ] } ``` `.…',
    content:
      'The root configuration coordinates frontend and server environments without mixing their types.\n\n```json\n{\n  "files": [],\n  "references": [\n    { "path": "./.app/tsconfig.app.json" },\n    { "path": "./tsconfig.node.json" }\n  ]\n}\n```\n\n`.app/tsconfig.app.json` is generated by `runable prepare`. It already contains `app/` sources, Runable declarations, aliases, and Vue-specific options. You do not need a root `tsconfig.app.json` unless you want project-specific settings.\n\nThis separation prevents Node types from leaking into Vue components or server code from assuming that `window` exists.\n\nRun the check with:\n\n```bash\npnpm vue-tsc --build\n```\n\nRun `runable prepare` first, especially after a new installation or after deleting `.app/`.\n\nIf you create a root `tsconfig.app.json` to customize TypeScript, point the reference to that file. It must extend the generated configuration instead of copying it.',
    category: "structure",
  },
];
