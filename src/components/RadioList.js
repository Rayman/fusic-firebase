import React from 'react';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import { Link } from 'gatsby';

import firebase from '../firebase';
import 'firebase/firestore';

import NoSSR from '../components/NoSSR';

function RadioList() {
  const [radios, loading, error] = useCollectionDataOnce(
    firebase.firestore().collection('radios'),
    {
      idField: 'id',
    }
  );
  if (error) throw error;
  if (loading) return <div>Loading...</div>;

  return (
    <ul>
      {radios.map(radio => (
        <li key={radio.id}>
          <Link to={'/radios/' + radio.id}>{radio.name}</Link>
        </li>
      ))}
    </ul>
  );
}

export default function RadioListWrapper() {
  return (
    <NoSSR>
      <RadioList />
    </NoSSR>
  );
}
