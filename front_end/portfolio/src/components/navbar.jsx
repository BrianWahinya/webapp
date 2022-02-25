import React from 'react';

class NavBar extends React.Component{
  state = {
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
    const {languages, projects} = this.state;
    // console.log('langs', languages);
    // console.log('pro', projects);
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="https://www.brianwahinya.com">Portfolio</a>
          </div>
          <ul className="nav navbar-nav">
            {projects.map(pro => <li id={pro.id}>{pro.name}</li>)}
          </ul>
          <div className="radio">
            {languages.map(lang => <label><input type="radio" name="lang" id={lang.id} />{lang.id.toUpperCase()}</label> )}
          </div>
          <button className="btn btn-danger navbar-btn">Button</button>
        </div>
      </nav>
    )
  }
}

export default NavBar;