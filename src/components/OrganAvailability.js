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

  return (
    <div>
      <header>
        <h1>Organ Availability</h1>
      </header>
      <main>
        <h2>Donor Information: </h2>
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Donor ID</th>
              <th>Organ Type</th>
              <th>Blood Type</th>
              <th>Priority</th>
              <th>Viable Hours</th>
            </tr>
          </thead>
          <tbody>
            {availableOrgans.map((organ) => (
              <tr key={organ.DonorID}>
                <td>{organ.DonorID}</td>
                <td>{organ.OrganType}</td>
                <td>{organ.BloodType}</td>
                <td>{organ.Priority}</td>
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