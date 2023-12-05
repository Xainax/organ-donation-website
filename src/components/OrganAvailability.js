import React, {useState, useEffect} from 'react';

const OrganAvailability = () => {
  const [availableOrgans, setAvailableOrgans] = useState([]);
  const [sortBy, setSortBy] = useState('Priority');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch available organs from the server when the component mounts
    fetch('http://localhost:3002/available')
      .then((response) => response.json())
      .then((availableOrgans) => setAvailableOrgans(availableOrgans))
      .catch((error) => console.error('Error fetching available organs:', error));
  }, []);

  const handleSort = (column) => {
    setSortBy(column);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAndSortedRequests = [...availableOrgans]
  .filter((organ) =>
    organ.OrganType.toLowerCase().includes(searchTerm.toLowerCase())
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
        <h1>Organ Availability</h1>
      </header>
      <main>
        <div class = "search-organ">
          <input type="text" placeholder="Search for an organ..." value={searchTerm} onChange={handleSearch}/>
        </div>
        <h2>Available Organs: </h2>
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th onClick={() => handleSort('DonorID')}>Donor ID</th>
              <th onClick={() => handleSort('OrganType')}>Organ Type</th>
              <th onClick={() => handleSort('BloodType')}>Blood Type</th>
              <th onClick={() => handleSort('ViableHours')}>Viable Hours</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedRequests.map((organ) => (
              <tr key={organ.DonorID}>
                <td>{organ.DonorID}</td>
                <td>{organ.OrganType}</td>
                <td>{organ.BloodType}</td>
                <td>{organ.ViableHours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default OrganAvailability;