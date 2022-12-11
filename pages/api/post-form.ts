// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

type Data = {
  success: boolean;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Get the form data from the request body
  const formData = req.body;

  // Check if the username directory exists
  if (!fs.existsSync(`c:/Users/${formData.username}`)) {
    throw new Error(`Username directory does not exist: ${formData.username}`);
  }
  // Create the username directory
  fs.mkdirSync(`c:/Users/${formData.username}/source/form-submissions`, {
    recursive: true,
  });
  // Save the form data to a file
  fs.writeFileSync(
    `c:/Users/${formData.username}/source/form-submissions/form-submissions.json`,
    JSON.stringify(formData, null, 2)
  );

  // Send a response to the client
  res.status(200).json({ success: true });
}
