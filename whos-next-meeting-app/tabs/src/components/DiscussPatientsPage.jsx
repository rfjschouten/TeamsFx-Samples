import { useEffect, useState } from "react";
//import { useLiveCanvas } from "../utils/useLiveCanvas";
import FluidService from "../services/fluidLiveShare.js";
import { app } from "@microsoft/teams-js";
import "./DiscussPatientsPage.scss";
import { UserMeetingRole } from "@microsoft/live-share";
import * as liveShareHooks from "../live-share-hooks";


export const DiscussPatientsPage = (presence) => {
  const [people, setPeople] = useState([]);
  const ALLOWED_ROLES = [UserMeetingRole.organizer, UserMeetingRole.presenter];

  const initialize = async () => {
    await app.initialize();
    app.notifySuccess();
    await FluidService.connect();
    const people = await FluidService.getPersonList();

    setPeople(people);
    FluidService.onNewData((people) => {
      setPeople(people);
    });
  };

  useEffect(() => {
    initialize();
  }, []);

  const {
    presenceStarted, // boolean that is true once presence.initialize() is called
    localUser, // local user presence object
    users, // user presence array
    localUserHasRoles, // boolean that is true if local user is in one of the allowed roles
  } = liveShareHooks.usePresence(
    presence,
    ALLOWED_ROLES
  );

  const showPatient = () => {
    console.log("showPatient");
    console.log(localUser.roles);
    users.forEach(user => {
      console.log(user.displayName);
    });
    if (localUserHasRoles) {
      console.log("Ispresenter true");
      //setLiveState(false);
    }
  }

  return (
    <>
      <div>
        {people && people.length > 0 &&
          <>
            <h1>Discuss Patient list for {people[0].name}</h1>
            {people[0].patients.map((patient) => {
              return (
                <div className={`patientcard ${patient.status.replace(' ', '-')}`} onClick={() => showPatient()}>
                  <div className="name" key={patient.name}>{patient.name}</div>
                  <div className="status" key={patient.status}>{patient.status}</div>
                </div>
              )
            })}
          </>
        }
      </div>
    </>
  );
};