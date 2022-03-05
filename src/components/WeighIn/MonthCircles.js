import moment from 'moment';

const MonthCircles = ({ queryDate, changeQueryDate }) => {
   const startOfMonth = moment(queryDate).startOf("M");

   const nowUnix = Number(moment().format("x"));

   const prevMonth = moment(queryDate).subtract(1, "M").format('YYYY-MM-DD');
   const nextMonth = moment(queryDate).add(1, "M").format('YYYY-MM-DD');
   const nextMonthUnix = Number(moment(queryDate).add(1, "M").format('x'));

   const pastMonths = [2, 1].map(sub => {
      const date = moment(startOfMonth).subtract(sub, "M")
      const formatted = date.format('YYYY-MM-DD');
      const month = date.format('MMM');
      const unix = Number(date.format("x"));
      return {
         formatted,
         unix,
         month
      }
   });

   const thisMonth = {
      formatted: moment(startOfMonth).format('YYYY-MM-DD'),
      month: moment(startOfMonth).format('MMM'),
      unix: Number(moment(startOfMonth).format("x")),
   }

   const futureMonths = [1, 2].map(add => {
      const date = moment(startOfMonth).add(add, "M")
      const formatted = date.format('YYYY-MM-DD');
      const month = date.format('MMM');
      const unix = Number(date.format("x"));
      return {
         formatted,
         unix,
         month
      }
   });

   const disabled = nextMonthUnix > nowUnix;

   return (
      <>
         <div className="d-flex justify-content-between date-circles">

            <button onClick={changeQueryDate(prevMonth)} className="date previous d-flex align-items-center justify-content-center">
               <div>
                  <div>&#8249;</div>
               </div>
            </button>

            {
               pastMonths.map((month, index) => {
                  if (index === 1) {
                     return (
                        <button
                           onClick={changeQueryDate(month.formatted)}
                           key={month.unix}
                           disabled={month.unix > nowUnix}
                           className={`date d-none d-sm-flex align-items-center justify-content-center`}
                        >
                           <div>
                              <div className="month">{month.month}</div>
                           </div>
                        </button>
                     )
                  } else {
                     return (
                        <button
                           onClick={changeQueryDate(month.formatted)}
                           key={month.unix}
                           disabled={month.unix > nowUnix}
                           className={`date d-none d-md-flex align-items-center justify-content-center`}
                        >
                           <div>
                              <div className="month">{month.month}</div>
                           </div>
                        </button>
                     )
                  }
               })
            }

            <button
               onClick={changeQueryDate(thisMonth.formatted)}
               key={thisMonth.unix}
               disabled={thisMonth.unix > nowUnix}
               className={`date d-flex align-items-center justify-content-center current-date`}
            >
               <div>
                  <div className="month">{thisMonth.month}</div>
               </div>
            </button>

            {
               futureMonths.map((month, index) => {
                  if (index === 1) {
                     return (
                        <button
                           onClick={changeQueryDate(month.formatted)}
                           key={month.unix}
                           disabled={month.unix > nowUnix}
                           className={`date d-none d-md-flex align-items-center justify-content-center ${month.unix > nowUnix && "future-date"}`}
                        >
                           <div>
                              <div className="month">{month.month}</div>
                           </div>
                        </button>
                     )
                  } else {
                     return (
                        <button
                           onClick={changeQueryDate(month.formatted)}
                           key={month.unix}
                           disabled={month.unix > nowUnix}
                           className={`date d-none d-sm-flex align-items-center justify-content-center ${month.unix > nowUnix && "future-date"}`}
                        >
                           <div>
                              <div className="month">{month.month}</div>
                           </div>
                        </button>
                     )
                  }

               })
            }

            <button
               onClick={changeQueryDate(nextMonth)}
               disabled={disabled}
               className={`date next d-flex align-items-center justify-content-center ${disabled && "disabled"}`}>
               <div>
                  <div>&#8250;</div>
               </div>
            </button>
         </div>
      </>
   )
};

 export default MonthCircles;