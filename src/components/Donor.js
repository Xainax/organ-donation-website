import React, {useState, useEffect} from 'react';

const Donor = () => {
  const [availableDonors, setDonors] = useState([]);
  const [sortBy, setSortBy] = useState('Priority');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingDonorID, setEditingDonorID] = useState(null);
  const [editedDonor, setEditedDonor] = useState({
    Fname: '',
    Lname: '',
    Age: '',
    OrgansDonating: '',
    BloodType: '',
    Gender: '',
    Hospital: '',
  });

  useEffect(() => {
    // Fetch available donors from the server when the component mounts
    fetch('http://localhost:3002/donors')
      .then((response) => response.json())
      .then((availableDonors) => {
        setDonors(availableDonors);
        if (availableDonors.length > 0) {
          const firstDonor = availableDonors[0];
          setEditedDonor({
            Fname: firstDonor.Fname,
            Lname: firstDonor.Lname,
            Age: parseInt(firstDonor.Age, 10),
            OrgansDonating: firstDonor.OrgansDonating,
            BloodType: firstDonor.BloodType,
            Gender: firstDonor.Gender,
            Hospital: firstDonor.Hospital,
          });
        } else {
          setEditedDonor({
            Fname: '',
            Lname: '',
            Age: '',
            OrgansDonating: '',
            BloodType: '',
            Gender: '',
            Hospital: '',
          });
        }
      })
      .catch((error) => console.error('Error fetching available donors:', error));
  }, []);

  const handleSort = (column) => {
    setSortBy(column);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (DonorID) => {
    setEditingDonorID(DonorID);

    const donorToEdit = availableDonors.find((donor) => donor.DonorID === DonorID);

    if (donorToEdit) {
        setEditedDonor({
          Fname: donorToEdit.Fname,
          Lname: donorToEdit.Lname,
          Age: parseInt(donorToEdit.Age, 10),
          OrgansDonating: donorToEdit.OrgansDonating,
          BloodType: donorToEdit.BloodType,
          Gender: donorToEdit.Gender,
          Hospital: donorToEdit.Hospital,
        });
      } else {
        console.error(`Donor with DonorID ${DonorID} not found.`);
      }
    };
  
  const handleUpdate = () => {
    fetch('http://localhost:3002/update-donor/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedDonor),
    })
    .then((response) => response.json())
    .then((result) => {
        console.log(result);

        fetch('http://localhost:3002/donors')
        .then((response) => response.json())
        .then((updatedDonors) => setDonors(updatedDonors))
        .catch((error) => console.error('Error fetching available donors: ', error));

        setEditingDonorID(null);
        setEditedDonor({
            Fname: '',
            Lname: '',
            Age: '',
            OrgansDonating: '',
            BloodType: '',
            Gender: '',
            Hospital: '',
        });
    })
    .catch((error) => console.error('Error updating donor:', error));
  };

  const handleCancelEdit = () => {
    setEditingDonorID(null);
    setEditedDonor({
        Fname: '',
        Lname: '',
        Age: '',
        OrgansDonating: '',
        BloodType: '',
        Gender: '',
        Hospital: '',
    });
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
                <td><button onClick={() => handleEdit(availableDonor.DonorID)}>Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {editingDonorID && editedDonor && (
          <div>
            <h2>Edit Donor</h2>
            <div>
              <label>
                First Name:
                <input
                  type="text"
                  value={editedDonor.Fname}
                  onChange={(e) => setEditedDonor({ ...editedDonor, Fname: e.target.value })}
                />
              </label>
            </div>
            <div>
              <label>
                Last Name:
                <input
                  type="text"
                  value={editedDonor.Lname}
                  onChange={(e) => setEditedDonor({ ...editedDonor, Lname: e.target.value })}
                />
              </label>
            </div>
            <div>
              <label>
                Age:
                <input
                  type="text"
                  value={editedDonor.Age}
                  onChange={(e) => setEditedDonor({ ...editedDonor, Age: e.target.value })}
                />
              </label>
            </div>
            <div>
              <label>
                Organs being donated:
                <input
                  type="text"
                  value={editedDonor.OrgansDonating}
                  onChange={(e) => setEditedDonor({ ...editedDonor, OrgansDonating: e.target.value })}
                />
              </label>
            </div>
            <div>
              <label>
                Gender:
                <input
                  type="text"
                  value={editedDonor.Gender}
                  onChange={(e) => setEditedDonor({ ...editedDonor, Gender: e.target.value })}
                />
              </label>
            </div>
            <div>
              <label>
                Hospital:
                <input
                  type="text"
                  value={editedDonor.Hospital}
                  onChange={(e) => setEditedDonor({ ...editedDonor, Hospital: e.target.value })}
                />
              </label>
            </div>
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleCancelEdit}>Cancel</button>
            </div>
        )}
      </main>
    </div>
  );
}

export default Donor;