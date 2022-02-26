import React from 'react';
import App from '../App';

class NavBar extends React.Component{
  state = {
    defaultParams: {
      project: 'clock',
      lang: 'en'
    },
    projects: [
      {id:'clock', name:"Clock"},
      {id:'weather', name:"Weather"}
    ],
    languages: [
      {id:'en', name:"English"},
      {id:'es', name:"Spanish"},
      {id:'fr', name:"French"}
    ]
  }

  render(){
    const {languages, projects, defaultParams} = this.state;
    // console.log('langs', languages);
    // console.log('pro', projects);
    const projectsTags = projects.map(project => {
      const {id, name} = project;      
      return (
        <li>
          <a className='dropdown-item' key={id} id={id} onClick={() => this.projectLinkClick(id)}>{name}</a>
        </li>
      );      
    });
    // const languagesTags = languages.map(lang => <label><input type="radio" name="lang" key={lang.id} id={lang.id} />{lang.id.toUpperCase()}</label> );
    return <>
      <nav className="navbar navbar-expand-sm bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="https://www.brianwahinya.com" target="_blank">Portfolio</a>
          <button className="navbar-toggler ml-auto" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="" role="button" data-bs-toggle="dropdown">Projects</a>
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