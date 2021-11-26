import { Switch } from "react-router-dom";
import Route from './Route'
import login from '../pages/login'
import signup from '../pages/signup'
import dashboard from '../pages/dashboard'
import profile from '../pages/profile'
import customer from '../pages/customers'
export default function Routes(){
    return(
        <Switch>
            <Route exact path = "/" component={login}/>
            <Route exact path = "/register" component={signup}/>
            <Route exact path = "/dashboard" component={dashboard} isPrivate/>
            <Route exact path = "/profile" component={profile} isPrivate/>
            <Route exact path = "/customers" component={customer} isPrivate/>
        </Switch>
    )
}