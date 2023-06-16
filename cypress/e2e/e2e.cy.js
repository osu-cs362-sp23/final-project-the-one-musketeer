it("Line chart is correctly generated", function () {
    // Create a chart
    cy.visit("/")
    cy.contains("Line").click()
    cy.contains("Chart title").type("Apples vs. Oranges")
    cy.contains("X label").type("Apples")
    cy.contains("Y label").type("Oranges")
    cy.findByText("X").type("4")
    cy.findByText("Y").type("5")
    cy.contains("Generate chart").click()
    // Confirm
    cy.get("#chart-img").should("exist")
})

it("Scatter chart is correctly generated", function () {
    // Create a chart
    cy.visit("/")
    cy.contains("Scatter").click()
    cy.contains("Chart title").type("Apples vs. Oranges")
    cy.contains("X label").type("Apples")
    cy.contains("Y label").type("Oranges")
    cy.findByText("X").type("4")
    cy.findByText("Y").type("5")
    cy.contains("Generate chart").click()
    // Confirm
    cy.get("#chart-img").should("exist")
})

it("Bar chart is correctly generated", function () {
    // Create a chart
    cy.visit("/")
    cy.contains("Bar").click()
    cy.contains("Chart title").type("Apples vs. Oranges")
    cy.contains("X label").type("Apples")
    cy.contains("Y label").type("Oranges")
    cy.findByText("X").type("4")
    cy.findByText("Y").type("5")
    cy.contains("Generate chart").click()
    // Confirm
    cy.get("#chart-img").should("exist")
})

it("Chart data is maintained across pages", function () {
    // Create a chart
    cy.visit("/")
    cy.contains("Line").click()
    cy.contains("Chart title").type("Apples vs. Oranges")
    cy.contains("X label").type("Apples")
    cy.contains("Y label").type("Oranges")
    cy.findByText("X").type("4")
    cy.findByText("Y").type("5")
    // Switch to scatter page and confirm same info
    cy.contains("Scatter").click()
    cy.confirmSameInfo()
    // Switch to bar page and confirm same info
    cy.contains("Bar").click()
    cy.confirmSameInfo()
    // Switch to line page and confirm same info
    cy.contains("Line").click()
    cy.confirmSameInfo()
})

it("Saving a line chart to the gallery", function () {
    // Create a chart
    cy.visit("/")
    cy.contains("Line").click()
    cy.contains("Chart title").type("Apples vs. Oranges")
    cy.contains("X label").type("Apples")
    cy.contains("Y label").type("Oranges")
    cy.findByText("X").type("4")
    cy.findByText("Y").type("5")
    cy.contains("Generate chart").click()
    cy.get("#chart-img").should("exist")
    // Save the chart
    cy.contains("Save chart").click()
    cy.contains("Chart saved").should("exist")
    // Go to gallery to confirm
    cy.contains("Gallery").click()
    cy.contains("Apples vs. Oranges").should("exist")
})

it("Saving a scatter chart to the gallery", function () {
    // Create a chart
    cy.visit("/")
    cy.contains("Scatter").click()
    cy.contains("Chart title").type("Apples vs. Oranges")
    cy.contains("X label").type("Apples")
    cy.contains("Y label").type("Oranges")
    cy.findByText("X").type("4")
    cy.findByText("Y").type("5")
    cy.contains("Generate chart").click()
    cy.get("#chart-img").should("exist")
    // Save the chart
    cy.contains("Save chart").click()
    cy.contains("Chart saved").should("exist")
    // Go to gallery to confirm
    cy.contains("Gallery").click()
    cy.contains("Apples vs. Oranges").should("exist")
})

it("Saving a bar chart to the gallery", function () {
    // Create a chart
    cy.visit("/")
    cy.contains("Bar").click()
    cy.contains("Chart title").type("Apples vs. Oranges")
    cy.contains("X label").type("Apples")
    cy.contains("Y label").type("Oranges")
    cy.findByText("X").type("4")
    cy.findByText("Y").type("5")
    cy.contains("Generate chart").click()
    cy.get("#chart-img").should("exist")
    // Save the chart
    cy.contains("Save chart").click()
    cy.contains("Chart saved").should("exist")
    // Go to gallery to confirm
    cy.contains("Gallery").click()
    cy.contains("Apples vs. Oranges").should("exist")
})

it("Re-opening a saved line chart", function () {
    // Create a chart
    cy.visit("/")
    cy.contains("Line").click()
    cy.contains("Chart title").type("Apples vs. Oranges")
    cy.contains("X label").type("Apples")
    cy.contains("Y label").type("Oranges")
    cy.findByText("X").type("4")
    cy.findByText("Y").type("5")
    cy.contains("Generate chart").click()
    cy.get("#chart-img").should("exist")
    // Save the chart
    cy.contains("Save chart").click()
    cy.contains("Chart saved").should("exist")
    // Clear chart data
    cy.contains("Clear chart data").click()
    // Re-open the saved chart from the gallery
    cy.contains("Gallery").click()
    cy.contains("Apples vs. Oranges").click()
    // Confirm that the imformation is the same
    cy.confirmSameInfo()
})

it("Re-opening a saved scatter chart", function () {
    // Create a chart
    cy.visit("/")
    cy.contains("Scatter").click()
    cy.contains("Chart title").type("Apples vs. Oranges")
    cy.contains("X label").type("Apples")
    cy.contains("Y label").type("Oranges")
    cy.findByText("X").type("4")
    cy.findByText("Y").type("5")
    cy.contains("Generate chart").click()
    cy.get("#chart-img").should("exist")
    // Save the chart
    cy.contains("Save chart").click()
    cy.contains("Chart saved").should("exist")
    // Clear chart data
    cy.contains("Clear chart data").click()
    // Re-open the saved chart from the gallery
    cy.contains("Gallery").click()
    cy.contains("Apples vs. Oranges").click()
    // Confirm that the imformation is the same
    cy.confirmSameInfo()
})

it("Re-opening a saved bar chart", function () {
    // Create a chart
    cy.visit("/")
    cy.contains("Bar").click()
    cy.contains("Chart title").type("Apples vs. Oranges")
    cy.contains("X label").type("Apples")
    cy.contains("Y label").type("Oranges")
    cy.findByText("X").type("4")
    cy.findByText("Y").type("5")
    cy.contains("Generate chart").click()
    cy.get("#chart-img").should("exist")
    // Save the chart
    cy.contains("Save chart").click()
    cy.contains("Chart saved").should("exist")
    // Clear chart data
    cy.contains("Clear chart data").click()
    // Re-open the saved chart from the gallery
    cy.contains("Gallery").click()
    cy.contains("Apples vs. Oranges").click()
    // Confirm that the imformation is the same
    cy.confirmSameInfo()
})