import { Fragment, useEffect, useState } from 'react';
import './App.css';
import { BucketDataInt } from './interface';

function App() {
  /* ----- VARIABLES ----- */
  const apiEndpoint = "https://msenvifcda.execute-api.us-east-1.amazonaws.com/Test1";

  /* ----- STATES ----- */
  const [ s3Data, setS3Data ] = useState<BucketDataInt[]>([]);
  const [ selectedBucketName, setSelectedBucketName ] = useState<string>('');

  /* ----- EFFECTS ----- */
  useEffect(() => {
    fetchAllTasksFromDynamo();
  }, []);

  /* ----- FUNCTIONS ----- */
  const fetchAllTasksFromDynamo = () => {
    fetch(apiEndpoint)
    .then(res => res.json())
    .then(data => setS3Data(data) )
    .catch(error => console.error('Error:', error));
  }
  console.log("selectedBucketName :", selectedBucketName);
  

  /* ----- RENDERS ----- */
  const renderBucketsNamesOptions = s3Data.map((bucketData, idx) => 
  <option key={ idx }>{bucketData.bucketName}</option>
  )

  console.log();
  
  return (
    <>
      <h1>Get S3 Buckets Content</h1>
      <hr />
      <select 
        name="bucketsNames" id="bucketsNames"  
        value={selectedBucketName} onChange={(e) => setSelectedBucketName(e.target.value)}
      >
        <option hidden disabled value="">Select a bucket name.</option>
        { renderBucketsNamesOptions }
      </select>
      
      {
        selectedBucketName &&
        <>
        <h2>{ selectedBucketName } Objects:</h2>
        {
          s3Data
            .find(bucketObj => bucketObj.bucketName === selectedBucketName)?.objects
              .map((objInfo, idx) => (
                <Fragment key={idx}>
                  <h3>Object name: {objInfo.name}</h3>
                  <div>Object text content: {objInfo.content}</div>
                </Fragment>
              ))
        }
        </>

      }

    </>
  )
}

export default App
