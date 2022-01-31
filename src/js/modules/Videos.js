export default class Videos {
    constructor() {
        this.videos = document.getElementsByClassName("gameplay__video");
        this.previousButton = document.querySelector('.gameplay__previous-video')
        this.nextButton = document.querySelector('.gameplay__next-video')
        this.currentVideo = this.videos[0];
        this.updateVideoOrder();
        this.hideVideos();
        this.showVideo(this.currentVideo);
        this.events();
    }

    events() {
        this.previousButton.addEventListener('click', () => this.showPreviousVideo());
        this.nextButton.addEventListener('click', () => this.showNextVideo());
    }

    updateVideoOrder() {
        let currentVideoIndex = Array.from(this.videos).indexOf(this.currentVideo);
        let previousVideoIndex = currentVideoIndex - 1;
        let nextVideoIndex = currentVideoIndex + 1;
        let lastVideoIndex = this.videos.length - 1;
        
        if (currentVideoIndex === 0) {
            previousVideoIndex = lastVideoIndex;
        } else if (currentVideoIndex === lastVideoIndex) {
            nextVideoIndex = 0;
        }
        
        this.previousVideo = this.videos[previousVideoIndex];
        this.nextVideo = this.videos[nextVideoIndex];
    }

    hideVideos() {
        Array.from(this.videos).forEach(video => {
            video.style.display = "none"
        })
    }

    showVideo(video) {
        video.style.display = "block"
    }

    showPreviousVideo() {
        this.hideVideos()
        this.currentVideo = this.previousVideo;
        this.showVideo(this.currentVideo);
        this.updateVideoOrder();
    }

    showNextVideo() {
        this.hideVideos()
        this.currentVideo = this.nextVideo;
        this.showVideo(this.currentVideo);
        this.updateVideoOrder();
    }
}