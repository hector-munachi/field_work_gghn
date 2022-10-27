import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { Button, Menu, Space, Typography } from "antd"
import logo  from "../assets/gghn.png"

export default function NavbarTop() {
  const { logout, isPending } = useLogout()
  const { user } = useAuthContext()

  const {Item} = Menu;
  const {Title} = Typography;

  return (
    <div>
  <Menu mode="horizontal">
    <Link to="/">
    <Space>
    <div style={{marginLeft: "1em"}}>
    <img 
        src={logo} alt="gghn logo"
        height="35px"
      />
    </div>
    <div style={{marginRight: "1em", marginTop: "0.5em"}}>
    <Title level={3}>Fieldwork</Title>
   </div>
    </Space>
    </Link>
  <Space>
  {!user && (
        <>
        <div>
          <Link to="/signup" style={{ textDecoration: "none", color: "#29badb" }}>Signup</Link>
        </div>
        <div>
          <Link to="/login" style={{ textDecoration: "none", color: "#29badb" }}>Login</Link>
        </div>
        </>
        )}
  </Space>
   <div>
   {user && (
          <>
            {!isPending && <Button style={{backgroundColor: "#29badb"}} type="primary" onClick={logout}>Logout</Button>}
            {isPending && <Button style={{backgroundColor: "#29badb"}} type="primary" disabled>Logging Out...</Button>}
          </>
        )}
   </div>
  </Menu>
 </div>
  )
}
