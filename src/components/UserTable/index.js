import React, { useState } from 'react';

import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

import Modal from "../Modal";
import YoutubeEmbed from "../YoutubeEmbed";

import CustomToggle from '../CustomToggle';
import ExerciseRow from './ExerciseRow';

import "./UserTable.css";

import maxUpper from '../../images/max-upper.jpg'
import maxLower from '../../images/max-lower.jpg'
import dynamicUpper from '../../images/dynamic-upper.jpg'
import dynamicLower from '../../images/dynamic-lower.jpg'
import hypertrophyUpper from '../../images/hypertrophy-upper.jpg'
import hypertrophyLower from '../../images/hypertrophy-lower.jpg'
import recovery1 from '../../images/recovery-1.jpg'
import recovery2 from '../../images/recovery-2.jpg'
import recovery3 from '../../images/recovery-3.jpg'
import fullBody1 from '../../images/full-1.jpg'
import fullBody2 from '../../images/full-2.jpg'
import fullBody3 from '../../images/full-3.jpg'
import fullBody4 from '../../images/full-4.jpg'
import rest from '../../images/rest.jpg'

const images = {
   "max-upper": maxUpper,
   "max-lower": maxLower,
   "dynamic-upper": dynamicUpper,
   "dynamic-lower": dynamicLower,
   "hypertrophy-upper": hypertrophyUpper,
   "hypertrophy-lower": hypertrophyLower,
   "full-body-1": fullBody1,
   "full-body-2": fullBody2,
   "full-body-3": fullBody3,
   "full-body-4": fullBody4,
   "recovery": recovery1,
   "recovery-1": recovery1,
   "recovery-2": recovery2,
   "recovery-3": recovery3,
   "rest": rest,
}

const UserTable = ({ program, saveTracking }) => {

   // console.log("userTable", program);

   const { instruction, workoutId } = program;
   const phasesList = Object.keys(instruction);

   // Reduce program object into days
   const tablesList = phasesList.reduce((accumulator, key) => {
      const { completed, ...table } = instruction[key];
      const daysListArray = Object.keys(table);

      // reduce days objects back into parsed JSON
      const daysList = daysListArray.reduce((accumulator, key) => {

         const { exercises, title, image } = table[key];
         const day = {
            exercises: JSON.parse(exercises),
            title,
            image
         }

         return (
            { ...accumulator, completed: completed, [key]: day }
         )
      }, {});

      return (
         { ...accumulator, [key]: daysList }
      )
   }, {});
   // console.log("phasesList", tablesList);

   return (
      <>

         <Tabs defaultActiveKey={0} className="dark-tab mt-3 mb-4">
            {phasesList.map((key, index) => {
               const { completed, ...days } = tablesList[key];

               return (
                  <Tab eventKey={index} title={key} key={index}>
                     <PhaseTable days={days} workoutId={workoutId} phase={key} completed={completed} saveTracking={saveTracking} />
                  </Tab>
               )
            })}
         </Tabs>

      </>
   )
};

const PhaseTable = ({ days, phase, saveTracking }) => {

   const updateSaveTracking = (dayTitle, rowIndex, itemUpdate) => {
      const daysUpdate = { ...days };
      // console.log(daysUpdate[dayTitle]);
      const dayUpdate = daysUpdate[dayTitle];
      dayUpdate.exercises[rowIndex] = itemUpdate;

      const { exercises, title, image } = dayUpdate;
      const jsonUpdate = JSON.stringify(exercises);

      daysUpdate[dayTitle] = {
         exercises: jsonUpdate,
         title,
         image
      };

      return saveTracking(phase, dayTitle, rowIndex, daysUpdate[dayTitle]);
   }

   const daysList = Object.keys(days);

   return (
      <>
         {/* <ListGroup > */}
         <Accordion className="mb-5">
            {
               daysList.map((key, daysIndex) => {
                  const day = days[key];
                  const image = images[day.image];
                  // console.log(image);
                  const dayCapitalized = key.charAt(0).toUpperCase() + key.substring(1) + ": " + day.title;

                  return (
                     <Card key={daysIndex} className="user-program-day my-5 no-border rounded">
                        <CustomToggle eventKey={daysIndex}>
                           {/* {daysIndex % 2 === 0 ? (<Card.Img variant="top" src={armGuyImg} />) : (<Card.Img variant="top" src={legDay} />)} */}
                           <Card.Img variant="top" src={image} />
                           <Card.Body className="bg-purple">
                              <h3 style={{ color: "white" }}>{dayCapitalized}</h3>
                           </Card.Body>
                        </CustomToggle>
                        <Accordion.Collapse eventKey={daysIndex}>
                           <DayTable day={day} dayTitle={key} updateSaveTracking={updateSaveTracking} />
                        </Accordion.Collapse>
                     </Card>
                  )
               }
               )
            }
         </Accordion>
         {/* </ListGroup> */}
      </>
   )
}

const DayTable = ({ day, dayTitle, updateSaveTracking }) => {
   const [show, setShow] = useState(false);
   const [heading, setHeading] = useState(null);
   const [youtubeId, setYoutubeId] = useState(null);

   const handleOpen = () => setShow(true);
   const handleClose = () => {
      setHeading(null);
      setYoutubeId(null);
      setShow(false);
   }

   const setModal = (heading, youtubeId) => () => {
      setHeading(heading);
      setYoutubeId(youtubeId);
      handleOpen();
   }

   const headers = Object.keys(day.exercises[0]);
   // const { title, exercises } = day;
   const { exercises } = day;

   return (
      <>
         {/* <h3>{dayTitle + ": " + title}</h3> */}
         <Modal show={show} handleClose={handleClose} heading={heading}>
            <YoutubeEmbed youtubeId={youtubeId} />
         </Modal>

         <ListGroup variant="flush" >
            <ListGroup.Item className="d-none d-sm-none d-md-block">
               <Row>
                  <Col xs={12} md={1}>#</Col>
                  <Col xs={12} md={3}>Description</Col>
                  <Col xs={12} md={1}>Link</Col>
                  <Col xs={12} md={1}>Sets</Col>
                  <Col xs={12} md={2}>Reps</Col>
                  <Col xs={12} md={2}>Tempo</Col>
                  <Col xs={12} md={1}>Rest</Col>
                  <Col xs={12} md={1}></Col>
               </Row>
            </ ListGroup.Item >

            {exercises.map((item, rowIndex) => (
               <ListGroup.Item key={rowIndex}>
                  <ExerciseRow item={item} headers={headers} dayTitle={dayTitle} rowIndex={rowIndex} updateSaveTracking={updateSaveTracking} setModal={setModal} />
               </ListGroup.Item>
            ))}
         </ListGroup>
      </>
   )
}

export default UserTable;