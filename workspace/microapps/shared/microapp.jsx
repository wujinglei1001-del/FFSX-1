import { createRoot } from 'react-dom/client';

const roots = new WeakMap();

export const createMicroAppLifecycle = (App) => ({
  bootstrap: async () => undefined,
  mount: async (props = {}) => {
    const mountContainer =
      props.container?.querySelector('[data-ffax-micro-root]') ||
      document.querySelector('[data-ffax-micro-root]');
    if (!mountContainer) throw new Error('microapp_mount_container_missing');
    roots.get(mountContainer)?.unmount();
    const root = createRoot(mountContainer);
    roots.set(mountContainer, root);
    root.render(<App platform={props} />);
  },
  unmount: async (props = {}) => {
    const mountContainer =
      props.container?.querySelector('[data-ffax-micro-root]') ||
      document.querySelector('[data-ffax-micro-root]');
    const root = mountContainer ? roots.get(mountContainer) : null;
    root?.unmount();
    if (mountContainer) roots.delete(mountContainer);
  },
  update: async () => undefined,
});
