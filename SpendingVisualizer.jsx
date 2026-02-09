import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SpendingVisualizer = () => {
  // Spending data (annual household expenditures in dollars)
  const spendingData = {
    food: { amount: 10169000, percent: 12.9 },
    alcohol: { amount: 643000, percent: 0.8 },
    housing: { amount: 26266000, percent: 33.4 },
    apparel: { amount: 2001000, percent: 2.5 },
    transportation: { amount: 13318000, percent: 17.0 },
    healthcare: { amount: 6197000, percent: 7.9 },
    entertainment: { amount: 3609000, percent: 4.6 },
    personal_care: { amount: 978000, percent: 1.2 },
    reading: { amount: 125000, percent: 0.2 },
    education: { amount: 1569000, percent: 2.0 },
    tobacco: { amount: 352000, percent: 0.4 },
    misc: { amount: 1218000, percent: 1.6 },
    cash: { amount: 2292000, percent: 2.9 },
    personal_insurance: { amount: 9797000, percent: 12.5 }
  };

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [viewType, setViewType] = useState('bar'); // 'bar' or 'pie'

  // Handle category selection
  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Select all categories
  const selectAll = () => {
    setSelectedCategories(Object.keys(spendingData));
  };

  // Clear all selections
  const clearAll = () => {
    setSelectedCategories([]);
  };

  // Prepare data for visualization
  const chartData = selectedCategories.map(cat => ({
    name: cat.replace(/_/g, ' '),
    percentage: spendingData[cat].percent,
    amount: spendingData[cat].amount
  }));

  // Calculate totals
  const totalAmount = selectedCategories.reduce((sum, cat) => sum + spendingData[cat].amount, 0);
  const totalPercent = selectedCategories.reduce((sum, cat) => sum + spendingData[cat].percent, 0);

  // Colors for the charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1', '#d084d0', '#a4de6c', '#ffa07a', '#20b2aa', '#ff69b4'];

  // Custom tooltip for better UX
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: 'white',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px'
        }}>
          <p style={{ margin: 0, fontWeight: 'bold', textTransform: 'capitalize' }}>
            {payload[0].name}
          </p>
          <p style={{ margin: '5px 0 0 0', color: '#666' }}>
            Amount: ${payload[0].payload.amount.toLocaleString()}
          </p>
          <p style={{ margin: '5px 0 0 0', color: '#666' }}>
            Percentage: {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>
        Consumer Spending Visualizer
      </h1>
      
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
        Select spending categories to visualize consumer spending patterns
      </p>

      {/* Category Selection */}
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '30px'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '15px'
        }}>
          <h3 style={{ margin: 0 }}>Select Categories</h3>
          <div>
            <button 
              onClick={selectAll}
              style={{
                padding: '8px 16px',
                marginRight: '10px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Select All
            </button>
            <button 
              onClick={clearAll}
              style={{
                padding: '8px 16px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Clear All
            </button>
          </div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '10px'
        }}>
          {Object.keys(spendingData).map(category => (
            <label 
              key={category}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                backgroundColor: selectedCategories.includes(category) ? '#e3f2fd' : 'white',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
                style={{ marginRight: '8px', cursor: 'pointer' }}
              />
              <span style={{ textTransform: 'capitalize' }}>
                {category.replace(/_/g, ' ')}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* View Toggle */}
      {selectedCategories.length > 0 && (
        <>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center',
            marginBottom: '20px'
          }}>
            <button
              onClick={() => setViewType('bar')}
              style={{
                padding: '10px 20px',
                backgroundColor: viewType === 'bar' ? '#2196F3' : '#e0e0e0',
                color: viewType === 'bar' ? 'white' : '#333',
                border: 'none',
                borderRadius: '4px 0 0 4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Bar Chart
            </button>
            <button
              onClick={() => setViewType('pie')}
              style={{
                padding: '10px 20px',
                backgroundColor: viewType === 'pie' ? '#2196F3' : '#e0e0e0',
                color: viewType === 'pie' ? 'white' : '#333',
                border: 'none',
                borderRadius: '0 4px 4px 0',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Pie Chart
            </button>
          </div>

          {/* Visualization */}
          <div style={{ 
            backgroundColor: 'white', 
            padding: '20px', 
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginBottom: '30px'
          }}>
            {viewType === 'bar' ? (
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    style={{ textTransform: 'capitalize' }}
                  />
                  <YAxis label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="percentage" fill="#8884d8" name="Spending %" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="percentage"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Summary Table */}
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h3>Spending Summary</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f5f5f5' }}>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>
                    Category
                  </th>
                  <th style={{ padding: '12px', textAlign: 'right', borderBottom: '2px solid #ddd' }}>
                    Amount
                  </th>
                  <th style={{ padding: '12px', textAlign: 'right', borderBottom: '2px solid #ddd' }}>
                    Percentage
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedCategories.map(cat => (
                  <tr key={cat}>
                    <td style={{ 
                      padding: '12px', 
                      borderBottom: '1px solid #eee',
                      textTransform: 'capitalize'
                    }}>
                      {cat.replace(/_/g, ' ')}
                    </td>
                    <td style={{ 
                      padding: '12px', 
                      textAlign: 'right',
                      borderBottom: '1px solid #eee'
                    }}>
                      ${spendingData[cat].amount.toLocaleString()}
                    </td>
                    <td style={{ 
                      padding: '12px', 
                      textAlign: 'right',
                      borderBottom: '1px solid #eee'
                    }}>
                      {spendingData[cat].percent}%
                    </td>
                  </tr>
                ))}
                <tr style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
                  <td style={{ padding: '12px' }}>Total Selected</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    ${totalAmount.toLocaleString()}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    {totalPercent.toFixed(1)}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}

      {selectedCategories.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          color: '#666'
        }}>
          <p style={{ fontSize: '18px' }}>
            Select one or more categories above to visualize spending data
          </p>
        </div>
      )}
    </div>
  );
};

export default SpendingVisualizer;
