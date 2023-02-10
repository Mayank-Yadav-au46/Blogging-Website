async function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("pass").value;

  try {
    const res_obj = await fetch("/blog/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const resposne = await res_obj.json();

    if (res_obj.status == 404) {
      alert("User not found");
    } else if (res_obj.status == 400) {
      alert("Incorrect password");
    } else if (resposne.status == "success") {
      alert("You have successfully logged in.");
      window.location = "../user.html";
    }
  } catch (error) {
    console.log(error);
  }
}
