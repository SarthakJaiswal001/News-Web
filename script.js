const API_KEY="ea211a78cef4463d874368a97a12d43b";
const url="https://newsapi.org/v2/everything?q=";
window.addEventListener("load",()=>fetchNews('India'));//this will fetch news whenever the window will load it will call fetchnews function with query as parameter

async function fetchNews(query){
const fetchingData=await fetch(`${url}${query}&apiKey=${API_KEY}`);
const data=await fetchingData.json();
console.log(data)
bindingData(data.articles);//it will bind the data into the conainers
}
function bindingData(articles){
    const newsContainer=document.getElementById("news-container");
    const newsTemplateCard=document.getElementById("template-news-card");
   
    newsContainer.innerHTML = '';//initially the data has to be  null so that same articles do not get repeated again and again
    
    articles.forEach((article)=> {
        if(!article.urlToImage)return;//this will check if there is no url for image it will not show the image
        const boxclone=newsTemplateCard.content.cloneNode(true);//it creates clone of the newsTemplateCard
        //The cloneNode() method creates a copy of a node, and returns the clone. The cloneNode() method clones all attributes and their values. Set the deep parameter to true if you also want to clone descendants (children).
        fillingTheData(boxclone,article)
        newsContainer.appendChild(boxclone);//it inserts the in boxclone
        //The appendChild() method of the Node interface adds a node to the end of the list of children of a specified parent node.
    });


}
function fillingTheData(boxclone,article){
    const newsImage=boxclone.querySelector('#news-image');
    const headline=boxclone.querySelector('#headline');
    const source=boxclone.querySelector('#source-of-content')
    const description=boxclone.querySelector('#description');

    newsImage.src=article.urlToImage;
    headline.innerHTML=article.title;
    
    description.innerHTML=article.description;
    const date=new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    })//this is coverting timezone into readable date . after reading the JSON file .publishedAt is coverted to localeString readable format
    //taken from stackoverflow
    //example -> console.log(new Date().toLocaleString(undefined, {dateStyle: 'short'}));
  source.innerHTML=`${article.source.name} - ${date}`;  

  boxclone.firstElementChild.addEventListener('click',()=>{
    window.open(article.url,"_blank");//this will open the url on clicking any element of the box in new tab _blank is used to open url in new tab
  })
}
let currentNav=null;//onclick event is created in which the id is passed as parameter
function navClicked(id){//this helps in passing the id of current navigation option we have chosen
    fetchNews(id);//it passes id as parameter for query
    const navItem=document.getElementById(id);
    currentNav?.classList.remove('active');//firstly the previously selected navitem is removed
    currentNav=navItem;//new nav item assigned
    currentNav.classList.add('active');
}

const newsText=document.getElementById('news-text')
const searchButton=document.getElementById('search-Btn');

    searchButton.addEventListener('click',()=>{
        
            const query=newsText.value;
            if(!query)return;
            fetchNews(query);
            currentNav?.classList.remove('active');
            currentNav=null;
        }
       
    )




