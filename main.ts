DFRobotMaqueenPlus.I2CInit()
huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_OBJECT_TRACKING)
DFRobotMaqueenPlus.mototStop(Motors.ALL)
DFRobotMaqueenPlus.setRGBLight(RGBLight.RGBA, Color.OFF)
let tour = 0
let allumage = 0
let objetenvue = 0
led.setBrightness(128)
basic.forever(function () {
    huskylens.request()
    if (input.buttonIsPressed(Button.A)) {
        allumage = 1
        DFRobotMaqueenPlus.setRGBLight(RGBLight.RGBR, Color.GREEN)
        basic.showIcon(IconNames.Happy)
    }
    while (allumage == 1) {
        huskylens.request()
        if (!(huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) && (tour >= 1 && tour < 31)) {
            DFRobotMaqueenPlus.setRGBLight(RGBLight.RGBL, Color.OFF)
            DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CW, 35)
            DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CCW, 35)
            tour = tour + 1
        } else {
            if (!(huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) && (tour >= 31 && tour < 62)) {
                DFRobotMaqueenPlus.mototRun(Motors.ALL, Dir.CW, 35)
                tour = tour + 1
            } else {
                if (!(huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) && (tour >= 62 && tour < 93)) {
                    DFRobotMaqueenPlus.mototRun(Motors.ALL, Dir.CCW, 35)
                    tour = tour + 1
                } else {
                    if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
                        tour = 0
                        DFRobotMaqueenPlus.setRGBLight(RGBLight.RGBL, Color.BLUE)
                        if (objetenvue <= 1) {
                            DFRobotMaqueenPlus.mototRun(Motors.ALL, Dir.CW, 35)
                            objetenvue = 1
                        } else {
                            DFRobotMaqueenPlus.mototStop(Motors.ALL)
                            objetenvue = 3
                        }
                    } else {
                        if (objetenvue == 1) {
                            DFRobotMaqueenPlus.mototRun(Motors.ALL, Dir.CCW, 35)
                            objetenvue = 2
                        } else {
                            if (objetenvue == 3) {
                                tour = 1
                                objetenvue = 0
                            }
                            if (objetenvue == 0) {
                                tour = 1
                            }
                        }
                    }
                }
                if (tour >= 93) {
                    tour = 0
                    DFRobotMaqueenPlus.mototStop(Motors.ALL)
                }
            }
        }
        basic.pause(10)
        if (input.buttonIsPressed(Button.B)) {
            allumage = 2
        }
    }
    if (allumage == 2) {
        DFRobotMaqueenPlus.mototStop(Motors.ALL)
        tour = 0
        allumage = 0
    }
    if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        DFRobotMaqueenPlus.setRGBLight(RGBLight.RGBL, Color.BLUE)
    } else {
        DFRobotMaqueenPlus.setRGBLight(RGBLight.RGBL, Color.OFF)
    }
    DFRobotMaqueenPlus.setRGBLight(RGBLight.RGBR, Color.RED)
    basic.showIcon(IconNames.Sad)
    basic.pause(10)
})
