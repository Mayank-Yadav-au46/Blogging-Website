async function getPrivateBlogs(){
    const blogs = await fetch("/blog/userpage/privateBlog");
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
    content.classList.add("content")
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
getPrivateBlogs();

const logout = async () => {
    try {
      const obj = fetch("blog/userpage/logout", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({}),
      });
      const response = (await obj).json;
      console.log(response);
      window.location = "../index.html";
      alert("Logged Out Successfully! Welcome to the home page");
    } catch (error) {
      console.log(error);
    }
  };