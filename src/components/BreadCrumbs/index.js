import React from 'react';

import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { withRouter } from 'react-router-dom';

const BreadCurmbs = ({ history }) => {

   const linksArray = history.location.pathname.split("/");

   const linkReduce = linksArray.reduce((accum, link, idx) => {
      if (idx === 0) {
         return [...accum, window.location.origin];
      } else {
         return (
            [...accum, accum[idx - 1] + "/" + link]
         )
      }
   }, [])

   const linksObject = linkReduce.map((link, idx) => {
      return (
         {
            link: link,
            path: linksArray[idx]
         }
      )
   });

   return (
      <Breadcrumb>
         {
            linksObject.map((obj, idx) => {
               if (obj.path === "") {
                  return (
                     <Breadcrumb.Item key={idx} href={obj.link}>Home</Breadcrumb.Item>
                  )
               } else if (linksArray.length - 1 === idx) {
                  return (
                     <Breadcrumb.Item active key={idx} href={obj.link}>{obj.path}</Breadcrumb.Item>
                  )
               } else {
                  return (
                     <Breadcrumb.Item key={idx} href={obj.link}>{obj.path}</Breadcrumb.Item>
                  )
               }
            })
         }

      </Breadcrumb>
   )
}

export default withRouter(BreadCurmbs);
