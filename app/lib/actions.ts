"use server";

import { z } from "zod";
import { revalidatePath, unstable_noStore } from "next/cache";
import { redirect, RedirectType } from "next/navigation";
import { cookies } from "next/headers";
import fetcher from "./fetcher";
import { useRouter } from "next/router";

const loginFormSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const MemberFormSchema = z.object({
  id: z.string().min(1, "id is required"),
  name: z.string().min(1),
  classCode: z.string(),
});

export type State = {
  errors?: {
    id?: string[];
    name?: string[];
    classCode?: string[];
  };
  message: string | null;
};

export async function createMember(
  currentState: { message: string },
  formData: FormData
) {
  const validatedFields = MemberFormSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    classCode: formData.get("classCode"),
  });

  if (!validatedFields.success) {
    return {
      message: "Missing Fields",
    };
  }

  const { id, name, classCode } = validatedFields.data;

  try {
    const res = await fetcher(`${process.env.API}/members`, {
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        id: id,
        name: name,
        class_code: classCode,
      }),
    });

    if (res.status != 200) {
      const message = await res.json();
      console.error(message);
      return { message: message.error };
    }
  } catch (error: any) {
    console.error(error.message);
  }
  revalidatePath("/dashboard/members");
  redirect("/dashboard/members");
}

export async function getMemberById(id: string) {
  try {
    const member = await fetcher(`${process.env.API}/members?id=${id}`).then(
      (res) => res.json()
    );

    return member.data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateMember(
  prevState: { message: string },
  formData: FormData
) {
  unstable_noStore();

  const validatedFields = MemberFormSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    classCode: formData.get("classCode"),
  });

  if (!validatedFields.success) {
    return {
      message: "Missing Fields",
    };
  }

  const { id, name, classCode } = validatedFields.data;
  try {
    const res = await fetcher(`${process.env.API}/members`, {
      method: "PUT",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        id: id,
        name: name,
        classCode: classCode,
      }),
    });

    if (res.status != 200) {
      const message = await res.json();
      console.error(message);
      return { message: message.error };
    }
  } catch (error: any) {
    console.error(`UPDATE MEMBER ERROR: ${error.message}`);
  }

  revalidatePath("/dashboard/members");
  redirect("/dashboard/members", RedirectType.replace);
}

export async function deleteMember(id: string) {
  unstable_noStore();
  try {
    await fetcher(`${process.env.API}/members`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({ student_id: id }),
    }).then((res) => res.json());
    revalidatePath("/dashboard/members");
    return { message: "Deleted Member" };
  } catch (error) {
    console.error(`DELETE MEMBER ERROR: ${error}`);
  }
}

export async function login(
  currentState: { message: string },
  formData: FormData
) {
  const cookieStore = cookies();

  const validatedFields = loginFormSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return { message: validatedFields.error };
  }

  const { username, password } = validatedFields.data;

  try {
    const res = await fetch(`${process.env.API}/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (res.status != 200) {
      const error = await res.json();
      return { message: error.message };
    }

    const data = await res.json();

    cookieStore.set("x-auth-token", data.token);
  } catch (error) {
    if (error instanceof Error) return { message: error.message };
  }

  redirect("/dashboard/events");
}

export async function logout() {
  cookies().delete("x-auth-token");
  redirect("/login");
}

export async function getCategories() {
  const data = fetcher(`${process.env.API}/mark/categories`).then((res) => {
    return res.json();
  });

  return data;
}

export async function getFilteredEvents(query: string) {
  let data = await fetcher(
    `${process.env.API}/events?limit=10&${query.replaceAll("%2B", "+")}`
  ).then((res) => {
    if (res.status == 403 || res.status == 400) {
      redirect("/login");
    } else {
      return res.json();
    }
  });
  return data;
}

export async function getClassCodes() {
  let res = await fetcher(`${process.env.API}/classcodes`).then((res) =>
    res.json()
  );
  return res.data;
}

export async function getMembers(query: string) {
  let res = await fetcher(`${process.env.API}/members?${query}`).then((res) =>
    res.json()
  );

  return res.data;
}

export async function getParticipants(id: string, page: number | 1) {
  let res = await fetcher(
    `${process.env.API}/events/${id}/participants?page=1`
  ).then((res) => res.json());
  return res.data;
}

export async function getEventById(id: string) {
  let res = await fetcher(`${process.env.API}/events/${id}`).then((res) =>
    res.json()
  );

  return res.data;
}
