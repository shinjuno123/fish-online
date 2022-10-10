importScripts("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core");
importScripts("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-converter");
importScripts("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-webgl");
importScripts("https://cdn.jsdelivr.net/npm/@tensorflow-models/pose-detection");
let detector;
const detectorConfig = {
    modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
    multiPoseMaxDimension : 320,
    minPoseScore : 0.3
};

onmessage = async function (message) {
    if (message.data.isExecuted === false) {
        detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet);
        console.log("detector created", message.data.isExecuted);
    }



    try {
        const pose = await detector.estimatePoses(message.data.image);
        this.postMessage(pose[0]);
    } catch (e) {
        console.log("detector is not allocated so hold on");
    }



};