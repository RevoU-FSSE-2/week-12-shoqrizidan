import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Input } from 'antd';
import '../styles/Address.css'

interface AddressDataProps {
  onPrevStep: () => void;
  onNextStep: () => void;
}

interface FormData {
  [key: string]: string;
  streetAddress: string,
  city: string,
  state: string,
  zipCode: string,
}

const AddressData: React.FC<AddressDataProps> = ({ onPrevStep, onNextStep }) => {
  const [formData, setFormData] = useState<FormData>({
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
  });

  return (
    <div>
      <h2>Address Information</h2>
      <Formik
        initialValues={formData}
        validationSchema={Yup.object().shape({
          streetAddress: Yup.string().required('Street Address is required'),
          city: Yup.string().required('City is required'),
          state: Yup.string().required('State is required'),
          zipCode: Yup.string()
            .matches(/^\d{5}$/, 'Zip Code must be 5 digits')
            .required('Zip Code is required'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            if (Object.keys(values).some((key) => values[key] === '')) {
              setSubmitting(false);
            } else {
              setFormData({ ...formData, ...values });
              onNextStep();
            }
          }}
      >
        <Form>
          <div className='form-field'>
            <label htmlFor="streetAddress">Street Address:</label>
            <Field as={Input} className='field' type="text" id="streetAddress" name="streetAddress" />
            <ErrorMessage name="streetAddress" component="div" className="error" />
          </div>
          <div className='form-field'>
            <label htmlFor="city">City:</label>
            <Field as={Input} className='field' type="text" id="city" name="city" />
            <ErrorMessage name="city" component="div" className="error" />
          </div>
          <div className='form-field'>
            <label htmlFor="state">State:</label>
            <Field as={Input} className='field' type="text" id="state" name="state" />
            <ErrorMessage name="state" component="div" className="error" />
          </div>
          <div className='form-field'>
            <label htmlFor="zipCode">Zip Code:</label>
            <Field as={Input} className='field' type="text" id="zipCode" name="zipCode" />
            <ErrorMessage name="zipCode" component="div" className="error" />
          </div>
          <Button className='prev-bt' onClick={onPrevStep}>Previous</Button>
          <Button className='next-bt' type="primary" htmlType="submit">Next</Button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddressData;
