import React, {useState, useEffect} from 'react';

const Donor = () => {
  const [availableDonors, setDonors] = useState([]);
  const [sortBy, setSortBy] = useState('Priority');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch available organs from the server when the component mounts
    fetch('http://localhost:3002/donors')
      .then((response) => response.json())
      .then((availableDonors) => setDonors(availableDonors))
      .catch((error) => console.error('Error fetching available donors:', error));
  }, []);

  const handleSort = (column) => {
    setSortBy(column);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredAndSortedDonors = [...availableDonors]
  .filter((availableDonor) =>
    availableDonor.OrgansDonating.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .sort((a, b) => {
    const order = sortOrder === 'asc' ? 1 : -1;
    return a[sortBy] > b[sortBy] ? order : -order;
  });

  return (
    <div>
      <header>
        <h1>Donor List</h1>
      </header>
      <main>
        <div class = "search-organ">
          <input type="text" placeholder="Search for an organ..." value={searchTerm} onChange={handleSearch}/>
        </div>
        <h2>Donor Information: </h2>
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th onClick={() => handleSort('DonorID')}>Donor ID</th>
              <th onClick={() => handleSort('Fname')}>First Name</th>
              <th onClick={() => handleSort('Lname')}>Last Name</th>
              <th onClick={() => handleSort('Age')}>Age</th>
              <th onClick={() => handleSort('OrgansDonating')}>Organs being donated</th>
              <th onClick={() => handleSort('BloodType')}>Blood Type</th>
              <th onClick={() => handleSort('Gender')}>Gender</th>
              <th onClick={() => handleSort('Hospital')}>Hospital</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedDonors.map((availableDonor) => (
              <tr key={availableDonor.DonorID}>
                <td>{availableDonor.DonorID}</td>
                <td>{availableDonor.Fname}</td>
                <td>{availableDonor.Lname}</td>
                <td>{availableDonor.Age}</td>
                <td>{availableDonor.OrgansDonating}</td>
                <td>{availableDonor.BloodType}</td>
                <td>{availableDonor.Gender}</td>
                <td>{availableDonor.Hospital}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default Donor;