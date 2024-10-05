/**
 *Azuplayer
 *音乐播放器
 *@author Yui_ <13413925094@139.com>
 *@date 2024-07-28 初始版本
 *@date 2024-09-15 添加默认封面,自定义字体
 */

/**
 *构建音乐播放器
 *里面html的id命名方式 我是以
 *azuplayer-功能-名称
 *@author Yui_ <13413925094@139.com>
 */
let data;//储存播放器信息
let OriginalPath = "https://yuigasuki.github.io/Azuplayer/";
function player(Object){
    data = Object;
    const mainbox = document.getElementById(data.id);
    let dataWidth = "300px";
    let dataFontsize = "calc(var(--boxWidth) * 0.05)";
    let urlTitle = data.url.title;
    let urlSinger = data.url.singer;
    let urlCover = data.url.cover;
    let urlaudio = data.url.url;
    let suspendedBallHtml = ``,suspendedBallCss = ``;
    if(data.width){
        dataWidth = data.width;
    }
    if(data.fontSize){
        dataFontsize = data.fontSize;
    }
    if(!data.fontFamily){
        data.fontFamily = "none";
    }
    if(!data.url.title){
        urlTitle = "ㄟ( ▔, ▔ )ㄏ";
    }
    if(!data.url.singer){
        urlSinger = "世界歌手";
    }
    
    let listHtml = ``;
    let listHtmlbu = `style="opacity:0;" enabled="false"`;
    if(data.url instanceof Array){
        listHtmlbu = "";
        urlTitle=data.url[0].title;
        urlSinger=data.url[0].singer;
        urlCover=data.url[0].cover;
        urlaudio=data.url[0].url;
        if(!data.url[0].title){
            urlTitle = "ㄟ( ▔, ▔ )ㄏ";
        }
        if(!data.url[0].singer){
            urlSinger = "世界歌手";
        }
        
    let a =``;
    for(let i =0;i<data.url.length;i++){
        if(i===0){
            a +=`<li class="azuplayer-list-li"  style="background:#eee;color:#DB000A;">${data.url[i].title}<br><span>${data.url[i].singer}</span></li>`;
        }else{
            a +=`<li class="azuplayer-list-li" >${data.url[i].title}<br><span>${data.url[i].singer}</span></li>`;
            }
    }
        listHtml = `<div id="azuplay-list-box"><ul>${a}</ul></div><div id="azuplay-list-black">收回</div>`
        //console.log(UrlList);
    }
    
    if(data.SuspendedBall||data.SuspendedPosition){
    data.SuspendedPosition = data.SuspendedPosition.split(" ");
    
    let a = "";
    for(let i=0;i<data.SuspendedPosition.length;i++){
    a += data.SuspendedPosition[i]+";";
    }
    suspendedBallHtml = `
    <div id="azuplayer-black-main"></div>
    <div id="azuplayer-box-suspendedBall" style="position: fixed;${a}">
    <div id="azuplayer-suspendedBall-img" alt="播放按钮">${azuplayPauseSvg}</div>
    <img class="azuplayer-cover-img" id="azuplayer-suspendedBall-cover" src="${urlCover}" alt="封面">
    </div>
    `;
    suspendedBallCss = `style="display:none;z-index: 99997;position: fixed;${a}"`;
    }
    
    mainbox.innerHTML =
    `
    <style>
    #${data.id} {
        --boxWidth:${dataWidth};
        --boxFontsize:${dataFontsize};
        --measure:calc(var(--boxWidth) / 5);    
        filter: drop-shadow(0px 0px calc(var(--boxWidth) / 50) #525252); 
    }
    #${data.id} * {
    font-family:${data.fontFamily};
    }
    </style>
    <div id="azuplayer-box-main" ${suspendedBallCss}>
        <div id="azuplayer-play-img" alt="播放按钮" class="azuplayer-play-img">${azuplayPauseSvg}</div>
        <a href="${urlaudio}" id="azuplayer-play-a">
        <img id="azuplayer-cover-img" src="${urlCover}" alt="封面" class="azuplayer-cover-img">
        </a>
        <div>
        <p id="azuplayer-title-p">${urlTitle}<span>${urlSinger}</span></p> 
        <div id="azuplayer-tool-div">
        <button id="azuplayer-list-bu" ${listHtmlbu}>更多</button>
        <p id="azuplayer-time-p">00:00/00:00</p>
        </div>
        <input type="range" id="azuplayer-progress-ranged" min="0" value="0">
        <div id="azuplayer-progress-box">
            <div id="azuplayer-progress-already"></div>
        </div>       
        </div>
        <audio id="azuplay-play-audio" src="${urlaudio}" ></audio>        
    </div>
    ${suspendedBallHtml}
    ${listHtml}   
    `;
    const ProgressRanged = document.getElementById("azuplayer-progress-ranged");
    const azuplayerBoxMain = document.getElementById("azuplayer-box-main");
    const ProgressBox = document.getElementById("azuplayer-progress-box");
    const PlayAudio = document.getElementById("azuplay-play-audio");
    const listBu = document.getElementById("azuplayer-list-bu");
    const listBox = document.getElementById("azuplay-list-box");
    const listBlack = document.getElementById("azuplay-list-black");
    const Titlep = document.getElementById("azuplayer-title-p");
    const CoverImg = document.getElementById("azuplayer-cover-img");
    this.PlayAudio = PlayAudio;
    const PlayButton = document.getElementById("azuplayer-play-a");
    const PlayImg = document.getElementById("azuplayer-play-img"); 
    const PlaytimeShow = document.getElementById("azuplayer-time-p"); 
    if(data.SuspendedBall){
        var azuplayerSuspendedBallImg = document.getElementById("azuplayer-suspendedBall-img");
        var azuplayerSuspendedBallCover = document.getElementById("azuplayer-suspendedBall-cover");
        var azuplayerSuspendedBallBox = document.getElementById("azuplayer-box-suspendedBall");
        var azuplayerBlackMain = document.getElementById("azuplayer-black-main");
        this.azuplayerSuspendedBallImg = azuplayerSuspendedBallImg;
        let azuplayIsClick = null;
        azuplayerSuspendedBallCover.addEventListener('click',(event)=>{
            clearTimeout(azuplayIsClick);
            azuplayIsClick=setTimeout(function () {
                playerplay(event);
            },200);
        });
        azuplayerSuspendedBallCover.ondblclick = () =>{
            clearTimeout(azuplayIsClick);
            azuplayerSuspendedBallBox.style.display = "none";
            azuplayerBoxMain.style.display="flex";
            azuplayerBlackMain.style.display="inline";
        }
        azuplayerBlackMain.onclick = () =>{
            azuplayerSuspendedBallBox.style.display = "inline";
            azuplayerBoxMain.style.display="none";
            azuplayerBlackMain.style.display="none";
        }
        
    }
    this.PlayImg = PlayImg;
    let isFunProofread = false;
    let isAudioOk = false;
    const ProofreadProgress = () =>{
        isFunProofread = true;    
        PlaytimeShow.innerText = `${formattingTime(ProgressRanged.value)}/${formattingTime(PlayAudio.duration)}`;
        ProgressBox.style.setProperty('--NowProgress',(ProgressRanged.value / ProgressRanged.max * 100) + "%");
    }
    const ProofreadTime = () =>{
        if(isFunProofread){
        return
        }
        ProgressRanged.max = PlayAudio.duration;
        PlaytimeShow.innerText = `${formattingTime(PlayAudio.currentTime)}/${formattingTime(PlayAudio.duration)}`;
        ProgressBox.style.setProperty('--NowProgress',(PlayAudio.currentTime / ProgressRanged.max * 100) + "%");            
    }
    const ProofreadProgressOk = () =>{        
        PlayAudio.currentTime = ProgressRanged.value;
        isFunProofread = false; 
    }
    PlayAudio.onloadedmetadata = () =>{    
        PlayAudio.pause();
        PlayImg.innerHTML=azuplayPauseSvg;
        if(data.SuspendedBall){
            azuplayerSuspendedBallImg.innerHTML=azuplayPauseSvg
        }
        ProgressRanged.max = PlayAudio.duration;
        PlaytimeShow.innerText = `${formattingTime(PlayAudio.currentTime)}/${formattingTime(PlayAudio.duration)}`;
        ProgressRanged.addEventListener('change',ProofreadProgressOk);
        ProgressRanged.addEventListener('input',ProofreadProgress);
        PlayAudio.addEventListener('timeupdate',ProofreadTime);       
        isAudioOk = true;
    }
    document.querySelectorAll(".azuplayer-cover-img").forEach(item => {
        item.addEventListener('error', () =>{
            item.src = item.src;
            item.addEventListener('error', () =>{
                item.src = "nothing.jpeg";
            });
        }, { once: true });
    });
    PlayAudio.onended = () =>{
        PlayAudio.pause();
        PlayImg.innerHTML=azuplayPauseSvg;
        if(data.SuspendedBall){
            azuplayerSuspendedBallImg.innerHTML=azuplayPauseSvg
        }
    }
    PlayButton.addEventListener('click',playerplay);
    function playerplay(event){
        event.preventDefault();
        if(!isAudioOk){
            return
        }
        if(PlayAudio.paused){
            PlayAudio.play();
            PlayImg.innerHTML = azuplayPlaySvg;
                    if(data.SuspendedBall){
            azuplayerSuspendedBallImg.innerHTML=azuplayPlaySvg;
        }
        }else{
            PlayAudio.pause();
            PlayImg.innerHTML = azuplayPauseSvg;
                    if(data.SuspendedBall){
            azuplayerSuspendedBallImg.innerHTML=azuplayPauseSvg
        }
        }
    }
    
    if(listHtml!=""){
    const changeSong = (e,id) =>{
        document.querySelectorAll('.azuplayer-list-li').forEach(el => {
            el.style.background="none";
            el.style.color="#525252";
        });
            e.style.background ="#eee";
            e.style.color="#DB000A";
            CoverImg.src=data.url[id].cover;
            listBlack.click();
            if(data.SuspendedBall){
                azuplayerSuspendedBallCover.src=data.url[id].cover;
            }
            document.querySelectorAll(".azuplayer-cover-img").forEach(item => {
        item.addEventListener('error', () =>{
            item.src = item.src;
            item.addEventListener('error', () =>{
                item.src = "nothing.jpeg";
            });
        }, { once: true });
    });
            Titlep.innerHTML = `${data.url[id].title}<span>${data.url[id].singer}</span>`;
            PlayAudio.src = data.url[id].url;
            PlayButton.href=data.url[id].url;
            ProgressBox.style.setProperty('--NowProgress',"0%");            
            ProgressRanged.max=0;
            ProgressRanged.min=0;
    }
    const listdom = document.querySelectorAll('.azuplayer-list-li');
    for(let i =0;i<listdom.length;i++){
        listdom[i].onclick = () =>{changeSong(listdom[i],i)};
    };
    listBu.onclick = () =>{
        listBox.style.display = "inline";
        listBlack.style.display = "block";
    }
    listBlack.onclick = () =>{
        listBox.style.display = "none";
        listBlack.style.display = "none";
    }
    }
}

