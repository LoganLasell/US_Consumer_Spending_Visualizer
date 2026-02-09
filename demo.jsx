import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SpendingVisualizer = () => {
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

  const [selectedCategories, setSelectedCategories] = useState(['housing', 'transportation', 'food']);
  const [viewType, setViewType] = useState('bar');

  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const selectAll = () => setSelectedCategories(Object.keys(spendingData));
  const clearAll = () => setSelectedCategories([]);

  const chartData = selectedCategories.map(cat => ({
    name: cat.replace(/_/g, ' '),
    percentage: spendingData[cat].percent,
    amount: spendingData[cat].amount
  }));

  const totalAmount = selectedCategories.reduce((sum, cat) => sum + spendingData[cat].amount, 0);
  const totalPercent = selectedCategories.reduce((sum, cat) => sum + spendingData[cat].percent, 0);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1', '#d084d0', '#a4de6c', '#ffa07a', '#20b2aa', '#ff69b4'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
          <p className="font-bold capitalize m-0">{payload[0].name}</p>
          <p className="text-gray-600 mt-1 mb-0">Amount: ${payload[0].payload.amount.toLocaleString()}</p>
          <p className="text-gray-600 mt-1 mb-0">Percentage: {payload[0].value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-6xl mx-auto p-5">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">Consumer Spending Visualizer</h1>
      <p className="text-center text-gray-600 mb-8">Select spending categories to visualize consumer spending patterns</p>

      <div className="bg-gray-100 p-5 rounded-lg mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold m-0">Select Categories</h3>
          <div>
            <button onClick={selectAll} className="px-4 py-2 mr-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
              Select All
            </button>
            <button onClick={clearAll} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
              Clear All
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {Object.keys(spendingData).map(category => (
            <label key={category} className={`flex items-center p-3 rounded cursor-pointer transition ${
              selectedCategories.includes(category) ? 'bg-blue-100 border-2 border-blue-400' : 'bg-white border-2 border-transparent'
            }`}>
              <input type="checkbox" checked={selectedCategories.includes(category)} onChange={() => toggleCategory(category)} className="mr-2 w-4 h-4" />
              <span className="capitalize text-sm">{category.replace(/_/g, ' ')}</span>
            </label>
          ))}
        </div>
      </div>

      {selectedCategories.length > 0 ? (
        <>
          <div className="flex justify-center mb-5">
            <button onClick={() => setViewType('bar')} className={`px-5 py-2 font-bold rounded-l ${viewType === 'bar' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}>
              Bar Chart
            </button>
            <button onClick={() => setViewType('pie')} className={`px-5 py-2 font-bold rounded-r ${viewType === 'pie' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}>
              Pie Chart
            </button>
          </div>

          <div className="bg-white p-5 rounded-lg shadow mb-8">
            {viewType === 'bar' ? (
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="percentage" fill="#8884d8" name="Spending %" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie data={chartData} cx="50%" cy="50%" labelLine={false} label={({ name, percentage }) => `${name}: ${percentage}%`} outerRadius={120} dataKey="percentage">
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="bg-white p-5 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Spending Summary</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left border-b-2 border-gray-300">Category</th>
                  <th className="p-3 text-right border-b-2 border-gray-300">Amount</th>
                  <th className="p-3 text-right border-b-2 border-gray-300">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {selectedCategories.map(cat => (
                  <tr key={cat}>
                    <td className="p-3 border-b border-gray-200 capitalize">{cat.replace(/_/g, ' ')}</td>
                    <td className="p-3 border-b border-gray-200 text-right">${spendingData[cat].amount.toLocaleString()}</td>
                    <td className="p-3 border-b border-gray-200 text-right">{spendingData[cat].percent}%</td>
                  </tr>
                ))}
                <tr className="font-bold bg-gray-100">
                  <td className="p-3">Total Selected</td>
                  <td className="p-3 text-right">${totalAmount.toLocaleString()}</td>
                  <td className="p-3 text-right">{totalPercent.toFixed(1)}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="text-center p-16 bg-gray-100 rounded-lg">
          <p className="text-xl text-gray-600">Select one or more categories above to visualize spending data</p>
        </div>
      )}
    </div>
  );
};

export default SpendingVisualizer;