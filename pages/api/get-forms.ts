import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

export default function getForms(req: NextApiRequest, res: NextApiResponse<FormData[]>) {
  // Read the form submissions from the file system
  const formSubmissions = fs.readdirSync(
    `c:/Users/stian/source/form-submissions`
  );

  // Parse the form submissions and store them in a variable
  const formData = formSubmissions.map((file) =>
    JSON.parse(
      fs.readFileSync(`c:/Users/stian/source/form-submissions/${file}`, "utf8")
    ) as FormData
  );

  // Return the forms to the client
  res.status(200).json(formData);
}