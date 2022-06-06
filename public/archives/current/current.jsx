export default function Current() {
  return (
    <>
      {/* 
  // Coder:Brian Wahinya
  // Purpose: Personal website
  // Date: 08/08/2019
  // Version:bngure.001a
   */}
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="description"
        content="Brian Wahinya personal profile website"
      />
      <meta name="keywords" content="Brian,Wahinya,Ngure,Website,Profile" />
      <meta name="author" content="Brian Wahinya" />
      <link
        rel="icon"
        type="image/png"
        href="./assets/img/brian.png"
        sizes="196x196"
      />
      <title>Brian Wahinya</title>
      <link
        rel="stylesheet"
        type="text/css"
        href="./assets/bootstrap-4.3.1/css/bootstrap.min.css"
      />
      <link href="./assets/fontawesome-5.9.0/css/all.css" rel="stylesheet" />
      <link rel="stylesheet" type="text/css" href="./assets/index.css?v=15" />
      <div className="loader" id="loader" />
      <div id="main" className="row animate-bottom">
        {/* PROFILE DIVS */}
        <div id="profile" className="row">
          <div id="navThis" style={{ width: "15%", height: "100%" }}>
            <nav id="myNav" className="nav" style={{ margin: "auto" }}>
              <button
                className="btn navB fill"
                id="btnAbout"
                onclick="openDiv('mainAbout', 'btnAbout')"
              />
              <button
                className="btn navB fill"
                id="btnResume"
                onclick="openDiv('mainResume', 'btnResume')"
              />
              <button
                className="btn navB fill"
                id="btnProjects"
                onclick="openDiv('mainProjects', 'btnProjects')"
              />
              <button
                className="btn navB fill"
                id="btnBlog"
                onclick="openDiv('mainBlog', 'btnBlog')"
              />
              <button
                className="btn navB fill"
                id="btnGallery"
                onclick="openDiv('mainGallery', 'btnGallery')"
              />
              <button
                className="btn navB fill"
                id="btnContact"
                onclick="openDiv('mainContact', 'btnContact')"
              />
              <button
                className="btn navB fill"
                id="btnAmbitions"
                onclick="openDiv('mainAmbitions', 'btnAmbitions')"
              />
            </nav>
            <div id="ideas" style={{ width: "100%", height: "50%" }}>
              <p
                id="profQuote"
                style={{
                  fontSize: 11,
                  color: "aliceblue",
                  justifyContent: "center",
                }}
              />
            </div>
          </div>
          <div className="" id="pInfo">
            <div id="profPic">
              <div className="box" id="lang">
                <select
                  name="languages"
                  id="selectLang"
                  style={{ fontSize: 9 }}
                >
                  <option value="lang_eng">English</option>
                  <option value="lang_swahili">Kiswahili</option>
                  <option value="lang_espanol">Espanol</option>
                  <option value="lang_french">French</option>
                  <option value="lang_portugeese">Portugeese</option>
                </select>
              </div>
              <div id="profImage" className="scale-up-center scale-down-center">
                <img id="picha" src="./assets/img/f.jpg" />
              </div>
            </div>
            <div id="socialMedia">
              <div id="divName">
                <div id="spa">
                  <div className="card" id="cardProfDetails">
                    <h3
                      className="tracking-in-expand spaCon nameOfficial"
                      id="profName"
                      style={{ margin: "auto" }}
                    />
                    <p
                      className="spaCon"
                      id="profCareer"
                      style={{ margin: "auto" }}
                    />
                    <div className="row" style={{ margin: "auto" }}>
                      <a
                        id="aSocial"
                        target="_blank"
                        href="https://www.facebook.com/yobra.wahinya"
                      >
                        <i className="fab fa-facebook-square" id="fb" />
                      </a>
                      <a
                        id="aSocial"
                        target="_blank"
                        href="https://github.com/BrianWahinya"
                      >
                        <i className="fab fa-github" id="git" />
                      </a>
                      <a
                        id="aSocial"
                        target="_blank"
                        href="https://stackoverflow.com/users/10642716/wahinya-brian"
                      >
                        <i className="fab fa-stack-overflow" id="stack" />
                      </a>
                      <a
                        id="aSocial"
                        target="_blank"
                        href="https://twitter.com/BrianWahinya"
                      >
                        <i className="fab fa-twitter" id="twi" />
                      </a>
                      <a id="aSocial" target="_blank" href="">
                        <i className="fab fa-instagram" id="inst" />
                      </a>
                      <a
                        id="aSocial"
                        target="_blank"
                        href="https://www.linkedin.com/in/brian-wahinya-051b0b138/"
                      >
                        <i className="fab fa-linkedin-in" id="link" />
                      </a>
                      <a id="aSocial" target="_blank" href="">
                        <i className="fab fa-whatsapp" id="whatsapp" />
                      </a>
                    </div>
                  </div>
                </div>
                <div id="advice" className="row">
                  <div className="thought" id="thoughtDiv">
                    <p
                      style={{ fontSize: 13, margin: "auto" }}
                      id="thoughtPg"
                    />
                    <p
                      style={{ fontSize: 12, margin: "auto" }}
                      id="authorThoughtPg"
                    />
                  </div>
                </div>
              </div>
              <div className="row" id="divButtons">
                <a
                  className="btns btn-1 btn-1d"
                  href="./assets/pdf/resumebrianwahinya.pdf"
                  download="resumebrianwahinya"
                  style={{ paddingTop: 5, textDecoration: "none" }}
                  id="downloadCV"
                />
                <button
                  className="btns btn-1 btn-1d"
                  onclick="openDiv('mainContact', 'btnContact')"
                  id="contactME"
                />
              </div>
            </div>
          </div>
        </div>
        {/* CONTENT DIVS */}
        <div className="content mainContent slide-right" id="mainAbout">
          <div style={{ marginLeft: "2%", width: "98%", height: "100%" }}>
            <div
              id="About"
              className="divContent"
              style={{ overflowY: "scroll" }}
            >
              {/* Container */}
              <div className="container-fluid">
                {/* <div class="text-center">
            <h4>About Me</h4>
        </div> */}
                <div className="row slideanim">
                  <div className="col-sm-12 col-xs-12">
                    <div
                      className="panel panel-default text-center"
                      style={{ marginBottom: 10 }}
                    >
                      <div className="panel-heading">
                        <h6 id="aboutme" />
                      </div>
                      <div className="panel-body">
                        <p id="aboutMain" />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-xs-12">
                    <div
                      className="panel panel-default text-center"
                      style={{ marginBottom: 10 }}
                    >
                      <div className="panel-heading">
                        <h6 id="myservices" />
                      </div>
                      <div className="panel-body">
                        <ul
                          id="aboutServices"
                          style={{ listStyleType: "none", paddingLeft: 0 }}
                        ></ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-xs-12">
                    <div
                      className="panel panel-default text-center"
                      style={{ marginBottom: 10 }}
                    >
                      <div className="panel-heading">
                        <h6 id="clients" />
                      </div>
                      <ul
                        id="aboutClients"
                        style={{ listStyleType: "none", paddingLeft: 0 }}
                      ></ul>
                    </div>
                  </div>
                  <div className="col-sm-12 col-xs-12">
                    <div
                      className="panel panel-default text-center"
                      style={{ marginBottom: 10 }}
                    >
                      <div className="panel-heading">
                        <h6 id="codingskills" />
                      </div>
                      <div className="panel-body">
                        <div id="pricing" className="container-fluid">
                          <div
                            className="row slideanim"
                            id="aboutSkillss"
                          ></div>
                        </div>
                        <i className="fab fa-python" />
                        <i className="fab fa-php" />
                        <i className="fab fa-js-square" />
                        <i className="fab fa-html5" />
                        <i className="fab fa-css3" />
                        <i className="fab fa-sass" />
                        <i className="fas fa-rss" />
                        <i className="fab fa-react" />
                        <i className="fas fa-chart-bar" />
                        <i className="fab fa-github-square" />
                        <i className="fas fa-database" />
                        <i className="fab fa-laravel" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="content mainContent slide-right"
          id="mainResume"
          style={{ display: "none", overflow: "none" }}
        >
          <div style={{ marginLeft: "2%", width: "98%", height: "100%" }}>
            <div
              id="Resume"
              className="divContent"
              style={{ overflowY: "scroll" }}
            >
              <div className="resume">
                <div className="container-fluid">
                  <div className="row slideanim">
                    <div
                      className="col-sm-6 col-xs-12"
                      style={{ paddingLeft: 2, paddingRight: 2 }}
                    >
                      <div
                        className="panel panel-default"
                        style={{ marginBottom: 10 }}
                      >
                        <div className="panel-heading">
                          <h6 id="resumeTitleWork" />
                        </div>
                        <div className="containerTimeline">
                          <div className="timeline" id="kazitu" />
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-sm-6 col-xs-12"
                      style={{ paddingLeft: 2, paddingRight: 2 }}
                    >
                      <div
                        className="panel panel-default"
                        style={{ marginBottom: 10, paddingTop: 10 }}
                      >
                        <div className="col-sm-12 col-xs-12">
                          <div
                            className="panel panel-default"
                            style={{ marginBottom: 10 }}
                          >
                            <div className="panel-heading">
                              <h6 id="resumeTitleEducation" />
                            </div>
                            <div className="containerTimeline">
                              <div className="timeline" id="kusoma" />
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-12 col-xs-12">
                          <div
                            className="panel panel-default text-center"
                            style={{ marginBottom: 10 }}
                          >
                            <div className="panel-heading">
                              <h6 id="resumeTitleAchieve" />
                            </div>
                            <div id="kuachieve" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="content mainContent slide-right"
          id="mainProjects"
          style={{ display: "none", overflow: "none" }}
        >
          <div style={{ marginLeft: "2%", width: "98%", height: "100%" }}>
            <div
              id="Projects"
              className="divContent"
              style={{ overflowY: "scroll" }}
            >
              <div className="row" id="projectsList" />
            </div>
          </div>
        </div>
        <div
          className="content mainContent slide-right"
          id="mainBlog"
          style={{ display: "none", overflow: "none" }}
        >
          <div style={{ marginLeft: "2%", width: "98%", height: "100%" }}>
            <div
              id="Blog"
              className="divContent"
              style={{ width: "100%", overflowY: "scroll" }}
            >
              {/* <div id="btnBlogs" class="row">
            <button class="blogBtn">Icons</button>
            <button class="blogBtn">Mysteries</button>
            <button class="blogBtn">I.T</button>
        </div> */}
              <div className="row" id="blogDiv" style={{ width: "100%" }} />
            </div>
          </div>
        </div>
        <div
          className="content mainContent slide-right"
          id="mainGallery"
          style={{ display: "none", overflow: "none" }}
        >
          <div style={{ marginLeft: "2%", width: "98%", height: "100%" }}>
            <div id="Gallery" className="divContent">
              <div className="card" id="divGallery">
                <h4 id="headGallery">Gallery</h4>
                <p id="pGallery">Coming soon</p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="content mainContent slide-right"
          id="mainContact"
          style={{ display: "none", overflow: "none" }}
        >
          <div style={{ marginLeft: "2%", width: "98%", height: "100%" }}>
            <div id="Contact" className="divContent">
              <div className="card" id="divContacts" />
            </div>
          </div>
        </div>
        <div
          className="content mainContent slide-right"
          id="mainAmbitions"
          style={{ display: "none", overflow: "none" }}
        >
          <div style={{ marginLeft: "2%", width: "98%", height: "100%" }}>
            <div
              id="Ambitions"
              className="divContent"
              style={{ overflowY: "scroll" }}
            >
              <div id="divAmbitions" style={{ width: "99%" }} />
            </div>
          </div>
        </div>
      </div>
      <div
        id="copyrightDiv"
        style={{ margin: "auto", color: "white", textAlign: "center" }}
      >
        <h4 id="copyright" />
      </div>
      <div id="modals" />
    </>
  );
}
