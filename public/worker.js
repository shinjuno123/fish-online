importScripts("tfjs-core.js");
importScripts("tfjs-converter.js");
importScripts("tfjs-backend-webgl.js");
importScripts("pose-detection.js");
let detector;
const detectorConfig = { modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING };

onmessage = async function (message) {
    if (message.data.isExecuted === false){
        detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);
        console.log("detector created",message.data.isExecuted);
    }



    try{
        const pose = await detector.estimatePoses(message.data.image);
        this.postMessage(pose[0]);
    } catch(e){
        console.log("detector is not allocated so hold on");
    }


    
};