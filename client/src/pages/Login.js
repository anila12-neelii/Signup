import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //state
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  //handle input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //form handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("api/v1/user/login", {
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        localStorage.setItem("userId", data?.user._id);
        dispatch(authActions.login());
        toast.success("User login Successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form className="login" onSubmit={handleSubmit}>
        <Box
                 maxWidth={490}
                 display="flex"
                 flexDirection={"column"}
                 alignItems="center"
                 justifyContent={"center"}
                 margin={4}
                 marginTop={4}
                 boxShadow="0px 10px 20px gray"
                 padding={6}
                 borderRadius={7}
                >
          <Typography 
            variant="h4"
            sx={{ textTransform: "uppercase" }}
            padding={3}
            textAlign="center"
          >
            Login
          </Typography>

          <TextField
            placeholder="abc@email.com"
            value={inputs.email}
            name="email"
            margin="normal"
            type={"email"}
            required
            onChange={handleChange}
          />
          <TextField 
            placeholder="password"
            value={inputs.password}
            name="password"
            margin="normal"
            type={"password"}
            required
            onChange={handleChange}
          />

          <Button 
            type="submit"
            sx={{ borderRadius: 4, marginTop: 2 }}
            variant="contained"
            color="secondary"
          >
            Submit
          </Button>
          <Button 
            sx={{ borderRadius: 2, marginTop: 2 }}
            >
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Login