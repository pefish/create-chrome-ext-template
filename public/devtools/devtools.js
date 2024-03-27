// 创建扩展面板
chrome.devtools.panels.create(
    // 扩展面板显示名称
    "My Panel",
    // 扩展面板icon，并不展示
    "panel.png",
    // 扩展面板页面
    "/devtools/panel.html",
    function (panel) {
        console.log("自定义面板创建成功！");
    }
);

// 创建自定义侧边栏（元素面板右边）
chrome.devtools.panels.elements.createSidebarPane(
    "All Images",
    function (sidebar) {
        sidebar.setExpression('document.querySelectorAll("img")', "All Images");
    }
);

