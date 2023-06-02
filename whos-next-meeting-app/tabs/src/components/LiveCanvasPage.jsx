import { LiveShareClient, TestLiveShareHost } from "@microsoft/live-share";
import { LiveShareHost } from "@microsoft/teams-js";
import { LiveCanvas, InkingManager, InkingTool } from "@microsoft/live-share-canvas";
import { useLiveCanvas } from "@microsoft/live-share-react";
import { useEffect, useState, useRef, useCallback } from "react";
//import { useLiveCanvas } from "../utils/useLiveCanvas";
import FluidService from "../services/fluidLiveShare.js";
import { app } from "@microsoft/teams-js";

const containerSchema = {
  initialObjects: {
    liveCanvas: LiveCanvas,
  },
};

export const LiveCanvasPage = () => {
  const [inkManager, setInkManager] = useState(undefined);
  const divRef = useRef(null);

  const setToPen = useCallback(() => {
    if (inkManager) {
      inkManager.tool = InkingTool.pen;
      inkManager.penBrush.tipSize = 0.8;
    }
  }, [inkManager]);

  const setToLaserPointer = useCallback(() => {
    if (inkManager) {
      inkManager.tool = InkingTool.laserPointer;
    }
  }, [inkManager]);

  const setToHighlighter = useCallback(() => {
    if (inkManager) {
      inkManager.tool = InkingTool.highlighter;
    }
  }, [inkManager]);

  const setToEraser = useCallback(() => {
    if (inkManager) {
      inkManager.tool = InkingTool.pointEraser;
    }
  }, [inkManager]);

  const setToBlackBrush = useCallback(() => {
    if (inkManager) {
      inkManager.tool = InkingTool.brush;
      inkManager.penBrush.color = { r: 0, g: 0, b: 0 };
      inkManager.penBrush.tipSize = 1;
    }
  }, [inkManager]);

  const setToBlueBrush = useCallback(() => {
    if (inkManager) {
      inkManager.tool = InkingTool.brush;
      inkManager.penBrush.color = { r: 0, g: 0, b: 255, a: 1 };
      inkManager.penBrush.tipSize = 1;
    }
  }, [inkManager]);

  const setToRedBrush = useCallback(() => {
    if (inkManager) {
      inkManager.tool = InkingTool.brush;
      inkManager.penBrush.color = { r: 255, g: 0, b: 0 };
      inkManager.penBrush.tipSize = 2;
    }
  }, [inkManager]);

  const clearCanvas = useCallback(() => {
    if (inkManager) {
      inkManager.clear();
    }
  }, [inkManager]);

  const initialize = async () => {
    await app.initialize();
    app.notifySuccess();
    await FluidService.connect();
    const liveCanvas = await FluidService.getCanvas();//.initialize(inkManager);
    setInkManager(new InkingManager(divRef.current));

    // Toggle Live Canvas cursor enabled state
    liveCanvas.isCursorShared = true;
    await liveCanvas.initialize(inkManager);

    // Activate the InkingManager so it starts handling pointer input
    inkManager.activate();
    //setInkManager(inkManager);
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <>
      <div id="inkingRoot" style={{ display: 'flex', flexDirection: "column", height: '100%', width: '100%', border: '1px solid black' }}>
        {/* <img src={require('../images/tekening.png')} /> */}
        <div id="inkingHost" ref={divRef} style={{ height: '100%', width: '100%', backgroundPosition: '50% 50%', backgroundRepeat: "no-repeat", backgroundImage: `url(${require('../images/tekening.png')})` }} >
        </div>
        <div>
          <button onClick={clearCanvas}>Clear</button>
          <button onClick={setToEraser}>Eraser</button>
          <button onClick={setToPen}>Pen</button>
          <button onClick={setToHighlighter}>Highlighter</button>
          <button onClick={setToLaserPointer}>Laser Pointer</button>
          <button onClick={setToBlueBrush}>Blue brush</button>
          <button onClick={setToBlackBrush}>Black brush</button>
          <button onClick={setToRedBrush}>Red brush</button>
        </div>
      </div>
    </>
  );
};