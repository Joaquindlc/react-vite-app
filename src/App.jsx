import { useState, useEffect } from 'react';
import CharacterList from './Components/CharacterList';

function App() { 
  return (
  <>
<div className='bg-dark text-white'>
  <h1 className='text-center display-1 py-4'>Rick and Morty</h1>
  <p className='text-center py-4'><span>Participantes:</span> Joaquin de la Canal, Luciano Miranda, Ayelen Benitez, Valeria Parodi, Joaquin D´Alessio.</p>
</div>
<div className=' text-black'>
  <CharacterList/>
</div>
  
  </>
  )
}

export default App;
