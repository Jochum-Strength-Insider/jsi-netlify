import React from 'react';
import ExpandableTable from '../ExpandableTable';

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
// import Button from 'react-bootstrap/Button'

// Where should the table editing take place?
// in the program table? or within individaual tables.

// TODO:
// Separate from create and from specific user into separate components

const CreateProgramTable = ({ program, pid, tasks, onSave }) => {

   //Figure this nested mess out. Does the data need to be Json? The Number should keep things in order??
   const data = program.instruction;
   const phasesList = Object.keys(data);


   // Reduce program object into days
   const tablesList = phasesList.reduce((accumulator, key) => {
      const { completed, ...table } = data[key];
      const daysListArray = Object.keys(table);

      // reduce days objects back into parsed JSON
      const daysList = daysListArray.reduce((accumulator, key) => {
         // const day = JSON.parse(table[key]);
         const { exercises, title } = table[key];
         const day = { exercises: JSON.parse(exercises), title: title };

         return (
            { ...accumulator, completed: completed, [key]: day }
         )
      }, {});

      return (
         { ...accumulator, [key]: daysList }
      )
   }, {});

   return (
      <>
         {/* <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example"> */}
         <Tabs fill defaultActiveKey={phasesList[0]} className="dark-tab">
            {phasesList.map((key, index) => {
               const { completed, ...days } = tablesList[key];
               const phaseTitle = key.charAt(0).toUpperCase() + key.substring(1);
               return (
                  <Tab eventKey={key} title={phaseTitle} key={key}>
                     <ExpandableTable onSave={onSave} tasks={tasks} days={days} phase={key} key={key} pid={pid} showTracking={false} />
                  </Tab>
               )
            })}
         </Tabs>
      </>
   )
};

export default CreateProgramTable;