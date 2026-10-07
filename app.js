const homeScreen = document.getElementById('home-screen');
const proxyFrame = document.getElementById('proxy-frame');
const browserForm = document.getElementById('browser-form');
const browserInput = document.getElementById('browser-input');

const DEFAULT_URL = 'https://duckduckgo.com/';

function isLikelyUrl(value) {
  const trimmed = value.trim();
  if (!trimmed) return false;

  if (/^https?:\/\//i.test(trimmed)) return true;
  if (/^\w+\.\w+/i.test(trimmed)) return true;
  return false;
}

function buildDuckDuckGoUrl(value) {
  const trimmed = value.trim();
  if (!trimmed) return DEFAULT_URL;

  if (isLikelyUrl(trimmed)) {
    const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    return withProtocol;
  }

  return `https://duckduckgo.com/?q=${encodeURIComponent(trimmed)}`;
}

function openPage(rawValue) {
  const target = buildDuckDuckGoUrl(rawValue);
  proxyFrame.src = target;
  proxyFrame.classList.add('visible');
  homeScreen.classList.remove('visible');
  browserInput.value = target;
}

browserForm.addEventListener('submit', (event) => {
  event.preventDefault();
  openPage(browserInput.value);
});

const navButtons = document.querySelectorAll('.nav-btn');
navButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;

    if (!proxyFrame.src) {
      proxyFrame.src = DEFAULT_URL;
    }

    if (action === 'back') {
      proxyFrame.contentWindow?.history.back();
    }

    if (action === 'forward') {
      proxyFrame.contentWindow?.history.forward();
    }

    if (action === 'reload') {
      proxyFrame.contentWindow?.location.reload();
    }
  });
});

proxyFrame.addEventListener('load', () => {
  const currentUrl = proxyFrame.contentWindow?.location.href || DEFAULT_URL;
  if (currentUrl !== 'about:blank') {
    browserInput.value = currentUrl;
  }
});

window.addEventListener('load', () => {
  proxyFrame.src = DEFAULT_URL;
  proxyFrame.classList.add('visible');
  homeScreen.classList.remove('visible');
  browserInput.value = DEFAULT_URL;
});
