async function add_data() {
  let name = document.getElementById("inpN").value;
  let email = document.getElementById("email").value;

  let password = document.getElementById("pass").value;
  let Cpassword = document.getElementById("Cpass").value;

  if (name == "" || email == "" || password == "" || Cpassword == "") {
    alert("Fill all the values in the form!");
  } else {
    if (password === Cpassword) {
      const res_obj = await fetch("/blog/signup", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      console.log(res_obj);

      const resposne = await res_obj.json();
      console.log(resposne);

      if (res_obj.status == 401) {
        alert("User already exist!");
      } else if (res_obj.status == 200) {
        window.location = "../user.html";
        alert("SignUp was Successful!");
      }
    } else {
      alert("password and confirm password not matching!");
    }
  }
}
