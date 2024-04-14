import React from 'react'
import Navbar from '../../Component/Navbar'
import { Tabs } from 'antd';
const { TabPane } = Tabs;

function Userprofile() {
  return (
    <div>
        <Navbar/>
        <div className="mt-3 ml-3 mr-3 bs">
      
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          
        </TabPane>
        <TabPane tab="Orders" key="2">
          
        </TabPane>
        <TabPane tab="" key="3">
       
        </TabPane>
       
      </Tabs>
    </div>
    </div>
  )
}

export default Userprofile