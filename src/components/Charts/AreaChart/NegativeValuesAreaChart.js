"use client";

import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

const NegativeValuesAreaChart = () => {
  const [Chart, setChart] = useState();
  useEffect(() => {
    import("react-apexcharts").then((mod) => {
      setChart(() => mod.default);
    });
  }, []);

  const series = [
    {
      name: "North",
      data: [
        {
          x: 1996,
          y: 322,
        },
        {
          x: 1997,
          y: 324,
        },
        {
          x: 1998,
          y: 329,
        },
        {
          x: 1999,
          y: 342,
        },
        {
          x: 2000,
          y: 348,
        },
        {
          x: 2001,
          y: 334,
        },
        {
          x: 2002,
          y: 325,
        },
        {
          x: 2003,
          y: 316,
        },
        {
          x: 2004,
          y: 318,
        },
        {
          x: 2005,
          y: 330,
        },
        {
          x: 2006,
          y: 355,
        },
        {
          x: 2007,
          y: 366,
        },
        {
          x: 2008,
          y: 337,
        },
        {
          x: 2009,
          y: 352,
        },
        {
          x: 2010,
          y: 377,
        },
        {
          x: 2011,
          y: 383,
        },
        {
          x: 2012,
          y: 344,
        },
        {
          x: 2013,
          y: 366,
        },
        {
          x: 2014,
          y: 389,
        },
        {
          x: 2015,
          y: 334,
        },
      ],
    },
    {
      name: "South",
      data: [
        {
          x: 1996,
          y: 162,
        },
        {
          x: 1997,
          y: 90,
        },
        {
          x: 1998,
          y: 50,
        },
        {
          x: 1999,
          y: 77,
        },
        {
          x: 2000,
          y: 35,
        },
        {
          x: 2001,
          y: -45,
        },
        {
          x: 2002,
          y: -88,
        },
        {
          x: 2003,
          y: -120,
        },
        {
          x: 2004,
          y: -156,
        },
        {
          x: 2005,
          y: -123,
        },
        {
          x: 2006,
          y: -88,
        },
        {
          x: 2007,
          y: -66,
        },
        {
          x: 2008,
          y: -45,
        },
        {
          x: 2009,
          y: -29,
        },
        {
          x: 2010,
          y: -45,
        },
        {
          x: 2011,
          y: -88,
        },
        {
          x: 2012,
          y: -132,
        },
        {
          x: 2013,
          y: -146,
        },
        {
          x: 2014,
          y: -169,
        },
        {
          x: 2015,
          y: -184,
        },
      ],
    },
  ];

  const options = {
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Area with Negative Values",
      align: "left",
      offsetX: -9,
      offsetY: 0,
      style: {
        fontWeight: "500",
        fontSize: "14px",
        color: "#64748B",
      },
    },
    colors: ["#00cae3", "#605DFF"],
    xaxis: {
      type: "datetime",
      axisTicks: {
        show: false,
        color: "#ECEEF2",
      },
      axisBorder: {
        show: false,
        color: "#ECEEF2",
      },
      labels: {
        show: true,
        style: {
          colors: "#8695AA",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      tickAmount: 4,
      floating: false,
      labels: {
        show: true,
        style: {
          colors: "#64748B",
          fontSize: "12px",
        },
      },
      axisBorder: {
        show: false,
        color: "#ECEEF2",
      },
      axisTicks: {
        show: false,
        color: "#ECEEF2",
      },
    },
    fill: {
      opacity: 0.5,
    },
    tooltip: {
      x: {
        format: "yyyy",
      },
      fixed: {
        enabled: false,
        position: "topRight",
      },
    },
    grid: {
      yaxis: {
        lines: {
          offsetX: -30,
        },
      },
      padding: {
        left: 20,
      },
      show: true,
      borderColor: "#ECEEF2",
    },
    legend: {
      show: true,
      position: "bottom",
      fontSize: "12px",
      horizontalAlign: "center",
      itemMargin: {
        horizontal: 8,
        vertical: 0,
      },
      labels: {
        colors: "#64748B",
      },
      markers: {
        shape: 'diamond',
        offsetX: -2,
        offsetY: -0.5,
      },
    },
  };

  return (
    <>
      <Card className="bg-white border-0 rounded-3 mb-4">
        <Card.Body className="p-4">
          <div className="mb-3 mb-lg-4">
            <h3 className="mb-0">Negative Values Area Chart</h3>
          </div>

          <div
            style={{
              marginBottom: "-15px",
            }}
          >
            {Chart && (
              <Chart
                options={options}
                series={series}
                type="area"
                height={375}
              />
            )}
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default NegativeValuesAreaChart;
