import React from 'react';
import useInput from '../../hooks/useInput'
import apiServices from '../../services/apiServices';

function InputWithButton({btnName , value , onChange ,trackingId}) {
  const [inputValue, setInputValue] = useInput('');

  

  const handlePatchData = async () => {
    const TRACKING_URL = btnName == "Picked Up" ? "http://localhost:7000/api/tracking/picked" : btnName == "Deliveried" ? "http://localhost:7000/api/tracking/delivery" : null 
    // const modifiedData = {btnName == "Picked Up" ? "http://localhost:7000/api/tracking/picked" : btnName == "Deliveried" ? "http://localhost:7000/api/tracking/delivery" : null 
        
    // }

    const modifiedData = btnName == "Picked Up" ? {
        id:trackingId,
        picked_up_time : value
    } : btnName == "Deliveried" ? {id:trackingId,
        delivery_time : value} : null 
    

    try{
        await apiServices.update(TRACKING_URL,trackingId,modifiedData)
    }catch (error) {
        console.error(error);
        }

    
    // Replace this function with your logic to make the POST request using 'inputValue'
    console.log('Post data:', inputValue);
  };

  return (
    <div>
      <input
        className='mb-2 mr-2 rounded' 
        style={{maxWidth:"170px"}}
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Enter data..."
      />
      <button  className="btn btn-info rounde" onClick={handlePatchData}>{btnName}</button>
    </div>
  );
}

export default InputWithButton;
