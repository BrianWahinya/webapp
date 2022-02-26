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
    const projectsTags = projects.map(pro => <li key={pro.id} id={pro.id} onClick={() => this.projectLinkClick(pro.id)}>{pro.name}</li>);
    const languagesTags = languages.map(lang => <label><input type="radio" name="lang" key={lang.id} id={lang.id} />{lang.id.toUpperCase()}</label> );
    return (
      <>
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="https://www.brianwahinya.com">Portfolio</a>
            </div>
            <ul className="nav navbar-nav">
              {projectsTags}
            </ul>
            <div className="radio">
              {languagesTags}
            </div>
            <button className="btn btn-danger navbar-btn">Button</button>
          </div>
        </nav>
        <App clickedProject={defaultParams.project}/>
      </>      
    )
  }

  projectLinkClick = (projectId) => {
    console.log('clicked', this);
    const defaultParams = this.state.defaultParams;
    defaultParams.project = projectId;
    this.setState({defaultParams});
  }
}

export default NavBar;