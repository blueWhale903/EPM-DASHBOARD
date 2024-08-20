import { cookies } from "next/headers";
import { isValidJWT } from "../lib/utils";
import LoginForm from "../ui/login-form";
import { redirect } from "next/navigation";

export default async function Page() {
  const tokens = cookies().get("x-auth-token");
  if (tokens) {
    const validJWT = await isValidJWT(tokens.value);
    if (validJWT) redirect("/dashboard/");
  }

  return <LoginForm />;
}
