import { Switch } from "react-router-dom";
import Route from './Route'
import login from '../pages/login'
import signup from '../pages/signup'
import dashboard from '../pages/dashboard'
export default function Routes(){
    return(
        <Switch>
            <Route exact path = "/" component={login}/>
            <Route exact path = "/register" component={signup}/>
            <Route exact path = "/dashboard" component={dashboard} isPrivate/>
        </Switch>
    )
}