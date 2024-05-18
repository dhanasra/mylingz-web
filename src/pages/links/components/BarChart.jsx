import React from 'react';
import Chart from 'react-apexcharts';
import MainCard from '../../../components/MainCard';
import { Typography } from '@mui/material';

const BarChart = ({ chartData }) => {

    console.log(chartData)

    // Prepare data for ApexCharts
    const labels = chartData.map(data => data.label);
    const values = chartData.map(data => data.value);

    const series = [{
        name: 'Analytics',
        data: values
    }];

    const options = {
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: labels,
        },
        yaxis: {
            title: {
                text: 'Count'
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val;
                }
            }
        }
    };

    return (
        <MainCard>
            <Typography
              variant='h4'
              sx={{
                fontWeight: 500
              }}
            >
              Last Week Analysis
            </Typography>
            <Chart
                options={options}
                series={series}
                type="bar"
                height={350}
            />
        </MainCard>
    );
};

export default BarChart;