import React from 'react';
import { useParams } from 'react-router-dom';
const EditAdress = () => { const { id } = useParams(); return <div>Edit Address {id}</div> }
export default EditAdress;