/* Fetch 
    Data from: https://data.giss.nasa.gov/gistemp
*/

const fetchData = async () => {
  const xLabels = [];
  const yLabels = [];

  try {
    const response = await fetch("../data/ZonAnn.Ts+dSST.csv");
    const data = await response.text();
    const table = data.split("\n").slice(1);

    table.forEach((row) => {
      const columns = row.split(",");
      const year = columns[0];
      xLabels.push(year);
      const temp = columns[1];
      yLabels.push(parseFloat(temp) + 14);
    });
  } catch (err) {
    console.log({ success: false, message: err.message });
  }
  return { xLabels, yLabels };
};

const chartData = () => {
  fetchData()
    .then((data) => {
      let ctx = document.getElementById("chart").getContext("2d");
      let myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: data.xLabels,
          datasets: [
            {
              label:
                "Combined Land-Surface Air and Sea-Surface Water Temperature in °C",
              data: data.yLabels,
              fill: false,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: false,
                  callback: function (value, index, values) {
                    return value + "°C";
                  },
                },
              },
            ],
          },
        },
      });
    })
    .catch((err) => {
      console.log(err, "Some error occured ...");
    });
};

chartData();
