function controlMobSize (second) {
    let minMobSize, maxMobSize;
    if (0 < second && second <= 30) {
        minMobSize = 70;
        maxMobSize = 80;
    } else if (30 < second && second <= 60) {
        minMobSize = 80;
        maxMobSize = 100;
    } else if (60 < second && second <= 90) {
        minMobSize = 100;
        maxMobSize = 120;
    } else if (90 < second && second <= 120) {
        minMobSize = 120;
        maxMobSize = 130;
    } else if (120 < second && second <= 150) {
        minMobSize = 130;
        maxMobSize = 140;
    } else if (150 < second && second <= 180) {
        minMobSize = 140;
        maxMobSize = 150;
    } else if (180 < second && second <= 210) {
        minMobSize = 150;
        maxMobSize = 160;
    } else if (210 < second && second <= 240) {
        minMobSize = 170;
        maxMobSize = 180;
    } else if (240 < second) {
        minMobSize = 190;
        maxMobSize = 200;
    }

    return { minMobSize: minMobSize, maxMobSize: maxMobSize };
}


export default controlMobSize; 