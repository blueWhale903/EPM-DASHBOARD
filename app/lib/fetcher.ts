"use server";

import { cookies } from "next/headers";

function updateOptions(options: any) {
  const update = { ...options };

  const tokenCookie = cookies().get("x-auth-token");
  let token = "";
  if (tokenCookie) {
    token = tokenCookie.value;
    update.headers = {
      ...update.headers,
      "x-auth-token": token,
      headers: { "Content-Type": "application/json" },
    };
  }

  return update;
}

export default async function fetcher(url: string, options = {}) {
  return fetch(url, updateOptions(options));
}
