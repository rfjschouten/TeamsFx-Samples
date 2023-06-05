import { useEffect, useState } from "react";
//import { useLiveCanvas } from "../utils/useLiveCanvas";
import FluidService from "../services/fluidLiveShare.js";
import { app } from "@microsoft/teams-js";
import "./DiscussPatientsPage.scss";

export const DiscussPatientsPage = () => {
  const [people, setPeople] = useState([]);

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

  return (
    <>
      <div>
        {people && people.length > 0 &&
          <>
            <h1>Discuss Patient list for {people[0].name}</h1>
            {people[0].patients.map((patient) => {
              return (
                <div className={`patientcard ${patient.status.replace(' ', '-')}`}>
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