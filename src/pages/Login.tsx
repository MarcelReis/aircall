import React, { FormEvent, useEffect, useState } from "react";
import {
  Button,
  Form,
  FormItem,
  Grid,
  Spacer,
  TextFieldInput,
  Typography,
} from "@aircall/tractor";
import { useAuth } from "../apollo/auth";

type FieldState = {
  value: string;
  valid: boolean;
};
const fieldInitialState: FieldState = {
  value: "",
  valid: false,
};

const LoginPage = () => {
  const [validating, setValidating] = useState(false);
  const [username, setUsername] = useState<FieldState>({
    ...fieldInitialState,
  });
  const [password, setPassword] = useState<FieldState>({
    ...fieldInitialState,
  });
  const { login, loading, error } = useAuth();

  useEffect(() => {
    setUsername((state) => {
      const valid = state.value.trim().length > 5;
      return { ...state, valid };
    });
  }, [username.value]);

  useEffect(() => {
    setPassword((state) => {
      const valid = state.value.trim().length > 5;
      return { ...state, valid };
    });
  }, [password.value]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username.valid || !password.valid) {
      setValidating(true);
      return;
    }

    await login({ username: username.value, password: password.value });
  };

  if (loading) {
    return <Typography>Loading</Typography>;
  }

  if (error) {
    return <Typography>Error</Typography>;
  }

  const isInvalid = !username.valid || !password.valid;

  return (
    <Form onSubmit={onSubmit}>
      <Spacer direction="vertical" width="100%" marginTop="8" paddingX="4">
        <Grid maxWidth="400px" margin="auto" gridColumnGap={4} gridRowGap={5}>
          <FormItem
            label="Username"
            name="username"
            validationStatus={
              username.valid ? "success" : validating ? "error" : undefined
            }
          >
            <TextFieldInput
              placeholder=""
              value={username.value}
              onChange={({ target: { value } }) =>
                setUsername((state) => ({ ...state, value }))
              }
            />
          </FormItem>

          <FormItem
            label="Password"
            name="password"
            validationStatus={
              password.valid ? "success" : validating ? "error" : undefined
            }
          >
            <TextFieldInput
              type="password"
              value={password.value}
              onChange={({ target: { value } }) =>
                setPassword((state) => ({ ...state, value }))
              }
            />
          </FormItem>

          <FormItem justifySelf="start">
            <Button type="submit" disabled={validating && isInvalid}>
              Login
            </Button>
          </FormItem>
        </Grid>
      </Spacer>
    </Form>
  );
};

export default LoginPage;
