import Navbar from './components/Navbar.jsx';
import MainSection from './components/mainSection.jsx';
import RightSection from './components/rightSection.jsx';

import './App.css'

function App() {

  return (
    <div className='relative w-screen h-screen bg-[--secondary] grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] gap-2'
    style={{gridTemplateAreas: "'navbar navbar' 'leftside rightside'"
    }}>
      <Navbar/>
      <MainSection/>
      <RightSection/>
    </div>
  )
}

export default App
