import { useEffect, useState } from "react";
//import { useLiveCanvas } from "../utils/useLiveCanvas";
import FluidService from "../services/fluidLiveShare.js";
import { app } from "@microsoft/teams-js";

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
            <h1>Discuss Patient {people[0].name}</h1>
            {people[0].patients.map((patient) => {
              return (
                <div>
                  <div key={patient.name}>{patient.name}</div>
                  <div key={patient.status}>{patient.status}</div>
                </div>
              )
            })}
          </>
        }
      </div>
    </>
  );
};