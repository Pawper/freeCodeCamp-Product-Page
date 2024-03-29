let gallery = document.getElementsByClassName('images__grid')[0];

function addGalleryImages(aspectRatio) {
  let newLoop = true;
  let breakLoop = false;

  let image;
  let imageThumbs = new Array();
  let imageFulls = new Array();
  let imageIndex = 1;

  let interval = setInterval(addImage, 1);

  function addImage() {
    if (breakLoop) {
      clearInterval(interval);
      let elements = imageThumbs.map((x, i) => {return [x, imageFulls[i]]});
      elements.forEach((element, index) => {
        let photoElement = document.createElement('a');
        photoElement.setAttribute('href', element[1]);
        photoElement.setAttribute('target', '_blank');
        photoElement.setAttribute('class', `images__${aspectRatio}`);
        photoElement.appendChild(element[0]);

        if (index === 0) {
          gallery.append(photoElement);
        } else {
          let galleryPhotos = gallery.children;  
          let number = galleryPhotos.length;
          let insertionPoint = Math.floor((number + 1) * Math.random());
  
          if (number === insertionPoint) {
            gallery.append(photoElement)
          } else {
            galleryPhotos[insertionPoint].before(photoElement);
          }
        }
        
      });
    }

    if (newLoop) {
      newLoop = false;
      image = new Image();
      image.src = `../img/gallery/${aspectRatio}/thumb/${imageIndex}.png`
      // image.loading = 'lazy'; // doesn't seem to work in Chrome
      image.onload = exists;
      image.onerror = absent;
    }
  }
  
  function exists() {
    let srcBreakup = this.src.split('/').reverse();
    let linkURL = `${srcBreakup[4]}/${srcBreakup[3]}/${srcBreakup[2]}/full/${srcBreakup[0]}`;
    imageThumbs.push(image);
    imageFulls.push(linkURL);
    imageIndex++;
    newLoop = true;
  }

  function absent() {
    console.log("^ Image does not exist, so not adding to gallery.")
    breakLoop = true;
  }
}

addGalleryImages('landscape');
addGalleryImages('portrait');
addGalleryImages('square');