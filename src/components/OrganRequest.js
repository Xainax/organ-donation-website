import React, {useState, useEffect} from 'react';
import {sortIcon} from './icons/25756.png';

const OrganRequest= () => {
  const [requests, setRequest] = useState([]);
  const [sortBy, setSortBy] = useState('Priority');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch available organs from the server when the component mounts
    fetch('http://localhost:3002/requests')
      .then((response) => response.json())
      .then((requests) => setRequest(requests))
      .catch((error) => console.error('Error fetching available requests:', error));
  }, []);

  const handleSort = (column) => {
    setSortBy(column);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const renderSortIcon = (column) => {
    if(sortBy === column) {
      return <sortIcon style={{transform: sortOrder === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)' }} />;
    }
    return null;
  };

  const filteredAndSortedRequests = [...requests]
  .filter((request) =>
    request.OrganType.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .sort((a, b) => {
    const order = sortOrder === 'asc' ? 1 : -1;
    const priorityA = Number(a[sortBy]);
    const priorityB = Number(b[sortBy]);

    return priorityA > priorityB ? order : -order;
  });

  return (
    <div>
      <header>
        <h1>Organ Request</h1>
      </header>
      <main>
        <div class = "search-organ">
          <input type="text" placeholder="Search for an organ..." value={searchTerm} onChange={handleSearch}/>
        </div>
        <h2>Request Information: </h2>
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th onClick={() => handleSort('RequestID')}>Request ID {renderSortIcon('RequestID')}</th>
              <th onClick={() => handleSort('RecipientID')}>Recipient ID {renderSortIcon('RecipientID')}</th>
              <th onClick={() => handleSort('OrganType')}>Organ Type {renderSortIcon('OrganType')}</th>
              <th onClick={() => handleSort('BloodType')}>Blood Type {renderSortIcon('BloodType')}</th>
              <th onClick={() => handleSort('Priority')}>Priority {renderSortIcon('Priority')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedRequests.map((request) => (
              <tr key={request.RequestID}>
                <td>{request.RequestID}</td>
                <td>{request.RecipientID}</td>
                <td>{request.OrganType}</td>
                <td>{request.BloodType}</td>
                <td>{request.Priority}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default OrganRequest;