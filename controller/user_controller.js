const userModel = require("../models/user_model");
const blogModel = require("../models/blog_model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret_key = "321@123";

//  -----------------------signup-----------------

const signup = async (req, res) => {
  const user_data = req.body;
  const email = user_data.email;
  const payload = { email: user_data.email };

  const signup_user = await userModel.findOne({ email });

  if (signup_user) {
    res.status(401).send({
      status: "Failure",
      msg: "User already exist!",
    });
  } else {
    console.log("payload before signup: ", payload);

    const token = jwt.sign(payload, secret_key, {
      algorithm: "HS384",
      expiresIn: "1d",
    });
    console.log("token after signup: ", token);
    res.cookie("jwt", token);

    user_data.password = await bcrypt.hash(user_data.password, 5);

    try {
      const new_user = await userModel.create(user_data);
      res
        .status(200)
        .send({ status: "Sucess in creating user", user: new_user });
      console.log(new_user);
    } catch (error) {
      console.log(error);
      res.send({ error, msg: "Error creating user!" });
    }
  }
};

//------------------------------------------------------------------------------------

//-----------------------------------------------login---------------------------

const login = async (req, res) => {
  const obj = req.body;
  const { email, password } = req.body;

  try {
    const login_user = await userModel.findOne({ email });
    if (!login_user) {
      res.status(404).send({ status: "error", msg: "Didn't find the user" });
    }

    const pass_match = await bcrypt.compare(password, login_user.password);
    if (!pass_match) {
      res.status(400).send({ status: "Error", msg: "Password incorrect" });
    }
    if (pass_match) {
      //Generating token

      const payload = { email };
      const token = jwt.sign(payload, secret_key, {
        algorithm: "HS384",
        expiresIn: "1d",
      });
      // console.log("token after sign in: ", token);
      res.cookie("jwt", token);
      res.status(200).send({
        status: "success",
        msg: "user found",
      });
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

//   ---------------------------------------

//------------------log out function -----------------------------

const logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.send({ status: "success", msg: "Successfully logged out!" });
};

//---------------------------------------------------------------

//-----------------------post blog--------------------

const postBlog = async (req, res) => {
  let data = await req.body;
  console.log(data);
  const { email } = req.user_payload;
  const to_upload = {
    title: data.title,
    description: data.description,
    content: data.content,
    isPrivate: data.isPrivate,
    createdBy: email,
  };
  console.log("data to upload:", to_upload);

  try {
    const new_blog = await blogModel.create(to_upload);
    res.status(200).send({
      status: "Success in adding blog!",
      msg: "Blog uploaded",
      blog: data,
    });
    console.log(new_blog);
  } catch (error) {
    res.send(error);
  }
};

//--------------get email-----------

const get_email = async (req, res) => {
  try {
    console.log("Running get email");
    const { email } = req.user_payload;
    console.log(email);
    const user = await userModel.find({ email });
    console.log(user);

    res.send({ status: "Success fiding user", user });
  } catch (error) {
    res.send(error);
  }
};

//-------------------get Blogs--------------------

const getBlogs = async (req, res) => {
  try {
    const all_blogs = await blogModel.find({ isPrivate: false });
    // console.log(all_blogs);
    res.send({ status: "Blogs found", all_blogs });
  } catch (error) {
    res.send(error);
  }
};

//-------------------------get private blogs-------------

const privateBlog = async (req, res) => {
  const { email } = req.user_payload;
  try {
    console.log("Reaching private blog");

    const all_blogs = await blogModel.find({ isPrivate: true, email });
    console.log(all_blogs);
    res.send({ status: "Private Blogs", all_blogs });
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  signup,
  login,
  logout,
  secret_key,
  postBlog,
  getBlogs,
  privateBlog,
  get_email,
};
