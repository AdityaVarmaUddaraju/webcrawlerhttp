const {test, expect} = require("@jest/globals")
const {sortPages} = require("./report")

test("sortPages", () => {
    input = {
        "wagslane.dev/tags": 2,
        "wagslane.dev/about": 1,
    }
    actual = sortPages(input)
    expected = [
        ["wagslane.dev/tags", 2],
        ["wagslane.dev/about", 1],
    ]

    expect(actual).toEqual(expected)
})