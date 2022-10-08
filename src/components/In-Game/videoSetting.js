async function videoSetting(video,cameraOptions,selectedIndex){
    async function getCameraSelection(){
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        const options = videoDevices.map(videoDevice => {
            return `<option value="${videoDevice.deviceId}">${videoDevice.label}</option>`;
          });
        return options;
    }


    if(selectedIndex === 0){
        const options = await getCameraSelection();
        cameraOptions.current.innerHTML = options.join('');
    }



    const selectedCamera = cameraOptions.current.options[selectedIndex].value;

    const contraints = {
        video: {
            width: {
              max: 400
            },

        },
        deviceId:{
            exact: selectedCamera
        },
          
    };

    const stream = await navigator.mediaDevices.getUserMedia(contraints);

    video.current.srcObject = stream;
    
    

}


export default videoSetting;