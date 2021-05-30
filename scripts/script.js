var currentNavItem;
var pages;

const pagesTypes = {
  MAIN: 0,
  ABOUTME: 1,
  CONTACTS: 2,
  PROJECTS: 3,
};
var currentPageType;

var onLoad = function () {
  // The current (selected) menu item ('Main' by default).
  currentNavItem = document.getElementById("navItemMain");

  // Changing the text decoration of the current menu item ('Main' by default).
  currentNavItem.style.textDecoration = "underline";

  // Array of site pages.
  pages = document.getElementsByClassName("page");

  // Hiding all pages except the main page.
  for (let i = 1; i < pages.length; i++) {
    pages[i].style.display = "none";
  }

  // Current (visible) page ('Main' by default).
  currentPageType = pagesTypes.MAIN;
};

var changePage = function (obj) {
  // Scroll to the top of the page.
  window.scrollTo(0, 0);

  // Changing the text decoration of menu items.
  currentNavItem.style.textDecoration = "none";
  obj.style.textDecoration = "underline";
  currentNavItem = obj;

  // Hiding the current page.
  pages[currentPageType].style.display = "none";

  // Changing the current page type.
  switch (obj.id) {
    case "navItemMain":
      currentPageType = pagesTypes.MAIN;
      break;

    case "navItemAbout":
      currentPageType = pagesTypes.ABOUTME;
      break;

    case "navItemContacts":
      currentPageType = pagesTypes.CONTACTS;
      break;

    case "navItemProjects":
      currentPageType = pagesTypes.PROJECTS;
      break;
  }

  // Displaying a different page depending on the new current page type.
  pages[currentPageType].style.display = "flex";
};
