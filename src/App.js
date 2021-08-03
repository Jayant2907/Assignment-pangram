
import './App.css';
import { BrowserRouter, Route, Switch, useParams } from "react-router-dom";
import { useState } from 'react';
import Employee from './Components/Employee/Employee';
import Mentor from './Components/Mentor/Mentor';
import Login from './Components/Login/Login';
import LandingPage from './Components/LandingPage/LandingPage';
import Error from './Components/Error/Error';
import Project from './Components/Project/Project';

function App() {
  const [isSignup,setIsSignup]=useState(false)
    const [isMentor,setIsMentor] = useState(true)
    const [currproject,setCurrProject] = useState(null)
    

  return (
    <BrowserRouter>
            <div className='App'>
                <Switch>
                    <Route path='/' exact component={LandingPage}>
                        <LandingPage setIsMentor={setIsMentor}/>
                    </Route>

                    <Route path='/auth' exact >
                        <Login isSignup={isSignup} setIsSignup={setIsSignup} setIsMentor={setIsMentor} isMentor={isMentor}/>
                    </Route>

                    <Route path='/mentor' exact >
                        <Mentor setCurrProject={setCurrProject} isSignup={isSignup} setIsMentor={setIsMentor}/>
                    </Route>

                    <Route path='/employee' exact>
                        <Employee setCurrProject={setCurrProject} setIsMentor={setIsMentor}/>
                    </Route>
                   
                    <Route path='/project/' exact 
                    render={(props) => (<Project setCurrProject={setCurrProject} currproject={currproject} id={props.match.params.id} setIsMentor={setIsMentor} isMentor={isMentor}/>)} />

                    <Route component={Error} />
                </Switch>
            </div>
        </BrowserRouter>
    // <div className="App">
    //   <h2 className="App-heading">Welcome to company project management system</h2>
    //   <Cards/>
    // </div>
  );
}

export default App;
