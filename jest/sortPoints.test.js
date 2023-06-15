/**
 * @jest-environment jsdom
 */


const sortPoints = require("../src/lib/sortPoints.js")

require("whatwg-fetch")
require("@testing-library/jest-dom/extend-expect")

test("Sorts an array of length 2", () => {
    input_value = [
        {x:2,y:3},
        {x:-1,y:-4}
    ]
    expected_value = [
        {x:-1,y:-4},
        {x:2,y:3}
    ]
    expect(sortPoints(input_value)).toStrictEqual(expected_value)
});

test("Sorts an array of length 3", () => {
    input_value = [
        {x:2,y:3},
        {x:-1,y:-4},
        {x:-12,y:24}
    ]
    expected_value = [
        {x:-12,y:24},
        {x:-1,y:-4},
        {x:2,y:3}
    ]
    expect(sortPoints(input_value)).toStrictEqual(expected_value)
});
/*
const fs = require("fs")

function initDOMFromFiles(htmlPath, jsPath) {
    const html = fs.readFileSync(htmlPath, 'utf8')
    document.open()
    document.write(html)
    document.close()
    jest.isolateModules(function () {
        require(jsPath)
    })
}

test('Loads DOM correctly on startup', async function () {
    initDOMFromFiles(
        __dirname + "/romanNumerals.html",
        __dirname + "/romanNumerals.js",
    )
    expect(document.body.innerHTML).toBe(
        `
        <div class="results">
            <div class="result">
                <div id="old-roman-result"></div>
                "Old" Roman Numeral
            </div>
            <div class="result">
                <div id="modern-roman-result"></div>
                "Modern" Roman Numeral
            </div>
        </div>
        <form id="arabic-number-form">
            <label>
                Arabic number (1-3999)
                <input type="number" min="1" max="3999" id="arabic-number" name="arabic-number">
            </label>
            <button>Convert to "modern" Roman</button>
        </form>
    

`
    )
})
*/