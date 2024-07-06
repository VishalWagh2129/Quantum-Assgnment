import React, { useEffect, useState } from 'react';
import { Table, message, Button, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/getAllUsers');
        if (Array.isArray(response.data.data)) {
          setUsers(response.data.data);
        } else {
          setUsers([]);
          message.error('Unexpected response format');
        }
        setLoading(false);
      } catch (error) {
        message.error('Failed to fetch users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (record) => {
    try {
      await axios.delete(`http://localhost:3001/api/deleteUser/${record._id}`);
      message.success('User deleted successfully');
      this.fetchUsers();
    } catch (error) {
      message.error('Failed to delete user');
    }
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dob',
      key: 'dob',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          {/* <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => handleEdit(record)}
                  style={{ marginRight: 8 }}
                /> */}
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" icon={<DeleteOutlined />} />
          </Popconfirm>
        </span>
      ),
    },
  ];
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users List</h1>
      <Table columns={columns} dataSource={users} loading={loading} rowKey="_id" />
    </div>
  )
}
