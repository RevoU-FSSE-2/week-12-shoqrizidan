import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import revouLogo from './assets/revou.png'
import RegistrationForm from './components/Registration';
import './styles/App.css'

const App = () => {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://revou.co/" target="_blank">
          <img src={revouLogo} className="logo revou" alt="Revou logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Shoqri Zidan - Week 12 Assignment</h1>
      <p>
        Frontend Implementation - React
        <br/>
        Using Vite + React
      </p>
      <div className="App">
        <RegistrationForm />
      </div>
    </>
  )
}

export default App
