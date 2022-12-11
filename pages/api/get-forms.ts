import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";

function readForms() {
  // Read the form submissions file
  const data = fs.readFileSync(
    `c:/Users/stian/source/form-submissions/form-submissions.json`,
    "utf8"
  );

  // Parse the form submissions data
  const forms = JSON.parse(data);

  // Return the forms
  return forms;
}

function getForms(req: NextApiRequest, res: NextApiResponse) {
  // Read the submitted forms
  const forms = readForms();

  // Return the forms to the client
  res.status(200).json({ forms });
}

export default getForms;
