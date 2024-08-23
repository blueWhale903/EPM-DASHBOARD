"use client";

import { updateMember } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { Member } from "@/app/lib/definitions";
import { TextField } from "@mui/material";
import { Typography } from "@mui/material/";
import { SubmitButton } from "../Buttons/submit";
export default function Form({
  classCodes,
  member,
}: {
  classCodes: any[];
  member: Member;
}) {
  const initState = {
    message: "",
  };

  const [formState, formAction] = useFormState(updateMember, initState);
  return (
    <form
      action={formAction}
      className="flex flex-col gap-2 m-auto justify-center md:w-[400px] rounded-[12px] bg-gray-200"
    >
      <div className="bg-[#006fee] p-4 text-white m-0 text-center">
        <Typography variant="h4" fontWeight={"bold"}>
          Edit member
        </Typography>{" "}
      </div>
      <div className="flex flex-col gap-3 m-5">
        <TextField
          name="id"
          label="Student ID"
          placeholder="Enter student ID"
          variant="filled"
          defaultValue={member.id}
          InputProps={{
            readOnly: true,
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
          defaultValue={member.name}
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
          defaultValue={member.classCode}
        >
          {classCodes.map((classCode) => {
            return (
              <option key={classCode.name} value={classCode.name}>
                {classCode.name}
              </option>
            );
          })}
        </select>
        <SubmitButton name="Edit" />
      </div>
      {formState?.message && (
        <p className="text-[#ff5555] text-center">{formState.message}</p>
      )}
    </form>
  );
}
