import { useState, useEffect } from "react";
import Chart from "chart.js/auto";//todo - dont use auto, the package size is huge
import { format, parseISO } from "date-fns";
import { FormData } from "./../types/FormData";

export default function DebtAndAssetLineGraph() {
  // Use the useState hook to store the form data in a state variable
  const [formData, setFormData] = useState<FormData[]>([]);
  const [chart, setChart] = useState<Chart | null>(null);

  // Use the useEffect hook to read the form submissions from the file system
  // and update the formData state variable
  useEffect(() => {
    //Fetch the form submissions from the API
    fetch("/api/get-forms")
      .then((response) => response.json())
      .then((data) => {
        setFormData(data);
      });
  }, []);

  // Use the useEffect hook to create the line graph when the formData state variable is updated
  useEffect(() => {
    if (formData.length > 0) {
      // Get the canvas element where the line graph will be rendered
      const canvas = document.getElementById("line-graph") as HTMLCanvasElement;
      // Get the context of the canvas element
      const context = canvas.getContext("2d") as CanvasRenderingContext2D;
      
      chart?.destroy();

      formData.forEach((d) => {
        d.date = format(parseISO(d.date as string), "ss");
      });
      
      // Create a new Chart instance
      setChart(new Chart(context, {
        type: "line",
        data: {
          labels: formData.map((d) => d.date),
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
      }));
    }
  }, [formData]);

  return (
    <div>
      <canvas id="line-graph" width="400" height="400"></canvas>
    </div>
  );
}
