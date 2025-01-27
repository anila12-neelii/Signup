import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";
const Register = () => {
  const navigate = useNavigate();
  //state
  const [inputs, setInputs] = useState({
    name: "",
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
    try{
   const {data} =   await axios.post('/api/v1/user/register',{
    username:inputs.name, 
    email:inputs.email, 
    password:inputs.password
  });
  if(data.success){
    toast.success('user register successfuly');
  navigate("/login");
}
  }catch (error){
      console.log(error);
    }
  };
  return (
    <>
      <form className="register" onSubmit={handleSubmit}>
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
            Register
          </Typography>
          <TextField
            placeholder="name"
            value={inputs.name}
            onChange={handleChange}
            name="name"
            margin="normal"
            type={"text"}
            required
          />
          <TextField
            placeholder="email"
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
            onClick={() => navigate("/login")}
            sx={{ borderRadius: 2, marginTop: 2 }}
          >
                      </Button>
        </Box>
      </form>
    </>
  );
};

export default Register;