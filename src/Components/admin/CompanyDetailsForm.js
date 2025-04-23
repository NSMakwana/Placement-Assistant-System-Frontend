// import React, { useState } from 'react';
// import './CompanyDetailsForm.css';
// import axios from 'axios';

// const CompanyDetailsForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     batch: '',
//     address: {
//       blockNo: '',
//       buildingName: '',
//       area: '',
//       landmark: '',
//       state: '',
//       city: '',
//       pincode: '',
//     },
//     contactPerson: {
//       name: '',
//       designation: '',
//       email: '',
//       mobile: '',
//     },
//     designations: [],
//   });

//   const [file, setFile] = useState(null); // State for file upload
//   const [loading, setLoading] = useState(false); // State to handle loading

//   // Handle field change
//   const handleChange = (field, value) => {
//     setFormData({ ...formData, [field]: value });
//   };

//   // Handle nested field change (for address/contactPerson)
//   const handleNestedChange = (section, field, value) => {
//     setFormData({
//       ...formData,
//       [section]: {
//         ...formData[section],
//         [field]: value,
//       },
//     });
//   };

//   // Handle change for designations and required qualifications
//   const handleDesignationChange = (index, field, value) => {
//     const updatedDesignations = [...formData.designations];
//     if (field === 'requiredQualifications') {
//       updatedDesignations[index][field] = value.split(',').map((q) => q.trim()); // Convert string to array
//     } else {
//       updatedDesignations[index][field] = value;
//     }
//     setFormData({ ...formData, designations: updatedDesignations });
//   };

//   const handleProcessChange = (dIndex, pIndex, field, value) => {
//     const updatedDesignations = [...formData.designations];
//     updatedDesignations[dIndex].placementProcess[pIndex][field] = value;
//     setFormData({ ...formData, designations: updatedDesignations });
//   };

//   const addDesignation = () => {
//     setFormData({
//       ...formData,
//       designations: [
//         ...formData.designations,
//         {
//           designation: '',
//           Package: '',
//           bond: '',
//           location: '',
//           RequiredQualifications: [],
//           placementProcess: [],
//         },
//       ],
//     });
//   };

//   const removeDesignation = (index) => {
//     const updatedDesignations = formData.designations.filter(
//       (_, idx) => idx !== index
//     );
//     setFormData({ ...formData, designations: updatedDesignations });
//   };

//   const addProcess = (dIndex) => {
//     const updatedDesignations = [...formData.designations];
//     updatedDesignations[dIndex].placementProcess.push({
//       roundNumber: '',
//       round: '',
//       description: '',
//     });
//     setFormData({ ...formData, designations: updatedDesignations });
//   };

//   const removeProcess = (dIndex, pIndex) => {
//     const updatedDesignations = [...formData.designations];
//     updatedDesignations[dIndex].placementProcess = updatedDesignations[ 
//       dIndex 
//     ].placementProcess.filter((_, idx) => idx !== pIndex);
//     setFormData({ ...formData, designations: updatedDesignations });
//   };

//   // Handle file selection
//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   // Submit form data to the backend
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('Submitting form data:', formData);

//     try {
//       const response = await fetch('https://placement-assistant-system.onrender.com/api/companies', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Response:', data);
//         alert('Company details submitted successfully!');
//       } else {
//         console.error('Error:', response.statusText);
//         alert('Failed to submit the form.');
//       }
//     } catch (error) {
//       console.error('Error submitting data:', error);
//       alert('An error occurred while submitting the form.');
//     }
//   };

