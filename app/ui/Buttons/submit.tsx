import { Button } from "@mui/material";
import { useFormStatus } from "react-dom";

export function SubmitButton({ name }: { name: string }) {
  const data = useFormStatus();
  return (
    <>
      <Button
        variant="contained"
        sx={{ background: "#006fee", color: "#fff" }}
        type="submit"
        disabled={data.pending}
      >
        {data.pending ? "loading..." : name}
      </Button>
    </>
  );
}
