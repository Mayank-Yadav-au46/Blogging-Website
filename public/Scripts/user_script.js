// ----------logout function ----------------

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

//-------------------post blog function---------------------

const add_blog = async () => {
  let title = document.getElementById("title").value;
  let content = document.getElementById("content").value;
  let description = document.getElementById("description").value;
  let isPrivate;
  let private = document.getElementById("private");
  let public = document.getElementById("public");

  if (private.checked == true) {
    isPrivate = true;
  } else if (public.checked == true) {
    isPrivate = false;
  }
  let data = { title, content, description, isPrivate };
  console.log(data);
  try {
    const res_obj = await fetch("/blog/userpage/postBlog", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        description,
        isPrivate,
      }),
    });

    console.log(res_obj);
    const response = await res_obj.json();
    console.log(response);
    alert("Blog adding was Successful!");
  } catch (error) {
    console.log(error);
  }
};

//-------------------------------get all blogs----------------------------------

async function getBlog() {
  const blogs = await fetch("/blog/getBlogs");

  const email_req = await fetch("/blog/userpage/email");
  const email_res = await email_req.json();

  console.log(email_res);
  const {user} = email_res;
  console.log(user); 
  console.log(user[0].name);
  const name = user[0].name;

  document.getElementById("username").innerText = name;

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

//-----------------------------------go to private blogs------------------------

async function privateBlog() {
  try {
    window.location = "../privateBlog.html";
    alert("This is your private blog page!");
  } catch (error) {
    console.log(error);
  }
}
