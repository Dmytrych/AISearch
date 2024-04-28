export function getApiUrl(url, queryParamsObject) {
    console.log(url);
    const urlObject = new URL(url)
    urlObject.search = new URLSearchParams(queryParamsObject).toString()
    return urlObject
}