import { Link } from 'react-router-dom'
import {Avatar, Alert, Typography, Card} from 'antd'
import {
  UserOutlined,
} from '@ant-design/icons';

const { Title } = Typography;

export default function ProjectList({ projects }) {
  console.log(projects)

  return (
    <div>
      {projects.length === 0 && <Alert
      message="No projects assigned yet!"
      type="info"
      showIcon
      style={{marginTop: "1em"}}
    />}
      <div>
        {projects.map(project => (
        <Card type="inner" title={project.name} style={{marginBottom: "1em"}}>
        <Link to={`/projects/${project.id}`} key={project.id}>
          <Title level={5}>Due by {project.dueDate.toDate().toDateString()}</Title>
          <div className="assigned-to">
            <ul>
            <Title level={5}><strong>Assigned to</strong></Title>
              {project.assignedUsersList.map(user => (
                <li key={user.photoURL}>
                  <Avatar src={user.photoURL} icon={<UserOutlined />}/>
                </li>
              ))}
            </ul>
          </div>
        </Link>
        </Card>
      ))}
      </div>
    </div>
  )
}

