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

function closeMenu() {
  let toggleInput = document.getElementById('navbar-collapse');
  toggleInput.checked = false;
}