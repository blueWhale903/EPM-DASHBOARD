// "use server";

import jwt from "jsonwebtoken";

export function formatDate(dateStr: string | undefined) {
  if (!dateStr) return;

  const date = new Date(dateStr);

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getUTCFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}

export function isValidJWT(token: string) {
  const JWT_SECRET = process.env.JWT_SECRET || "";
  return new Promise((resolve) => {
    jwt.verify(token, JWT_SECRET, function (err, payload) {
      if (err) resolve(false);
      return resolve(true);
    });
  });
}