//   // Handle file upload to backend and auto-fill form
//   const handleFileUpload = async () => {
//     if (!file) return alert('Please select a file.');

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       setLoading(true);
//       const response = await axios.post(
//         'https://placement-assistant-system.onrender.com/api/jd/extract-jd', 
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       // Assuming response.data contains the parsed company data
//       setFormData(response.data); // Auto-fill the form with the extracted data
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       alert('Failed to extract data.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form className="company-form" onSubmit={handleSubmit}>
//       {/* File Upload Section */}
//       <div className="file-upload">
//         <input
//           type="file"
//           accept=".pdf"
//           onChange={handleFileChange}
//           disabled={loading}
//         />
//         <button
//           type="button"
//           onClick={handleFileUpload}
//           disabled={loading}
//           className={loading ? 'loading' : ''}
//         >
//           {loading ? 'Uploading...' : 'Upload & Extract Data'}
//         </button>
//       </div>

//       {/* Company Info */}
//       <table className="company-info">
//         <tr>
//           <td className="cname">
//             <label>Company Name</label>
//             <input
//               type="text"
//               value={formData.name}
//               onChange={(e) => handleChange('name', e.target.value)}
//               required
//             />
//           </td>
//           <td>
//             <label>Batch</label>
//             <input
//               type="text"
//               value={formData.batch}
//               onChange={(e) => handleChange('batch', e.target.value)}
//               required
//               placeholder="2023-2024"
//             />
//           </td>
//         </tr>
//       </table>

//       {/* Address Fields */}
//       <div className="headings">Address</div>
//       {Object.keys(formData.address).map((key) => (
//         <div key={key}>
//           <label>{key}</label>
//           <input
//             type="text"
//             value={formData.address[key]}
//             onChange={(e) => handleNestedChange('address', key, e.target.value)}
//           />
//         </div>
//       ))}

//       {/* Contact Person Fields */}
//       <div className="headings">Contact Person</div>
//       {Object.keys(formData.contactPerson).map((key) => (
//         <div key={key}>
//           <label>{key}</label>
//           <input
//             type={key === 'email' ? 'email' : 'text'}
//             value={formData.contactPerson[key]}
//             onChange={(e) =>
//               handleNestedChange('contactPerson', key, e.target.value)
//             }
//             required
//           />
//         </div>
//       ))}

//       {/* Designations Section */}
//       <div className="headings">Designations</div>
//       {formData.designations.map((designation, dIndex) => (
//         <div key={dIndex} className="designation">
//           {/* Designation Heading */}
//           <div className="headings">
//             Designation {dIndex + 1}
//             <button
//               type="button"
//               className="remove-designation-btn"
//               onClick={() => removeDesignation(dIndex)}
//             >
//               Remove Designation
//             </button>
//           </div>

//           {/* Designation Details */}
//           {Object.keys(designation).map((key) => {
//             if (key === 'placementProcess') {
//               return (
//                 <div key={`${dIndex}-process`}>
//                   <div className="headings">
//                     Placement Process
//                     <button type="button" onClick={() => addProcess(dIndex)}>
//                       Add Round
//                     </button>
//                   </div>

//                   {/* Placement Process (Rounds) */}
//                   {designation.placementProcess.map((process, pIndex) => (
//                     <div key={pIndex}>
//                       <div className="headings">
//                         Round {pIndex + 1}
//                         <button
//                           type="button"
//                           className="remove-round-btn"
//                           onClick={() => removeProcess(dIndex, pIndex)}
//                         >
//                           Remove Round
//                         </button>
//                       </div>
//                       {Object.keys(process).map((pKey) => (
//                         <div key={pKey}>
//                           <label>{pKey}</label>
//                           <input
//                             type={pKey === 'description' ? 'textarea' : 'text'}
//                             value={process[pKey]}
//                             onChange={(e) =>
//                               handleProcessChange(
//                                 dIndex,
//                                 pIndex,
//                                 pKey,
//                                 e.target.value
//                               )
//                             }
//                           />
//                         </div>
//                       ))}
//                     </div>
//                   ))}
//                 </div>
//               );
//             }
//             return (
//               <div key={key}>
//                 <label>{key === 'requiredQualifications' ? 'Required Qualification' : key}</label>
//                 <input
//                   type="text"
//                   placeholder={
//                     key === 'requiredQualifications'
//                       ? 'Enter comma-separated values'
//                       : ''
//                   }
//                   value={
//                     key === 'requiredQualifications'
//                       ? designation[key].join(', ')
//                       : designation[key]
//                   }
//                   onChange={(e) =>
//                     handleDesignationChange(dIndex, key, e.target.value)
//                   }
//                   required
//                 />
//               </div>
//             );
//           })}
//         </div>
//       ))}

//       {/* Add Designation Button */}
//       <button className="add-designation-btn" type="button" onClick={addDesignation}>
//         Add Designation
//       </button>

//       {/* Submit Button */}
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default CompanyDetailsForm;
import React, { useState } from 'react';
import './CompanyDetailsForm.css';
import axios from 'axios';

const CompanyDetailsForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    batch: '',
    address: {
      blockNo: '',
      buildingName: '',
      area: '',
      landmark: '',
      state: '',
      city: '',
      pincode: '',
    },
    contactPerson: {
      name: '',
      designation: '',
      email: '',
      mobile: '',
    },
    designations: [],
  });

  const [file, setFile] = useState(null); // State for file upload
  const [loading, setLoading] = useState(false); // State to handle loading

  // Handle field change
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Handle nested field change (for address/contactPerson)
  const handleNestedChange = (section, field, value) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value,
      },
    });
  };

  // Handle change for designations and required qualifications
  const handleDesignationChange = (index, field, value) => {
    const updatedDesignations = [...formData.designations];
    if (field === 'RequiredQualifications') { // Corrected key to match your form
      updatedDesignations[index][field] = value.split(',').map((q) => q.trim()); // Convert string to array
    } else {
      updatedDesignations[index][field] = value;
    }
    setFormData({ ...formData, designations: updatedDesignations });
  };

  const handleProcessChange = (dIndex, pIndex, field, value) => {
    const updatedDesignations = [...formData.designations];
    if (updatedDesignations[dIndex] && updatedDesignations[dIndex].placementProcess && updatedDesignations[dIndex].placementProcess[pIndex]) {
      updatedDesignations[dIndex].placementProcess[pIndex][field] = value;
      setFormData({ ...formData, designations: updatedDesignations });
    }
  };

  const addDesignation = () => {
    setFormData({
      ...formData,
      designations: [
        ...formData.designations,
        {
          designation: '',
          Package: '',
          bond: '',
          location: '',
          RequiredQualifications: [],
          placementProcess: [],
        },
      ],
    });
  };

  const removeDesignation = (index) => {
    const updatedDesignations = formData.designations.filter(
      (_, idx) => idx !== index
    );
    setFormData({ ...formData, designations: updatedDesignations });
  };

  const addProcess = (dIndex) => {
    const updatedDesignations = [...formData.designations];
    if (updatedDesignations[dIndex]) {
      updatedDesignations[dIndex].placementProcess = [
        ...(updatedDesignations[dIndex].placementProcess || []),
        {
          roundNumber: '',
          round: '',
          description: '',
        },
      ];
      setFormData({ ...formData, designations: updatedDesignations });
    }
  };

  const removeProcess = (dIndex, pIndex) => {
    const updatedDesignations = [...formData.designations];
    if (updatedDesignations[dIndex] && updatedDesignations[dIndex].placementProcess) {
      updatedDesignations[dIndex].placementProcess = updatedDesignations[
        dIndex
      ].placementProcess.filter((_, idx) => idx !== pIndex);
      setFormData({ ...formData, designations: updatedDesignations });
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Submit form data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form data:', formData);

    try {
      const response = await fetch('https://placement-assistant-system.onrender.com/api/companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Response:', data);
        alert('Company details submitted successfully!');
        setFormData({
          name: '',
          batch: '',
          address: { blockNo: '', buildingName: '', area: '', landmark: '', state: '', city: '', pincode: '' },
          contactPerson: { name: '', designation: '', email: '', mobile: '' },
          designations: [],
        });
        setFile(null);
      } else {
        console.error('Error:', response.statusText);
        alert('Failed to submit the form.');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  // Handle file upload to backend and auto-fill form
  // Handle file upload to backend and auto-fill form
const handleFileUpload = async () => {
  if (!file) return alert('Please select a file.');

  const formDataToSend = new FormData();
  formDataToSend.append('file', file);

  try {
    setLoading(true); // Set loading state to true

    // Send the file to the backend (update URL with the correct backend endpoint)
    const response = await axios.post(
      'https://placement-assistant-system.onrender.com/api/jd/extract-jd-local', // Update URL if necessary
      formDataToSend,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (response.status === 200) {
      console.log('Extracted data:', response.data);
      // Assuming response.data matches your formData structure, auto-fill the form
      setFormData(response.data); 
      alert('Job description details extracted and form pre-filled!');
    } else {
      console.error('Error extracting data:', response.status, response.data);
      let errorMessage = 'Failed to extract data.';
      if (response.data && response.data.error) {
        errorMessage = `Error: ${response.data.error}`;
      }
      alert(errorMessage);
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    alert('Failed to upload file and extract data.');
  } finally {
    setLoading(false); // Set loading state back to false
  }
};


  return (
    <form className="company-form" onSubmit={handleSubmit}>
      {/* File Upload Section */}
      <div className="file-upload">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          disabled={loading}
        />
        <button
          type="button"
          onClick={handleFileUpload}
          disabled={loading}
          className={loading ? 'loading' : ''}
        >
          {loading ? 'Uploading...' : 'Upload & Extract Data'}
        </button>
      </div>

      {/* Company Info */}
      <table className="company-info">
        <tr>
          <td className="cname">
            <label>Company Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />
          </td>
          <td>
            <label>Batch</label>
            <input
              type="text"
              value={formData.batch}
              onChange={(e) => handleChange('batch', e.target.value)}
              required
              placeholder="2023-2024"
            />
          </td>
        </tr>
      </table>

      {/* Address Fields */}
      <div className="headings">Address</div>
      {Object.keys(formData.address).map((key) => (
        <div key={key}>
          <label>{key}</label>
          <input
            type="text"
            value={formData.address[key]}
            onChange={(e) => handleNestedChange('address', key, e.target.value)}
          />
        </div>
      ))}

      {/* Contact Person Fields */}
      <div className="headings">Contact Person</div>
      {Object.keys(formData.contactPerson).map((key) => (
        <div key={key}>
          <label>{key}</label>
          <input
            type={key === 'email' ? 'email' : 'text'}
            value={formData.contactPerson[key]}
            onChange={(e) =>
              handleNestedChange('contactPerson', key, e.target.value)
            }
            required
          />
        </div>
      ))}

      {/* Designations Section */}
      <div className="headings">Designations</div>
      {formData.designations.map((designation, dIndex) => (
        <div key={dIndex} className="designation">
          {/* Designation Heading */}
          <div className="headings">
            Designation {dIndex + 1}
            <button
              type="button"
              className="remove-designation-btn"
              onClick={() => removeDesignation(dIndex)}
            >
              Remove Designation
            </button>
          </div>

          {/* Designation Details */}
          {Object.keys(designation).map((key) => {
            if (key === 'placementProcess') {
              return (
                <div key={`${dIndex}-process`}>
                  <div className="headings">
                    Placement Process
                    <button type="button" onClick={() => addProcess(dIndex)}>
                      Add Round
                    </button>
                  </div>

                  {/* Placement Process (Rounds) */}
                  {designation.placementProcess && designation.placementProcess.map((process, pIndex) => (
                    <div key={pIndex}>
                      <div className="headings">
                        Round {pIndex + 1}
                        <button
                          type="button"
                          className="remove-round-btn"
                          onClick={() => removeProcess(dIndex, pIndex)}
                        >
                          Remove Round
                        </button>
                      </div>
                      {Object.keys(process).map((pKey) => (
                        <div key={pKey}>
                          <label>{pKey}</label>
                          <input
                            type={pKey === 'description' ? 'textarea' : 'text'}
                            value={process[pKey] || ''}
                            onChange={(e) =>
                              handleProcessChange(dIndex, pIndex, pKey, e.target.value)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              );
            }
            return (
              <div key={key}>
                <label>{key === 'RequiredQualifications' ? 'Required Qualification' : key}</label>
                <input
                  type="text"
                  placeholder={
                    key === 'RequiredQualifications'
                      ? 'Enter comma-separated values'
                      : ''
                  }
                  value={
                    key === 'RequiredQualifications'
                      ? designation[key]?.join(', ') || ''
                      : designation[key] || ''
                  }
                  onChange={(e) =>
                    handleDesignationChange(dIndex, key, e.target.value)
                  }
                  required={key !== 'bond'} // Adjust required fields as needed
                />
              </div>
            );
          })}
        </div>
      ))}

      {/* Add Designation Button */}
      <button className="add-designation-btn" type="button" onClick={addDesignation}>
        Add Designation
      </button>

      {/* Submit Button */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default CompanyDetailsForm;