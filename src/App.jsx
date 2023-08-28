import Header from "./components/Header"
import Formulario from "./components/Formulario"
import ListadoPacientes from "./components/ListadoPacientes"
import {useState, useEffect} from 'react' 


function App() {

  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});

  // Obtener Info de Local Storage

  useEffect(() => {
   
    const obtenerLS = () => {
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? [];

      setPacientes(pacientesLS);
    }
    
    obtenerLS();
  }, [])
  

  // Local Storage

  useEffect(() => {

    localStorage.setItem('pacientes', JSON.stringify(pacientes));
    
  }, [pacientes])
  



  // Eliminar al paciente
  const eleminarPaciente = id => {
    const pacientesActualizados = pacientes.filter( pacienteEliminar => pacienteEliminar.id !== id);
    setPacientes(pacientesActualizados)
    
  }
 
  return (
    <div className=" container mx-auto mt-20">
      <Header

      />

      <div className=" mt-12 md:flex">
        <Formulario
          pacientes={pacientes}
          setPacientes={setPacientes}
          paciente = {paciente}
          setPaciente={setPaciente}
        />
        <ListadoPacientes
          pacientes={pacientes}
          setPaciente = {setPaciente}
          eleminarPaciente = {eleminarPaciente}
        />
      </div>
    </div>
  )
}

export default App
