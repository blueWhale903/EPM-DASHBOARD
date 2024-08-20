"use client";

import { Input, Button } from "@nextui-org/react";
import { createMember } from "@/app/lib/actions";
import { useFormState } from "react-dom";

export default function Form({ classCodes }: { classCodes: any[] }) {
  const initState = {
    message: "",
  };

  const [formState, formAction] = useFormState(createMember, initState);
  return (
    <form
      action={formAction}
      className="flex flex-col gap-2 m-auto justify-center md:w-[400px] rounded-[12px] bg-gray-200 p-5"
    >
      <Input
        type="text"
        name="id"
        label="MSSV"
        placeholder="Nhập mã số sinh viên"
      />
      <Input
        type="text"
        name="name"
        label="Họ tên"
        placeholder="Nhập tên sinh viên"
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
      <Button className="bg-[#006fee] text-white" type="submit">
        Tạo Hội viên
      </Button>
      {formState?.message && (
        <p className="text-[#ff5555] text-center">{formState.message}</p>
      )}
    </form>
  );
}
