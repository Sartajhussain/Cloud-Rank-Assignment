import React, { useState, useEffect } from 'react';
import call from '../calls.json'; 
import account from '../accounts.json'; 

function UserTable({ segment }) {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCallType, setSelectedCallType] = useState('');
  const [filteredData, setFilteredData] = useState(call);

  // Function to filter calls by type
  const handleFilter = (type) => {
    setSelectedCallType(type);
    if (type === '') {
      setFilteredData(call); 
    } else {
      const filtered = call.filter(item => item.callType && item.callType === type); 
      setFilteredData(filtered); 
    }
  };

  useEffect(() => {
    handleFilter(selectedCallType); 
  }, [segment, selectedCallType]);

  // Pagination handling
  const handleNext = () => {
    if (currentPage < Math.ceil(filteredData.length / itemsPerPage)) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  
  const getAccountName = (accountId) => {
    const foundAccount = account.find(acc => acc.id === accountId); 
    return foundAccount ? foundAccount.name : 'Unknown'; 
  };

  
  useEffect(() => {
    if (segment) {
      handleFilter(segment); 
    }
  }, [segment]);

  return (
    <div className="w-full tbl_width p-4" style={{ background: 'aliceblue', borderRadius: '10px' }}>
      <div className="p-4 border border-gray-300" style={{ background: '#fff', borderRadius: '10px', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
        <h2 className="text-sm font-bold text-gray-800 mb-4" style={{ textAlign: 'center' }}>
          {segment} Details
        </h2>

        {/* Table displaying the segment data */}
        <table className="w-full tbl_width border-collapse border border-gray-300 text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Call ID</th>
              <th className="border border-gray-300 px-4 py-2">Account Name</th> 
              <th className="border border-gray-300 px-4 py-2">Call Date</th>
              <th className="border border-gray-300 px-4 py-2">Call Status</th>
            </tr>
          </thead>
          <tbody className='txt-cnt'>
            {filteredData.length > 0 ? (
              filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item) => (
                <tr key={item.id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{getAccountName(item.accountId)}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.callDate}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.callStatus}</td> 
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-2">No data available for this filter.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination buttons */}
        <div className="flex btn-flx justify-between items-center mt-4">
          <button onClick={handlePrev} disabled={currentPage === 1} className="btnnxt px-4 py-2 bg-blue-500 text-white rounded-l hover:bg-blue-700 disabled:opacity-50">
            previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}
          </span>
          <button onClick={handleNext} disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)} className="btnnxt px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-700 disabled:opacity-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserTable;
