let userOrOrgName = "QuarkPixel";
let repoName = "ScreenAmbientLight";
let currentVersion = "0.1.0";
let checker = UpdateChecker.createNew(userOrOrgName, repoName, currentVersion);
checker.hasNewVersion(function (result) {
   if(result) {
       checker.openBrowserToReleases();
   }
});

function loadapp(url, btnId, num) {
    mui("body").on("tap", btnId, function () {
        var loadId = this.getAttribute("id")
        sendloadId = loadId.slice(num)
        var getvalue = document.getElementById(loadId).innerHTML
        var loaddata = {
            config: {
                id: sendloadId,
            },
            fun_Success: function (data) {
                console.log(JSON.stringify(data))
                var geturl = data.data.down_a
                if (geturl == "") {
                    alert("暂无数据可供下载")
                } else {
                    createDownload(geturl, loadId)
                }
            },
        }
        if (getvalue == "下载") {
            Fun_App.ExAjax(url, loaddata)
        }
        if (getvalue != "下载") {
            document
                .getElementById(loadId)
                .addEventListener("tap", function () {
                    document.getElementById(loadId).innerHTML = "暂停"
                    pauseDownload()
                })
        }
        if (getvalue == "暂停") {
            document
                .getElementById(loadId)
                .addEventListener("tap", function () {
                    resumeDownload()
                })
        }
    })
}

/*
 * 创建下载任务
 */
function createDownload(url, loadId) {
    dTask = plus.downloader.createDownload(url)
    dTask.addEventListener(
        "statechanged",
        function (download, status) {
            var fimeName = download.getFileName().slice(11).replace(".apk", "")
            if (download.state == 4 && status == 200) {
                document.getElementById(loadId).innerHTML = "下载"
                plus.nativeUI.confirm(
                    "下载已完成，是否安装？",
                    function (e) {
                        if (e.index == 0) {
                            openFile(download.getFileName())
                        } else {
                            del()
                        }
                    },
                    fimeName,
                    ["确定", "取消"]
                )
            } else {
                var progress =
                    (download.downloadedSize / download.totalSize) * 100
                progress = parseInt(progress.toFixed(2))
                if (isNaN(progress)) {
                    document.getElementById(loadId).innerHTML = "下载"
                } else if (progress == 100) {
                    del()
                    document.getElementById(loadId).innerHTML = "下载"
                } else {
                    document.getElementById(loadId).innerHTML = progress + "%"
                }
            }
        },
        false
    )
    dTask.start()
}

/*
 * 暂停下载任务
 */
// function pauseDownload() {
//     dtask.pause()
// }
/*
 * 恢复下载任务
 */
// function resumeDownload() {
//     dtask.resume()
// }
/*
 * 取消下载
 */
// function del() {
//     plus.downloader.clear()
// }
/*
 * 打开文件操作
 */
function openFile(fileName) {
    plus.runtime.openFile(fileName)
}
