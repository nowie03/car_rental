import React, { useEffect, useState } from "react";
import { Input, useInput, Grid, Button, Loading } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_USER_BY_MAIL, SIGNIN } from "../GraphQL/Queries";

const secretKey = "my-secret-key";

const Login = () => {
  const navigate = useNavigate();
  const {
    value: emailValue,
    reset: emailReset,
    bindings: emailBindings,
  } = useInput("");
  const {
    value: passwordValue,
    reset: passwordReset,
    bindings: passwordBindings,
  } = useInput("");

  const [signIn, { loading, error, data }] = useLazyQuery(SIGNIN, {
    errorPolicy: "all",
  });

  const [
    getUserByMail,
    { called, loading: getUserByMailLoading, data: getUserByMailData },
  ] = useLazyQuery(GET_USER_BY_MAIL);

  const [emailStatus, setEmailStatus] = useState({ color: "", text: "" });
  const [passwordStatus, setPasswordStatus] = useState({ color: "", text: "" });

  const validateEmail = (emailValue) => {
    return emailValue.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  };

  useEffect(() => {
    setPasswordStatus({
      text: "",
      color: "",
    });

    setEmailStatus({
      text: "",
      color: "",
    });
  }, [emailValue, passwordValue]);

  async function validateUser() {
    if (!loading && data) {
      setPasswordStatus({
        text: "",
        color: "",
      });
      setEmailStatus({
        text: "",
        color: "",
      });

      if (
        data.signIn.includes(
          "HotChocolate.GraphQLException: password doesnt match"
        )
      ) {
        setPasswordStatus({
          text: "check your password",
          color: "error",
        });
      } else if (
        data.signIn.includes("HotChocolate.GraphQLException: user not found")
      ) {
        setEmailStatus({
          text: "check your email",
          color: "error",
        });
      } else {
        getUserByMail({ variables: { email: emailValue } });
      }
    }
  }

  useEffect(() => {
    validateUser();
  }, [data, getUserByMailData]);

  useEffect(() => {
    if (getUserByMailData) {

      localStorage.setItem("userId", getUserByMailData.user.id);
      localStorage.setItem("userEmail", getUserByMailData.user.email);
      localStorage.setItem("token", data.signIn);
      navigate("/home/explore");
    }
  }, [getUserByMailData]);

  const loginHandler = () => {
    signIn({ variables: { email: emailValue, password: passwordValue } });
  };

  return (
    <Grid.Container xs={12} justify="center" css={{ padding: "$15" }}>
      <Grid css={{ display: "flex", justifyContent: "center", margin: "$14" }}>
        <Input
          id="#email"
          {...emailBindings}
          clearable
          shadow={false}
          onClearClick={emailReset}
          status={emailStatus.color}
          color={emailStatus.color}
          helperColor={emailStatus.color}
          helperText={emailStatus.text}
          type="email"
          label="Email"
          placeholder="Enter your email.."
          css={{ width: "300px" }}
        />
      </Grid>
      <Grid css={{ display: "flex", justifyContent: "center", margin: "$14" }}>
        <Input.Password
          id="#password"
          {...passwordBindings}
          clearable
          onClearClick={passwordReset}
          color={passwordStatus.color}
          status={passwordStatus.color}
          initialValue="123"
          helperText={passwordStatus.text}
          helperColor={passwordStatus.color}
          type="password"
          label="Password"
          placeholder="Enter your password "
          css={{ width: "300px" }}
        />
      </Grid>
      <Grid css={{ display: "flex", justifyContent: "center", margin: "$14" }}>
        <Button
          color="gradient"
          css={{ marginRight: "10px" }}
          auto
          onClick={loginHandler}
        >
          login
        </Button>

        <Link to={"/signup"}>
          <Button color="gradient" auto>
            Sign up
          </Button>
        </Link>
      </Grid>
    </Grid.Container>
  );
};

export default Login;
