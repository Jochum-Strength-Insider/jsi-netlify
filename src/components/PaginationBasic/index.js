import React from 'react';
import moment from 'moment';
import Pagination from 'react-bootstrap/Pagination';

import './style.css';

const PaginationBasic = ({ queryDate, changeQueryDate, now, format, spacing }) => {
   const currentDate = {
      formatted: moment(queryDate).format(format),
      unix: Number(moment(queryDate).format("x")),
      startOf: moment(queryDate).startOf(spacing).format(format)
   }
   const pastDates = [2, 1].map(sub => {
      const date = moment(queryDate).subtract(sub, spacing)
      const formatted = date.format(format);
      const unix = Number(date.format("x"));
      const startOf = moment(date).startOf(spacing).format(format);
      return {
         formatted,
         unix,
         startOf
      }
   });
   const futureDates = [1, 2].map(add => {
      const date = moment(queryDate).add(add, spacing)
      const formatted = date.format(format);
      const unix = Number(date.format("x"));
      const startOf = moment(date).startOf(spacing).format(format);
      return {
         formatted,
         unix,
         startOf
      }
   });
   const dates = [...pastDates, currentDate, ...futureDates];
   // const now = Number(moment().format('x'));

   const paginationDates = dates.map((date, idx) => {
      if (idx === 2) {
         return (
            <Pagination.Item key={date.unix} active={date.formatted === queryDate} disabled={date.unix > now}>
               {date.startOf}
            </Pagination.Item>
         )
      } else {
         return (
            <Pagination.Item className="d-none d-sm-none d-md-block" key={date.unix} active={date.formatted === queryDate} disabled={date.unix > now} onClick={changeQueryDate(date.formatted)}>
               {date.startOf}
            </Pagination.Item>
         )
      }
   })
   const prevWeek = pastDates[1];
   const prevWeekButton = <Pagination.Prev disabled={prevWeek.unix > now} onClick={changeQueryDate(prevWeek.formatted)} />

   const nextWeek = futureDates[0];
   const nextWeekButton = <Pagination.Next disabled={nextWeek.unix > now} onClick={changeQueryDate(nextWeek.formatted)} />

   return <Pagination className="flex-wrap">{prevWeekButton}{paginationDates}{nextWeekButton}</Pagination>
};

export default PaginationBasic;