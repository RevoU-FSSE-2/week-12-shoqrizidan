import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Input } from 'antd';
import '../styles/Personal.css'

interface PersonalDataProps {
  onNextStep: () => void;
}

interface FormData {
  [key: string]: string;
  fullName: string;
  email: string;
  dob: string;
}

const PersonalData: React.FC<PersonalDataProps> = ({ onNextStep }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    dob: '',
  });

  return (
    <div>
      <h2>Personal Information</h2>
      <Formik
        initialValues={formData}
        validationSchema={Yup.object({
          fullName: Yup.string().required('Full Name is required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Email Address is required'),
          dob: Yup.date()
            .required('Date of Birth is required')
            .test(
              'age',
              'You must be at least 17 years old',
              (value) => {
                const dob = new Date(value);
                const today = new Date();
                const age = today.getFullYear() - dob.getFullYear();
                return age >= 17;
              }
            ),
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
            <label htmlFor="fullName">Full Name:</label>
            <Field as={Input} className='field' type="text" id="fullName" name="fullName" />
            <ErrorMessage name="fullName" component="div" className="error" />
          </div>
          <div className='form-field'>
            <label htmlFor="email">Email Address:</label>
            <Field as={Input} className='field' type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div className='form-field'>
            <label htmlFor="dob">Date of Birth:</label>
            <Field as={Input} className='field' type="date" id="dob" name="dob" />
            <ErrorMessage name="dob" component="div" className="error" />
          </div>
          <Button className='next-bt' type="primary" htmlType='submit'>Next</Button>
        </Form>
      </Formik>
    </div>
  );
};

export default PersonalData;
