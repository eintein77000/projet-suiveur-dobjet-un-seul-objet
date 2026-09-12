DFRobotMaqueenPlus.i2c_init()
huskylens.init_i2c()
huskylens.init_mode(protocolAlgorithm.ALGORITHM_OBJECT_TRACKING)
DFRobotMaqueenPlus.motot_stop(Motors.ALL)
DFRobotMaqueenPlus.set_rgb_light(RGBLight.RGBA, Color.OFF)

def on_forever():
    huskylens.request()
    if input.button_is_pressed(Button.A):
        DFRobotMaqueenPlus.set_rgb_light(RGBLight.RGBR, Color.BLUE)
    else:
        DFRobotMaqueenPlus.set_rgb_light(RGBLight.RGBR, Color.OFF)
    if huskylens.is_appear(1, HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK):
        DFRobotMaqueenPlus.set_rgb_light(RGBLight.RGBL, Color.OFF)
        DFRobotMaqueenPlus.motot_stop(Motors.ALL)
    else:
        DFRobotMaqueenPlus.set_rgb_light(RGBLight.RGBL, Color.RED)
        DFRobotMaqueenPlus.motot_run(Motors.M1, Dir.CW, 35)
        DFRobotMaqueenPlus.motot_run(Motors.M2, Dir.CCW, 35)
basic.forever(on_forever)
