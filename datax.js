//document.addEventListener("DOMContentLoaded", function() {
    // URL-Parameter auslesen
    const urlParams = new URLSearchParams(window.location.search);
    const dtid = urlParams.get("dtid");
    
    // Prüfen, ob dtid vorhanden ist
    if (dtid) {
        // POST-Request an deine REST-API senden
        const apiUrl = "https://y8i6cu0dlct5i4c-rmlpz1dev.adb.eu-frankfurt-1.oraclecloudapps.com/ords/shpreporter/dataxtrackingservices/test";
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ dtid }),
        })
        .then(response => response.json())
        .then(data => {
            console.log("API Response:", data);
            // Hier kannst du je nach Bedarf weitere Aktionen durchführen
        })
        .catch(error => {
            console.error("Error sending POST request:", error);
        });
    }
//})
console.log('DataX loaded')