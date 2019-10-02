import React, {useState} from 'react';

import camera from '../../assets/camera.svg';

import './styles.css'


export default function New(){
  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');

  function handleSubmit(){

  }
 

  return (
    <form onSubmit={handleSubmit}>

      <label id="thumbnail">
        <input type="file"  />
        <img src={camera} alt=""/>
      </label>

      <label htmlFor="company">EMPRESA *</label>
      <input type="text"
        id="company"
        placeholder="Sua empresa incrivel"
        value={company}
        onChange={event => setCompany(event.target.value)}
      />

      <label htmlFor="company">TECNOLOGIAS * <span>Separar por vírgula</span> </label>
      <input type="text"
        id="techs"
        placeholder="Quais tecnologias usam?"
        value={techs}
        onChange={event => setTechs(event.target.value)}
      />

      <label htmlFor="company">VALOR DA DIÁRIA <span> Em caso de gratuito, deixar em branco</span> </label>
      <input type="text"
        id="price"
        placeholder="R$0,00"
        value={price}
        onChange={event => setPrice(event.target.value)}
      />

      <button type="submit" className="btn">Cadastrar</button>
    </form>
  )

}