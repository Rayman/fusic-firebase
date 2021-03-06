import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import firebase from '../firebase';
import 'firebase/firestore';

export default function AddRadio() {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  function onCreate(e) {
    e.preventDefault();

    const data = {
      ...Object.fromEntries(new FormData(e.target)),
      owner: firebase.auth().currentUser.uid,
      created: firebase.firestore.FieldValue.serverTimestamp(),
    };
    console.log('Create new radio:', data);

    firebase
      .firestore()
      .collection('radios')
      .add(data)
      .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
  }

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        +
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={onCreate}>
          <Modal.Header closeButton>
            <Modal.Title>New Radio</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Radio name:</Form.Label>
              <Form.Control name="name" placeholder="Name" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Create
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
