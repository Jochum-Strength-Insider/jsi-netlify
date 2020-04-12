import React from 'react';
import moment from 'moment';
import Pagination from 'react-bootstrap/Pagination';

const PaginationBasic = ({ queryDate, changeQueryDate, now, format, spacing }) => {
   const currentDate = {
      formatted: moment(queryDate).format(format),
      unix: Number(moment(queryDate).format("x"))
   }
   const pastDates = [2, 1].map(sub => {
      const date = moment(queryDate).subtract(sub, spacing)
      const formatted = date.format(format);
      const unix = Number(date.format("x"));
      return {
         formatted,
         unix,
      }
   });
   const futureDates = [1, 2].map(add => {
      const date = moment(queryDate).add(add, spacing)
      const formatted = date.format(format);
      const unix = Number(date.format("x"));
      return {
         formatted,
         unix,
      }
   });
   const dates = [...pastDates, currentDate, ...futureDates];
   // const now = Number(moment().format('x'));

   const paginationDates = dates.map((date, idx) => {
      return (
         <Pagination.Item key={date.unix} active={date.formatted === queryDate} disabled={date.unix > now} onClick={changeQueryDate(date.formatted)}>
            {date.formatted}
         </Pagination.Item>
      )
   })
   const prevWeek = pastDates[0];
   const prevWeekButton = <Pagination.Prev disabled={prevWeek.unix > now} onClick={changeQueryDate(prevWeek.formatted)} />

   const nextWeek = futureDates[0];
   const nextWeekButton = <Pagination.Next disabled={nextWeek.unix > now} onClick={changeQueryDate(nextWeek.formatted)} />

   return <Pagination className="my-0 py-0">{prevWeekButton}{paginationDates}{nextWeekButton}</Pagination>
};

export default PaginationBasic;