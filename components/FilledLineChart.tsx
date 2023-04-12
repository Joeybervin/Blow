import React, { useEffect, useRef } from "react";
import { Chart, Filler, LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, ChartConfiguration } from 'chart.js';

import { formatTime } from "@/helpers";
import { CookieValueTypes } from "cookies-next";

interface ChartProps {
    label?: string;
    labels: string[];
    data: number[];
    borderColor?: string;
    index: number;
    height: number;
    width?: string;
    axeYMin?: number;
    axeYMax?: number;
    axeYTitle?: string;
    axeXTitle?: string;
    theme?: string | CookieValueTypes;
    displayYAxe : boolean;
}

interface Colors {
    cold: string;
    fresh: string;
    normal: string;
    warm: string;
    hot: string;
}

export const FilledLineChart = ({ label, labels, data, index, borderColor, height, width, axeYMax, axeYMin, axeYTitle, theme, displayYAxe}: ChartProps) => {

    Chart.register(CategoryScale, Filler, LinearScale, PointElement, LineElement, Tooltip, LineController);

    const chartRef = useRef<HTMLCanvasElement>(null);
    const colors: Colors = {
        cold: "#4c88e9",
        fresh: "#4fe94c",
        normal: "#fffc48",
        warm: "#ffa048",
        hot: "#ff3838"
    };

    const sliceByIndex = (arr: string[] | number[], index: number): Array<string | number> => {
        return arr
            .slice(index * 24, (index + 1) * 24)
            .map(element =>
                typeof element === "string" ? formatTime(element, true) : element
            );
    };

    useEffect(() => {
        if (chartRef.current) {
            const selectedData = sliceByIndex(data, index) as number[];
            const selectedLabels = sliceByIndex(labels, index) as string[];

            const colorStops = [0, 0.25, 0.5, 0.75, 1];
            const gradient = chartRef.current.getContext("2d")?.createLinearGradient(0, 0, 0, height);

            if (gradient) {
                gradient.addColorStop(colorStops[0], colors.hot);
                gradient.addColorStop(colorStops[1], colors.warm);
                gradient.addColorStop(colorStops[2], colors.normal);
                gradient.addColorStop(colorStops[3], colors.fresh);
                gradient.addColorStop(colorStops[4], colors.cold);
            }

            const config: ChartConfiguration<'line'> = {
                type: "line",

                data: {
                    labels: selectedLabels,
                    datasets: [
                        {
                            label: label,
                            data: selectedData,
                            fill: {
                                target: 'origin',
                                above: 'rgba(255, 255, 255, 0.149)'
                            },
                            tension: 0.5,
                            borderWidth: 2,
                            borderColor: borderColor ? borderColor : () => gradient,
                            pointBackgroundColor: borderColor,
                            pointRadius: 0,

                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            display: true,
                            min: "00h",
                            max: "23h",
                            border: { color: theme === "dark" ? "white" : "black" },
                            ticks: {
                                display: true,
                                color: theme === "dark" ? "white" : "black"
                            },
                            grid: { display: false }
                        },
                        y: {
                            min: axeYMin,
                            max: axeYMax,
                            display: displayYAxe,
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: axeYTitle,
                                color: theme === "dark" ? "white" : "black"
                            },
                            border: {  color: "transparent" },
                            grid: { display: false }
                        }
                    },
                    plugins: {
                        filler: { propagate: true },
                        legend: { display: false},
                        tooltip: { enabled: false},
                    },

                    animation: {
                        duration: 400,
                        easing: 'linear',
                        loop: (context) => context.active

                    }
                }
            };

            const lineChart = new Chart(chartRef.current, config);
            return function cleanup() {
                lineChart.destroy();
            };
        }
    }, [data, index, labels, label, borderColor, height, colors.cold, colors.normal, colors.warm, colors.hot, axeYMin, axeYMax, axeYTitle, colors.fresh, theme, displayYAxe, width]);

    return (
        <div className="overflow-x-auto w-full min-w-[950px] h-full">
            <canvas aria-label="chart" role="img" ref={chartRef} height={height} width={width}></canvas>
        </div>
    )
};
