export function getApiUrl(url, queryParamsObject) {
    const urlObject = new URL(url)
    urlObject.search = new URLSearchParams(queryParamsObject).toString()
    return urlObject
}