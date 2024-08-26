"use client";

import { login } from "../../lib/actions";
import { useFormState, useFormStatus } from "react-dom";
import { TextField } from "@mui/material";
import { SubmitButton } from "../buttons/Submit";

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
        <SubmitButton name="Login"></SubmitButton>
        {formState?.message && (
          <p className="text-[#ff5555] text-center">{formState.message}</p>
        )}
      </div>
    </form>
  );
}
