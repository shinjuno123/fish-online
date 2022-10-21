function controlMobSize (second) {
    let minMobSize, maxMobSize;

    if (0 < second && second <= 15) {
        minMobSize = 50;
        maxMobSize = 80;
    } else if (15 < second && second <= 30) {
        minMobSize = 80;
        maxMobSize = 110;
    } else if (30 < second && second <= 45) {
        minMobSize = 100;
        maxMobSize = 140;
    } else if (45 < second && second <= 60) {
        minMobSize = 100;
        maxMobSize = 160;
    } else if (60 < second && second <= 75) {
        minMobSize = 130;
        maxMobSize = 180;
    } else if (75 < second && second <= 90) {
        minMobSize = 130;
        maxMobSize = 200;
    } else if (90 < second && second <= 105) {
        minMobSize = 130;
        maxMobSize = 220;
    } else if (105 < second && second <= 120) {
        minMobSize = 150;
        maxMobSize = 250;
    } else if (120 < second && second <= 135) {
        minMobSize = 180;
        maxMobSize = 230;
    } else if (135 < second && second <= 135) {
        minMobSize = 230;
        maxMobSize = 300;
    }


    return { minMobSize: minMobSize, maxMobSize: maxMobSize };
}


export default controlMobSize; 