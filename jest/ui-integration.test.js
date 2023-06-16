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

test('Loads DOM correctly on startup', async function () {
    initDOMFromFiles(
        __dirname + "/registerUser.html",
        __dirname + "/registerUser.js",
    )
    expect(document.body.innerHTML).toBe(
        `
        <form id="add-photo-form">
            <label>
                Email
                <input id="email" name="email">
            </label>
            <label>
                Password
                <input id="password" name="password">
            </label>
            <button>Register</button>
        </form>
    

`
    )
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