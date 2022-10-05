importScripts("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core");
importScripts("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-converter");
importScripts("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-webgl");
importScripts("https://cdn.jsdelivr.net/npm/@tensorflow-models/pose-detection");


onmessage = async function (message) {
    // console.log(message.data.image.data);
    // console.log(poseDetection);

    const detectorConfig = { modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING };
    const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);
    // console.log();
    // const poses = await detector.estimatePoses(message.data.image);
    // console.log(poses);
};