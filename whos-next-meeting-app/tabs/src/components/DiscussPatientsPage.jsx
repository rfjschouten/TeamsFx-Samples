import { LiveShareClient, TestLiveShareHost } from "@microsoft/live-share";
import { LiveShareHost } from "@microsoft/teams-js";
import { LiveCanvas, InkingManager, InkingTool } from "@microsoft/live-share-canvas";
import { useLiveCanvas } from "@microsoft/live-share-react";
import { useEffect, useState, useRef, useCallback } from "react";
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

  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <>
      <div>
        <h1>Discuss Patient {people[0]}</h1>
      </div>
    </>
  );
};