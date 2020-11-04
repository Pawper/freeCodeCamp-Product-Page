function closeMenu() {
  let toggleInput = document.getElementById('navbar-collapse');
  toggleInput.checked = false;
}

document.addEventListener('DOMContentLoaded', () => {
  let url = 'feed.xml';
  fetch(url)
  .then(response => response.text())
  .then(data => {
    let parser = new DOMParser();
    let xml = parser.parseFromString(data, "application/xml");
    // blog.textContent = data;
    // console.log(xml);
    buildBlogPosts(xml);
  })
});
    
let blog = document.getElementsByClassName('news__blog')[0];
function buildBlogPosts(xml) {
  let blogPosts = xml.getElementsByTagName('item');
  Array.prototype.forEach.call(blogPosts, item => {
    let blogPost = document.createElement('article');
    blogPost.setAttribute('class' ,'news__blog-post');

    let title = item.getElementsByTagName('title')[0].textContent;

    let link = item.getElementsByTagName('link')[0].textContent;
    let creator = item.getElementsByTagName('dc:creator')[0].textContent;
    let date = item.getElementsByTagName('pubDate')[0].textContent;
    let category = item.getElementsByTagName('category')[0].textContent;
    let description = item.getElementsByTagName('description')[0].textContent;
    let content = item.getElementsByTagName('content:encoded')[0].textContent;
    blogPost.innerHTML = `
      <a class="news__blog-post-title" href="${link}"><h3>${title}</h3></a>
      <div class="news__blog-post-content"><p class="news__blog-post-tags"><a href="${link}" class="news__blog-post-date"><i class="far fa-calendar-alt"></i> ${date}</a><a href="http://tombraider-dox.com/author/${creator}/" class="news__blog-post-author"><i class="fas fa-user"></i> ${creator}</a><a href="http://tombraider-dox.com/category/${category}/" class="news__blog-post-category"><i class="fas fa-tag"></i> ${category}</a></p>
      ${content}</div>
    `
    blog.append(blogPost);
  });  
}


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
      image.src = `img/gallery/${aspectRatio}/thumb/${imageIndex}.png`
      image.onload = exists;
      image.onerror = absent;
    }
  }
  
  function exists() {
    let srcBreakup = this.src.split('/').reverse();
    let linkURL = `${srcBreakup[4]}/${srcBreakup[3]}/${srcBreakup[2]}/full/${srcBreakup[0]}`;
    // console.log(`${document.URL.substr(0,document.URL.lastIndexOf('/'))}/${linkURL}`);
    imageThumbs.push(image);
    imageFulls.push(linkURL);
    imageIndex++;
    newLoop = true;
  }

  function absent() {
    breakLoop = true;
  }
}

addGalleryImages('landscape');
addGalleryImages('portrait');
addGalleryImages('square');

let vidIndex = 1;
showVid(vidIndex);

function nextVid(vid) {
  showVid(vidIndex += vid);
}

function showVid(vid) {
  let vids = document.getElementsByClassName("gameplay__video")
  if (vid > vids.length) { vidIndex = 1 }
  if (vid < 1) { vidIndex = vids.length }
  Array.prototype.forEach.call(vids, (vid) => {
    vid.style.display = "none";
  })
  vids[vidIndex-1].style.display = "block";
}