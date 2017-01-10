臉書螢幕直播投票
=======


> 版本： v0.0.0<br />
> 作者： 張本微 <bwaycer@gmail.com> (http://bwaycer.github.io)<br />
> 授權： [CC-BY-4.0](http://bwaycer.github.io/license/CC-BY-4.0/)



## 簡介


模仿近期（民國 105 年末）流行的臉書表情投票直播。



## 目錄


* app/
  * [image/](app/image)
  * javascript/
    * wdoc/
      * home/
        * [index.js](app/javascript/wdoc/home/index.js)
  * view/
    * [home.js](app/view/home.js)
  * logo.ico
* lib/
  * node/
    * [serverHome.js](lib/node/serverHome.js)
  * pure/
    * [htm.js](lib/pure/htm.js)
  * rootearth/
    * [initAMD.js](lib/rootearth/initAMD.js)
    * [initAMD_wdoc.js](lib/rootearth/initAMD_wdoc.js)
    * [log.js](lib/rootearth/log.js)
    * [support.js](lib/rootearth/support.js)
  * [index.js](lib/index.js)
* [README.md](README.md)



## 使用方式


啟動伺服器，預設開啟於 `http://0.0.0.0:8081/`：

```
node lib/index.js
```



### 直播軟體


如果你沒有好的選擇，也能像筆者聽網友的建議去下載
[Open Broadcaster Software](http://obsproject.com/)
軟體，可以直播電腦螢幕，甚至選擇單一的應用程式的畫面。

筆者使用視窗作業系統，安裝時出現下述訊息的提示窗，這時只要到
[微軟下載中心](http://www.microsoft.com/zh-tw/download/details.aspx?id=40784)
下載「vcredist_x64」、「vcredist_x86」 即可。

```
your system is missing runtime components that OBS Studio requires.
please make sure to install both vcredist_x64 and vcredist_x86
Would you like to download them
```

若選用瀏覽器畫面直播時只看得見滑鼠移來移去的全黑畫面，只要去關閉瀏覽器的硬體加速功能就可解決。



## 參考資料


* [Capture FB Reactions count and show them on webpage](http://gist.github.com/anonymous/7073ea6c601f28aa65e5a077ef875526)
* [臉書直播加上表情符號投票怎麼做？詳細步驟Show給你看！ - TransBiz](http://transbiz.com.tw/臉書直播加表情符號投票/)
* [OBS使用視窗擷取網頁會黑畫面的解決方式。 - andy1max的創作 - 巴哈姆特](http://home.gamer.com.tw/creationDetail.php?sn=3183790)

