import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styleds from "styled-components";

// Mui
import {
  Grid,
  TextField,
  Button,
  Typography,
  IconButton,
  FormControl,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styled } from "@mui/material/styles";

import AlertModal from "../../components/AlertModal";

// Images
import loginImg from "../../assets/login.png";
import logoImg from "../../assets/kracker.png";

// Api
import { LoginUser } from "../../api/user";

// Styled-components
const Logo = styleds.img`
  position: absolute;
  width: auto;
  top: 4%;
  left: 3%;
`;

const BackImg = styleds.img`
  position: absolute;
  width: 680px;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
`;

const Title = styleds.h2`
  font-weight:700;
  font-size: 2rem;
  margin-bottom: 1.2rem;
`;

const LogIn = () => {
  const navigate = useNavigate();
  const idRef = useRef();
  const pwRef = useRef();

  // MUI style
  const TypographyStyled = styled(Typography)(({ theme }) => ({
    fontSize: "0.875rem",
    marginTop: theme.spacing(1.5),
  }));
  const LinkStyled = styled("a")(({ theme }) => ({
    fontSize: "0.875rem",
    textDecoration: "none",
    color: theme.palette.primary.main,
  }));

  //비밀번호
  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const onClick = () => {
    navigate("/register");
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const login = async (e) => {
    if (e) e.preventDefault();

    const id = idRef.current.value;
    const pw = pwRef.current.value;
    if (!id || !pw) {
      setText("아이디/비밀번호를 입력해주세요.");
      setAlertOpen(true);
      return;
    }
    const { data, statusCode, status } = await LoginUser({
      userId: id,
      password: pw,
    });
    if (statusCode == 200) {
      navigate("/");
    }
    if (status === 400) {
      setText(data.message);
      setAlertOpen(true);
    }
    if (status === 404) {
      setText("존재하지 않는 회원입니다.");
      setAlertOpen(true);
    }
    if (status === 403) {
      setText(
        `현재 계정이 활성화되지 않은 상태입니다. 관리자에게 문의해주세요.`
      );
      setAlertOpen(true);
    }
  };

  // Modal
  const [alertOpen, setAlertOpen] = useState(false);
  const [text, setText] = useState("");
  const alertHandleClose = () => setAlertOpen(false);

  return (
    <Grid container height={"100vh"}>
      <AlertModal isOpen={alertOpen} onClose={alertHandleClose} text={text} />
      <Grid item xs={8} sx={{ position: "relative" }}>
        <Logo src={logoImg} alt="dd" />
        <BackImg src={loginImg} alt="dd" />
      </Grid>
      <Grid
        container
        item
        xs={4}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ background: "#F0F5FD" }}
      >
        <Grid item textAlign={"center"} width={"18rem"} minWidth={"12rem"}>
          <Title>Seller Admin</Title>
          <TextField
            fullWidth
            size="small"
            inputRef={idRef}
            placeholder={"아이디"}
            sx={{ marginBottom: 1 }}
          />
          <FormControl variant="filled" fullWidth>
            <OutlinedInput
              inputRef={pwRef}
              size="small"
              placeholder={"비밀번호"}
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <Button
            variant="contained"
            fullWidth
            sx={{ marginTop: 3 }}
            onClick={login}
          >
            로그인
          </Button>
          <TypographyStyled variant="subtitle1">
            회원이 아니신가요?{" "}
            <LinkStyled onClick={onClick} sx={{ cursor: "pointer" }}>
              회원가입하기
            </LinkStyled>
          </TypographyStyled>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LogIn;
