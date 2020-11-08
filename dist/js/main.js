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

    let pubDate = item.getElementsByTagName('pubDate')[0].textContent;
    let dateMS = Date.parse(pubDate);
    let dateObject = new Date(dateMS);

    let mediaQuery = window.matchMedia('(min-width: 550px)');
    let options = {};
    let formattedDate = '';

    if (mediaQuery.matches) {
      options = {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZoneName: "short"
      };
      formattedDate = dateObject.toLocaleString('en-US', options);
    } else {
      options = {
        dateStyle: "short",
      }
      formattedDate = dateObject.toLocaleDateString('en-US', options);
    }
        
    let category = item.getElementsByTagName('category')[0].textContent;
    let content = item.getElementsByTagName('content:encoded')[0].textContent;
    blogPost.innerHTML = `
      <a target="_blank" class="news__blog-post-title" href="${link}"><h3>${title}</h3></a>
      <div class="news__blog-post-nav"><p class="news__blog-post-tags"><a target="_blank" href="${link}" class="news__blog-post-date"><i class="far fa-calendar-alt"></i> ${formattedDate}</a><a target="_blank" href="http://tombraider-dox.com/author/${creator}/" class="news__blog-post-author"><i class="fas fa-user"></i> ${creator}</a><a target="_blank" href="http://tombraider-dox.com/category/${category}/" class="news__blog-post-category"><i class="fas fa-tag"></i> ${category}</a></p></div>
      <div class="news__blog-post-content">
      ${content}</div>
    `
    blog.append(blogPost);
  });
  latestPost = blog.getElementsByClassName('news__blog-post')[0];
  latestPost.style.display = "grid";
  latestPost.getElementsByClassName('news__blog-post-nav')[0].insertAdjacentHTML("afterbegin",`<a class="news__blog-post-back" onclick="showPreviousPost(this)" title="Previous Post"><i class="fas fa-chevron-left"></i></a>`);
  let blogImages = blog.querySelectorAll('img');
  Array.prototype.forEach.call(blogImages, blogImage => {
    let fileName = blogImage.src.substring(blogImage.src.lastIndexOf('/')+1);
    let newFilePath = `img/blog/${fileName}`;
    blogImage.src = newFilePath;
  });
  blogPostLinks = blog.querySelectorAll('.news__blog-post-content a');
  Array.prototype.forEach.call(blogPostLinks, link => {
    link.target = '_blank';
  })
}

function showPreviousPost(target) {
  visiblePost = target.parentElement.parentElement;
  visibleIndex = Array.prototype.indexOf.call(blog.children, visiblePost);
  previousPost = blog.getElementsByClassName('news__blog-post')[visibleIndex + 1];
  prevousIndex = Array.prototype.indexOf.call(blog.children, previousPost);
  visiblePost.style.display = "none";
  previousPost.style.display = "grid";
  if (prevousIndex < (blog.children.length - 1)) {
    previousPost.getElementsByClassName('news__blog-post-nav')[0].insertAdjacentHTML("afterbegin",`<a class="news__blog-post-back" onclick="showPreviousPost(this)" title="Previous Post"><i class="fas fa-chevron-left"></i></a>`);
  }
  previousPost.getElementsByClassName('news__blog-post-nav')[0].insertAdjacentHTML("beforeend",`<a class="news__blog-post-forward" onclick="showNextPost(this)" title="Next Post"><i class="fas fa-chevron-right"></i></a>`);
}

function showNextPost(target) {
  visiblePost = target.parentElement.parentElement;
  visibleIndex = Array.prototype.indexOf.call(blog.children, visiblePost);
  nextPost = blog.getElementsByClassName('news__blog-post')[visibleIndex - 1];
  prevousIndex = Array.prototype.indexOf.call(blog.children, nextPost);
  visiblePost.style.display = "none";
  nextPost.style.display = "grid";
  if (prevousIndex > 0) {
    nextPost.getElementsByClassName('news__blog-post-nav')[0].insertAdjacentHTML("beforeend",`<a class="news__blog-post-forward" onclick="showNextPost(this)" title="Next Post"><i class="fas fa-chevron-right"></i></a>`);
  }
  nextPost.getElementsByClassName('news__blog-post-nav')[0].insertAdjacentHTML("afterbegin",`<a class="news__blog-post-back" onclick="showPreviousPost(this)" title="Previous Post"><i class="fas fa-chevron-left"></i></a>`);
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