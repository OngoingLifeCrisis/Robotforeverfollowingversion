radio.onReceivedNumber(function (receivedNumber) {
    colour_sensing_state = 0
    control.waitForEvent(covering_red, 0)
    line_action_state = 1
})
let servo_position = 0
let covering_red = 0
let colour_sensing_state = 0
let line_action_state = 0
line_action_state = 1
colour_sensing_state = 1
qdee.qdee_Init()
qdee.qdee_init_colorSensor(qdee.colorSensorPort.port4)
radio.setGroup(39)
basic.forever(function () {
    while (covering_red == 0) {
        servo_position = 0
    }
})
basic.forever(function () {
    while (covering_red == 1) {
        servo_position = 1
    }
})
basic.forever(function () {
    if (qdee.qdee_checkCurrentColor(qdee.qdee_Colors.Red)) {
        covering_red = 1
    } else {
        covering_red = 0
    }
})
basic.forever(function () {
    if (colour_sensing_state == 1) {
        if (qdee.qdee_checkCurrentColor(qdee.qdee_Colors.Red)) {
            line_action_state = 0
        }
    }
})
basic.forever(function () {
    if (colour_sensing_state == 0) {
        while (covering_red == 1) {
            qdee.qdee_setMotorSpeed(50, 50)
        }
    }
})
basic.forever(function () {
    while (line_action_state == 0) {
        qdee.qdee_setMotorSpeed(0, 0)
    }
})
basic.forever(function () {
    while (line_action_state == 1) {
        if (qdee.qdee_readLineFollowerStatus(qdee.lineFollowPort.port1, qdee.qdee_lineFollower.S1_IN_S2_OUT)) {
            qdee.qdee_setMotorSpeed(-30, 50)
        } else if (qdee.qdee_readLineFollowerStatus(qdee.lineFollowPort.port1, qdee.qdee_lineFollower.S1_OUT_S2_IN)) {
            qdee.qdee_setMotorSpeed(50, -30)
        } else if (qdee.qdee_readLineFollowerStatus(qdee.lineFollowPort.port1, qdee.qdee_lineFollower.S1_IN_S2_IN)) {
            qdee.qdee_setMotorSpeed(50, 50)
        } else if (qdee.qdee_readLineFollowerStatus(qdee.lineFollowPort.port1, qdee.qdee_lineFollower.S1_OUT_S2_OUT)) {
            qdee.qdee_setMotorSpeed(-30, -30)
        }
    }
})
basic.forever(function () {
    while (line_action_state == 2) {
        qdee.qdee_setMotorSpeed(50, 50)
    }
})
basic.forever(function () {
    while (servo_position == 0) {
        qdee.qdee_setBusServo(qdee.busServoPort.port10, 1, -45, 0)
        qdee.qdee_setBusServo(qdee.busServoPort.port10, 2, -45, 0)
    }
})
basic.forever(function () {
    while (servo_position == 1) {
        qdee.qdee_setBusServo(qdee.busServoPort.port10, 1, 20, 0)
        qdee.qdee_setBusServo(qdee.busServoPort.port10, 2, -120, 0)
    }
})
