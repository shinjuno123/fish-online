importScripts("tfjs-core.js");
importScripts("tfjs-converter.js");
importScripts("tfjs-backend-webgl.js");
importScripts("pose-detection.js");
const a = "executed";
let detector;
let cnt = false;
const detectorConfig = { modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING };

onmessage = async function (message) {
    if (cnt === false){
        detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);
        console.log("detector created");
        cnt = true;
    }



    const pose = await detector.estimatePoses(message.data.image);
    // console.log(pose[0]);

    this.postMessage(pose)

    
};