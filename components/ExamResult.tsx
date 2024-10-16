"use client";

import { Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "./ui/button";
import { Copy, PhoneCall } from "lucide-react";

export const chartDescription = "A pie chart displaying course suitability";

const courseData = [
  { name: "CMA India", value: 25, fill: "#FF4500" },
  { name: "Chartered Accountant", value: 22.5, fill: "#FF7F50" },
  { name: "ACCA", value: 16, fill: "#FFE4B5" },
  { name: "CMA India", value: 21.5, fill: "#FFA07A" },
  { name: "CMA USA", value: 16.7, fill: "#FFDAB9" },
];

const chartConfig = {
  "Chartered Accountant": {
    label: "CA",
    color: "hsl(var(--chart-1))",
  },
  "CMA India": {
    label: "CMA India",
    color: "hsl(var(--chart-2))",
  },
  ACCA: {
    label: "ACCA",
    color: "hsl(var(--chart-5))",
  },
  "CMA USA": {
    label: "CMA USA",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function ExamResult() {
  return (
    <div className="container mx-auto mt-14 w-full px-4 lg:w-8/12">
      <div className="text-center mb-10 hidden md:block">
        <p className="font-bold text-2xl text-gray-950">
          Your results based on your answers:
        </p>
      </div>
      <div className="bg-white rounded-md shadow-md">
        <Card className="flex flex-col md:flex-row border-b">
          <CardHeader className="p-4 md:w-7/12">
            <div>
              <p>You are most suitable for:</p>
              <h1 className="text-2xl font-bold">
                Association of Chartered Certified Accountants{" "}
                <span className="text-orange-500">(ACCA)</span>
              </h1>
              <p className="text-sm mt-2">
                ACCA professionals are experts in financial management,
                reporting, auditing, taxation, and other key financial
                functions. Their global recognition makes them highly sought
                after in the finance industry. Join this elite group and make a
                worldwide impact.
              </p>
            </div>
          </CardHeader>
          <CardContent className="flex-1 mt-6 md:mt-0 p-4">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px] [&_.recharts-pie-label-text]:fill-foreground"
            >
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={courseData}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, value }) => `${name}: ${value}%`}
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <div className="flex flex-wrap gap-4 justify-start mt-10 p-4">
          <Button>Course Details</Button>
          <Button className="bg-secondary hover:bg-secondary text-gray-700 gap-2">
            Consult Assistant <PhoneCall size={15} />
          </Button>
          <Button className="bg-secondary hover:bg-secondary text-gray-700 hidden sm:block">
            <span className="flex">
              Copy URL <Copy size={15} />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
