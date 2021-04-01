import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { getShoppingHistory } from '../redux/actions/ShoppingHistoryActions';
import moment from 'moment';

const StatisticsComponents = () => {
  const dispatch = useDispatch();

  // const [chartData, setChartData] = useState({
  //   labels: [],
  //   datasets: [
  //     {
  //       label: 'items',
  //       data: [35, 135, 55, 70, 25, 67, 90],

  //       // backgroundColor: [
  //       //   'tomato',
  //       //   'green',
  //       //   'peru',
  //       //   'yellow',
  //       //   'purple',
  //       //   'blue',
  //       //   'pink',
  //       // ],
  //       // backgroundColor: 'none',
  //     },
  //   ],
  // });

  const [chartData, setChartData] = useState({});

  const { history, loading } = useSelector((state) => state.shoppingHistory);

  const { itemCategories } = useSelector((state) => state.categories);

  let itemNamesArr = [];
  let itemNames = [];
  let topItems = [];
  if (history) {
    for (let i = 0; i < history.length; i++) {
      let monthDetails = history[i].monthDetails;
      for (let j = 0; j < monthDetails.length; j++) {
        let historyDetails = monthDetails[j].historyDetails;
        for (let k = 0; k < historyDetails.length; k++) {
          let categoryValues = Object.values(historyDetails[k]);
          for (let l = 0; l < categoryValues.length; l++) {
            let itemValues = categoryValues[l];
            for (let m = 0; m < itemValues.length; m++) {
              // console.log(itemValues[m][0]);
              itemNamesArr.push(itemValues[m][0]);

              // console.log(itemValues[m][0]);

              if (itemNames.indexOf(itemValues[m][0]) === -1) {
                itemNames.push(itemValues[m][0]);
              }
            }
          }
        }
      }
    }
  }

  const getOccurrence = (array, value) => {
    return array.filter((v) => v === value).length;
  };

  if (itemNamesArr || itemNames) {
    for (let i = 0; i < itemNames.length; i++) {
      // console.log(itemNames[i]);
      topItems.push([getOccurrence(itemNamesArr, itemNames[i]), itemNames[i]]);
    }
  }

  let top;
  let itemsTotal;
  if (topItems) {
    top = topItems.map((t) => {
      return t;
    });

    itemsTotal = topItems
      .map((itemNum) => {
        return itemNum[0];
      })
      .reduce((itemNum, sum) => itemNum + sum, 0);
  }

  let topItemsDisplay;
  if (top) {
    topItemsDisplay = top
      .sort()
      .reverse()
      .slice(0, 3)
      .map((items, i) => (
        <div key={i} className='ProgressBar'>
          <div className='ProgressData'>
            <p className='DataName'>{items[1]}</p>
            <p className='DataPercel'>
              {Math.round((itemsTotal / topItems.length) * items[0])}%
            </p>
          </div>
          <div className='Progress'>
            <div
              style={{
                width: `${Math.round(
                  (itemsTotal / topItems.length) * items[0]
                )}%`,
              }}
            ></div>
          </div>
        </div>
      ));
  }

  let topCategoriesDisplay;
  let categoryDetails = [];
  let categoryTotal;
  if (itemCategories) {
    for (let i = 0; i < itemCategories.length; i++) {
      categoryDetails.push([
        itemCategories[i].itemDetails.length,
        itemCategories[i].categoryName,
      ]);
    }

    categoryTotal = categoryDetails
      .map((category) => {
        return category[0];
      })
      .reduce((catTotal, sum) => catTotal + sum, 0);

    topCategoriesDisplay = categoryDetails
      .sort()
      .reverse()
      .slice(0, 3)
      .map((category, i) => (
        <div key={i} className='ProgressBar'>
          <div className='ProgressData'>
            <p className='DataName'>{category[1]}</p>
            <p className='DataPercel'>
              {Math.round(
                (categoryTotal / categoryDetails.length) * category[0]
              )}
              %
            </p>
          </div>
          <div className='Progress Progress2'>
            <div
              style={{
                width: `${Math.round(
                  (categoryTotal / categoryDetails.length) * category[0]
                )}%`,
              }}
            ></div>
          </div>
        </div>
      ));
  }

  let months = [];
  let CHARTDATA = {
    labels: months,
    datasets: [
      {
        label: 'items',
        data: [35, 135],
      },
    ],
  };
  if (history) {
    for (let i = 0; i < history.length; i++) {
      // console.log(history[i].historyMonth.split(' ')[0]);
      months.push(history[i].historyMonth.split(' ')[0]);
    }
  }

  useEffect(() => {
    let months = [];
    const monthsTotal = {
      jan: [],
      feb: [],
      mar: [],
      apr: [],
      may: [],
      jun: [],
      jul: [],
      aug: [],
      sept: [],
      oct: [],
      nov: [],
      dec: [],
    };
    if (history) {
      for (let i = 0; i < history.length; i++) {
        const date = new Date();
        const currentYear = moment(date).format('YYYY');

        if (history[i].historyYear === currentYear) {
          months.push(history[i].historyMonth.split(' ')[0]);

          let monthDetails = history[i].monthDetails;
          // console.log(monthDetails);

          for (let j = 0; j < monthDetails.length; j++) {
            // console.log(history[i].historyMonth.split(' ')[0]);

            switch (history[i].historyMonth.split(' ')[0]) {
              case 'January':
                monthsTotal.jan.push(monthDetails[j].itemsTotal);
                break;
              case 'February':
                monthsTotal.feb.push(monthDetails[j].itemsTotal);
                break;
              case 'March':
                monthsTotal.mar.push(monthDetails[j].itemsTotal);
                break;
              case 'April':
                monthsTotal.apr.push(monthDetails[j].itemsTotal);
                break;
              case 'May':
                monthsTotal.may.push(monthDetails[j].itemsTotal);
                break;
              case 'June':
                monthsTotal.jun.push(monthDetails[j].itemsTotal);
                break;
              case 'July':
                monthsTotal.jul.push(monthDetails[j].itemsTotal);
                break;
              case 'August':
                monthsTotal.aug.push(monthDetails[j].itemsTotal);
                break;
              case 'September':
                monthsTotal.sept.push(monthDetails[j].itemsTotal);
                break;
              case 'October':
                monthsTotal.oct.push(monthDetails[j].itemsTotal);
                break;
              case 'November':
                monthsTotal.nov.push(monthDetails[j].itemsTotal);
                break;
              case 'December':
                monthsTotal.dec.push(monthDetails[j].itemsTotal);
                break;
              default:
                monthsTotal = {};
                break;
            }

            // console.log(monthDetails[j].itemsTotal);
          }
        }
      }
    }

    const monthValues = Object.values(monthsTotal).filter(
      (obj) => obj.length > 1
    );

    if (monthValues) {
      const MONTHS_TOTAL = [];
      for (let i = 0; i < monthValues.length; i++) {
        const sumValues = monthValues[i].reduce((val, sum) => val + sum, 0);

        MONTHS_TOTAL.push(sumValues);

        setChartData({
          labels: months,
          datasets: [{ label: 'items', data: MONTHS_TOTAL }],
        });
      }
    }
  }, [history]);

  useEffect(() => {
    dispatch(getShoppingHistory());
  }, [dispatch]);

  return (
    <div className='StatisticsContainer'>
      <section className='ProgressBarStats'>
        <div className='ProgressBarContainer'>
          <h3 className='StatsHeading'>Top items</h3>
          {topItemsDisplay}
        </div>

        <div className='ProgressBarContainer'>
          <h3 className='StatsHeading'>Top Categories</h3>
          {topCategoriesDisplay}
        </div>
      </section>

      <section className='ProgressGraphStats'>
        <h3 className='StatsHeading'>Monthly Summary</h3>
        <div className='ProgressGraph'>
          <Line
            data={chartData}
            // data={CHARTDATA}
            width={100}
            // height={40}
            height={
              window.innerWidth === 320 || window.innerWidth === 414 ? 100 : 40
            }
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
