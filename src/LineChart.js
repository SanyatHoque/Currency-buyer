import React from 'react';
import { Line } from 'react-chartjs-2';
import {useState,useContext} from 'react';
import {ThemeContext} from './toggleButton';
function LineChart() {
const context = useContext(ThemeContext);  // change this
console.log({context})
const labels_data = context.data.y0;
console.log(context.data.x0)
// context.data.x0.map((x) => {
//     console.log(x)});
// context.data.x0.map((x) => {
//     labels_data.push(x)});
// context.data.y0.map((x) => {
//     console.log(x)});
const labels_data_y = context.data.x0;
// context.data.y0.map((y) => {
//     labels_data_y.push(y)});
const data = {
  labels: labels_data,
  datasets: [
    {
      label: 'Exchange Rate from CAD to USD',
      data: labels_data_y,
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};
return(
// const LineChart = () => (
  <>
    <div className='header'>
      <h1 className='title'>Exchange Rates</h1>
      <div className='links'>
        <a
          className='btn btn-gh'
          href='https://www.frankfurter.app/docs/#latest'
        >
          Using Frankfurter API 
        </a>
        {/* <div>{context.data.display}</div>
        <div>
            {context.data.x0.map((x) => <div>{x}</div>)}
        </div> */}
      </div>
    </div>
    <Line data={data} options={options} />
  </>
)};

export default LineChart;
