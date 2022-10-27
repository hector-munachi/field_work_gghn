import { Layout } from 'antd';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import 'antd/dist/antd.css';


// styles
import './App.css'

// pages & components
import Dashboard from './pages/dashboard/Dashboard'
import Create from './pages/create/Create'
import Search from './pages/search/Search'
import Location from './pages/location/Location'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Project from './pages/project/Project'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'


const { Content, Footer } = Layout;


function App() {
  const { authIsReady, user } = useAuthContext()

  const theYear = new Date().getFullYear()

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Layout>
          <Navbar />
          <Content style={{
              padding: '0 20px',
            }}>
            {user && <Sidebar />}
            <Switch>
              <Route exact path="/">
                {!user && <Redirect to="/login" />}
                {user && <Dashboard />}
              </Route>
              <Route path="/create">
                {!user && <Redirect to="/login" />}
                {user && <Create />}
              </Route>
              <Route path="/search">
                {!user && <Redirect to="/login" />}
                {user && <Search />}
              </Route>
              <Route path="/location">
                {!user && <Redirect to="/login" />}
                {user && <Location />}
              </Route>
              <Route path="/projects/:id">
                {!user && <Redirect to="/login" />}
                {user && <Project />}
              </Route>
              <Route path="/login">
                {user && <Redirect to="/" /> }
                {!user && <Login /> }
              </Route>
              <Route path="/signup">
                {user && user.displayName && <Redirect to="/" /> }
                {!user && <Signup /> }
              </Route>
            </Switch>
            </Content>
            <Footer   style={{
                textAlign: 'center',
              }}>
                GGHN ©{theYear} Created @ Savannah Innovations
            </Footer>
          </Layout>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App
