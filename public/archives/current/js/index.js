/**
 * Coder:Brian Wahinya
 * Purpose: Personal website
 * Date: 08/08/2019
 * Version:bngure.002a
 */

$(document).ready(function(){

    //Language Event listener
    document.getElementById('selectLang').addEventListener('change', langChange);
    //Window resize
    const getWidth = function(){
        let winWidth = document.documentElement.clientWidth;       
    };
    const debounceWindowSize = function(func, delayTime){
        let timer;
        return function(){
            let context = this,
                args = arguments;            
            clearTimeout(timer);
            timer = setTimeout(function(){
                func.apply(context, args);
            }, delayTime);
        }
    };
    getWidth();
    const windowResize = debounceWindowSize(getWidth, 1000);    
    window.addEventListener("resize", windowResize);

    //Fuction returns language selected
    langChange();
    function langChange(){
        //Variable for language selected
        let langValue;
        let langSelected = document.getElementById('selectLang').value;
        // console.log('language', langSelected);
        let languages = ["lang_eng","lang_espanol","lang_swahili","lang_french","lang_portugeese"];
        if(languages.indexOf(langSelected) != -1){
            // console.log('language', langSelected);
            langValue = langSelected;
            // console.log('language', langValue);
        }else{
            // console.log('language', langSelected);
            langValue = "lang_eng";
            // console.log('language', langValue);
        };

        /////////////////////////
        //LOAD BODY COMPONENTS
        ajaxFunc(getBodyText, 'json/componenttext.json', null);
        function getBodyText(item){
            // console.log('item', item);
            let data;
            switch(langValue) {
                case "lang_eng":
                data = item[0].en;
                break;
                case "lang_espanol":
                data = item[0].es;
                break;
                case "lang_swahili":
                data = item[0].swa;
                break;
                case "lang_portugeese":
                data = item[0].port;
                break;
                case "lang_french":
                data = item[0].fr;
                break;
                default:
                data = item[0].en;
            };
            //Navbar text config
            // console.log('data', data[0].nav);
            idElement('btnAbout').innerHTML = '<i class="fas fa-user-tie"></i> ' + data[0].nav.map(function(item){return item.about});
            idElement('btnResume').innerHTML = '<i class="fas fa-book-reader"></i> ' + data[0].nav.map(function(item){return item.resume});
            idElement('btnProjects').innerHTML = '<i class="fas fa-toolbox"></i> ' + data[0].nav.map(function(item){return item.projects});
            idElement('btnBlog').innerHTML = '<i class="fas fa-blog"></i> ' + data[0].nav.map(function(item){return item.blog});
            idElement('btnGallery').innerHTML = '<i class="fas fa-photo-video"></i> ' + data[0].nav.map(function(item){return item.gallery});
            idElement('btnContact').innerHTML = '<i class="far fa-address-book"></i> ' + data[0].nav.map(function(item){return item.contact});
            idElement('btnAmbitions').innerHTML = '<i class="fas fa-stream"></i> ' + data[0].nav.map(function(item){return item.ambitions});

            //Qoute
            idElement('profQuote').innerHTML = data[0].quotes.map(function(item){return item.content});

            //Index buttons
            idElement('downloadCV').innerHTML = '<i class="fas fa-download updown"></i><br>' + data[0].buttons.map(function(item){return item.downloadCV});
            idElement('contactME').innerHTML = '<i class="fas fa-phone-volume shake"></i><br>' + data[0].buttons.map(function(item){return item.contactME});

            //Content titles
            idElement('aboutme').innerHTML = data[0].contentTitles[0].aboutme.map(function(item){return item.about});
            idElement('myservices').innerHTML = data[0].contentTitles[0].aboutme.map(function(item){return item.myservices});
            idElement('clients').innerHTML = data[0].contentTitles[0].aboutme.map(function(item){return item.clients});
            idElement('codingskills').innerHTML = data[0].contentTitles[0].aboutme.map(function(item){return item.codingskills});

            idElement('resumeTitleWork').innerHTML = data[0].contentTitles[0].resume.map(function(item){return item.work});
            idElement('resumeTitleEducation').innerHTML = data[0].contentTitles[0].resume.map(function(item){return item.education});
            idElement('resumeTitleAchieve').innerHTML = data[0].contentTitles[0].resume.map(function(item){return item.achievements});

            idElement('headGallery').innerHTML = data[0].contentTitles[0].gallery.map(function(item){return item.name});
            idElement('pGallery').innerHTML = data[0].contentTitles[0].gallery.map(function(item){return item.content});
        }

        /////////////////////////
        //MAIN
        ajaxFunc(getMainData, 'json/main.json', null);
        function getMainData(item){
            // console.log('item', item);
            let data;
            switch(langValue) {
                case "lang_eng":
                data = item[0].en;
                break;
                case "lang_espanol":
                data = item[0].es;
                break;
                case "lang_swahili":
                data = item[0].swa;
                break;
                case "lang_portugeese":
                data = item[0].port;
                break;
                case "lang_french":
                data = item[0].fr;
                break;
                default:
                data = item[0].en;
            };
            // console.log('data', data);
            idElement('profName').innerHTML = data.map(function(item){return item.name});
            idElement('profCareer').innerHTML = data.map(function(item){return item.profession});
            let th = data.map(function(item){return item.quotes})[0];
            // setInterval(repeatQuotes, 10000);
            let timeVar = [];
            repeatQuotes(timeVar);
            
            function repeatQuotes(timeV){
                timeV.length = 0;
                timeV = [];
                for(let i = 0;i < th.length; i++){
                    // console.log('me ', i);
                    let k = i;
                    let content = th.map(function(item){return item.name})[i];
                    let authorContent = th.map(function(item){return item.author})[i];
                    timeVar.push( setTimeout(function(){
                        // console.log('count ', k);
                        idElement('thoughtPg').innerHTML = "";
                        idElement('thoughtPg').innerHTML = content;
                        idElement('authorThoughtPg').innerHTML = "";
                        let authorItalics = document.createElement('i');
                            authorItalics.innerHTML = authorContent;
                        idElement('authorThoughtPg').appendChild(authorItalics);
                    }, 10000 * (k * 2)) 
                    );
                    // console.log('timeVar', timeVar);
                }
            }

        };

        /////////////////////////
        //ABOUT ME
        ajaxFunc(getAboutData, 'json/about.json', null);
        function getAboutData(item){
            // console.log('item', item);
            let data;
            switch(langValue) {
                case "lang_eng":
                data = item[0].en;
                break;
                case "lang_espanol":
                data = item[0].es;
                break;
                case "lang_swahili":
                data = item[0].swa;
                break;
                case "lang_portugeese":
                data = item[0].port;
                break;
                case "lang_french":
                data = item[0].fr;
                break;
                default:
                data = item[0].en;
            };
            // console.log('dataMain', data);
            idElement('aboutMain').innerHTML = data.map(function(item){return item.age}) +', '+ data.map(function(item){return item.marital}) +', '+ data.map(function(item){return item.about});
            // idElement('aboutAge').innerHTML = data.map(function(item){return item.age});
            // idElement('aboutMarital').innerHTML = data.map(function(item){return item.marital});

            let aboutServices = data.map(function(item){return item.services})[0];
            // console.log('aboutServices', aboutServices);
            idElement('aboutServices').innerHTML = "";
            for (i=0; i<aboutServices.length; i++){
                serviceList = document.createElement('li');
                serviceList.innerHTML = aboutServices.map(function(item){return item.name})[i];                
                idElement('aboutServices').appendChild(serviceList);
            };

            let aboutClients = data.map(function(item){return item.clients})[0];
            // console.log('aboutClients', aboutClients);
            idElement('aboutClients').innerHTML = "";
            for (i=0; i<aboutClients.length; i++){
                clientsList = document.createElement('li');
                clientsList.innerHTML = aboutClients.map(function(item){return item.name})[i];                
                idElement('aboutClients').appendChild(clientsList);
            };

            let aboutSkills = data.map(function(item){return item.coding})[0];
            // console.log('aboutSkills', aboutSkills);
            idElement('aboutSkillss').innerHTML = "";
            for (i=0; i<aboutSkills.length; i++){
                let mainDiv = document.createElement('div');
                    mainDiv.className = "col-sm-4 col-xs-4 icons";
                let subDiv = document.createElement('div');
                    subDiv.className = "panel panel-default text-center";
                    subDiv.style.marginTop = "5px";
                let bodyDiv = document.createElement('div');
                    bodyDiv.className = "panel-body";
                let footerDiv = document.createElement('div');
                    footerDiv.className = "panel-footer";
                let iconSkill = document.createElement('i');
                    iconSkill.className = aboutSkills.map(function(item){return item.icon})[i];
                    iconSkill.id = aboutSkills.map(function(item){return item.tag})[i];
                let pSkill = document.createElement('h5');
                    pSkill.innerHTML = aboutSkills.map(function(item){return item.name})[i];

                    mainDiv.appendChild(subDiv);
                    subDiv.appendChild(bodyDiv);
                    subDiv.appendChild(footerDiv);
                    bodyDiv.appendChild(iconSkill);
                    footerDiv.appendChild(pSkill);
              
                idElement('aboutSkillss').appendChild(mainDiv);
            };
        };

        /////////////////////////
        //RESUME
        ajaxFunc(getResumeData, 'json/resume.json', null);
        function getResumeData(item){
            // console.log('item', item);
            let data;
            switch(langValue) {
                case "lang_eng":
                data = item[0].en;
                break;
                case "lang_espanol":
                data = item[0].es;
                break;
                case "lang_swahili":
                data = item[0].swa;
                break;
                case "lang_portugeese":
                data = item[0].port;
                break;
                case "lang_french":
                data = item[0].fr;
                break;
                default:
                data = item[0].en;
            };
            // console.log('data', data);

            let resumeWork = data.map(function(item){return item.work})[0];
            // console.log('resumeWork', resumeWork);
            let workYears = resumeWork.map(function(item){return item.year});
            let uniqueYears = [];
                workYears.forEach(function(item){if (uniqueYears.indexOf(item) == -1){ uniqueYears.push(item)} });
            // console.log('workYears', workYears);
            // console.log('uniqueYears', uniqueYears);
            idElement('kazitu').innerHTML = "";
            for(let j=0; j<uniqueYears.length; j++){
                // console.log(uniqueYears[j]);
                let yearEl = document.createElement('h5');
                    yearEl.id = "workYear";
                    yearEl.innerHTML = uniqueYears[j];
                let ulEl = document.createElement('ul');
                    ulEl.id = "workYear" + uniqueYears[j];
                    idElement('kazitu').appendChild(yearEl);
                    idElement('kazitu').appendChild(ulEl);
                let dhere = resumeWork.filter(function(item){ return item.year == uniqueYears[j]});
                for(let i=0; i<dhere.length; i++){                    
                    let liEl = document.createElement('li');
                    let titleEl = document.createElement('h6');
                        titleEl.id = "workTitle";
                        titleEl.innerHTML = dhere.map(function(item){return item.desg})[i];
                    let compEl = document.createElement('h6');
                        compEl.id = "workTitle";
                        compEl.innerHTML = dhere.map(function(item){return item.name})[i];
                    let pEl = document.createElement('p');
                        pEl.innerHTML = dhere.map(function(item){return item.desc})[i];
                    let timeEl = document.createElement('time');
                        timeEl.innerHTML = dhere.map(function(item){return item.fromdate})[i] + ' - ' + dhere.map(function(item){return item.todate})[i];

                        liEl.appendChild(titleEl);
                        liEl.appendChild(compEl);
                        liEl.appendChild(pEl);
                        liEl.appendChild(timeEl);
                        idElement("workYear" + uniqueYears[j]).appendChild(liEl);                        
                }
            }
            
            let resumeEducation = data.map(function(item){return item.education})[0];
            let eduYears = resumeEducation.map(function(item){return item.year});
            let uniqueEduYears = [];
                eduYears.forEach(function(item){if (uniqueEduYears.indexOf(item) == -1){ uniqueEduYears.push(item)} });
            // console.log('eduYears', eduYears);
            // console.log('uniqueEduYears', uniqueEduYears);
            idElement('kusoma').innerHTML = "";
            for(let j=0; j<uniqueEduYears.length; j++){
                // console.log(uniqueEduYears[j]);
                let eduyearEl = document.createElement('h5');
                    eduyearEl.id = "eduYear";
                    eduyearEl.innerHTML = uniqueEduYears[j];
                let eduulEl = document.createElement('ul');
                    eduulEl.id = "eduYear" + uniqueEduYears[j];
                    idElement('kusoma').appendChild(eduyearEl);
                    idElement('kusoma').appendChild(eduulEl);
                let eduFilt = resumeEducation.filter(function(item){ return item.year == uniqueEduYears[j]});
                for(let i=0; i<eduFilt.length; i++){
                    // console.log('weka' + i);
                    let eduliEl = document.createElement('li');
                        eduliEl.id = "eduList";
                    // let edutitleEl = document.createElement('h6');
                    //     edutitleEl.id = "workTitle";
                    //     edutitleEl.innerHTML = eduFilt.map(function(item){return item.name})[i];
                    let educompEl = document.createElement('h6');
                        educompEl.id = "eduTitle";
                        educompEl.innerHTML = eduFilt.map(function(item){return item.name})[i];
                    let edupEl = document.createElement('p');
                        edupEl.innerHTML = eduFilt.map(function(item){return item.course})[i];
                    let edutimeEl = document.createElement('time');
                        edutimeEl.innerHTML = eduFilt.map(function(item){return item.fromdate})[i] + ' - ' + eduFilt.map(function(item){return item.todate})[i];

                        // eduliEl.appendChild(edutitleEl);
                        eduliEl.appendChild(educompEl);
                        eduliEl.appendChild(edupEl);
                        eduliEl.appendChild(edutimeEl);
                        idElement("eduYear" + uniqueEduYears[j]).appendChild(eduliEl);                        
                }
            }

            idElement('kuachieve').innerHTML = "";
            /* Achieve Func CHECK */
            let resumeAchievements = data.map(function(item){return item.achieve})[0];
            for (let i=0; i<resumeAchievements.length; i++){
                let eDiv = document.createElement('div');
                    eDiv.className = "folded_corner";
                let dDiv = document.createElement('div');
                let nDiv = document.createElement('div');
                let cDiv = document.createElement('div');
                let ed = document.createElement('p');
                    ed.innerHTML= resumeAchievements.map(function(item){return item.date})[i];
                    ed.style.margin = 0;
                    dDiv.appendChild(ed);
                let en = document.createElement('p');
                    en.innerHTML= resumeAchievements.map(function(item){return item.name})[i];
                    en.id = 'nameAchieve';
                    en.style.margin = 0;
                    nDiv.appendChild(en);
                let ec = document.createElement('p');
                    ec.innerHTML= resumeAchievements.map(function(item){return item.desc})[i];
                    ec.style.marginTop = "5px";
                    ec.style.fontSize = "13px";
                    // ec.style.fontStyle = "italic";
                    cDiv.appendChild(ec);
                let eBr = document.createElement('br');
                    eDiv.appendChild(nDiv);
                    eDiv.appendChild(dDiv);
                    eDiv.appendChild(cDiv);
                    eDiv.appendChild(eBr);
                idElement('kuachieve').appendChild(eDiv);
            };

            // let resumeHobbies = data.map(function(item){return item.hobbies})[0];
            // // console.log('resumeEducation', resumeEducation);
            // idElement('resumeHobbies').innerHTML = "";
            // for (i=0; i<resumeHobbies.length; i++){
            //     hobbiesList = document.createElement('li');
            //     hobbiesList.innerHTML =resumeHobbies.map(function(item){return item.name})[i];                
            //     idElement('resumeHobbies').appendChild(hobbiesList);
            // };
        };

        /////////////////////////
        //PROJECTS
        ajaxFunc(getProjectsData, 'json/projects.json', null);
        function getProjectsData(item){
            // console.log('item', item);
            let data;
            switch(langValue) {
                case "lang_eng":
                data = item[0].en;
                break;
                case "lang_espanol":
                data = item[0].es;
                break;
                case "lang_swahili":
                data = item[0].swa;
                break;
                case "lang_portugeese":
                data = item[0].port;
                break;
                case "lang_french":
                data = item[0].fr;
                break;
                default:
                data = item[0].en;
            };
            idElement('projectsList').innerHTML = "";
            function displayProjectList(projectArray){
                for(let i=0; i<projectArray.length; i++){

                    let proDiv = document.createElement('div');
                        proDiv.className = "card col-sm-6 col-xs-12";
                        proDiv.id = "cardPro";                    
                    let subDiv = document.createElement('div');
                        subDiv.className = "shadow";
                        subDiv.id = "f1_card";
                    let frontDiv = document.createElement('div');
                        frontDiv.className = "front face";
                    
                    let proImg = document.createElement('img');
                        proImg.src = "assets/img/" + projectArray.map(function(item){return item.img})[i];
                        proImg.id = "imgPro";
                    let twoDiv = document.createElement('div');
                        twoDiv.id = "divPro";
                    let headPro = document.createElement('h6');
                        headPro.id = "hPro";
                        headPro.innerHTML = projectArray.map(function(item){return item.company})[i];
                    let companyPro = document.createElement('p');
                        companyPro.id = "nPro";
                        companyPro.innerHTML = projectArray.map(function(item){return item.project})[i];

                    let backDiv = document.createElement('div');
                        backDiv.className = "back face";
                        backDiv.id = "f1_card";
                    let descPro = document.createElement('p');
                        descPro.id = "descPro";
                        descPro.innerHTML = projectArray.map(function(item){return item.desc})[i];
                    
                        proDiv.appendChild(subDiv);
                        subDiv.appendChild(frontDiv);
                        frontDiv.appendChild(proImg);
                        frontDiv.appendChild(twoDiv);
                        twoDiv.appendChild(headPro);
                        twoDiv.appendChild(companyPro);
                        subDiv.appendChild(backDiv);
                        backDiv.appendChild(descPro);
                    idElement('projectsList').appendChild(proDiv);
                }
            }
            let proList = data.map(function(item){return item.project})[0];
            // console.log('projectsList', proList);
            displayProjectList(proList);
        };

        /////////////////////////
        //BLOGS
        ajaxFunc(getBlogsData, 'json/blogs.json', null);
        function getBlogsData(item){
            // console.log('item', item);
            let data;
            switch(langValue) {
                case "lang_eng":
                data = item[0].en;
                break;
                case "lang_espanol":
                data = item[0].es;
                break;
                case "lang_swahili":
                data = item[0].swa;
                break;
                case "lang_portugeese":
                data = item[0].port;
                break;
                case "lang_french":
                data = item[0].fr;
                break;
                default:
                data = item[0].en;
            };
            // console.log('data', data);
            idElement('blogDiv').innerHTML = "";
            function createBlogList(blogArray){
                for(let i=0; i<blogArray.length; i++){
                    let imageBlog = blogArray.map(function(item){return item.pic})[i];
                    // let imageBlog = 'k2flag.jpg';
                    // console.log('imageBlog', imageBlog);
                    let divOne = document.createElement('div');
                        divOne.className = "blogs hero-image";
                        divOne.id = blogArray.map(function(item){return item.id})[i];
                        divOne.addEventListener('click',function(){
                            // console.log('Blog' + divOne.id);

                            // Modal Blogs
                            idElement('modals').innerHTML = "";
                            let myModal = document.createElement('div');
                                myModal.className = "modal fade";
                                myModal.id = "myModal";
                                myModal.setAttribute('role', 'dialog');
                                // myModal.role = "dialog";
                                myModal.style.zIndex = 100000;
                            let divModal = document.createElement('div');
                                divModal.className = "modal-dialog";
                            let modalContent = document.createElement('div');
                                modalContent.className = "modal-content";

                            let modalHeader = document.createElement('div');
                                modalHeader.className = "modal-header";
                            let btnClose = document.createElement('button');
                                btnClose.setAttribute('type', 'button');
                                btnClose.setAttribute('data-dismiss', 'modal');
                                // btnClose.nodeType = "button";
                                btnClose.className = "close";
                                btnClose.id = "modal";
                                btnClose.innerHTML = "&times;";
                            let modalTitle = document.createElement('h4');
                                modalTitle.className = "modal-title";
                                modalTitle.innerHTML = blogArray.map(function(item){return item.title})[i];

                            let modalBody = document.createElement('div');
                                modalBody.className = "modal-body";
                            let modalP = document.createElement('p');
                                modalP.innerHTML = blogArray.map(function(item){return item.subTitle})[i];
                            let modalBlogImg = document.createElement('img');
                                modalBlogImg.style.width = "100%";
                                modalBlogImg.src = "assets/img/" + blogArray.map(function(item){return item.picTwo})[i];
                            let modalBlogDesc = document.createElement('p');
                                modalBlogDesc.id = "modalBlogDesc";
                                modalBlogDesc.innerHTML = blogArray.map(function(item){return item.content})[i];

                            let modalFooter = document.createElement('div');
                                modalFooter.className = "modal-footer";
                            let modalRef = document.createElement('p');
                                modalRef.id = "modalRef";
                                modalRef.innerHTML = blogArray.map(function(item){return item.reference})[i] + "<br>";
                            modalFooter.appendChild(modalRef);
                            modalBody.appendChild(modalP);
                            modalBody.appendChild(modalBlogImg);
                            modalBody.appendChild(modalBlogDesc);
                            modalHeader.appendChild(modalTitle);
                            modalHeader.appendChild(btnClose);
                            
                            modalContent.appendChild(modalHeader);
                            modalContent.appendChild(modalBody);
                            modalContent.appendChild(modalFooter);
                            divModal.appendChild(modalContent);
                            myModal.appendChild(divModal);
                            idElement('modals').appendChild(myModal);

                            $('#myModal').modal();
                        });

                        divOne.setAttribute('style', 'background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(assets/img/' + imageBlog + ');');
                    let divTwo = document.createElement('div');
                        divTwo.class = "hero-text";
                    let headBlog = document.createElement('h5');
                        // headBlog.id = 'postTitle';
                        headBlog.innerHTML = blogArray.map(function(item){return item.title})[i];
                    let subHeadBlog = document.createElement('p');
                        // subHeadBlog.id = 'postParagraph';
                        subHeadBlog.innerHTML = blogArray.map(function(item){return item.subTitle})[i];
                    divTwo.appendChild(headBlog);
                    divTwo.appendChild(subHeadBlog);
                    divOne.appendChild(divTwo);                    
                    idElement('blogDiv').appendChild(divOne);
                }
            };
            let blogList = data.map(function(item){return item.post})[0];
            // console.log('blogList', blogList);
            createBlogList(blogList);
        };

        /////////////////////////
        //AMBITIONS
        ajaxFunc(getAmbitionData, 'json/ambitions.json', null);
        function getAmbitionData(item){
            // console.log('item', item);
            let data;
            let car;
            let edu;
            let fam;
            let amb;
            let hou;
            let gar;
            switch(langValue) {
                case "lang_eng":
                data = item[0].en;
                car="Career"; edu="Education"; fam="Family"; hou="House"; gar="Cars";
                break;
                case "lang_espanol":
                data = item[0].es;
                car="Carrera"; edu="Educación"; fam="Familia"; hou="Casa"; gar="Coches";
                break;
                case "lang_swahili":
                data = item[0].swa;
                car="Kazi"; edu="Elimu"; fam="Familia"; hou="Nyumba"; gar="Magari";
                break;
                case "lang_portugeese":
                data = item[0].port;
                car="Carreira"; edu="Educação"; fam="Família"; hou="Casa"; gar="Carros";
                break;
                case "lang_french":
                data = item[0].fr;
                car="Carrière"; edu="Éducation"; fam="Famille"; hou="Maison"; gar="Des voitures";
                break;
                default:
                data = item[0].en;
                car="Career"; edu="Education"; fam="Family"; hou="House"; gar="Cars";
            };
            // console.log('data', data);
            idElement('divAmbitions').innerHTML = "";
            function createAmbitionList(headT, pArr, numAmbition, imgAmbSrc){
                let divAmbClass;
                let imgAmbClass;
                if((numAmbition % 2) != 0){
                    // console.log(i + ' is odd');
                    divAmbClass = "light";
                    imgAmbClass = "right";
                }else{
                    // console.log(i + ' is even');
                    divAmbClass = "darker";
                    imgAmbClass = "left";
                }                               
                let divAmb = document.createElement('div');
                    divAmb.className = "ambition container spin " + divAmbClass;
                let imgAmb = document.createElement('img');
                    imgAmb.src = "assets/img/" + imgAmbSrc;
                    imgAmb.className = imgAmbClass;
                let head = document.createElement('h5');
                    head.id = 'ambitionsTitle';
                    head.style.fontWeight = 'bold';
                    head.innerHTML = headT + ": ";
                divAmb.appendChild(imgAmb);
                divAmb.appendChild(head);               
                for(let i=0; i<pArr.length; i++){
                    par = document.createElement('p');
                    par.id = 'ambitionsDesc';
                    par.innerHTML = pArr.map(function(item){return item.name})[i];
                    divAmb.appendChild(par);
                }
                idElement('divAmbitions').appendChild(divAmb);
            };

            let ambitionCareer = data.map(function(item){return item.career})[0];
            // console.log('ambitionCareer', ambitionCareer);
            createAmbitionList(car,ambitionCareer, 0, "h.png");
            let ambitionEducation = data.map(function(item){return item.education})[0];
            // console.log('ambitionEducation', ambitionEducation);
            createAmbitionList(edu,ambitionEducation, 1, "grad1.jpg");
            let ambitionFamily = data.map(function(item){return item.family})[0];
            // console.log('ambitionFamily', ambitionFamily);
            createAmbitionList(fam,ambitionFamily, 2, "family.jpg");
            let ambitionHouse = data.map(function(item){return item.house})[0];
            // console.log('ambitionHouse', ambitionHouse);
            createAmbitionList(hou,ambitionHouse, 3, "house.jpg");
            let ambitionCars = data.map(function(item){return item.cars})[0];
            // console.log('ambitionCars', ambitionCars);
            createAmbitionList(gar,ambitionCars, 4, "cheki.jpg");
        };

        /////////////////////////
        //CONTACTS
        ajaxFunc(getContactsData, 'json/contacts.json', null);
        function getContactsData(item){
            // console.log('item', item);
            let data;
            let mob;
            let email;
            let pmail;
            let wmail;
            let butt;
            switch(langValue) {
                case "lang_eng":
                data = item[0].en;
                mob="Mobile"; email="Email"; pmail="Personal Mail"; wmail="Work Mail";
                butt="Contacts";
                break;
                case "lang_espanol":
                data = item[0].es;
                mob="Móvil"; email="Email"; pmail="Correo personal"; wmail="Correo de trabajo";
                butt="Contactos";
                break;
                case "lang_swahili":
                data = item[0].swa;
                mob="Rununu"; email="Barua pepe"; pmail="Barua ya kibinafsi"; wmail="Barua ya Kazi";
                butt="Anwani";
                break;
                case "lang_portugeese":
                data = item[0].port;
                mob="Móvel"; email="O email"; pmail="Correio Pessoal"; wmail="Correio Comercial";
                butt="Contatos";
                break;
                case "lang_french":
                data = item[0].fr;
                mob="Mobile"; email="Email"; pmail="Courrier personnel"; wmail="Courrier de travail";
                butt="Contacts";
                break;
                default:
                data = item[0].en;
                mob="Mobile"; email="Email"; pmail="Personal Mail"; wmail="Work Mail";
                butt="Contacts";
            };
            // console.log('data', data);
            idElement('divContacts').innerHTML = "";
            let buttonContact = document.createElement('button');
                buttonContact.id = 'divContactsButt';
                buttonContact.innerHTML = butt;
            idElement('divContacts').appendChild(buttonContact);
            function createContactList(headT, pArr){                
                let head = document.createElement('h6');
                    head.id = 'contactsTitle';
                    head.innerHTML = headT;                
                idElement('divContacts').appendChild(head);
                for(let i=0; i<pArr.length; i++){
                    par = document.createElement('p');
                    par.id = 'contactsDesc';
                    par.innerHTML = pArr.map(function(item){return item.name})[i];
                    idElement('divContacts').appendChild(par);
                }
            };
            let contactMobile = data.map(function(item){return item.mobile})[0];
            // console.log('contactMobile', contactMobile);
            createContactList('<i class="fas fa-mobile-alt"></i> '+ mob,contactMobile);
            let contactEmail = data.map(function(item){return item.email})[0];
            // console.log('contactEmail', contactEmail);
            createContactList('<i class="fas fa-envelope"></i> '+ email,contactEmail);
            let contactPersonalMail = data.map(function(item){return item.personalMail})[0];
            // console.log('contactPersonalMail', contactPersonalMail);
            createContactList('<i class="fas fa-envelope-open-text"></i> '+ pmail,contactPersonalMail);
            let contactWorkMail = data.map(function(item){return item.workMail})[0];
            // console.log('contactWorkMail', contactWorkMail);
            createContactList('<i class="far fa-paper-plane"></i> '+ wmail,contactWorkMail);
        };

        /////////////////////////
        //COPYRIGHT DATE
        const dateToday = new Date();    
        idElement('copyright').innerHTML =  dateToday.getFullYear() + ' &copy;Brian Wahinya';
    };
});