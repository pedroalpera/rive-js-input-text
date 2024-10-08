// This is the High level JS runtime for Rive
// https://rive.app/community/doc/web-js/docvlgbnS1mp

const riveInstance = new rive.Rive({
  src: "input_text.riv",
  canvas: document.getElementById("canvas"),
  autoplay: true,
  artboard: "Artboard",
  automaticallyHandleEvents: true, // Automatically handle RiveHTTPEvents
  stateMachines: "State Machine 1",

  onLoad: () => {
    riveInstance.resizeDrawingSurfaceToCanvas();

    // If we click over the transparent html text
    document.getElementById("inputTextField").onfocus = function () {
      riveInstance.setTextRunValue("HintInputTextRun", "");
      inputTextFocus_Boolean.value = true;
      inputFocus = true;
    };

    let initialHint = "Type here :)"
    let initialWord = "Type here :)"

    // Inputs in Rive file
    const inputs = riveInstance.stateMachineInputs("State Machine 1");

    let inputTextFocus_Boolean = inputs.find(
      (i) => i.name === "inputTextFocus_Boolean"
    );

    // Rive Events

    const onRiveEventReceived = (riveEvent) => {
      const eventData = riveEvent.data;
      const eventProperties = eventData.properties;

      if (eventData.type === rive.RiveEventType.General) {
        if (eventData.name == "Event DeleteAll") {
          textInput = "";
          riveInstance.setTextRunValue("InputTextRun", "");
          riveInstance.setTextRunValue("TimeRun1", textInput);
          riveInstance.setTextRunValue("TimeRun2", textInput);
          riveInstance.setTextRunValue("TimeRun3", textInput);
          riveInstance.setTextRunValue("TimeRun4", textInput);
   
        }
        if (eventData.name == "Event InputFocus") {
          riveInstance.setTextRunValue("HintInputTextRun", "");
          inputFocus = true;
        }
        if (eventData.name == "Event DeactivateInputFocus") {
          if (textInput.length == 0) {
            riveInstance.setTextRunValue("HintInputTextRun", initialHint);
          }

          inputFocus = false;
        }
      }
    };

    riveInstance.on(rive.EventType.RiveEvent, onRiveEventReceived);

    // InputFocus
    let inputFocus = false;
    // Mouse Position
    const mouse = {
      x: null,
      y: null,
    };

    // Canvas position in the document
    let rect = canvas.getBoundingClientRect();

    // On Mouse Down
    document.addEventListener("mousedown", function (event) {
      detectPosition(event);
    });

    function detectPosition(event) {
      rect = canvas.getBoundingClientRect();

      // Calculate the position
      mouse.x = Math.floor(event.x - rect.x);
      mouse.y = Math.floor(event.y - rect.y);

      // Deactivate Input text if you click outside of the canvas

      if (mouse.x < 0 || mouse.x > 500 || mouse.y < 0 || mouse.y > 500) {
        if (textInput.length == 0) {
          riveInstance.setTextRunValue("HintInputTextRun", initialHint);
        }
        inputTextFocus_Boolean.value = false;
        inputFocus = false;
      }
    }

    riveInstance.setTextRunValue("InputTextRun", "");
    riveInstance.setTextRunValue("HintInputTextRun", initialHint);

    ///////////////////
    /// INPUT TEXT  ///
    ///////////////////

    let textInput = "";

    document.onkeydown = handleEnter;

    function handleEnter(e) {
      if (inputFocus) {
        
     
      var keyCode = e.keyCode;

      // If is a character add it to the text
      if (e.key.length === 1) {
        textInput += e.key;
      }
      // If Backspace delete one character
      if (e.key == "Backspace") {
     
        textInput = textInput.slice(0, -1);
      }
      riveInstance.setTextRunValue("InputTextRun", textInput);
      riveInstance.setTextRunValue("TimeRun1", textInput);
      riveInstance.setTextRunValue("TimeRun2", textInput);
      riveInstance.setTextRunValue("TimeRun3", textInput);
      riveInstance.setTextRunValue("TimeRun4", textInput);
    }
  }
  },
});
