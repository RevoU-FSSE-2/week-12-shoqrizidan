import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Input } from 'antd';
import '../styles/Account.css'

interface AccountDataProps {
  onPrevStep: () => void;
  onNextStep: () => void;
  onSubmit: (data: { username: string; password: string }) => void;
}

interface FormData {
  [key: string]: string;
  username: string;
  password: string;
}

const AccountData: React.FC<AccountDataProps> = ({ onPrevStep, onNextStep, onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
  });

  return (
    <div>
      <h2>Account Information</h2>
      <Formik
        initialValues={formData}
        validationSchema={Yup.object().shape({
          username: Yup.string().required('Username is required'),
          password: Yup.string()
            .required('Password is required')
            .matches(
              /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/,
              'Password must be at least 8 and alphanumeric'
            ),
        })}
        onSubmit={(values, { setSubmitting }) => {
          if (Object.keys(values).some((key) => values[key] === '')) {
            setSubmitting(false);
          } else {
            setFormData({ ...formData, ...values });
            onSubmit(values); // Mengirim data hasil submit
            onNextStep();
          }
        }}
      >
        <Form>
          <div className='form-field'>
            <label htmlFor="username">Username:</label>
            <Field as={Input} className='field' type="text" id="username" name="username" />
            <ErrorMessage name="username" component="div" className="error" />
          </div>
          <div className='form-field'>
            <label htmlFor="password">Password:</label>
            <Field as={Input} className='field' type="password" id="password" name="password" />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          <Button className='prev-bt' onClick={onPrevStep}>Previous</Button>
          <Button className='sub-bt' type="primary" htmlType="submit">Submit</Button>
        </Form>
      </Formik>
    </div>
  );
};

export default AccountData;
