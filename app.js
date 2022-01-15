let browser = {
    cfg: {
        tabNb: 0,
        currentTab: 0,
        tabId: [],
        version: 1.2,
        bgColor: "",
        txtColor: "",
    },
    protocols: {
        start: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Tab</title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Lexend&display=swap" rel="stylesheet">
        </head>
        <body style="width: 90vw; height: 100vh; display: flex; justify-content: flex-start; align-items: center; overflow: hidden; font-family: 'Lexend', sans-serif; margin-left: 50px; margin-right: 50px; color: white; background-color: rgb(67, 65, 144);">
            <div id="centered" style="display: flex; flex-direction: row; justify-content: flex-start; align-items: center; flex-wrap: wrap;">
                <img src="https://gatheract.com/images/ga-logo.png"></img>
                <div>
                    <h1>Welcome to the GatherAct Browser! - A Collaborative Web Browser</h1>
                    <p>
                        Use the URL input above to enter in a website URL to share with the channel.
                    </p>
                </div>
            </div>
        </body>
        </html>
        `,
        about: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Tab</title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Lexend&display=swap" rel="stylesheet">
        </head>
        <body style="width: 90vw; height: 100vh; overflow: hidden; font-family: 'Lexend', sans-serif; margin-left: 50px; color: white; background-color: rgb(67, 65, 144);">
                    
                    <h1>About The GatherAct Browser</h1>
                    <p>
                    The GatherAct browser allows everyon on the channel to share webistes with each other.
                    It is based on Border, an iframe Web browser developped by <a style="color: white;" href="github.com/Onofficiel">Onofficiel</a> accessible on all platforms.<br>Because of the iframe system some website won't work in this browser (like Google.com),<br>but you can always use bing.
                    </p>

                    <p style="position: absolute; bottom: 0; left: 50%; transform: translateX(-50%)">Border v1.2 | © Onofficiel - 2021 - All rights reserved</p>
        </body>
        </html>
        `,
        404: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>404</title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Lexend&display=swap" rel="stylesheet">
        </head>
        <body style="width: 90vw; height: 100vh; display: flex; justify-content: flex-start; align-items: center; overflow: hidden; font-family: 'Lexend', sans-serif; margin-left: 50px; color: white; background: rgb(247, 37, 58)">
                    <div id="centered">
                        <h1>404</h1>
                        <p>
                            Not found.
                        </p>
                    </div>
        </body>
        </html>
        `,
        bad: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Wooooooooooooooooooooooooozy</title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Lexend&display=swap" rel="stylesheet">
        </head>
        <body style="width: 90vw; height: 100vh; display: flex; justify-content: flex-start; align-items: center; overflow: hidden; font-family: 'Lexend', sans-serif; margin-left: 50px; color: white; background: rgb(209 92 92)">
                    <div id="centered">
                        <h1>Bad URL</h1>
                        <p>
                            Please enter a valid URL. such as https://gatheract.com or gatheract.com
                        </p>
                    </div>
        </body>
        </html>
        `
    },
    verifyProtocol: (url) => {
        if (/^\S*:/i.test(url)) {

            for (let i = 0; i < Object.keys(browser.protocols).length; i++) {
                const protocol = Object.keys(browser.protocols)[i];

                if (RegExp("^gatheract:\/*" + protocol).test(url)) {
                    return encodeURI("data:text/html," + browser.protocols[protocol]);
                }
            }
            return url;
        } else {
            try {
                url = new URL("https://" + url);
                if (url.hostname.includes(".")) {
                    document.querySelector("#searchbar").value = url.toString();
                    return url.toString();
                } else {
                    return encodeURI("data:text/html," + browser.protocols["bad"]);
                }
            } catch (_) {
                return encodeURI("data:text/html," + browser.protocols["bad"]);
            }
        }

    },
    addTab: (tab) => {

        if (!tab)
            throw new Error("You have to add an object for creating a tab.");
        if (!tab.url)
            tab.url = "gatheract://start";



        // Create an html tab div
        let tabElement = document.createElement("div");
        tabElement.classList.add("tab");
        tabElement.dataset.id = browser.generateId();
        tabElement.dataset.url = tab.url;
        tabElement.innerHTML = "<div class='title'>Name Undefined</div><div class='close-btn'>×</div>";

        tabElement.addEventListener("click", () => {
            browser.setCurrent(tabElement.dataset.id);
        });

        tabElement.querySelector(".close-btn").addEventListener("click", () => {
            browser.removeTab(tabElement.dataset.id);
        });

        document.querySelector("#tab-container").appendChild(tabElement);
        // <

        // Create an html view tab
        let viewElement = document.createElement("iframe");
        viewElement.classList.add("view");
        viewElement.dataset.id = tabElement.dataset.id;

        document.querySelector("#view-container").appendChild(viewElement);
        // <

        // After Ctreated Action
        if (tab.current)
            browser.setCurrent(tabElement.dataset.id);
        browser.reloadTab();
        // <

        browser.cfg.tabNb++;
        browser.cfg.tabId.push(tabElement.dataset.id);

    },
    removeTab: (id) => {

        if (id !== undefined) {
            document.querySelector("#tab-container").removeChild(document.querySelector('.tab[data-id~="' + id + '"]'));
            document.querySelector("#view-container").removeChild(document.querySelector('.view[data-id~="' + id + '"]'));
        }

        browser.cfg.tabNb--;
        browser.cfg.tabId.splice(browser.cfg.tabId.indexOf(id), 1);

    },
    setCurrent: (id) => {

        try {
            for (let i = 0; i < document.querySelector("#tab-container").querySelectorAll(".tab").length; i++) {
                document.querySelector("#tab-container").querySelectorAll(".tab")[i].classList.remove("current");
            }
            document.querySelector('.tab[data-id~="' + id + '"]').classList.add("current");

            for (let i = 0; i < document.querySelector("#view-container").querySelectorAll(".view").length; i++) {
                document.querySelector("#view-container").querySelectorAll(".view")[i].classList.remove("current");
            }
            document.querySelector('.view[data-id~="' + id + '"]').classList.add("current");

            document.querySelector("#searchbar").value = document.querySelector(".tab.current").dataset.url;
        } catch { }

    },
    reloadTab: () => {

        document.querySelector("#searchbar").value = document.querySelector(".tab.current").dataset.url;
        document.querySelector("#view-container").querySelector(".view.current").src = browser.verifyProtocol(document.querySelector("#tab-container").querySelector(".tab.current").dataset.url);
        document.querySelector(".tab.current").querySelector(".title").innerText = browser.verifyProtocol(document.querySelector(".tab.current").dataset.url).length <= 30 ? browser.verifyProtocol(document.querySelector(".tab.current").dataset.url).split("/")[2] : browser.verifyProtocol(document.querySelector(".tab.current").dataset.url).substring(14, length - 1) + "...";
    
    },
    generateId: () => {

        let id = "";
        for (let i = 0; i < 4; i++) {
            id += Math.floor(Math.random() * 10);
        }

        if (browser.cfg.tabId.length >= 9999)
            throw new Error("Cannot generate ID");
        for (const tabId in browser.cfg.tabId) {
            if (tabId === id)
                return browser.generateId();
        }
        return parseInt(id);

    },
    boot: () => {

        document.querySelector(":root").style.setProperty('--bg', browser.cfg.bgColor);
        document.querySelector(":root").style.setProperty('--txt', browser.cfg.txtColor);

        if (window.location.hash)
            browser.addTab({ url: browser.verifyProtocol(decodeURI(window.location.hash.substring(1))), current: true });
        else
            browser.addTab({ current: true });

        searchbar.addEventListener("keyup", (event) => {
            if (event.key === "Enter") {
                document.querySelector('.tab.current').dataset.url = searchbar.value;
                browser.reloadTab();
                searchbar.blur();
            }
        });

        setInterval(() => {
            if (document.querySelector("#tab-container").querySelectorAll(".tab").length <= 0)
                browser.addTab({ current: true });
        }, 10);

    }
}

browser.boot();