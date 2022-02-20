import React, { useContext, useState, useEffect } from "react";
import { child, onValue, get, update } from "firebase/database";
import { compose } from "recompose";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from "../Session";
import { withFirebase } from "../Firebase";

import UserTable from "../UserTable";

const ProgramPage = () => {
  const authUser = useContext(AuthUserContext);

  if (authUser.ACTIVE) {
    return (
      <Container fluid>
        <div className="d-flex justify-content-center">
          <div className="contain-width">
            <ManageUserTables authUser={authUser} />
          </div>
        </div>
      </Container>
    );
  } else {
    return (
      <Container fluid>
        <Row className="d-flex justify-content-center mt-5">
          <Card style={{ width: "30rem" }}>
            <Card.Header className="text-center">
              <strong>Account Status</strong>
            </Card.Header>
            <Card.Body className="text-center">
              Your Account is currently deactivated. To reactivate your account
              reapply for Jochum Strength Insider or contact
              jochumstrength@gmail.com for more information.
            </Card.Body>
          </Card>
        </Row>
      </Container>
    );
  }
};

const ManageUserTablesBase = ({ authUser, firebase }) => {
  const [program, setProgram] = useState(
    JSON.parse(localStorage.getItem("program")) || null
  );
  const [activeKey, setActiveKey] = useState(null);
  const [error, setError] = useState(null);

  const dateString = program
    ? new Date(program.createdAt).toLocaleDateString("en-US")
    : "";

  const saveTracking = (authUserId, workoutId) => (phase, day, row, item) => {
     console.log(authUserId, workoutId);
    const saveTrackingRef = child(
      firebase.workout(authUserId, workoutId),
      "instruction/" + phase
    );
    return update(saveTrackingRef, { [day]: item })
            .catch((error) => setError(error));
  };

  useEffect(() => {
    console.log("useEffect");
    const activeWorkoutsRef = firebase.activeWorkoutIds(authUser.uid);
    get(activeWorkoutsRef).then(snap => {
      const idObject = snap.val();
      if (idObject) {
        const objectKey = Object.keys(idObject)[0];
        setActiveKey(objectKey);

      onValue(firebase.workout(authUser.uid, objectKey), (snapshot) => {
          const workoutObject = snapshot.val();
          if (workoutObject) {
            localStorage.setItem("program", JSON.stringify(workoutObject));
            setProgram(workoutObject);
          } else {
            localStorage.removeItem("program");
            setProgram(null);
          }
        });
      } else {
        localStorage.removeItem("program");
        setProgram(null);
        setActiveKey(null);
      }
    }).catch((error) => {
      setError(error);
    });;

    return () => {
       console.log('off');
    };
  }, [firebase, authUser.uid, activeKey]);

  return (
    <div className="app-top">
      {program ? (
        <>
          <h1>{program.title}</h1>
          <h4>{dateString}</h4>
          <UserTable
            program={program}
            uid={authUser.uid}
            saveTracking={saveTracking(authUser.uid, activeKey)}
          />
        </>
      ) : (
        <Container fluid>
          <Row className="d-flex justify-content-center mt-5">
            <Card>
              <Card.Header className="text-center">
                <strong>No Programs</strong>
              </Card.Header>
              <Card.Body className="text-center">
                You have no available programs at this time.
              </Card.Body>
            </Card>
          </Row>
        </Container>
      )}
    </div>
  );
};

const ManageUserTables = withFirebase(ManageUserTablesBase);

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(ProgramPage);
