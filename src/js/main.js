import '../sass/main.scss';
import Blog from './modules/Blog';
import closeMenu from './modules/closeMenu';
import Videos from './modules/Videos';
import gallery from './modules/gallery';

new Videos();
let blogInstance = new Blog();
let blog = blogInstance.blog;

window.showPreviousPost = function (target) {
  let visiblePost = target.parentElement.parentElement;
  let visibleIndex = Array.prototype.indexOf.call(blog.children, visiblePost);
  let previousPost = blog.getElementsByClassName('news__blog-post')[visibleIndex + 1];
  let prevousIndex = Array.prototype.indexOf.call(blog.children, previousPost);
  visiblePost.style.display = "none";
  previousPost.style.display = "grid";
  if (prevousIndex < (blog.children.length - 1)) {
    previousPost.getElementsByClassName('news__blog-post-nav')[0].insertAdjacentHTML("afterbegin", `<a class="news__blog-post-back" onclick="showPreviousPost(this)" title="Previous Post"><i class="fas fa-chevron-left"></i></a>`);
  }
  previousPost.getElementsByClassName('news__blog-post-nav')[0].insertAdjacentHTML("beforeend", `<a class="news__blog-post-forward" onclick="showNextPost(this)" title="Next Post"><i class="fas fa-chevron-right"></i></a>`);
}

window.showNextPost = function (target) {
  let visiblePost = target.parentElement.parentElement;
  let visibleIndex = Array.prototype.indexOf.call(blog.children, visiblePost);
  let nextPost = blog.getElementsByClassName('news__blog-post')[visibleIndex - 1];
  let prevousIndex = Array.prototype.indexOf.call(blog.children, nextPost);
  visiblePost.style.display = "none";
  nextPost.style.display = "grid";
  if (prevousIndex > 0) {
    nextPost.getElementsByClassName('news__blog-post-nav')[0].insertAdjacentHTML("beforeend", `<a class="news__blog-post-forward" onclick="showNextPost(this)" title="Next Post"><i class="fas fa-chevron-right"></i></a>`);
  }
  nextPost.getElementsByClassName('news__blog-post-nav')[0].insertAdjacentHTML("afterbegin", `<a class="news__blog-post-back" onclick="showPreviousPost(this)" title="Previous Post"><i class="fas fa-chevron-left"></i></a>`);
}

closeMenu();