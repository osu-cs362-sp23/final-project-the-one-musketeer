/**
 * @jest-environment jsdom
 */

// Some of the following code is adapted from the code shown during class
require("@testing-library/jest-dom/extend-expect")
const domTesting = require("@testing-library/dom")
const userEvent = require("@testing-library/user-event").default

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

test('Enter values into X and Y fields, and click the plus button repeatedly', async function () {
    initDOMFromFiles(
        __dirname + "/../src/line/line.html",
        __dirname + "/../src/line/line.js",
    )

    var xValue = domTesting.getAllByLabelText(document, "X") // All X input fields
    var yValue = domTesting.getAllByLabelText(document, "Y") // All Y input fields
    const plusButton = domTesting.getByText(document, "+") // The + button

    const user = userEvent.setup()

    // Type into the most recent set of input fields, then click the plus button.
    await user.type(xValue[0], "1")
    await user.type(yValue[0], "2")

    await user.click(plusButton)

    // Update xValue and yValue to include the new field that was created by the + button
    xValue = domTesting.getAllByLabelText(document, "X")
    yValue = domTesting.getAllByLabelText(document, "Y")

    // Repeat 4 more times
    await user.type(xValue[1], "3")
    await user.type(yValue[1], "4")

    await user.click(plusButton)

    xValue = domTesting.getAllByLabelText(document, "X")
    yValue = domTesting.getAllByLabelText(document, "Y")

    await user.type(xValue[2], "5")
    await user.type(yValue[2], "6")

    await user.click(plusButton)

    xValue = domTesting.getAllByLabelText(document, "X")
    yValue = domTesting.getAllByLabelText(document, "Y")

    await user.type(xValue[3], "7")
    await user.type(yValue[3], "8")

    await user.click(plusButton)

    xValue = domTesting.getAllByLabelText(document, "X")
    yValue = domTesting.getAllByLabelText(document, "Y")

    await user.type(xValue[4], "9")
    await user.type(yValue[4], "10")

    // Click the + button several times
    await user.click(plusButton)
    await user.click(plusButton)
    await user.click(plusButton)
    await user.click(plusButton)

    // Update xValue and yValue one last time
    xValue = domTesting.getAllByLabelText(document, "X")
    yValue = domTesting.getAllByLabelText(document, "Y")
    
    // There should be 9 sets of fields, since we clicked + button 9 times
    expect(xValue.length).toBe(9)
    expect(yValue.length).toBe(9)

    // The contents of each text box should match what we previously entered, completely unchanged
    expect(xValue[0].value).toBe("1")
    expect(yValue[0].value).toBe("2")

    expect(xValue[1].value).toBe("3")
    expect(yValue[1].value).toBe("4")

    expect(xValue[2].value).toBe("5")
    expect(yValue[2].value).toBe("6")

    expect(xValue[3].value).toBe("7")
    expect(yValue[3].value).toBe("8")

    expect(xValue[4].value).toBe("9")
    expect(yValue[4].value).toBe("10")

    expect(xValue[5].value).toBe("")
    expect(yValue[5].value).toBe("")

    expect(xValue[6].value).toBe("")
    expect(yValue[6].value).toBe("")

    expect(xValue[7].value).toBe("")
    expect(yValue[7].value).toBe("")

    expect(xValue[8].value).toBe("")
    expect(yValue[8].value).toBe("")
})

test('Enter values into X and Y fields, and click the plus button repeatedly', async function () {
    initDOMFromFiles(
        __dirname + "/../src/line/line.html",
        __dirname + "/../src/line/line.js",
    )
    
    const xLabel = domTesting.getByLabelText(document, "X label") // X label fields
    const yLabel = domTesting.getByLabelText(document, "Y label") // Y label fields
    const generateButton = domTesting.getByText(document, "Generate chart") // The generate chart button

    const user = userEvent.setup()

    // Type into the x and y value fields
    await user.type(xLabel, "Apples")
    await user.type(yLabel, "Oranges")

    // Set up a spy
    const spy = jest.spyOn(window,"alert").mockImplementation(() => {})

    // Click "Generate chart" button
    await user.click(generateButton)

    // Does the spy detect an alert?
    expect(alert).toHaveBeenCalled()
    expect(window.alert).toBeCalledWith("Error: No data specified!")

})
// test('Returns a failure when no password is given', async function () {
//     initDOMFromFiles(
//         __dirname + "/registerUser.html",
//         __dirname + "/registerUser.js",
//     )
//     const emailInput = domTesting.getByLabelText(document, "Email")
//     const registerButton = domTesting.getByRole(document, "button")

