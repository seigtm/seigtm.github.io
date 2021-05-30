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
  // Current (selected) menu item ('Main' by default).
  currentNavItem = document.getElementById("navItemMain");

  // Changing text decoration of current menu item ('Main' by default).
  currentNavItem.style.textDecoration = "underline";

  // Array of site's pages.
  pages = document.getElementsByClassName("page");

  // Hiding all pages except main page.
  for (let i = 1; i < pages.length; i++) {
    pages[i].style.display = "none";
  }

  // Current (visible) page ('Main' by default).
  currentPageType = pagesTypes.MAIN;
};

var changePage = function (obj) {
  // Scroll to the top of the page.
  window.scrollTo(0, 0);

  // Changing text decoration of menu items.
  currentNavItem.style.textDecoration = "none";
  obj.style.textDecoration = "underline";
  currentNavItem = obj;

  // Hiding current page.
  pages[currentPageType].style.display = "none";

  // Changing current page type.
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

  // Showing another page depending on new current page type.
  pages[currentPageType].style.display = "flex";
};
