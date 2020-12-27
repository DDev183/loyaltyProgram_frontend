import React from 'react';
import Alert from '@material-ui/lab/Alert';


const FormErrors = ({formErrors}) =>
  <div className='formErrors'>
    {Object.keys(formErrors).map((fieldName, i) => {
      if(formErrors[fieldName].length > 0){
        return (
          <p key={i}>
          <Alert variant="filled" severity="error">


          {fieldName} {formErrors[fieldName]}
          </Alert>
          </p>
        )
      } else {
        return '';
      }
    })}
  </div>


export default FormErrors;
