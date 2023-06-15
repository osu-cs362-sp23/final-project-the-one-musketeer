/**
 * @jest-environment jsdom
 */

// Some of the following code is adapted from the code shown during class
require("whatwg-fetch")
require("@testing-library/jest-dom/extend-expect")
const domTesting = require("@testing-library/dom")
const userEvent = require("@testing-library/user-event").default

const fs = require("fs")
const rest = require("msw").rest

const setupServer = require("msw/node").setupServer

const generateChartImg = require("../src/lib/generateChartImg.js")

// Some of the following code adapted from the example shown on this page from the MSW docs: https://mswjs.io/docs/api/response#standard-usage
const server = setupServer(
    rest.post(
        `https://quickchart.io/chart`,
        function (req, res, ctx) {
            return res(
                ctx.status(301),
                ctx.set('Content-Type', 'image/png'),
                ctx.body(
                    fs.readFileSync("../bin/chart_image.png")
                )
            )
        }
    )
)

beforeAll(function () {
    server.listen()
})

afterAll(function () {
    server.close()
})

test("Returns image", function() {
    const chart = generateChartImg(
        "line",
        [
            {x:2,y:3},
            {x:-1,y:-4}
        ],
        "X Label",
        "Y Label",
        "Title",
        "red"
    )
    expect(chart).toBeDefined()
})