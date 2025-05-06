import React, { useState } from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { useAlert } from '@/Components/alerts/AlertContext';
import { FaCheck } from "react-icons/fa6";
import { LiaTimesSolid } from "react-icons/lia";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { 
  FaChevronLeft, 
  FaChevronRight 
} from 'react-icons/fa';

const UsersPage = () => {
    const [activeTab, setActiveTab] = useState('pending');
    const { showSuccess } = useAlert();
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    // Sample user data
    const [users, setUsers] = useState([
      {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
          role: 'Student',
          status: 'pending',
          registeredDate: '16/04/2023'
      },
      {
          id: 2,
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          role: 'Teacher',
          status: 'pending',
          registeredDate: '20/03/2023'
      },
      {
          id: 3,
          name: 'Michael Johnson',
          email: 'michael.johnson@example.com',
          role: 'Student',
          status: 'pending',
          registeredDate: '05/05/2023'
      },
      {
          id: 4,
          name: 'Emily Williams',
          email: 'emily.williams@example.com',
          role: 'Student',
          status: 'approved',
          registeredDate: '28/04/2023'
      },
      {
          id: 5,
          name: 'David Brown',
          email: 'david.brown@example.com',
          role: 'Teacher',
          status: 'rejected',
          registeredDate: '10/02/2023'
      },
      // Add more users to test pagination
      ...Array.from({ length: 15 }, (_, i) => ({
          id: i + 6,
          name: `User ${i + 6}`,
          email: `user${i + 6}@example.com`,
          role: i % 2 === 0 ? 'Student' : 'Teacher',
          status: ['pending', 'approved', 'rejected'][i % 3],
          registeredDate: new Date(Date.now() - i * 86400000).toLocaleDateString()
      }))
  ]);

    // Filter users based on active tab
    const filteredUsers = activeTab === 'all' 
        ? users 
        : users.filter(user => user.status === activeTab);

    // Pagination logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const updateStatus = (userId, newStatus) => {
        setUsers(users.map(user => 
            user.id === userId ? { ...user, status: newStatus } : user
        ));
        showSuccess(`User ${newStatus} successfully`);
    };

    const deleteUser = (userId) => {
        if (confirm('Are you sure you want to delete this user?')) {
            setUsers(users.filter(user => user.id !== userId));
            showSuccess('User deleted successfully');
        }
    };

    const sendEmail = (email) => {
        showSuccess(`Email sent to ${email}`);
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
    const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

    return (
        <div className="p-6 dark:bg-gray-800">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Users Management</h1>
                <p className="text-gray-600 dark:text-gray-300">Manage user accounts and approve new sign-ups</p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
                <button
                    onClick={() => {setActiveTab('all'); setCurrentPage(1);}}
                    className={`px-4 py-2 font-medium ${
                        activeTab === 'all' 
                            ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                >
                    All Users
                </button>
                <button
                    onClick={() => {setActiveTab('pending'); setCurrentPage(1);}}
                    className={`px-4 py-2 font-medium ${
                        activeTab === 'pending' 
                            ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                >
                    Pending Approval
                </button>
                <button
                    onClick={() => {setActiveTab('approved'); setCurrentPage(1);}}
                    className={`px-4 py-2 font-medium ${
                        activeTab === 'approved' 
                            ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                >
                    Approved
                </button>
                <button
                    onClick={() => {setActiveTab('rejected'); setCurrentPage(1);}}
                    className={`px-4 py-2 font-medium ${
                        activeTab === 'rejected' 
                            ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                >
                    Rejected
                </button>
            </div>

            {/* Users Table */}
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                    <thead className="bg-gray-50 dark:bg-gray-600">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Registered</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
                        {currentUsers.map((user) => (
                            <React.Fragment key={user.id}>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className='flex flex-col'>
                                            <div className="font-medium text-gray-900 dark:text-gray-100">{user.name}</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {user.role}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${user.status === 'approved' 
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                                : user.status === 'rejected' 
                                                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
                                                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}`}>
                                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {user.registeredDate}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            {user.status !== 'approved' && (
                                                <button
                                                    onClick={() => updateStatus(user.id, 'approved')}
                                                    className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                                                    title="Approve"
                                                >
                                                    <FaCheck className="w-5 h-5" />
                                                </button>
                                            )}
                                            {user.status !== 'rejected' && (
                                                <button
                                                    onClick={() => updateStatus(user.id, 'rejected')}
                                                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                    title="Reject"
                                                >
                                                    <LiaTimesSolid className="w-5 h-5" />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => sendEmail(user.email)}
                                                className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                                title="Send Email"
                                            >
                                                <HiOutlineEnvelope className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4 px-2">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                    Showing <span className="font-medium">{indexOfFirstUser + 1}</span> to{' '}
                    <span className="font-medium">
                        {Math.min(indexOfLastUser, filteredUsers.length)}
                    </span> of{' '}
                    <span className="font-medium">{filteredUsers.length}</span> users
                </div>
                <div className="flex space-x-2">
                    <button 
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 border rounded-md text-sm font-medium ${
                            currentPage === 1 
                                ? 'text-gray-400 dark:text-gray-500 border-gray-200 dark:border-gray-600 cursor-not-allowed' 
                                : 'text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-600'
                        }`}
                    >
                        <FaChevronLeft className="inline mr-1" /> Previous
                    </button>
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                            pageNum = i + 1;
                        } else if (currentPage <= 3) {
                            pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                        } else {
                            pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                            <button
                                key={pageNum}
                                onClick={() => paginate(pageNum)}
                                className={`px-3 py-1 border rounded-md text-sm font-medium ${
                                    currentPage === pageNum
                                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-100 border-blue-200 dark:border-blue-700'
                                        : 'text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-600'
                                }`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}
                    
                    <button 
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 border rounded-md text-sm font-medium ${
                            currentPage === totalPages
                                ? 'text-gray-400 dark:text-gray-500 border-gray-200 dark:border-gray-600 cursor-not-allowed' 
                                : 'text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-600'
                        }`}
                    >
                        Next <FaChevronRight className="inline ml-1" />
                    </button>
                </div>
            </div>
        </div>
    );
};

UsersPage.layout = page => <DashboardLayout>{page}</DashboardLayout>;
export default UsersPage;