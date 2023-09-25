class DataX {
    constructor() {
        this.apiUrl = "https://y8i6cu0dlct5i4c-rmlpz1dev.adb.eu-frankfurt-1.oraclecloudapps.com/ords/shpreporter/dataxtrackingservices/test";
        this.dtid = this.getDtidFromUrl();
        this.shopUrl = this.getShopDomain();

        if (this.dtid) {
            document.addEventListener("onload", () => {
                if (!this.getCookie(`sent_dtid_${this.dtid}`)) {
                    this.sendDtid();
                }
            });
        }
    }

    getShopDomain() {
        try {
            if (Shopify) return Shopify.shop;
            return "";
        } catch (e) {
            console.error("no domain");
            return "";
        }
    }

    getDtidFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get("dtid");
    }

    setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    sendDtid() {
        const content = {
            dtid: this.dtid,
            shopUrl: this.shopUrl
        };
        
        fetch(this.apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content }),
        })
        .then(response => response.json())
        .then(data => {
            console.log("API Response:", data);
            this.setCookie(`sent_dtid_${this.dtid}`, true, 365);  // Mark this dtid as sent for 1 year
        })
        .catch(error => {
            console.error("Error sending POST request:", error);
        });
    }
}

const dataXInstance = new DataX();
console.log('DataX loaded');
