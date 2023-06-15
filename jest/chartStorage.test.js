/**
 * @jest-environment jsdom
 */

const chartStorage = require("../src/lib/chartStorage.js")

afterEach(() => {
    window.localStorage.clear()
})

test("Run loadAllSavedCharts() when no charts are in localStorage", function() {
    expected_value = []
    charts = chartStorage.loadAllSavedCharts()
    expect(charts).toStrictEqual(expected_value)
})

test("Save a single chart, then load it with loadSavedChart()", function() {
    input_value = [
        {"x": 1, "y": 1, "z": 1}
    ]
    expected_value = [
        {"x": 1, "y": 1, "z": 1}
    ]
    chartStorage.saveChart(input_value)
    charts = chartStorage.loadSavedChart(0)
    expect(charts).toStrictEqual(expected_value)
})

test("Save a single chart, then load it with loadAllSavedCharts()", function() {
    input_value = [
        {"x": 1, "y": 1, "z": 1}
    ]
    expected_value = [
        [
        {"x": 1, "y": 1, "z": 1}
        ]
    ]
    chartStorage.saveChart(input_value)
    charts = chartStorage.loadAllSavedCharts()

    expect(charts).toStrictEqual(expected_value)
})

test("Save a few charts, then load them with loadAllSavedCharts()", function() {
    input1 = [
        {"x": 1, "y": 0, "z": 1},
        {"x": 4, "y": 5, "z": 6}
    ]
    input2 = [
        {"x": -1, "y": -5, "z": 3},
        {"x": 4, "y": 11, "z": -4}
    ]
    input3 = [
        {"x": 0, "y": 0, "z": 0},
        {"x": 0, "y": 0, "z": 1},
        {"x": 0, "y": 0, "z": 0}
    ]
    expected_value = [
        [
            {"x": 1, "y": 0, "z": 1},
            {"x": 4, "y": 5, "z": 6}
        ],
        [
            {"x": -1, "y": -5, "z": 3},
            {"x": 4, "y": 11, "z": -4}
        ],
        [
            {"x": 0, "y": 0, "z": 0},
            {"x": 0, "y": 0, "z": 1},
            {"x": 0, "y": 0, "z": 0}
        ]
    ]
    chartStorage.saveChart(input1)
    chartStorage.saveChart(input2)
    chartStorage.saveChart(input3)
    charts = chartStorage.loadAllSavedCharts()
})