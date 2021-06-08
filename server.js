const puppy = require("puppeteer");

let fs=require("fs")

let songsInfoContainer=[];

async function main(){
    try {
        let browser = await puppy.launch({
            headless: false,
            defaultViewport: false,
            timeout: 0,
            args: ["--start-maximized"],
            slowMo: 10,
          });
          let tabs = await browser.pages();
          let tab = tabs[0];
          await tab.goto("https://gaana.com/album/english/sortby/popularity")
          let songslist=[]
          
          let songsBtn= await tab.$$("li div._ot a")
          console.log(songsBtn.length)  //40
          for(let song of songsBtn){
            let songurl=await tab.evaluate(function(ele){
                return ele.getAttribute("href");  
            },song);
            // console.log("https://gaana.com"+songurl)
            songslist.push("https://gaana.com"+songurl);
         }
  
         for(let i=0;i<songslist.length;i++){
            let songobj={}
            await tab.goto(songslist[i])
            // let ul=await tab.$$("ul.s_l.artworkload li")
            // console.log(ul.length)
            // let songTitle=ul[2]
            // console.log(songTitle.length)
            // let a=await tab.$$("a.sng_c")
            // let songTitle=a[2]
            // // console.log(a)

            let songTitle=await tab.evaluate(async() => {
                const element = document.querySelector('div._t1 h1');
                return element.innerText; // will return undefined if the element is not found
            });

            songobj["Title"]=songTitle;

            // let artistName=await tab.$("li.s_artist.desktop div a.sng_c")

            let artistName=await tab.evaluate(async() => {
                const element = document.querySelector("li.s_artist.desktop div a.sng_c");
                return element.innerText; // will return undefined if the element is not found
            });
            console.log(artistName)
            songobj["Artist"]=artistName
            // songobj["Duration"]=await tab.$$("li.s_duration")[3]
            songobj["URL"]=songslist[i]
            songsInfoContainer.push(songobj)
         }
         fs.writeFileSync("allSongs.json", JSON.stringify(songsInfoContainer));
         await browser.close();

        // async function playmusic(url){
        //     await tab.goto(url)
        //     await tab.click(".s_l.artworkload ")
        // }

        
    } 
    catch (error) {
        console.log("error")
    }
}

main();


