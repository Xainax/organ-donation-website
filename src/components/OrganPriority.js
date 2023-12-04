import React, {useState, useEffect} from 'react';

const OrganPriority = () => {
  const [organPriority, setPriority] = useState([]);
  const [sortBy, setSortBy] = useState('Priority');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [newOrganType, setNewOrganType] = useState('');
  const [newPriority, setNewPriority] = useState('');

  useEffect(() => {
    // Fetch available organs from the server when the component mounts
    fetch('http://localhost:3002/priority')
      .then((response) => response.json())
      .then((organPriority) => setPriority(organPriority))
      .catch((error) => console.error('Error fetching organ priority:', error));
  }, []);

  const handleSort = (column) => {
    setSortBy(column);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCreate = () => {
    fetch('http://localhost:3002/create-priority', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({OrganType: newOrganType, Priority: newPriority}),
    })
    .then((response) => response.json())
    .then((result) => {
        console.log(result);
        fetch('http://localhost:3002/priority')
        .then((response) => response.json())
        .then((updatedPriority) => setPriority(updatedPriority))
        .catch((error) => console.error('Error fetching organ priority: ', error));
    })
    .catch((error) => console.error('Error creating a new row:', error));
    setNewOrganType('');
    setNewPriority('');
  };

  const filteredAndSortedRequests = [...organPriority]
  .filter((priorities) =>
    priorities.OrganType.toLowerCase().includes(searchTerm.toLowerCase())
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
        <h1>Organ Priority</h1>
      </header>
      <main>
        <div class = "search-organ">
          <input type="text" placeholder="Search for an organ..." value={searchTerm} onChange={handleSearch}/>
        </div>
        <h2>Priority List: </h2>
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th onClick={() => handleSort('OrganType')}>Organ Type</th>
              <th onClick={() => handleSort('Priority')}>Priority</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedRequests.map((priorities) => (
              <tr key={priorities.OrganType}>
                <td>{priorities.OrganType}</td>
                <td>{priorities.Priority}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h2>Create New Priority</h2>
          <div className="create">
            <label>
              Organ Type: <input type="text" value={newOrganType} onChange={(e) => setNewOrganType(e.target.value)}/>
            </label>
          </div>
          <div className="create">
            <label>
              Priority: <input type="text" value={newPriority} onChange={(e) => setNewPriority(e.target.value)}/>
            </label>
          </div>
          <div className="create">
            <button onClick={handleCreate}>Create</button>
          </div>
          </div>
      </main>
    </div>
  );
}

export default OrganPriority;