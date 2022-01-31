export default class Blog {
    constructor() {
        this.xmlSource = 'feed.xml';
        this.blog = document.getElementsByClassName('news__blog')[0];
        this.events();
    }

    async events() {
        document.addEventListener('DOMContentLoaded', this.buildBlogPosts(await this.getBlogObject(this.xmlSource)))
    }

    async getBlogObject(xmlSource) {
        let response = await fetch(xmlSource);
        let xmlString = await response.text();
        let parser = new DOMParser();
        let xml = parser.parseFromString(xmlString, "application/xml")
        return xml;
    }

    buildBlogPosts(xml) {
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
          this.blog.append(blogPost);
        });
        let latestPost = this.blog.getElementsByClassName('news__blog-post')[0];
        latestPost.style.display = "grid";
        latestPost.getElementsByClassName('news__blog-post-nav')[0].insertAdjacentHTML("afterbegin",`<a class="news__blog-post-back" onclick="showPreviousPost(this)" title="Previous Post"><i class="fas fa-chevron-left"></i></a>`);
        let blogImages = this.blog.querySelectorAll('img');
        Array.prototype.forEach.call(blogImages, blogImage => {
          let fileName = blogImage.src.substring(blogImage.src.lastIndexOf('/')+1);
          let newFilePath = `img/blog/${fileName}`;
          blogImage.src = newFilePath;
        });
        let blogPostLinks = this.blog.querySelectorAll('.news__blog-post-content a');
        Array.prototype.forEach.call(blogPostLinks, link => {
          link.target = '_blank';
        })
    }
}