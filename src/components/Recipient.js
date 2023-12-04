import React, {useState, useEffect} from 'react';

const Recipient = () => {
  const [availableRecipients, setRecipients] = useState([]);
  const [sortBy, setSortBy] = useState('Priority');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch available organs from the server when the component mounts
    fetch('http://localhost:3002/recipients')
      .then((response) => response.json())
      .then((availableRecipients) => setRecipients(availableRecipients))
      .catch((error) => console.error('Error fetching available recipients:', error));
  }, []);

  const handleSort = (column) => {
    setSortBy(column);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAndSortedRecipients = [...availableRecipients]
  .filter((availableRecipient) =>
    availableRecipient.OrgansNeeded.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .sort((a, b) => {
    const order = sortOrder === 'asc' ? 1 : -1;
    return a[sortBy] > b[sortBy] ? order : -order;
  });

  return (
    <div>
      <header>
        <h1>Recipient Information</h1>
      </header>
      <main>
        <div class = "search-organ">
          <input type="text" placeholder="Search for an organ..." value={searchTerm} onChange={handleSearch}/>
        </div>
        <h2>Recipient Information: </h2>
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th onClick={() => handleSort('RecipientID')}>Recipient ID</th>
              <th onClick={() => handleSort('Fname')}>First Name</th>
              <th onClick={() => handleSort('Lname')}>Last Name</th>
              <th onClick={() => handleSort('Age')}>Age</th>
              <th onClick={() => handleSort('OrgansNeeded')}>Organs needed</th>
              <th onClick={() => handleSort('BloodType')}>Blood Type</th>
              <th onClick={() => handleSort('Gender')}>Gender</th>
              <th onClick={() => handleSort('Hospital')}>Hospital</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedRecipients.map((availableRecipient) => (
              <tr key={availableRecipient.RecipientID}>
                <td>{availableRecipient.RecipientID}</td>
                <td>{availableRecipient.Fname}</td>
                <td>{availableRecipient.Lname}</td>
                <td>{availableRecipient.Age}</td>
                <td>{availableRecipient.OrgansNeeded}</td>
                <td>{availableRecipient.BloodType}</td>
                <td>{availableRecipient.Gender}</td>
                <td>{availableRecipient.Hospital}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default Recipient;