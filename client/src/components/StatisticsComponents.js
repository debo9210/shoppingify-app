import React, { useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

const StatisticsComponents = () => {
  const [chartData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'items',
        data: [35, 135, 55, 70, 25, 67, 90],

        // backgroundColor: [
        //   'tomato',
        //   'green',
        //   'peru',
        //   'yellow',
        //   'purple',
        //   'blue',
        //   'pink',
        // ],
        // backgroundColor: 'none',
      },
    ],
  });
  return (
    <div className='StatisticsContainer'>
      <section className='ProgressBarStats'>
        <div className='ProgressBarContainer'>
          <h3 className='StatsHeading'>Top items</h3>
          <div className='ProgressBar'>
            <div className='ProgressData'>
              <p className='DataName'>Banana</p>
              <p className='DataPercel'>12%</p>
            </div>
            <div className='Progress'>
              <div></div>
            </div>
          </div>

          <div className='ProgressBar'>
            <div className='ProgressData'>
              <p className='DataName'>Rice</p>
              <p className='DataPercel'>10%</p>
            </div>
            <div className='Progress'>
              <div></div>
            </div>
          </div>

          <div className='ProgressBar'>
            <div className='ProgressData'>
              <p className='DataName'>Chicken 1kg</p>
              <p className='DataPercel'>8%</p>
            </div>
            <div className='Progress'>
              <div></div>
            </div>
          </div>
        </div>

        <div className='ProgressBarContainer'>
          <h3 className='StatsHeading'>Top Categories</h3>
          <div className='ProgressBar'>
            <div className='ProgressData'>
              <p className='DataName'>Fruit and vegetables</p>
              <p className='DataPercel'>23%</p>
            </div>
            <div className='Progress Progress2'>
              <div></div>
            </div>
          </div>

          <div className='ProgressBar'>
            <div className='ProgressData'>
              <p className='DataName'>Meat and Fish</p>
              <p className='DataPercel'>14%</p>
            </div>
            <div className='Progress Progress2'>
              <div></div>
            </div>
          </div>

          <div className='ProgressBar'>
            <div className='ProgressData'>
              <p className='DataName'>Pets</p>
              <p className='DataPercel'>11%</p>
            </div>
            <div className='Progress Progress2'>
              <div></div>
            </div>
          </div>
        </div>
      </section>

      <section className='ProgressGraphStats'>
        <h3 className='StatsHeading'>Monthly Summary</h3>
        <div className='ProgressGraph'>
          <Line
            data={chartData}
            width={100}
            height={40}
            options={{
              // title: {
              //   display: true,
              //   text: 'items',
              // },
              legend: {
                display: true,
                position: 'bottom',
              },
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default StatisticsComponents;
