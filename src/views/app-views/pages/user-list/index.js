import React, { Component } from 'react'
import axios from 'axios';
import { Card, Table, Tag, Tooltip, message, Button, Spin } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import UserView from './UserView';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import userData from "assets/data/user-list.data.json";
import { useDataContext } from 'context/DataContext';

export class UserList extends Component {
	state = {
    users: [],
		userProfileVisible: false,
		selectedUser: null,
    loading: true
	}

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      this.setState({ users: response.data });
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      this.setState({ loading: false });
    }
  }

	deleteUser = userId => {
		this.setState({
			users: this.state.users.filter(item => item.id !== userId),
		})
		message.success({ content: `Deleted user ${userId}`, duration: 2 });
	}

	showUserProfile = userInfo => {
		this.setState({
			userProfileVisible: true,
			selectedUser: userInfo
		});
	};
	
	closeUserProfile = () => {
		this.setState({
			userProfileVisible: false,
			selectedUser: null
    });
	}

	render() {
    const { users, userProfileVisible, selectedUser, loading } = this.state;

		const tableColumns = [
			{
				title: 'User',
				dataIndex: 'name',
				render: (_, record) => (
					<div className="d-flex">
						<AvatarStatus src={record?.img} name={record?.name} subTitle={record?.email}/>
					</div>
				),
				sorter: {
					compare: (a, b) => {
						a = a?.name.toLowerCase();
  						b = b?.name.toLowerCase();
						return a > b ? -1 : b > a ? 1 : 0;
					},
				},
			},
      {
        title: 'Address',
        dataIndex: 'address',
        render: (_, el) => (
          <span>{el?.address?.city}, {el?.address?.street}, {el?.address?.suite}</span>
        ),
      },
      {
        title: 'Company',
        dataIndex: 'company',
        render: (_, el) => (
          <span>{el?.company?.name}</span>
        ),
        sorter: {
          compare: (a, b) => a?.company?.name?.length - b?.company?.name?.length,
        },
      },
			{
				title: 'Website',
				dataIndex: 'website',
        render: (_, el) => (
          <span>{el?.website}</span>
        ),
			},
			{
				title: '',
				dataIndex: 'actions',
				render: (_, elm) => (
					<div className="text-right">
						<Tooltip title="View">
							<Button type="primary" className="mr-2" icon={<EyeOutlined />} onClick={() => {this.showUserProfile(elm)}} size="small"/>
						</Tooltip>
						<Tooltip title="Delete">
							<Button danger icon={<DeleteOutlined />} onClick={()=> {this.deleteUser(elm.id)}} size="small"/>
						</Tooltip>
					</div>
				)
			}
		];
		return (
			<Card bodyStyle={{'padding': '0px'}}>
        {loading ? (
          <Spin spinning={loading}>
            <Table columns={tableColumns} dataSource={users} rowKey='id' />
          </Spin>
        ) : (
          <Table columns={tableColumns} dataSource={users} rowKey='id' />
        )}
        <UserView data={selectedUser} visible={userProfileVisible} close={this.closeUserProfile}/>
			</Card>
		)
	}
}

export default UserList
