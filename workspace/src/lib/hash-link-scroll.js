let hashFragment = '';
let observer = null;
let asyncTimerId = null;
let scrollToElement = null;

const reset = () => {
  hashFragment = '';
  observer?.disconnect();
  observer = null;

  if (asyncTimerId !== null) {
    clearTimeout(asyncTimerId);
    asyncTimerId = null;
  }
};

const isInteractiveElement = (element) => {
  const formTags = ['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'];
  const linkTags = ['A', 'AREA'];

  return (
    (formTags.includes(element.tagName) && !element.hasAttribute('disabled')) ||
    (linkTags.includes(element.tagName) && element.hasAttribute('href'))
  );
};

const focusElement = (element) => {
  const originalTabIndex = element.getAttribute('tabindex');
  const isInteractive = isInteractiveElement(element);

  if (originalTabIndex === null && !isInteractive) {
    element.setAttribute('tabindex', '-1');
  }

  element.focus({ preventScroll: true });

  if (originalTabIndex === null && !isInteractive) {
    element.blur();
    element.removeAttribute('tabindex');
  }
};

const findAndScrollToElement = () => {
  const targetId = hashFragment.replace('#', '');
  const targetElement = hashFragment === '#' ? document.body : document.getElementById(targetId);

  if (!targetElement) {
    return false;
  }

  scrollToElement?.(targetElement);
  focusElement(targetElement);
  reset();

  return true;
};

export const scrollToHash = (hash, { smooth = true, timeout = 10000 } = {}) => {
  reset();
  hashFragment = hash;
  scrollToElement = (element) =>
    element.scrollIntoView(smooth ? { behavior: 'smooth' } : undefined);

  setTimeout(() => {
    if (findAndScrollToElement()) {
      return;
    }

    observer = new MutationObserver(findAndScrollToElement);
    observer.observe(document, { attributes: true, childList: true, subtree: true });

    asyncTimerId = setTimeout(reset, timeout);
  }, 0);
};

export const getHashFromTo = (to) =>
  to.includes('#') ? `#${to.split('#').slice(1).join('#')}` : '';

export const isPlainLeftClick = (event) =>
  !event.defaultPrevented &&
  event.button === 0 &&
  !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