//     const user = userEvent.setup()
//     await user.type(emailInput, "hessro@oregonstate.edu") // Valid email
//     // No password given (left blank)
//     await user.click(registerButton) // Click the button

//     const errorAlert = domTesting.getByRole(document, "alert")
//     const errorHeading = domTesting.getByRole(document, "heading")
//     const errorParagraph = domTesting.getByText(document, "The password you entered is invalid.")
//     const errorList = domTesting.getByRole(document, "list")
    
//     expect(errorAlert).not.toBeEmptyDOMElement() // Alert isn't empty?
//     expect(errorHeading).not.toBeEmptyDOMElement() // <h3> isn't empty?
//     expect(errorParagraph).not.toBeEmptyDOMElement() // <p> isn't empty?
//     expect(errorList).not.toBeEmptyDOMElement() // <ul> isn't empty?
    
//     expect(errorHeading).toHaveTextContent("❌ Error") // Error heading shows error message
//     expect(errorList).toHaveTextContent(`Password needs to be at least 8 charactersPassword needs a lower case letterPassword needs an upper case letterPassword needs a numeric digit (0-9)Password needs a symbol (!@#$%^&*)Password contains an invalid character (only letters, numbers, and the symbols !@#$%^&* are allowed)`) // Error list contains this specific text
// })

// test('Returns a failure when an invalid password with multiple errors is given', async function () {
//     initDOMFromFiles(
//         __dirname + "/registerUser.html",
//         __dirname + "/registerUser.js",
//     )
//     const emailInput = domTesting.getByLabelText(document, "Email")
//     const passwordInput = domTesting.getByLabelText(document, "Password")
//     const registerButton = domTesting.getByRole(document, "button")

//     const user = userEvent.setup()
//     await user.type(emailInput, "hessro@oregonstate.edu") // Valid email
//     await user.type(passwordInput, "abc123") // Invalid password
//     await user.click(registerButton) // Click the button

//     const errorAlert = domTesting.getByRole(document, "alert")
//     const errorHeading = domTesting.getByRole(document, "heading")
//     const errorParagraph = domTesting.getByText(document, "The password you entered is invalid.")
//     const errorList = domTesting.getByRole(document, "list")
    
//     expect(errorAlert).not.toBeEmptyDOMElement() // Alert isn't empty?
//     expect(errorHeading).not.toBeEmptyDOMElement() // <h3> isn't empty?
//     expect(errorParagraph).not.toBeEmptyDOMElement() // <p> isn't empty?
//     expect(errorList).not.toBeEmptyDOMElement() // <ul> isn't empty?
    
//     expect(errorHeading).toHaveTextContent("❌ Error") // Error heading shows error message
//     expect(errorList).toHaveTextContent(`Password needs to be at least 8 charactersPassword needs an upper case letterPassword needs a symbol (!@#$%^&*)`) // Error list contains this specific text
// })

// test('Returns a failure when an invalid password with less than 8 characters is given', async function () {
//     initDOMFromFiles(
//         __dirname + "/registerUser.html",
//         __dirname + "/registerUser.js",
//     )
//     const emailInput = domTesting.getByLabelText(document, "Email")
//     const passwordInput = domTesting.getByLabelText(document, "Password")
//     const registerButton = domTesting.getByRole(document, "button")

//     const user = userEvent.setup()
//     await user.type(emailInput, "hessro@oregonstate.edu") // Valid email
//     await user.type(passwordInput, "abAB12!") // Invalid password
//     await user.click(registerButton) // Click the button

//     const errorAlert = domTesting.getByRole(document, "alert")
//     const errorHeading = domTesting.getByRole(document, "heading")
//     const errorParagraph = domTesting.getByText(document, "The password you entered is invalid.")
//     const errorList = domTesting.getByRole(document, "list")
    
