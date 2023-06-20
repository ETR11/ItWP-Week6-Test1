import { Chart } from "frappe-charts/dist/frappe-charts.min.esm";
const jsonQuery = {
  query: [
    {
      code: "Vuosi",
      selection: {
        filter: "item",
        values: [
          "2000",
          "2001",
          "2002",
          "2003",
          "2004",
          "2005",
          "2006",
          "2007",
          "2008",
          "2009",
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021"
        ]
      }
    },
    {
      code: "Alue",
      selection: {
        filter: "item",
        values: ["SSS"]
      }
    },
    {
      code: "Tiedot",
      selection: {
        filter: "item",
        values: ["vaesto"]
      }
    }
  ],
  response: {
    format: "json-stat2"
  }
};

if (document.readyState !== "loading") {
  console.log("Document is ready!");
  mainFunction();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    console.log("Document is ready after waiting!");
  });
  mainFunction();
}

async function mainFunction() {
  const data = await getData();
  buildChart(data);
}

async function getData() {
  const url =
    "https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px";

  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(jsonQuery)
  });
  if (!res.ok) {
    return;
  }
  const data = await res.json();

  return data;
}

async function buildChart(data) {
  const years = Object.values(data.dimension.Vuosi.category.label);
  const population = Object.values(data.value);

  const chartData = {
    labels: years,
    datasets: [{ values: population }]
  };

  const chart = new Chart("#chart", {
    title: "The population of Finland",
    data: chartData,
    type: "line",
    height: 450,
    colors: ["#eb5146"],
    lineOptions: {
      hideDots: 1,
      regionFill: 0
    }
  });
  chart.draw();
}
