
export const renderPopover = (el, message) => {
  const content = document.createElement("div");
  const popover = document.createElement("div");
  popover.className = "popover";
  content.className = "popover__content";
  content.innerHTML = message;
  popover.append(content);
  el.append(popover);
  const elPosition = el.style.position;
  el.style.position = "relative";

  const onOutsideClick = (e) => {
    if (!el.contains(e.target)) {
      popover.remove();
      el.style.position = elPosition;
      document.removeEventListener("click", onOutsideClick);
    }
  };
  document.addEventListener("click", onOutsideClick);
};

export const formatSize = (bytes) => {
  if (bytes < 1024) {
    return bytes + " B";
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(2) + " kB";
  } else if (bytes < 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  }
}