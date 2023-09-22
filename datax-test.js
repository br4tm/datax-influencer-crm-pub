function getShopDomain() {
    try {
        if (Shopify) return Shopify.shop;
        return ""
    } catch (e) {
        return console.error("no domain"), ""
    }
}

//document.addEventListener("DOMContentLoaded", function() {
const urlParams = new URLSearchParams(window.location.search);
const dtid = urlParams.get("dtid");
const shopUrl = this.getShopDomain();

if (dtid) {
    const apiUrl = "https://y8i6cu0dlct5i4c-rmlpz1dev.adb.eu-frankfurt-1.oraclecloudapps.com/ords/shpreporter/dataxtrackingservices/test";

    var content = {dtid, shopUrl};
    
    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
    })
    .then(response => response.json())
    .then(data => {
        console.log("API Response:", data);
    })
    .catch(error => {
        console.error("Error sending POST request:", error);
    });
}
console.log('DataX loaded')

