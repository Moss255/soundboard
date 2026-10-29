import { currentUser } from './auth';

// router.ts
type RouteParams = Record<string, string | undefined>;

/** A page component: any custom element that accepts route params. */
interface PageElement extends HTMLElement {
  params?: RouteParams;
}

interface RouteDefinition {
  path: string;
  tag: string;
  load: () => Promise<unknown>;
}

interface Route extends RouteDefinition {
  pattern: URLPattern;
}

interface RouteMatch {
  route: Route;
  params: RouteParams;
}

const routeDefinitions: RouteDefinition[] = [
  { path: '/upload', tag: 'upload-page',     load: () => import('../pages/upload-page') },
  { path: '/',  tag: 'soundboard-page', load: () => import('../pages/soundboard-page') },
  { path: '/login', tag: 'login-page', load: () => import('../pages/login-page')},
  { path: '/share', tag: 'share-page', load: () => import('../pages/share-page')},
  { path: '/management', tag: 'management-page', load: () => import('../pages/management-page')},
];

const routes: Route[] = routeDefinitions.map((r) => ({
  ...r,
  pattern: new URLPattern({ pathname: r.path }),
}));

function getOutlet(selector: string): HTMLElement {
  const el = document.querySelector<HTMLElement>(selector);
  if (!el) throw new Error(`Router outlet "${selector}" not found`);
  return el;
}

const outlet = getOutlet('#app');

function match(url: string): RouteMatch | null {
  for (const route of routes) {
    const result = route.pattern.exec(url);
    if (result) return { route, params: result.pathname.groups };
  }
  return null;
}

async function render(url: string): Promise<void> {
  const found = match(url);
  if (!found) {
    outlet.replaceChildren(document.createElement('not-found-page'));
    return;
  }
  await found.route.load(); // lazy-load the page's code
  const page = document.createElement(found.route.tag) as PageElement;
  page.params = found.params; // e.g. { id: '42' }
  outlet.replaceChildren(page);
}

navigation.addEventListener('navigate', (e: NavigateEvent) => {
  if (!currentUser()) navigation.navigate('/login')
  // Leave downloads, hash links, form posts and other sites to the browser
  if (!e.canIntercept || e.hashChange || e.downloadRequest || e.formData) return;
  const url = e.destination.url;
  e.intercept({ handler: () => render(url) });
});

void render(location.href); // initial page load