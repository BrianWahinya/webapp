import React from 'react';
import App from '../App';

class NavBar extends React.Component{
  state = {
    webversions: {
      current_version: {link: 'https://www.brianwahinya.com', name:'Current Version'},
      maiden_version: {link: 'https://www.brianwahinya.com/oldversion', name:'Maiden Version'}
    },
    defaultParams: {
      project: 'clock',
      lang: 'en'
    },
    projects: [
      {id:'clock', name:"Clock", emoji: <>&#128338;</>},
      {id:'weather', name:"Weather", emoji: <>&#127784;</>}
    ],
    languages: [
      {id:'en', name:"English"},
      {id:'es', name:"Spanish"},
      {id:'fr', name:"French"}
    ]
  }

  render(){
    const {webversions, projects, defaultParams} = this.state;
    // console.log('langs', languages);
    // console.log('pro', projects);
    const projectsTags = projects.map(project => {
      const {id, name, emoji} = project;      
      return (
        <li>
          <button className='dropdown-item' key={id} id={id} onClick={() => this.projectLinkClick(id)}>{name} {emoji}</button>
        </li>
      );      
    });
    // const languagesTags = languages.map(lang => <label><input type="radio" name="lang" key={lang.id} id={lang.id} />{lang.id.toUpperCase()}</label> );
    return <>
      <nav className="navbar navbar-expand-sm bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href='window.location' target="_blank" rel="noreferrer">Portfolio</a>
          <button className="navbar-toggler ml-auto" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <button className="nav-link dropdown-toggle" data-bs-toggle="dropdown">WebPortals</button>
                <ul className="dropdown-menu">
                  <a className="dropdown-item" href={webversions.current_version.link}>{webversions.current_version.name}</a>
                  <a className="dropdown-item" href={webversions.maiden_version.link}>{webversions.maiden_version.name}</a>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <button className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Projects</button>
                <ul className="dropdown-menu">
                  {projectsTags}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className='container-fluid text-center div-content'>
        <App clickedProject={defaultParams.project}/>
      </div>
      
    </>  
  }

  projectLinkClick = (projectId) => {
    console.log('clicked', this);
    const defaultParams = this.state.defaultParams;
    defaultParams.project = projectId;
    this.setState({defaultParams});
  }
}

export default NavBar;