//     expect(errorAlert).not.toBeEmptyDOMElement() // Alert isn't empty?
//     expect(errorHeading).not.toBeEmptyDOMElement() // <h3> isn't empty?
//     expect(errorParagraph).not.toBeEmptyDOMElement() // <p> isn't empty?
//     expect(errorList).not.toBeEmptyDOMElement() // <ul> isn't empty?
    
//     expect(errorHeading).toHaveTextContent("❌ Error") // Error heading shows error message
//     expect(errorList).toHaveTextContent(`Password needs to be at least 8 characters`) // Error list contains this specific text
// })

// test('Returns a failure when an invalid password with no lowercase letter is given', async function () {
//     initDOMFromFiles(
//         __dirname + "/registerUser.html",
//         __dirname + "/registerUser.js",
//     )
//     const emailInput = domTesting.getByLabelText(document, "Email")
//     const passwordInput = domTesting.getByLabelText(document, "Password")
//     const registerButton = domTesting.getByRole(document, "button")

//     const user = userEvent.setup()
//     await user.type(emailInput, "hessro@oregonstate.edu") // Valid email
//     await user.type(passwordInput, "ABC123ABC!!!") // Invalid password
//     await user.click(registerButton) // Click the button

//     const errorAlert = domTesting.getByRole(document, "alert")
//     const errorHeading = domTesting.getByRole(document, "heading")
//     const errorParagraph = domTesting.getByText(document, "The password you entered is invalid.")
//     const errorList = domTesting.getByRole(document, "list")
    
//     expect(errorAlert).not.toBeEmptyDOMElement() // Alert isn't empty?
//     expect(errorHeading).not.toBeEmptyDOMElement() // <h3> isn't empty?
//     expect(errorParagraph).not.toBeEmptyDOMElement() // <p> isn't empty?
//     expect(errorList).not.toBeEmptyDOMElement() // <ul> isn't empty?
    
//     expect(errorHeading).toHaveTextContent("❌ Error") // Error heading shows error message
//     expect(errorList).toHaveTextContent(`Password needs a lower case letter`) // Error list contains this specific text
// })

// test('Returns a failure when an invalid password with no uppercase letter is given', async function () {
//     initDOMFromFiles(
//         __dirname + "/registerUser.html",
//         __dirname + "/registerUser.js",
//     )
//     const emailInput = domTesting.getByLabelText(document, "Email")
//     const passwordInput = domTesting.getByLabelText(document, "Password")
//     const registerButton = domTesting.getByRole(document, "button")

//     const user = userEvent.setup()
//     await user.type(emailInput, "hessro@oregonstate.edu") // Valid email
//     await user.type(passwordInput, "abc123abc!!!") // Invalid password
//     await user.click(registerButton) // Click the button

//     const errorAlert = domTesting.getByRole(document, "alert")
//     const errorHeading = domTesting.getByRole(document, "heading")
//     const errorParagraph = domTesting.getByText(document, "The password you entered is invalid.")
//     const errorList = domTesting.getByRole(document, "list")
    
//     expect(errorAlert).not.toBeEmptyDOMElement() // Alert isn't empty?
//     expect(errorHeading).not.toBeEmptyDOMElement() // <h3> isn't empty?
//     expect(errorParagraph).not.toBeEmptyDOMElement() // <p> isn't empty?
//     expect(errorList).not.toBeEmptyDOMElement() // <ul> isn't empty?
    
//     expect(errorHeading).toHaveTextContent("❌ Error") // Error heading shows error message
//     expect(errorList).toHaveTextContent(`Password needs an upper case letter`) // Error list contains this specific text
// })

// test('Returns a failure when an invalid password with no numeric digit is given', async function () {
//     initDOMFromFiles(
//         __dirname + "/registerUser.html",
//         __dirname + "/registerUser.js",
//     )
//     const emailInput = domTesting.getByLabelText(document, "Email")
//     const passwordInput = domTesting.getByLabelText(document, "Password")
//     const registerButton = domTesting.getByRole(document, "button")

//     const user = userEvent.setup()
//     await user.type(emailInput, "hessro@oregonstate.edu") // Valid email
//     await user.type(passwordInput, "abc!!!abc!!!") // Invalid password
//     await user.click(registerButton) // Click the button

//     const errorAlert = domTesting.getByRole(document, "alert")
//     const errorHeading = domTesting.getByRole(document, "heading")
//     const errorParagraph = domTesting.getByText(document, "The password you entered is invalid.")
//     const errorList = domTesting.getByRole(document, "list")
    
