import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryEl = document.querySelector('.gallery');
const bodyEl = document.querySelector('body');
const galleryMarkup = createCardsMarkup(galleryItems);

galleryEl.insertAdjacentHTML('beforeend', galleryMarkup);
galleryEl.addEventListener('click', onGalleryClick);

function createCardsMarkup(images) {
  return images
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item"><a class="gallery__link" href="${original}"><img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}"/></a></li>`;
    })
    .join('');
}

function onGalleryClick(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  e.preventDefault();

  const urlOriginal = e.target.dataset.source;
  const alt = e.target.alt;
  const instance = basicLightbox.create(`<img src="${urlOriginal}" alt="${alt}"/>`);

  instance.show();
  bodyEl.addEventListener(
    'keydown',
    e => {
      if (e.code === 'Escape') {
        instance.close();
      }
    },
    { once: true }
  );
}
