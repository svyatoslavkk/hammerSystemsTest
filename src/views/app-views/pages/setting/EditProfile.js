import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Avatar, Button, Input, DatePicker, Row, Col, message, Upload, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ROW_GUTTER } from 'constants/ThemeConstant';
import Flex from 'components/shared-components/Flex';

export class EditProfile extends Component {
  state = {
    avatarUrl: '/img/avatars/thumb-6.jpg',
    name: '',
    email: '',
    userName: '',
    phoneNumber: '',
    website: '',
    address: '',
    city: '',
    postcode: '',
    loading: true,
  };

  componentDidMount() {
		this.fetchUserId();
  }

  fetchUserId = async () => {
		const userId = this.props.match.params.userId;
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
      const { name, email, username, phone, website, address } = response.data;
      this.setState({
        name: name,
        email: email,
        userName: username,
        phoneNumber: phone,
        website: website,
        address: `${address.street}, ${address.suite}`,
        city: address.city,
        postcode: address.zipcode,
      });
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      this.setState({ loading: false });
    }
  };

  avatarEndpoint = 'https://www.mocky.io/v2/5cc8019d300000980a055e76';

  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleSubmit = async () => {
    this.setState({ loading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success('Data saved successfully!');
			message.destroy();
      this.props.history.push('/app/home/user-list');
    } catch (error) {
      console.error('Error saving data:', error);
      message.error('Failed to save data.');
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { name, email, userName, phoneNumber, website, address, city, postcode, avatarUrl, loading  } = this.state;

		if (loading) {
      return (
				<Spin />
			);
    }

    const onFinish = async (values) => {
      const key = 'updatable';
      message.loading({ content: 'Updating...', key });
			await this.handleSubmit();
      setTimeout(() => {
        this.setState({
          name: name,
          email: email,
          userName: userName,
          phoneNumber: phoneNumber,
          website: website,
          address: address,
          city: city,
          postcode: postcode,
        });
        message.success({ content: 'Done!', key, duration: 2 });
				message.destroy();
      }, 1000);
    };

    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    const onUploadAavater = (info) => {
      const key = 'updatable';
      if (info.file.status === 'uploading') {
        message.loading({ content: 'Uploading...', key, duration: 1000 });
        return;
      }
      if (info.file.status === 'done') {
        this.getBase64(info.file.originFileObj, (imageUrl) =>
          this.setState({
            avatarUrl: imageUrl,
          })
        );
        message.success({ content: 'Uploaded!', key, duration: 1.5 });
      }
    };

    const onRemoveAvater = () => {
      this.setState({
        avatarUrl: '',
      });
    };

    return (
      <>
        <Flex alignItems="center" mobileFlex={false} className="text-center text-md-left">
          <Avatar size={90} src={avatarUrl} icon={<UserOutlined />} />
          <div className="ml-md-3 mt-md-0 mt-3">
            <Upload onChange={onUploadAavater} showUploadList={false} action={this.avatarEndpoint}>
              <Button type="primary">Change Avatar</Button>
            </Upload>
            <Button className="ml-2" onClick={onRemoveAvater}>
              Remove
            </Button>
          </div>
        </Flex>
        <div className="mt-4">
          <Form
            name="basicInformation"
            layout="vertical"
						initialValues={
							{ 
								'name': this.state.name,
								'email': this.state.email,
								'userName': this.state.userName,
								'phoneNumber': this.state.phoneNumber,
								'website': this.state.website,
								'address': this.state.address,
								'city': this.state.city,
								'postcode': this.state.postcode
							}
						}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Row>
              <Col xs={24} sm={24} md={24} lg={16}>
                <Row gutter={ROW_GUTTER}>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label="Name"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your name!',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label="Username"
                      name="userName"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your username!',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        {
                          required: true,
                          type: 'email',
                          message: 'Please enter a valid email!',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item label="Phone Number" name="phoneNumber">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item label="Website" name="website">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24}>
                    <Form.Item label="Address" name="address">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item label="City" name="city">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item label="Post code" name="postcode">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Save Change
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </>
    );
  }
}

export default withRouter(EditProfile);
