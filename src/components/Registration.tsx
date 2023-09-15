import React, { useState } from 'react';
import PersonalData from './Personal';
import AddressData from './Address';
import AccountData from './Account';
import SuccessPage from './Success';

interface FormData {
  fullName: string;
  email: string;
  dob: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  username: string;
  password: string;
}

const RegistrationForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    dob: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    username: '',
    password: '',
  });

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleData = (data: Partial<FormData>) => {
    setFormData({ ...formData, ...data });
    // Anda dapat mengirimkan data formulir di sini atau melakukan tindakan lainnya
  };

  return (
    <div>
      <h1>Multi-Step Registration Form</h1>
      {currentStep === 1 && <PersonalData onNextStep={nextStep} />}
      {currentStep === 2 && <AddressData onPrevStep={prevStep} onNextStep={nextStep} />}
      {currentStep === 3 && <AccountData onPrevStep={prevStep} onNextStep={nextStep} onSubmit={handleData} />}
      {currentStep > 3 && <SuccessPage />}
    </div>
  );
};

export default RegistrationForm;
