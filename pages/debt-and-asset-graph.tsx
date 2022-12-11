import { useState, useEffect } from "react";
import Chart from "chart.js/auto";

type FormData = {
  username: string;
  debt: number;
  assets: number;
  timestamp: number;
};

export default function DebtAndAssetLineGraph() {
  // Use the useState hook to store the form data in a state variable
  const [formData, setFormData] = useState<FormData[]>([]);

  // Use the useEffect hook to read the form submissions from the file system
  // and update the formData state variable
  useEffect(() => {
    //Fetch the form submissions from the API
    fetch("/api/get-forms")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFormData([data.forms]);
      });
  }, []);

  // Use the useEffect hook to create the line graph when the formData state variable is updated
  useEffect(() => {
    if (formData.length > 0) {
      // Get the canvas element where the line graph will be rendered
      const canvas = document.getElementById("line-graph") as HTMLCanvasElement;
      // Get the context of the canvas element
      const graphArea = canvas.getContext("2d") as CanvasRenderingContext2D;
      // Create a new Chart instance
      let chart = new Chart(graphArea, {
        type: "line",
        data: {
          labels: formData.map((d) => d.timestamp),
          datasets: [
            {
              label: "Debt",
              data: formData.map((d) => d.debt),
              fill: false,
              backgroundColor: "#ff0000",
              borderColor: "#ff0000",
            },
            {
              label: "Assets",
              data: formData.map((d) => d.assets),
              fill: false,
              backgroundColor: "#0000ff",
              borderColor: "#0000ff",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }, [formData]);

  return (
    <div>
      <canvas id="line-graph" width="400" height="400"></canvas>
    </div>
  );
}
