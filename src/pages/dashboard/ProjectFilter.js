import { useState } from 'react'
import { Button, Typography } from 'antd';
import {
  FilterOutlined
} from '@ant-design/icons';

const filterList = ['all', 'mine', 'development', 'design', 'marketing', 'sales']

export default function ProjectFilter({ changeFilter }) {
  const [currentFilter, setCurrentFilter] = useState('all')

  const handleClick = (newFilter) => {
    setCurrentFilter(newFilter)
    changeFilter(newFilter)
  }

  const { Title } = Typography;

  return (
    <div className="project-filter">
      <nav style={{marginBottom: "1em"}}>
        <p></p>
        <Title level={5}><FilterOutlined />Filter by</Title>
        {filterList.map((f) => (
          <Button key={f}
            onClick={() => handleClick(f)}
            className={currentFilter === f ? 'active' : ''}
          >{f}</Button>
        ))}
      </nav>
    </div>
  )
}