"use client";

import { Button } from "@mui/material";
import { login } from "../lib/actions";
import { useFormState, useFormStatus } from "react-dom";
import { TextField } from "@mui/material";

function SubmitButton() {
  const data = useFormStatus();
  return (
    <>
      <Button
        variant="contained"
        sx={{ background: "#006fee", color: "#fff" }}
        type="submit"
        disabled={data.pending}
      >
        {data.pending ? "loading..." : "Login"}
      </Button>
    </>
  );
}

export default function LoginForm() {
  const initState = {
    message: "",
  };
  const [formState, formAction] = useFormState(login, initState);
  return (
    <form
      action={formAction}
      className="h-screen flex flex-col gap-2 m-auto justify-center w-[360px] "
    >
      <div className="bg-gray-100 shadow-md p-5 flex flex-col gap-4 rounded-md">
        <h1 className="text-4xl p-3 text-center font-bold">Login</h1>
        <TextField
          type="text"
          name="username"
          label="Username"
          placeholder="lch.tth.hcmus"
          defaultValue=""
          required
        />
        <TextField
          type="password"
          name="password"
          label="Password"
          placeholder="lch.tth.hcmus"
          defaultValue=""
          required
        />
        <SubmitButton></SubmitButton>
        {formState?.message && (
          <p className="text-[#ff5555] text-center">{formState.message}</p>
        )}
      </div>
    </form>
  );
}
