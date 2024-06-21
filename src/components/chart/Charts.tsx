"use client";

import React from "react";
import { Chart, GoogleChartWrapperChartType } from "react-google-charts";

const Charts = ({
  chartType,
  data,
  height,
  width,
  options
}: {
  chartType: GoogleChartWrapperChartType | undefined;
  data: any;
  height: string | number | undefined;
  width: string | number | undefined;
  options?: any;
}) => {
  return (
    <Chart chartType={chartType} width={width} height={height} data={data} options={options} />
  );
};

export default Charts;
