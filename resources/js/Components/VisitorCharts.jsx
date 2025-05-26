import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { router } from '@inertiajs/react';

// Register Chart.js components
Chart.register(...registerables);

const timeRanges = {
  daily: { 
    label: 'Daily', 
    limit: 30, 
    endpoint: '/admin/visits/daily',
    dateFormatter: (date) => new Date(date).toLocaleDateString()
  },
  weekly: { 
    label: 'Weekly', 
    limit: 12, 
    endpoint: '/admin/visits/weekly',
    dateFormatter: (week) => `Week ${week.split('-W')[1]}, ${week.split('-W')[0]}`
  },
  monthly: { 
    label: 'Monthly', 
    limit: 12, 
    endpoint: '/admin/visits/monthly',
    dateFormatter: (month) => {
      const [year, monthNum] = month.split('-');
      return new Date(year, monthNum - 1).toLocaleString('default', { month: 'short', year: 'numeric' });
    }
  },
  yearly: { 
    label: 'Yearly', 
    limit: 5, 
    endpoint: '/admin/visits/yearly',
    dateFormatter: (year) => year
  }
};

export default function VisitorCharts() {
  const [activeRange, setActiveRange] = useState('daily');
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: '',
      data: [],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData(activeRange);
  }, [activeRange]);

  const fetchData = async (range) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { endpoint, dateFormatter } = timeRanges[range];
      const response = await router.get(endpoint);
      
      if (response.data && response.data[range]) {
        const data = response.data[range];
        
        setChartData({
          labels: data.map(item => dateFormatter(item.date || item.week || item.month || item.year)),
          datasets: [{
            label: `Visitors (${timeRanges[range].label})`,
            data: data.map(item => item.count),
            backgroundColor: range === 'daily' 
              ? 'rgba(75, 192, 192, 0.6)' 
              : 'rgba(153, 102, 255, 0.6)',
            borderColor: range === 'daily' 
              ? 'rgba(75, 192, 192, 1)' 
              : 'rgba(153, 102, 255, 1)',
            borderWidth: 1
          }]
        });
      }
    } catch (err) {
      console.error('Failed to fetch visit data:', err);
      setError('Failed to load visitor data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Visitor Statistics</h2>
        <div className="flex space-x-2">
          {Object.keys(timeRanges).map(range => (
            <button
              key={range}
              onClick={() => setActiveRange(range)}
              className={`px-4 py-2 text-sm rounded-md transition-colors ${
                activeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
              disabled={isLoading}
            >
              {timeRanges[range].label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="h-96 relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {activeRange === 'daily' ? (
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        precision: 0
                      }
                    }
                  },
                  plugins: {
                    legend: {
                      display: false
                    }
                  }
                }}
              />
            ) : (
              <Line
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        precision: 0
                      }
                    }
                  },
                  plugins: {
                    legend: {
                      display: false
                    }
                  }
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}