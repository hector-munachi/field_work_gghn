import React from 'react'
import { Card, Input, Divider } from "antd";

const Search = () => {

  const onSearch = (value) => {
    console.log(value);
  }

  const { Search } = Input;

  return (
    <div>
      <div style={{marginTop: "1em"}}>
      <Divider/>
      <Card type="inner">
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
      </Card>
      </div>
    </div>
  )
}

export default Search