import AssetList from "components/AssetList";
import DebtList from "components/DebtList";
import { useState } from "react";
import { FormData } from "types/FormData";

export default function Index() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    debt: 0,
    assets: 0,
    date: null,
  });

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
    formData: FormData
  ) {
    event.preventDefault();

    //Send the form data to the API
    fetch("/api/post-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, date: new Date() }),
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
      <AssetList />
    </form>
  );
}
