
/*
let data = [
    {
      "id": 0,
      "name": "肥宅心碎賞櫻3日",
      "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
      "area": "高雄",
      "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
      "group": 87,
      "price": 1400,
      "rate": 10
    },
    {
      "id": 1,
      "name": "貓空纜車雙程票",
      "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
      "area": "台北",
      "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
      "group": 99,
      "price": 240,
      "rate": 2
    },
    {
      "id": 2,
      "name": "台中谷關溫泉會1日",
      "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
      "area": "台中",
      "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
      "group": 20,
      "price": 1765,
      "rate": 7
    }
  ];

  */

  


  const information=document.querySelector(".ticketArea");
  const searchText=document.querySelector(".searchText");



let newApi; //取的外部api資料並存取至此變數
axios.get("https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json")
    .then(function(response){
        newApi=response.data.data;
        renderData(newApi)
    })



    //初始化
  function renderData(info){
    let str="";
    info.forEach(item => {
        let content=` <li class="ticketCard">
        <div class="cardImg">
            <a href="#">
                <img src="${item.imgUrl}" alt="">
            </a>
            <div class="cityTag">${item.area}</div>
            <div class="cityRank">${item.rate}</div>
        </div>
        <div class="cardConetnt">
            <a href="#" class="primaryColor text-decoration-none"><h3 class="cardTitle">${item.name}</h3></a>
            <div class="borderLine"></div>
            <p class="cardIntroduce">${item.description}</p>
            <div class="cardInfo">
                <p class="titckCardNum primaryColor fs-16">
                    <span class="material-symbols-rounded">info</span>剩下最後<span class="titckCardNum"> ${item.group} 組</span>
                </p>
                <p class="primaryColor titckCardPrice fs-16">
                    TWD
                    <span class="sec-font titckCardPrice fs-32">$${item.price}</span>
                </p>
            </div>
        </div>
        </li>`

        str+=content;
        
    });

    information.innerHTML=str;

  }
  
  
  
  //新增套票
  const tickerName=document.querySelector(".ticketName");
  const imageUrl=document.querySelector(".imageUrl");
  const ticketLocation=document.querySelector(".ticketLocation");
  const ticketPrice=document.querySelector(".ticketPrice");
  const ticketNum=document.querySelector(".ticketNum");
  const ticketLevel=document.querySelector(".ticketLevel");
  const ticketDescription=document.querySelector(".ticketDescription");
  
  const addButton=document.querySelector(".addButton");

 const formReset=document.querySelector(".form-add");

  addButton.addEventListener("click",function(e){
  const imageUrl=document.querySelector(".imageUrl");
  const ticketLevel=document.querySelector(".ticketLevel");
     //判斷是否為空值
    if(tickerName.value==""|| imageUrl.value==""||ticketLocation.value==""||ticketPrice.value==""||ticketNum.value==""||ticketLevel.value==""||ticketDescription.value==""){
        alert("尚有欄位未填寫!");
        return;
    }

    //判斷是否為數值
    if(isNaN(ticketPrice.value)){
        alert("套票金額需填寫數值");
        return;
    }else if(isNaN(ticketNum.value)){
        alert("套票組數需填寫數值");
        return;
    }else if(isNaN(ticketLevel.value)){
        alert("套票星級需填寫數值");
        return;
    }

    //星級區間驗證
    if(ticketLevel.value<1||ticketLevel.value>10){

        alert("套票星級區間為1-10分");
        return;
    }
    

    let obj={};
    obj.id=newApi.length;
    obj.name=tickerName.value;
    obj.imgUrl=imageUrl.value;
    obj.area=ticketLocation.value;
    obj.description=ticketDescription.value;
    obj.group=ticketNum.value;
    obj.price=ticketPrice.value;
    obj.rate=ticketLevel.value;
    newApi.push(obj);
    renderData(newApi);


    formReset.reset(); //清除表單資訊
    
  })




//篩選器
const filiterLocation=document.querySelector(".filiterLocation");
const searchButton=document.querySelector(".searchButton");
const notFind=document.querySelector(".notFind");



searchButton.addEventListener("click",function(e){
    
    //篩選全部
    if(filiterLocation.value=="全部"){
        renderData(newApi);
    }

    if(filiterLocation.value=="地區搜尋"){
        information.innerHTML=`<div class="notFind">
       <h2 class="primaryColor fw-bold fs-32 text-center">查無此關鍵字資料</h2>
        <img src="https://github.com/hexschool/2022-web-layout-training/blob/main/js_week5/no_found.png?raw=true" alt="">
        </div>`;
    }

    //篩選特定地區
    let tempData=[]
    newApi.forEach(item=>{
        if(filiterLocation.value==item.area){
           
            tempData.push(item);
            renderData(tempData);
        }
    })
})

