const {JSDOM} = require("jsdom")


async function crawlPage(currentUrl) {
    try {
        const resp = await fetch(currentUrl)

        if (resp.status > 399) {
            console.log(`error in fetch with status code ${resp.status} on page ${currentUrl}`)
            return
        }

        const contentType = resp.headers.get("content-type")

        if (!contentType.includes("text/html")) {
            console.log(`non html response  ${contentType} on page ${currentUrl}`)
            return
        }

        const respText = await resp.text()
    
        console.log(respText)
    } catch(err) {
        console.log(`error in fetch ${err.message}, on page: ${currentUrl}`)
    }
    
}

function normaliseUrl(url) {
    const urlObj = new URL(url)
    const hostPath =  `${urlObj.hostname}${urlObj.pathname}`

    if(hostPath.length > 0 && hostPath.slice(-1) == "/") {
        return hostPath.slice(0, -1)
    }

    return hostPath
}

function getUrlsfromHtml(htmlBody, baseUrl) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll("a")

    for (const linkElement of linkElements) {
        const url = linkElement.href
        if (url.slice(0, 1) == "/") {
            try {
                urlObj = new URL(`${baseUrl}${url}`)
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`invalid relative url ${url}`)
            }
        } else {
            try {
                urlObj = new URL(url)
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`invalid url ${url}`)
            }
        }
    }

    return urls
}

module.exports = {
    crawlPage,
    normaliseUrl,
    getUrlsfromHtml
}