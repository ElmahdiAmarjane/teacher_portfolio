import { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { router } from '@inertiajs/react';
import { BsThreeDotsVertical } from "react-icons/bs";
import VisitorCharts from '@/Components/VisitorCharts';

const Dashboard = () => {
  const [recentPublications, setRecentPublications] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);

  const [stats, setStats] = useState({
    totalPublications: 0,
    totalFormations: 0,
    publishedCourses: 0,
    enrolledStudents: 0,
    loading: true,
    error: null
  });

  // Get current date and time in Morocco timezone
  const now = new Date();
  const options = { 
    timeZone: 'Africa/Casablanca',
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    localeMatcher: 'best fit'
  };
  
  // Format date in English but using Morocco time
  const formattedDate = now.toLocaleDateString('en-US', options);
  
  // Get hours in Morocco timezone
  const moroccoHours = new Date().toLocaleTimeString('en-US', {
    timeZone: 'Africa/Casablanca',
    hour: '2-digit',
    hour12: false
  }).split(':')[0];
  const hours = parseInt(moroccoHours, 10);
  
  // Determine time of day for greeting
  let greeting;
  if (hours < 12) {
    greeting = "Good morning";
  } else if (hours < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [totalRes, totalFormations, publishedPub, totaStudent] = await Promise.all([
          axios.get('/api/publications/getTotalPublications'),
          axios.get('/api/formations/getTotalFormation'),
          axios.get('/api/publications/getPublicationPublished'),
          axios.get('/api/users/getTotalUsers')
        ]);

        setStats({
          totalPublications: totalRes.data.total_publications,
          totalFormations: totalFormations.data.total_formations,
          publishedCourses: publishedPub.data.published_publications, 
          enrolledStudents: totaStudent.data.total_users, 
          loading: false,
          error: null
        });
      } catch (error) {
        setStats(prev => ({
          ...prev,
          loading: false,
          error: error.response?.data?.message || 'Failed to fetch dashboard data'
        }));
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchRecentPublications = async () => {
      try {
        const response = await axios.get('/api/publications/getRecentPublications');
        setRecentPublications(response.data.publications);
      } catch (error) {
        console.error('Error fetching recent publications:', error);
      }
    };
  
    fetchRecentPublications();
  }, []);

  useEffect(() => {
    const fetchRecentUsers = async () => {
      try {
        const response = await axios.get('/api/users/getRecentUsers');
        setRecentUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching recent users:', error);
      }
    };
  
    fetchRecentUsers();
  }, []);

  if (stats.loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (stats.error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
        <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-lg">
          Error: {stats.error}
        </div>
      </div>
    );
  }

  const handlePublication = () => {
    router.visit(route('publication'));
  };

  const handlePublishedPublication = () => {
    router.visit(route('publication'), { 
      data: { status: "published" },
      preserveScroll: true
    });
  };

  const handleAddNewPublication = () => {
    router.visit(route('newpublication'));
  };

  const handleUsers = () => {
    router.visit(route('users'));
  };

  const handleFormations = () => {
    router.visit(route('formations'));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      {/* Greeting Card */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 mb-6 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold mb-2">{greeting}, Professor</h1>
            <p className="opacity-90">Welcome to your admin dashboard. Easily manage your publications and track student engagement.</p>
          </div>
          <div className="mt-4 md:mt-0 bg-white/20 rounded-lg px-4 py-2">
            <p className="font-medium">{formattedDate}</p>
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Publications */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Publications</h3>
          <p className="text-2xl font-bold mt-2 text-blue-600 dark:text-blue-400">
            {stats.totalPublications}
          </p>
          <button 
            onClick={handlePublication}
            className="mt-4 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
          >
            Manage →
          </button>
        </div>
        
        {/* Published Courses */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Published Courses</h3>
          <p className="text-2xl font-bold mt-2 text-purple-600 dark:text-purple-400">
            {stats.publishedCourses}
          </p>
          <button 
            onClick={handlePublishedPublication}
            className="mt-4 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
          >
            View →
          </button>
        </div>

        {/* Total Formations */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Formations</h3>
          <p className="text-2xl font-bold mt-2 text-green-600 dark:text-green-400">
            {stats.totalFormations}
          </p>
          <button 
            onClick={handleFormations}
            className="mt-4 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
          >
            View →
          </button>
        </div>
        
        {/* Enrolled Students */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Enrolled Students</h3>
          <p className="text-2xl font-bold mt-2 text-orange-600 dark:text-orange-400">
            {stats.enrolledStudents}
          </p>
          <button 
            onClick={handleUsers}
            className="mt-4 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
          >
            Manage →
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Publications by Type */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Publications by Type</h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">Weekly</button>
                <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded">Monthly</button>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Distribution of your publications over time</p>
            
            {/* Chart Placeholder */}
            {/* <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400">Chart visualization will appear here</span>
            </div> */}
            {/* <VisitorCharts /> */}
          </div>
          
          {/* Recent Publications */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className='flex justify-between items-center mb-4'>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Recent Publications</h2>
                <p className="text-gray-600 dark:text-gray-300">Your latest publications and their status</p>
              </div>
              <div>
                <button 
                  onClick={handleAddNewPublication}
                  className="px-4 py-2 text-gray-900 dark:text-white font-medium rounded-lg border-2 border-gray-900 dark:border-white hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                >
                  New Publication
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {recentPublications.map((pub, index) => (
                <div key={index} className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className={`rounded-full p-2 ${
                      pub.type === 'course' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' :
                      pub.type === 'td' ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300' :
                      'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300'
                    }`}>
                      {pub.type === 'course' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h3 className="text-gray-800 dark:text-white text-lg font-semibold">{pub.title}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {pub.type === 'course' ? 'Course' : pub.type === 'td' ? 'TD' : 'TP'} • Added on {pub.date}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span className={`px-3 py-1 text-sm rounded-full ${
                      pub.status === 'published' ? 
                      'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                      'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                    }`}>
                      {pub.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          {/* Student Engagement */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Student Engagement</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Student activity over the past week</p>
            
            {/* Engagement Placeholder */}
            <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400">Engagement chart will appear here</span>
            </div>
          </div>
          
          {/* Recent Users */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Users Activity</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Track recent user registrations</p>

            <ul className="space-y-4">
              {recentUsers.map((user, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                      <svg
                        className="h-6 w-6 text-gray-500 dark:text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9 9 0 1118.364 4.561a9 9 0 01-13.243 13.243z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-800 dark:text-gray-200">
                      <span className="font-semibold text-blue-600 dark:text-blue-400">{user.name}</span> registered to the platform
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user.date}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

Dashboard.layout = page => <DashboardLayout children={page} />;
export default Dashboard;