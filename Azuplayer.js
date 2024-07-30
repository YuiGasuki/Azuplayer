/**
 *Azuplayer
 *音乐播放器
 *@author Yui_ <13413925094@139.com>
 *@date 2024-07-28 初始版本
 */

//http://i2.hdslb.com/bfs/archive/a52dd54803a16da966f7e76e3b7b5c97977f1e23.jpg
//https://xy220x180x77x88xy.mcdn.bilivideo.cn:8082/v1/resource/789053_da3-1-30216.m4s?agrr=1&build=0&buvid=FE4ED8D7-D03F-3E4B-95A4-83FBEA5F8FB628320infoc&bvc=vod&bw=8446&deadline=1722165077&e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M%3D&f=u_0_0&gen=playurlv2&logo=80000000&mid=1560384560&nbs=1&nettype=0&og=hw&oi=2028330408&orderid=0%2C3&os=08hbv&platform=pc&sign=11416c&traceid=trLDYDiDZehGxg_0_e_N&uipk=5&uparams=e%2Cuipk%2Cnbs%2Cdeadline%2Cgen%2Cos%2Coi%2Ctrid%2Cmid%2Cplatform%2Cog&upsig=0bb3ce4c249e647a9e3b03146feaecef


/**
 *构建音乐播放器
 *里面html的id命名方式 我是以
 *azuplayer-功能-名称
 *@author Yui_ <13413925094@139.com>
 */
let data;//储存播放器信息
function player(Object){
    data = Object;
    const mainbox = document.getElementById(data.id);
    let dataWidth = "300px";
    let dataFontsize = "calc(var(--boxWidth) * 0.05)";
    let urlTitle = data.url.title;
    let urlSinger = data.url.singer;
    let urlCover = data.url.cover;
    let urlaudio = data.url.url;
    if(data.width){
        dataWidth = data.width;
    }
    if(data.fontSize){
        dataFontsize = data.fontSize;
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
        listHtml = `<div id="azuplay-list-black"></div><div id="azuplay-list-box"><ul>${a}</ul></dv>`
        //console.log(UrlList);
    }

    mainbox.innerHTML =
    `
    <style>
    #${data.id} {
        --boxWidth:${dataWidth};
        --boxFontsize:${dataFontsize};
    }
    </style>
    <div id="azuplayer-box-main">
        <img id="azuplayer-play-img" src="azuplay-pause.svg" alt="播放按钮">
        <a href="${urlaudio}" id="azuplayer-play-a">
        <img id="azuplayer-cover-img" src="${urlCover}" alt="封面">
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
    ${listHtml}
    `;
    const ProgressRanged = document.getElementById("azuplayer-progress-ranged");
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
        PlayImg.src="azuplay-pause.svg";
        ProgressRanged.max = PlayAudio.duration;
        PlaytimeShow.innerText = `${formattingTime(PlayAudio.currentTime)}/${formattingTime(PlayAudio.duration)}`;
        ProgressRanged.addEventListener('change',ProofreadProgressOk);
        ProgressRanged.addEventListener('input',ProofreadProgress);
        PlayAudio.addEventListener('timeupdate',ProofreadTime);       
        isAudioOk = true;
    }
    PlayAudio.onended = () =>{
        PlayAudio.pause();
        PlayImg.src="azuplay-pause.svg";
    }
    PlayButton.addEventListener('click',playerplay);
    function playerplay(event){
        event.preventDefault();
        if(!isAudioOk){
            return
        }
        if(PlayAudio.paused){
            PlayAudio.play();
            PlayImg.src="azuplay-play.svg";
        }else{
            PlayAudio.pause();
            PlayImg.src="azuplay-pause.svg";
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
            Titlep.innerHTML = `${data.url[id].title}<span>${data.url[id].singer}</span>`;
            PlayAudio.src = data.url[id].url;
            PlayButton.href=data.url[id].url;
            ProgressBox.style.setProperty('--NowProgress',"0%");            
    }
    const listdom = document.querySelectorAll('.azuplayer-list-li');
    for(let i =0;i<listdom.length;i++){
        listdom[i].onclick = () =>{changeSong(listdom[i],i)};
    };
    listBu.onclick = () =>{
        listBox.style.display = "inline";
        listBlack.style.display = "inline";
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
        this.PlayImg.src="azuplay-play.svg";
        return "ok"
    }else{
        return "no player"
    }
}
player.prototype.pause = function (){
    if(this.PlayAudio){
        this.PlayAudio.pause();
        this.PlayImg.src="azuplay-pause.svg";
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


