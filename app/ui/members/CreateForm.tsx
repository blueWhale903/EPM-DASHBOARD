"use client";

import { Button } from "@mui/material";
import { SubmitButton } from "../buttons/Submit";
import { createMember } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { TextField } from "@mui/material";
import { Typography } from "@mui/material";

export default function Form({ classCodes }: { classCodes: any[] }) {
  const initState = {
    message: "",
  };

  const [formState, formAction] = useFormState(createMember, initState);
  return (
    <form
      action={formAction}
      className="flex flex-col gap-2 m-auto justify-center md:w-[400px] rounded-[12px] bg-gray-200"
    >
      <div className="bg-[#006fee] p-4 text-white m-0 text-center">
        <Typography variant="h4" fontWeight={"bold"}>
          Create a new member
        </Typography>{" "}
      </div>
      <div className=" flex m-6 flex-col gap-3 ">
        <TextField
          name="id"
          label="Student ID"
          placeholder="Enter student ID"
          variant="filled"
          InputProps={{
            style: {
              borderRadius: 12,
            },
            disableUnderline: true,
          }}
        />
        <TextField
          name="name"
          label="Name"
          placeholder="Enter name"
          variant="filled"
          InputProps={{
            style: {
              borderRadius: 12,
            },
            disableUnderline: true,
          }}
        />
        <select
          name="classCode"
          className="px-1 py-2 rounded-lg w-full bg-gray-100"
        >
          {classCodes.map((classCode) => {
            return (
              <option key={classCode.name} value={classCode.name}>
                {classCode.name}
              </option>
            );
          })}
        </select>
        <SubmitButton name="Create" />
      </div>
      {formState?.message && (
        <p className="text-[#ff5555] text-center">{formState.message}</p>
      )}
    </form>
  );
}
