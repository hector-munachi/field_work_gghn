import { useCollection } from '../hooks/useCollection'
import { Avatar, Card, Spin, Alert, List } from 'antd'


export default function OnlineUsers() {
  const { isPending, error, documents } = useCollection('users')

  return (
    <div>
    {/* <Card> */}
    <List
    grid={{
      gutter: 16,
      xs: 1,
      sm: 2,
      md: 4,
      lg: 4,
      xl: 6,
      xxl: 3,
    }}
  >
    <List.Item>
      {isPending && <Spin tip="Loading..."/>}
      {/* {error && <Alert
      // message="Error Text"
      // description="Error Description Error Description Error Description Error Description"
      type="error"
    >{error}</Alert>} */}
      {documents && documents.map(user => (
        <div key={user.id} className="">
          {user.online && <span className="online-user"></span>}
          <Avatar src={user.photoURL} />
          <p>{user.displayName}</p>
        </div>
      ))}
    </List.Item>
  </List>
  {/* </Card> */}
    </div>
  )
}
