import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import DynamicSelect from './DynamicSelect';

const ExampleComponent: React.FC = () => {
  const { register, formState: { errors } } = useForm();
  const [userData, setUserData] = useState({
    gender: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const selectFields = [
    {
      label: 'Gender',
      name: 'gender',
      placeholder: 'Enter Gender',
      value: userData.gender || ' ',
      options: [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
      ],
      register: register('gender', { required: 'Gender is required' }),
      error: errors.gender ? String(errors.gender.message) : '',
      onChange: handleChange,
    },
  ];

  return (
    <div>
      <h1>Dynamic Select Example</h1>
      <DynamicSelect selectFields={selectFields} />
    </div>
  );
};

export default ExampleComponent;
