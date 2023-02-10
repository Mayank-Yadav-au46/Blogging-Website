const redirectlogin = () => {
  window.location = "../login.html";
};
const redirectsignup = () => {
  window.location = "../signUp.html";
};

async function getBlog() {
  const blogs = await fetch("/blog/getBlogs");
  const response = await blogs.json();
  console.log(response);

  const { all_blogs } = response;
  console.log(all_blogs);

  let blogContainer = document.getElementById("blog_container");

  for (let i = 0; i < all_blogs.length; i++) {
    var card = document.createElement("div");
    card.classList.add("card-w");
    let heading = document.createElement("h4");
    heading.classList.add("head");
    let content = document.createElement("h6");
    content.classList.add("content");
    let description = document.createElement("p");
    description.classList.add("description");

    const blog = all_blogs[i];
    console.log(blog.title, blog.description, blog.content);

    heading.innerText = blog.title;
    card.append(heading);
    
    content.innerText = blog.content;
    card.append(content);

    description.innerText = blog.description;
    card.append(description);
    
    blogContainer.append(card);
  }
}
getBlog();
