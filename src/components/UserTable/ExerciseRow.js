import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


const ExerciseRow = ({ item, headers, dayTitle, rowIndex, updateSaveTracking }) => {
   const { tracking } = item;
   const [trackingData, setTrackingData] = useState(tracking);
   const [open, setOpen] = useState(false);
   const [alert, setAlert] = useState(false);

   // const xs = 12;
   // const sm = 1;
   // const md = 1;
   // const lg = 1;
   // const xl = 1;


   const onAlert = () => {
      setAlert(true);
      setTimeout(() => {
         setAlert(false);
      }, 2000);
   }

   const onChange = (e) => {
      const { name, value } = e.target;
      const updateTrackingData = { ...trackingData };
      updateTrackingData[name] = value;
      setTrackingData(updateTrackingData);

   }

   const handleSave = (e) => {
      e.preventDefault();
      const itemUpdate = { ...item };
      itemUpdate["tracking"] = trackingData;
      updateSaveTracking(dayTitle, rowIndex, itemUpdate)
         .then((snap) => onAlert());
   }

   return (

      <>

         {/* <Row className="xs-visible">
            <Col className="xs-visible" xs={6}>#</Col>
            <Col className="xs-visible" xs={6}>Description</Col>
            <Col className="xs-visible" xs={6}>Link</Col>
            <Col className="xs-visible" xs={6}>Sets</Col>
            <Col className="xs-visible" xs={6}>Reps</Col>
            <Col className="xs-visible" xs={6}>Tempo</Col>
            <Col className="xs-visible" xs={6}>Rest</Col>
            <Col className="xs-visible" xs={6}>Track</Col>
         </Row> */}
         <Row>
            {/* {

               headers.map((header, idx) => {
                  if (header === "Link") {
                     return (
                        <Col key={`${header}-${idx}`}>
                           <a href={item[header]}>Link</a>
                        </Col>
                     )
                  } else if (header === "tracking") {
                     return ""
                  } else if (header === "Number") {
                     return (
                        <Col xs={1} key={`${header}-${idx}`}>
                           {item[header]}
                        </Col>
                     )
                  } else {
                     return (
                        <Col key={`${header}-${idx}`}>
                           {item[header]}
                        </Col>
                     )
                  }
               })
            } */}


            <Col className="xs-visible" xs={6}>#</Col>
            <Col xs={6} sm={1}>{item['Number']}</Col>
            <Col className="xs-visible" xs={12}><hr></hr></Col>

            <Col className="xs-visible" xs={6}>Description</Col>
            <Col xs={6} sm={3}>{item['Description']}</Col>
            <Col className="xs-visible" xs={12}><hr></hr></Col>


            <Col className="xs-visible" xs={6}>Link</Col>
            <Col xs={6} sm={1}><a href={item["Link"]}>Link</a></Col>
            <Col className="xs-visible" xs={12}><hr></hr></Col>


            <Col className="xs-visible" xs={6}>Sets</Col>
            <Col xs={6} sm={1}>{item["Sets"]}</Col>
            <Col className="xs-visible" xs={12}><hr></hr></Col>


            <Col className="xs-visible" xs={6}>Reps</Col>
            <Col xs={6} sm={2}>{item["Reps"]}</Col>
            <Col className="xs-visible" xs={12}><hr></hr></Col>


            <Col className="xs-visible" xs={6}>Tempo</Col>
            <Col xs={6} sm={1}>{item["Tempo"]}</Col>
            <Col className="xs-visible" xs={12}><hr></hr></Col>


            <Col className="xs-visible" xs={6}>Rest</Col>
            <Col xs={6} sm={1}>{item["Rest"]}</Col>
            <Col className="xs-visible" xs={12}><hr></hr></Col>


            {/* <Col className="xs-visible" xs={6}>Track</Col> */}
            <Col xs={12} sm={2}>
               <Button className="text-center"
                  onClick={() => setOpen(!open)}
                  aria-controls="example-collapse-text"
                  aria-expanded={open}
                  variant="outline-primary"
                  block
               >
                  Track
            </Button>
            </Col>
         </Row>

         <hr></hr>

         <Collapse in={open}>
            {/* <Row> */}

            <Form onSubmit={handleSave}>
               <Form.Row>

                  {
                     Object.keys(trackingData).map((week, index) => {
                        return (

                           <Form.Group xs={12} md={3} as={Col} key={week} className="align-self-center">
                              <InputGroup className="mb-3">
                                 <InputGroup.Prepend>
                                    <InputGroup.Text id={`basic-addon-week-${index + 1}`}>{week}</InputGroup.Text>
                                 </InputGroup.Prepend>
                                 <Form.Control
                                    aria-label={`${week} weight tracking`}
                                    type="text"
                                    placeholder="10lbs"
                                    value={trackingData[week]}
                                    name={week}
                                    onChange={onChange}
                                    aria-describedby={`basic-addon-week-${index + 1}`}
                                 />
                              </InputGroup>
                           </Form.Group>
                        )
                     })
                  }
                  <Form.Group as={Col} xs={12} md={3}>
                     {
                        alert
                           ? <Button block type="submit" className="mx-1 px-5" variant="outline-success">Saved!</Button>
                           : <Button block type="submit" className="mx-1 px-5" variant="outline-primary">Save</Button>
                     }
                  </Form.Group>
               </Form.Row>
            </Form>

            {/* </Row> */}
         </Collapse>
      </>
   )
}

export default ExerciseRow;