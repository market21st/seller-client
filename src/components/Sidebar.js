import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styleds from "styled-components";

// Mui
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

// Images
// import loginImg from "../../assets/login.png";

// Api

// Styled-components
const Logo = styleds.img`
  position: absolute;
  width: auto;
  top: 4%;
  left: 3%;
`;

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <Grid container sx={{ background: "skyblue" }}>
      <Grid item></Grid>
      <Grid container item>
        <Grid item></Grid>
        <Grid item></Grid>
      </Grid>
    </Grid>
  );
};

export default Sidebar;
