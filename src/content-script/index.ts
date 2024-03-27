
// alert("这是注入页面的 js 脚本")


chrome.runtime.sendMessage(
    "I am content script",
    (response) => {
        console.log("content script received response: " + response);
    }
);

export {}