//     expect(errorAlert).not.toBeEmptyDOMElement() // Alert isn't empty?
//     expect(errorHeading).not.toBeEmptyDOMElement() // <h3> isn't empty?
//     expect(errorParagraph).not.toBeEmptyDOMElement() // <p> isn't empty?
//     expect(errorList).not.toBeEmptyDOMElement() // <ul> isn't empty?
    
//     expect(errorHeading).toHaveTextContent("❌ Error") // Error heading shows error message
//     expect(errorList).toHaveTextContent(`Password needs a numeric digit (0-9)`) // Error list contains this specific text
// })

// test('Returns a failure when an invalid password with no symbol is given', async function () {
//     initDOMFromFiles(
//         __dirname + "/registerUser.html",
//         __dirname + "/registerUser.js",
//     )
//     const emailInput = domTesting.getByLabelText(document, "Email")
//     const passwordInput = domTesting.getByLabelText(document, "Password")
//     const registerButton = domTesting.getByRole(document, "button")

//     const user = userEvent.setup()
//     await user.type(emailInput, "hessro@oregonstate.edu") // Valid email
//     await user.type(passwordInput, "abc123ABC123") // Invalid password
//     await user.click(registerButton) // Click the button

//     const errorAlert = domTesting.getByRole(document, "alert")
//     const errorHeading = domTesting.getByRole(document, "heading")
//     const errorParagraph = domTesting.getByText(document, "The password you entered is invalid.")
//     const errorList = domTesting.getByRole(document, "list")
    
//     expect(errorAlert).not.toBeEmptyDOMElement() // Alert isn't empty?
//     expect(errorHeading).not.toBeEmptyDOMElement() // <h3> isn't empty?
//     expect(errorParagraph).not.toBeEmptyDOMElement() // <p> isn't empty?
//     expect(errorList).not.toBeEmptyDOMElement() // <ul> isn't empty?
    
//     expect(errorHeading).toHaveTextContent("❌ Error") // Error heading shows error message
//     expect(errorList).toHaveTextContent(`Password needs a symbol (!@#$%^&*)`) // Error list contains this specific text
// })

// test('Returns a failure when an invalid password with an invalid character is given', async function () {
//     initDOMFromFiles(
//         __dirname + "/registerUser.html",
//         __dirname + "/registerUser.js",
//     )
//     const emailInput = domTesting.getByLabelText(document, "Email")
//     const passwordInput = domTesting.getByLabelText(document, "Password")
//     const registerButton = domTesting.getByRole(document, "button")

//     const user = userEvent.setup()
//     await user.type(emailInput, "hessro@oregonstate.edu") // Valid email
//     await user.type(passwordInput, "abc123ABC!!!(") // Invalid password
//     await user.click(registerButton) // Click the button

//     const errorAlert = domTesting.getByRole(document, "alert")
//     const errorHeading = domTesting.getByRole(document, "heading")
//     const errorParagraph = domTesting.getByText(document, "The password you entered is invalid.")
//     const errorList = domTesting.getByRole(document, "list")
    
//     expect(errorAlert).not.toBeEmptyDOMElement() // Alert isn't empty?
//     expect(errorHeading).not.toBeEmptyDOMElement() // <h3> isn't empty?
//     expect(errorParagraph).not.toBeEmptyDOMElement() // <p> isn't empty?
//     expect(errorList).not.toBeEmptyDOMElement() // <ul> isn't empty?
    
//     expect(errorHeading).toHaveTextContent("❌ Error") // Error heading shows error message
//     expect(errorList).toHaveTextContent(`Password contains an invalid character (only letters, numbers, and the symbols !@#$%^&* are allowed)`) // Error list contains this specific text
// })

// test('Returns a failure when no email is given', async function () {
//     initDOMFromFiles(
//         __dirname + "/registerUser.html",
//         __dirname + "/registerUser.js",
//     )
//     const passwordInput = domTesting.getByLabelText(document, "Password")
//     const registerButton = domTesting.getByRole(document, "button")

//     const user = userEvent.setup()
//     // No email given (left blank)
//     await user.type(passwordInput, "abc123ABC!!!") // Valid password
//     await user.click(registerButton) // Click the button

