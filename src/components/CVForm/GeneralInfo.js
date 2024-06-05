import { useState } from 'react';
import { useCV, useCVDispatch } from '../../contexts/CVContext';

import SectionHeader from './SectionHeader';
import SectionWrapper from '../UI/SectionWrapper';
import InputFieldsWrapper from '../UI/InputFieldsWrapper';
import InputRow from '../UI/InputRow';
import Input from '../UI/Input';
import TextArea from '../UI/TextArea';

const GeneralInfo = () => {
  const [isShown, setIsShown] = useState(true);
  const { generalInfo } = useCV();
  const dispatch = useCVDispatch();
  const [warnings, setWarnings] = useState({
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    title: '',
    address: '',
    description: '',
    linkedIn: ''
  });

  function handleOnChange(e) {
    const { name, value } = e.target;

    if (name === 'firstName') {
      const firstChar = value.charAt(0);
      const hasInvalidChars = /[^a-zA-ZÀ-ÿ ]/.test(value);

      if (hasInvalidChars) {
        setWarnings((prevWarnings) => ({
          ...prevWarnings,
          firstName: 'Le prénom ne doit pas contenir de chiffres ou de caractères spéciaux.'
        }));
      } else if (firstChar && firstChar !== firstChar.toUpperCase()) {
        setWarnings((prevWarnings) => ({
          ...prevWarnings,
          firstName: 'La première lettre du prénom doit être en majuscule.'
        }));
      } else {
        setWarnings((prevWarnings) => ({
          ...prevWarnings,
          firstName: ''
        }));
      }
    }

    if (name === 'lastName') {
      const hasInvalidChars = /[^A-ZÀ-ÿ ]/.test(value);

      if (hasInvalidChars) {
        setWarnings((prevWarnings) => ({
          ...prevWarnings,
          lastName: 'Le nom de famille ne doit contenir que des majuscules et pas de chiffres ou de caractères spéciaux.'
        }));
      } else if (value !== value.toUpperCase()) {
        setWarnings((prevWarnings) => ({
          ...prevWarnings,
          lastName: 'Le nom de famille doit être en majuscule.'
        }));
      } else {
        setWarnings((prevWarnings) => ({
          ...prevWarnings,
          lastName: ''
        }));
      }
    }

    if (name === 'age') {
      const ageValue = parseInt(value, 10);
      if (isNaN(ageValue) || ageValue < 18) {
        setWarnings((prevWarnings) => ({
          ...prevWarnings,
          age: 'Vous devez avoir au moins 18 ans pour remplir ce formulaire.'
        }));
      } else {
        setWarnings((prevWarnings) => ({
          ...prevWarnings,
          age: ''
        }));
      }
    }

    if (name === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.(com|fr)$/;
      if (!emailPattern.test(value)) {
        setWarnings((prevWarnings) => ({
          ...prevWarnings,
          email: 'L\'email doit suivre le format : caractères + @ + caractères + .com ou .fr.'
        }));
      } else {
        setWarnings((prevWarnings) => ({
          ...prevWarnings,
          email: ''
        }));
      }
    }

    if (name === 'title') {
      const titlePattern = /^[a-zA-ZÀ-ÿ ]+$/;
      if (!titlePattern.test(value)) {
        setWarnings((prevWarnings) => ({
          ...prevWarnings,
          title: 'Le titre ne doit pas contenir de chiffres ou de caractères spéciaux.'
        }));
      } else {
        setWarnings((prevWarnings) => ({
          ...prevWarnings,
          title: ''
        }));
      }
    }

    if (name === 'address') {
      const addressPattern = /^[a-zA-Z0-9À-ÿ .,']{0,100}$/;
      if (value.length > 100) {
        setWarnings((prevWarnings) => ({
          ...prevWarnings,
          address: 'L\'adresse ne doit pas dépasser 100 caractères.'
        }));
      } else if (!addressPattern.test(value)) {
        setWarnings((prevWarnings) => ({
          ...prevWarnings,
          address: 'L\'adresse ne doit pas contenir de caractères spéciaux.'
        }));
      } else {
        setWarnings((prevWarnings) => ({
          ...prevWarnings,
          address: ''
        }));
      }
    }

    if (name === 'description') {
      const descriptionPattern = /^[a-zA-ZÀ-ÿ .,'\n]+$/;
      if (!descriptionPattern.test(value)) {
        setWarnings((prevWarnings) => ({
          ...prevWarnings,
          description: 'La description ne doit pas contenir de chiffres ou de caractères spéciaux.'
        }));
      } else {
        setWarnings((prevWarnings) => ({
          ...prevWarnings,
          description: ''
        }));
      }
    }

    if (name === 'linkedIn') {
      const linkedInPattern = /^https:\/\/[a-z]{2,3}\.linkedin\.com\/.*$/;
      if (!linkedInPattern.test(value)) {
        setWarnings((prevWarnings) => ({
          ...prevWarnings,
          linkedIn: 'Veuillez entrer une URL LinkedIn valide.'
        }));
      } else {
        setWarnings((prevWarnings) => ({
          ...prevWarnings,
          linkedIn: ''
        }));
      }
    }

    dispatch({
      type: 'CHANGE_GENERAL_INFO',
      name,
      value,
    });
  }

  const handleToggleSection = () => {
    setIsShown((prevIsShown) => !prevIsShown);
  };

  return (
    <div>
      <SectionHeader
        text="Personal Information"
        onToggleSection={handleToggleSection}
        isShown={isShown}
      />
      {isShown && (
        <SectionWrapper>
          <InputFieldsWrapper>
            <InputRow>
              <div>
                <Input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={generalInfo.firstName}
                  onChange={handleOnChange}
                  maxLength="15"
                  label="First Name"
                />
                {warnings.firstName && (
                  <p style={{ color: 'red' }}>{warnings.firstName}</p>
                )}
              </div>
              <div>
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={generalInfo.lastName}
                  onChange={handleOnChange}
                  maxLength="15"
                  label="Last Name"
                />
                {warnings.lastName && (
                  <p style={{ color: 'red' }}>{warnings.lastName}</p>
                )}
              </div>
            </InputRow>
            <InputRow>
              <div>
                <Input
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={generalInfo.age}
                  onChange={handleOnChange}
                  maxLength="3"
                  label="Age"
                />
                {warnings.age && (
                  <p style={{ color: 'red' }}>{warnings.age}</p>
                )}
              </div>
            </InputRow>
            <Input
              type="text"
              name="title"
              placeholder="Title"
              value={generalInfo.title}
              onChange={handleOnChange}
              maxLength="50"
              label="Title"
            />
            {warnings.title && (
              <p style={{ color: 'red' }}>{warnings.title}</p>
            )}
            <InputRow>
              <Input
                type="tel"
                name="phoneNumber"
                placeholder="Phone number"
                value={generalInfo.phoneNumber}
                onChange={handleOnChange}
                maxLength="20"
                label="Phone"
              />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={generalInfo.email}
                onChange={handleOnChange}
                maxLength="25"
                label="Email"
              />
              {warnings.email && (
                <p style={{ color: 'red' }}>{warnings.email}</p>
              )}
            </InputRow>
            <Input
              type="text"
              name="address"
              placeholder="Address"
              value={generalInfo.address}
              onChange={handleOnChange}
              maxLength="100"
              label="Address"
            />
            {warnings.address && (
              <p style={{ color: 'red' }}>{warnings.address}</p>
            )}
            <InputRow>
              <Input
                type="text"
                name="linkedIn"
                placeholder="LinkedIn"
                value={generalInfo.linkedIn}
                onChange={handleOnChange}
                maxLength="100"
                label="LinkedIn"
              />
              {warnings.linkedIn && (
                <p style={{ color: 'red' }}>{warnings.linkedIn}</p>
              )}
              <Input
                type="text"
                name="facebook"
                placeholder="Facebook"
                value={generalInfo.facebook}
                onChange={handleOnChange}
                maxLength="40"
                label="Facebook"
              />
            </InputRow>
            <TextArea
              name="description"
              placeholder="Description"
              value={generalInfo.description}
              onChange={handleOnChange}
              maxLength="600"
            />
            {warnings.description && (
              <p style={{ color: 'red' }}>{warnings.description}</p>
            )}
          </InputFieldsWrapper>
        </SectionWrapper>
      )}
    </div>
  );
};

export default GeneralInfo;
