import { useState } from "react";

type FormData = {
  username: string;
  debt: number;
  assets: number;
};

export default function Index() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    debt: 0,
    assets: 0,
  });

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
    formData: FormData
  ) {
    event.preventDefault();

    //Send the form data to the API
    fetch("/api/form-submission", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  return (
    <form onSubmit={(event) => handleSubmit(event, formData)}>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        value={formData.username}
        onChange={(event) =>
          setFormData({ ...formData, username: event.target.value })
        }
      />
      <label htmlFor="debt">Debt:</label>
      <input
        type="number"
        id="debt"
        value={formData.debt}
        onChange={(event) =>
          setFormData({ ...formData, debt: parseInt(event.target.value) })
        }
      />
      <label htmlFor="assets">Assets:</label>
      <input
        type="number"
        id="assets"
        value={formData.assets}
        onChange={(event) =>
          setFormData({ ...formData, assets: parseInt(event.target.value) })
        }
      />
      <button type="submit">Submit</button>
    </form>
  );
}



