"use client";

import { Input, Button } from "@nextui-org/react";
import { login } from "../lib/actions";
import { useFormState, useFormStatus } from "react-dom";

function SubmitButton() {
  const data = useFormStatus();
  return (
    <>
      <Button type="submit" disabled={data.pending}>
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
      className="h-screen flex flex-col gap-2 m-auto justify-center w-[360px]"
    >
      <h1 className="text-4xl p-3 text-center font-bold">Login</h1>
      <Input
        type="text"
        name="username"
        label="Username"
        placeholder="lch.tth.hcmus"
        defaultValue=""
        required
      />
      <Input
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
    </form>
  );
}
