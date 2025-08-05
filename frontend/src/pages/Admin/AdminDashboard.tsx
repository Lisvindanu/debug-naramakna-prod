import React, { useState, useEffect } from 'react';

interface User {
  ID: number;
  user_login: string;
  user_email: string;
  user_role: string;
  user_status: number;
  display_name: string;
  user_registered: string;
}

interface Post {
  ID: number;
  post_title: string;
  post_author: number;
  post_status: string;
  post_date: string;
  author: {
    display_name: string;
    user_login: string;
  };
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [pendingPosts, setPendingPosts] = useState<Post[]>([]);
  const [pendingWriters, setPendingWriters] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersRes, pendingPostsRes, pendingWritersRes] = await Promise.all([
        fetch('http://localhost:3001/api/users', {
          headers: { 'Authorization': `Bearer ${token}` },
          credentials: 'include'
        }),
        fetch('http://localhost:3001/api/approval/pending', {
          headers: { 'Authorization': `Bearer ${token}` },
          credentials: 'include'
        }),
        fetch('http://localhost:3001/api/users/pending-writers', {
          headers: { 'Authorization': `Bearer ${token}` },
          credentials: 'include'
        })
      ]);

      const usersData = await usersRes.json();
      const pendingPostsData = await pendingPostsRes.json();
      const pendingWritersData = await pendingWritersRes.json();

      if (usersData.success) setUsers(usersData.data.users);
      if (pendingPostsData.success) setPendingPosts(pendingPostsData.data.pending_posts);
      if (pendingWritersData.success) setPendingWriters(pendingWritersData.data.pending_writers);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const approveWriter = async (userId: number, approved: boolean) => {
    try {
      const response = await fetch(`http://localhost:3001/api/users/${userId}/approve-writer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({ approved })
      });

      if (response.ok) {
        fetchData(); // Refresh data
        alert(`Writer ${approved ? 'approved' : 'rejected'} successfully!`);
      }
    } catch (error) {
      alert('Error updating writer status');
    }
  };

  const reviewPost = async (postId: number, action: 'approve' | 'reject') => {
    try {
      const response = await fetch(`http://localhost:3001/api/approval/${postId}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({ action, feedback: `${action}d by admin` })
      });

      if (response.ok) {
        fetchData(); // Refresh data
        alert(`Post ${action}d successfully!`);
      }
    } catch (error) {
      alert('Error reviewing post');
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ borderBottom: '1px solid #ccc', marginBottom: '20px', paddingBottom: '10px' }}>
        <h1>Admin Dashboard</h1>
        <p>Welcome, {currentUser.display_name} ({currentUser.user_role})</p>
        <button onClick={logout} style={{ float: 'right', padding: '5px 10px' }}>Logout</button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setActiveTab('overview')}
          style={{ marginRight: '10px', padding: '10px', backgroundColor: activeTab === 'overview' ? '#ddd' : 'white' }}
        >
          Overview
        </button>
        <button 
          onClick={() => setActiveTab('users')}
          style={{ marginRight: '10px', padding: '10px', backgroundColor: activeTab === 'users' ? '#ddd' : 'white' }}
        >
          Users ({users.length})
        </button>
        <button 
          onClick={() => setActiveTab('pending-writers')}
          style={{ marginRight: '10px', padding: '10px', backgroundColor: activeTab === 'pending-writers' ? '#ddd' : 'white' }}
        >
          Pending Writers ({pendingWriters.length})
        </button>
        <button 
          onClick={() => setActiveTab('pending-posts')}
          style={{ marginRight: '10px', padding: '10px', backgroundColor: activeTab === 'pending-posts' ? '#ddd' : 'white' }}
        >
          Pending Posts ({pendingPosts.length})
        </button>
      </div>

      {activeTab === 'overview' && (
        <div>
          <h2>System Overview</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <div style={{ border: '1px solid #ccc', padding: '15px' }}>
              <h3>Total Users</h3>
              <p style={{ fontSize: '24px', margin: '10px 0' }}>{users.length}</p>
            </div>
            <div style={{ border: '1px solid #ccc', padding: '15px' }}>
              <h3>Pending Writers</h3>
              <p style={{ fontSize: '24px', margin: '10px 0', color: 'orange' }}>{pendingWriters.length}</p>
            </div>
            <div style={{ border: '1px solid #ccc', padding: '15px' }}>
              <h3>Pending Posts</h3>
              <p style={{ fontSize: '24px', margin: '10px 0', color: 'red' }}>{pendingPosts.length}</p>
            </div>
            <div style={{ border: '1px solid #ccc', padding: '15px' }}>
              <h3>Active Users</h3>
              <p style={{ fontSize: '24px', margin: '10px 0', color: 'green' }}>
                {users.filter(u => u.user_status === 1).length}
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div>
          <h2>All Users</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f5f5f5' }}>
                <th style={{ border: '1px solid #ccc', padding: '10px' }}>ID</th>
                <th style={{ border: '1px solid #ccc', padding: '10px' }}>Username</th>
                <th style={{ border: '1px solid #ccc', padding: '10px' }}>Email</th>
                <th style={{ border: '1px solid #ccc', padding: '10px' }}>Role</th>
                <th style={{ border: '1px solid #ccc', padding: '10px' }}>Status</th>
                <th style={{ border: '1px solid #ccc', padding: '10px' }}>Registered</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.ID}>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}>{user.ID}</td>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}>{user.user_login}</td>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}>{user.user_email}</td>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}>
                    <span style={{ 
                      padding: '2px 6px', 
                      borderRadius: '3px',
                      backgroundColor: user.user_role === 'superadmin' ? 'red' : 
                                     user.user_role === 'admin' ? 'blue' : 
                                     user.user_role === 'writer' ? 'green' : 'gray',
                      color: 'white',
                      fontSize: '12px'
                    }}>
                      {user.user_role}
                    </span>
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}>
                    {user.user_status === 1 ? 'Active' : user.user_status === 0 ? 'Pending' : 'Suspended'}
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}>
                    {new Date(user.user_registered).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'pending-writers' && (
        <div>
          <h2>Pending Writer Approvals</h2>
          {pendingWriters.length === 0 ? (
            <p>No pending writer approvals.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f5f5f5' }}>
                  <th style={{ border: '1px solid #ccc', padding: '10px' }}>Username</th>
                  <th style={{ border: '1px solid #ccc', padding: '10px' }}>Email</th>
                  <th style={{ border: '1px solid #ccc', padding: '10px' }}>Display Name</th>
                  <th style={{ border: '1px solid #ccc', padding: '10px' }}>Registered</th>
                  <th style={{ border: '1px solid #ccc', padding: '10px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingWriters.map(writer => (
                  <tr key={writer.ID}>
                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>{writer.user_login}</td>
                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>{writer.user_email}</td>
                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>{writer.display_name}</td>
                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>
                      {new Date(writer.user_registered).toLocaleDateString()}
                    </td>
                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>
                      <button 
                        onClick={() => approveWriter(writer.ID, true)}
                        style={{ marginRight: '5px', padding: '5px 10px', backgroundColor: 'green', color: 'white' }}
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => approveWriter(writer.ID, false)}
                        style={{ padding: '5px 10px', backgroundColor: 'red', color: 'white' }}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeTab === 'pending-posts' && (
        <div>
          <h2>Pending Post Reviews</h2>
          {pendingPosts.length === 0 ? (
            <p>No posts pending review.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f5f5f5' }}>
                  <th style={{ border: '1px solid #ccc', padding: '10px' }}>Title</th>
                  <th style={{ border: '1px solid #ccc', padding: '10px' }}>Author</th>
                  <th style={{ border: '1px solid #ccc', padding: '10px' }}>Date</th>
                  <th style={{ border: '1px solid #ccc', padding: '10px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingPosts.map(post => (
                  <tr key={post.ID}>
                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>{post.post_title}</td>
                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>{post.author.display_name}</td>
                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>
                      {new Date(post.post_date).toLocaleDateString()}
                    </td>
                    <td style={{ border: '1px solid #ccc', padding: '10px' }}>
                      <button 
                        onClick={() => reviewPost(post.ID, 'approve')}
                        style={{ marginRight: '5px', padding: '5px 10px', backgroundColor: 'green', color: 'white' }}
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => reviewPost(post.ID, 'reject')}
                        style={{ padding: '5px 10px', backgroundColor: 'red', color: 'white' }}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;