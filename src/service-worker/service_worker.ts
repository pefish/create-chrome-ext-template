let color = '#3aa757';


chrome.runtime.onInstalled.addListener(() => {

  // 使用谷歌浏览器弹出一个操作系统级别的通知
  chrome.notifications.create("", {
    type: "basic",
    iconUrl: chrome.runtime.getURL("/image/app48.png"),
    title: "喝水小助手",
    message: "看到此消息的人可以和我一起来喝一杯水",
  });

  // 监听存储中的值的变化
  chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
      console.log(
        `Storage key "${key}" in namespace "${namespace}" changed.`,
        `Old value was "${oldValue}", new value is "${newValue}".`
      );
    }
  });

  // 存储颜色值，chrome.storage.sync 的内容会被谷歌同步
  chrome.storage.sync.set({ color }, () => {
    console.log("Storage color")
  });

  chrome.alarms.create("test alarm", { periodInMinutes: 0.1 })
  chrome.alarms.onAlarm.addListener(function () {
    console.log("这是一个定时器。")
  });

  // 为特定的网址显示插件图标
  // chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  //   console.log("removeRules done")
  //   chrome.declarativeContent.onPageChanged.addRules([
  //     {
  //       conditions: [
  //         // 或者的关系
  //         new chrome.declarativeContent.PageStateMatcher({
  //           pageUrl: { hostSuffix: '.baidu.com' },
  //         }),
  //         // new chrome.declarativeContent.PageStateMatcher({
  //         //   css: ["video"]
  //         // })
  //       ],
  //       actions: [ new chrome.declarativeContent.ShowAction() ]
  //     }
  //   ]);
  // });

  // 改变的就是 manifest.json 中的 action 字段的属性
  chrome.action.setTitle({ title: "这是一个模版插件" });
  chrome.action.setBadgeText({ text: "new" });
  chrome.action.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });

  // 设置右键菜单
  chrome.contextMenus.onClicked.addListener(
    (params) => {
      chrome.tabs.create({
        url:
          "https://www.baidu.com/s?ie=utf-8&wd=" +
          encodeURI(params.selectionText!),
      });
    },
  )
  chrome.contextMenus.create({
    id: "1",
    title: "使用百度搜索：%s",
    contexts: ["selection"],
  });
  chrome.contextMenus.create({
    id: "1_2",
    type: "separator",
  });
  // 父级菜单
  chrome.contextMenus.create({
    id: "2",
    title: "Parent Context Menu",
    contexts: ["all"],
  });
  chrome.contextMenus.create({
    id: "21",
    parentId: "2",
    title: "Child Context Menu1",
    contexts: ["all"],
  });


  // 监听 popup 或者 content script 发来的消息
  chrome.runtime.onMessage.addListener(
    (message, sender: chrome.runtime.MessageSender, sendResponse) => {
      const target = sender.tab ?
        "content script " + sender.tab.url :
        "popup"
      console.log(`service worker 收到 ${target} 的消息`, message);
      switch (message) {
        case "I am popup":
          sendResponse("hello, popup");
          break
        case "I am content script":
          sendResponse("hello, content script");
          break
      }
    }
  );
});


export { }