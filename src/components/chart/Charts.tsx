"use client";

import React from "react";
import { Chart, GoogleChartWrapperChartType } from "react-google-charts";

const Charts = ({
  chartType,
  options,
  data,
  height,
  width
}: {
  chartType: GoogleChartWrapperChartType | undefined;
  data: any;
  options?: any;
  height: string | number | undefined;
  width: string | number | undefined;
}) => {
  return (
    <Chart chartType={chartType} options={options} width={width} height={height} data={data} />
  );
};

export default Charts;