player.prototype.play = function (){
    if(this.PlayAudio){
        this.PlayAudio.play();
        this.PlayImg.innerHTML = azuplayPlaySvg;
        if(data.SuspendedBall){
            this.azuplayerSuspendedBallImg.innerHTML=azuplayPlaySvg;
        }
        return "ok"
    }else{
        return "no player"
    }
}
player.prototype.pause = function (){
    if(this.PlayAudio){
        this.PlayAudio.pause();
        this.PlayImg.innerHTML=azuplayPauseSvg;
        if(data.SuspendedBall){
            this.azuplayerSuspendedBallImg.innerHTML=azuplayPauseSvg
        }
        return "ok"
    }else{
        return "no player"
    }
}           

const formattingTime = (Number) =>{
    if(isNaN(Number)){
    return "00:00"
    }
    let s = 0;
    let m = 0;
    if(Number>=60){
        m = parseInt(Number / 60);
        s = Math.round(Number - (60 * m));
        
        if(m<=9){
        m = "0"+m;
        }
        if(s<=9){
        s = "0"+s;
        }
        return m+":"+s
    }else{
        s = Math.round(Number)
        if(s<=9){
        s = "0"+s;
        }
        return "00:"+s
    }
}


/**
 *储存所需svg
 */
const azuplayPlaySvg = `<svg t="1722268993428" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1440" xmlns:xlink="http://www.w3.org/1999/xlink" width="22" height="22"><path d="M511.3 98.3c-228 0-413.5 185.5-413.5 413.5 0 23.8 2.6 48.1 6.5 70.8 0 0.1 0.2 0.1 0.3 0.2 1.6 5.8 6.7 10.1 13 10.1 7.6 0 13.8-6.2 13.8-13.8 0-0.5-0.2-0.9-0.3-1.3l0.2-0.1c-3.7-21.4-6-43.3-6-65.8 0-213.1 172.8-385.9 385.9-385.9s385.9 172.8 385.9 385.9-172.6 385.9-385.8 385.9c-142.4 0-266.5-77.4-333.4-192.2 0-0.1-0.1-0.1-0.1-0.2l-0.6-0.9c-2.3-4.3-6.7-7.4-12-7.4-7.6 0-13.8 6.2-13.8 13.8 0 3 1.2 5.6 2.8 7.8l-0.2 0.1C225.7 842 358.8 925.2 511.3 925.2c228 0 413.5-185.5 413.5-413.5S739.3 98.3 511.3 98.3z" fill="#aaaaaa" p-id="1441"></path><path d="M432.1 672.1c-7.6 0-13.8-6.2-13.8-13.8V365.4c0-7.6 6.2-13.8 13.8-13.8 7.6 0 13.8 6.2 13.8 13.8v292.9c0 7.6-6.2 13.8-13.8 13.8zM590.6 672.1c-7.6 0-13.8-6.2-13.8-13.8V365.4c0-7.6 6.2-13.8 13.8-13.8 7.6 0 13.8 6.2 13.8 13.8v292.9c0 7.6-6.2 13.8-13.8 13.8z" fill="#aaaaaa" p-id="1442"></path></svg>`;

const azuplayPauseSvg = `<svg t="1722244541595" viewBox="0 0 1024 1024" version="1.1" p-id="4396"  width="22" height="22"><path d="M675.328 117.717333A425.429333 425.429333 0 0 0 512 85.333333C276.352 85.333333 85.333333 276.352 85.333333 512s191.018667 426.666667 426.666667 426.666667 426.666667-191.018667 426.666667-426.666667c0-56.746667-11.093333-112-32.384-163.328a21.333333 21.333333 0 0 0-39.402667 16.341333A382.762667 382.762667 0 0 1 896 512c0 212.074667-171.925333 384-384 384S128 724.074667 128 512 299.925333 128 512 128c51.114667 0 100.8 9.984 146.986667 29.12a21.333333 21.333333 0 0 0 16.341333-39.402667zM456.704 305.92C432.704 289.152 405.333333 303.082667 405.333333 331.797333v360.533334c0 28.586667 27.541333 42.538667 51.370667 25.856l252.352-176.768c21.76-15.253333 21.632-43.541333 0-58.709334l-252.373333-176.768z m-8.597333 366.72V351.466667l229.269333 160.597333-229.269333 160.597333z" fill="#aaaaaa" p-id="4397"></path></svg>`;