//     const errorAlert = domTesting.getByRole(document, "alert")
//     const errorHeading = domTesting.getByRole(document, "heading")
//     const errorParagraph = domTesting.getByText(document, "The email address you entered is invalid.")
    
//     expect(errorAlert).not.toBeEmptyDOMElement() // Alert isn't empty?
//     expect(errorHeading).not.toBeEmptyDOMElement() // <h3> isn't empty?
//     expect(errorParagraph).not.toBeEmptyDOMElement() // <p> isn't empty?
//     // No list this time
    
//     expect(errorHeading).toHaveTextContent("❌ Error") // Error heading shows error message
// })

// test('Returns a failure when an invalid email is given', async function () {
//     initDOMFromFiles(
//         __dirname + "/registerUser.html",
//         __dirname + "/registerUser.js",
//     )
//     const emailInput = domTesting.getByLabelText(document, "Email")
//     const passwordInput = domTesting.getByLabelText(document, "Password")
//     const registerButton = domTesting.getByRole(document, "button")

//     const user = userEvent.setup()
//     await user.type(emailInput, "hessrooregonstateedu") // Valid email
//     await user.type(passwordInput, "abc123ABC!!!") // Invalid password
//     await user.click(registerButton) // Click the button

//     const errorAlert = domTesting.getByRole(document, "alert")
//     const errorHeading = domTesting.getByRole(document, "heading")
//     const errorParagraph = domTesting.getByText(document, "The email address you entered is invalid.")
    
//     expect(errorAlert).not.toBeEmptyDOMElement() // Alert isn't empty?
//     expect(errorHeading).not.toBeEmptyDOMElement() // <h3> isn't empty?
//     expect(errorParagraph).not.toBeEmptyDOMElement() // <p> isn't empty?
//     // No list this time
    
//     expect(errorHeading).toHaveTextContent("❌ Error") // Error heading shows error message
// })

// test('Returns a success when a valid email and password are given', async function () {
//     initDOMFromFiles(
//         __dirname + "/registerUser.html",
//         __dirname + "/registerUser.js",
//     )
//     const emailInput = domTesting.getByLabelText(document, "Email")
//     const passwordInput = domTesting.getByLabelText(document, "Password")
//     const registerButton = domTesting.getByRole(document, "button")

//     const user = userEvent.setup()
//     await user.type(emailInput, "hessro@oregonstate.edu") // Valid email
//     await user.type(passwordInput, "abc123ABC!!!") // Valid password
//     await user.click(registerButton) // Click the button

//     const successStatus = domTesting.getByRole(document, "status")
//     const successHeading = domTesting.getByRole(document, "heading")
//     const successParagraph = domTesting.getByText(document, "You have successfully registered.")
//     // No list this time

//     expect(successStatus).not.toBeEmptyDOMElement() // Alert isn't empty?
//     expect(successHeading).not.toBeEmptyDOMElement() // <h3> isn't empty?
//     expect(successParagraph).not.toBeEmptyDOMElement() // <p> isn't empty?
    
//     expect(successHeading).toHaveTextContent("✅ Success") // Error heading shows error message
// })

// test('Returns a success when a really long valid email and password are given', async function () {
//     initDOMFromFiles(
//         __dirname + "/registerUser.html",
//         __dirname + "/registerUser.js",
//     )
//     const emailInput = domTesting.getByLabelText(document, "Email")
//     const passwordInput = domTesting.getByLabelText(document, "Password")
//     const registerButton = domTesting.getByRole(document, "button")

//     const user = userEvent.setup()
//     await user.type(emailInput, "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ@abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ.net") // Valid email
//     await user.type(passwordInput, "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*") // Invalid password
//     await user.click(registerButton) // Click the button

//     const successStatus = domTesting.getByRole(document, "status")
//     const successHeading = domTesting.getByRole(document, "heading")
//     const successParagraph = domTesting.getByText(document, "You have successfully registered.")
//     // No list this time

//     expect(successStatus).not.toBeEmptyDOMElement() // Alert isn't empty?
//     expect(successHeading).not.toBeEmptyDOMElement() // <h3> isn't empty?
//     expect(successParagraph).not.toBeEmptyDOMElement() // <p> isn't empty?
    
//     expect(successHeading).toHaveTextContent("✅ Success") // Error heading shows error message
// })