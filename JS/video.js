console.log("video java file added");

/* 
1. fetch, load and show category data
*/

// create loadCategories

const loadCategories = () => {
  //fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

// crate displayCategories

const displayCategories = (data) => {
  console.log(data);
};

loadCategories();
