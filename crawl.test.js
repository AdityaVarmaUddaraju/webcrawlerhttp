const {normaliseUrl, getUrlsfromHtml} = require("./crawl")
const {test, expect} = require("@jest/globals")

test('normaliseUrl strip protocol', () => {
    input = 'https://blog.boot.dev/path'
    actual = normaliseUrl(input)
    expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normaliseUrl strip trailing /', () => {
    input = 'https://blog.boot.dev/path/'
    actual = normaliseUrl(input)
    expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normaliseUrl capitals', () => {
    input = 'https://BLOG.boot.dev/path/'
    actual = normaliseUrl(input)
    expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normaliseUrl strip http', () => {
    input = 'http://blog.boot.dev/path/'
    actual = normaliseUrl(input)
    expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('getUrlsFromHTML', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="https://blog.boot.dev/">Boot.dev blog</a>
    </body>
</html>    
`   
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getUrlsfromHtml(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/"]
    expect(actual).toEqual(expected)
})

test('getUrlsFromHTML relative', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="/path/">Boot.dev blog</a>
    </body>
</html>    
`   
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getUrlsfromHtml(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})

test('getUrlsFromHTML relative and absolute', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="/path/">Boot.dev blog</a>
        <a href="https://blog.boot.dev/path/">Boot.dev blog</a>
    </body>
</html>    
`   
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getUrlsfromHtml(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path/", "https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})

test('getUrlsFromHTML invalid', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="invalid">Boot.dev blog</a>
    </body>
</html>    
`   
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getUrlsfromHtml(inputHTMLBody, inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
})