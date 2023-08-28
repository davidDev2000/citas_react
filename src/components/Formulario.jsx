import {useState, useEffect} from "react"
import Error from './Error'

const Formulario = ({pacientes,setPacientes, paciente, setPaciente}) => {
    // useState asociados con los inputs de fromularios
    const [nombre, setNombre] = useState("");
    const [propietario, setPropietario] = useState("");
    const [email, setEmail] = useState("");
    const [fecha, setFecha] = useState("");
    const [sintomas, setSintomas] = useState("");
    // Mensaje de error
    const [error, setError] = useState(false)


    useEffect(() => {
      
        if( Object.keys(paciente).length > 0 ) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
        }
        
    }, [paciente])
    



     const generarID = () => {
        const random = Math.random().toString(36).substr(2);
        const fecha = Date.now().toString(36);
        return random + fecha;
     }

    // Validacion de formulario
    const handleSubmite = (e) => {
        e.preventDefault();

       

        if([nombre,propietario,fecha,email,sintomas].includes('')) {
            setError(true)
            return;
        }

        setError(false)
        // Objeto de paciente
        const objetoPaciente = {
            nombre,
            propietario,
            fecha,
            email,
            sintomas
        }

        if(paciente.id) {
            // Editando el registro
            objetoPaciente.id = paciente.id

            const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente  : pacienteState)

            setPacientes(pacientesActualizados)
            setPaciente({});
        }else {
            // Nuevo registro
            objetoPaciente.id = generarID();
            setPacientes([...pacientes, objetoPaciente])
        }

        // Reiniciar el nombre
        setNombre("")
        setPropietario("")
        setEmail("")
        setFecha("")
        setSintomas("")
        
    }
    
    

  return (
    <div className=" md:w-1/2 lg:w-2/5 mx-5">
        <h2 className=" font-black text-3xl text-center">Seguimiento Pacientes</h2>

        <p className=" text-lg mt-5 text-center mb-10">
            Añade Pacientes y {""}
            <span className=" text-indigo-600 font-bold">Administralos</span>
        </p>

        <form className="bg-white shadow-md rounded-lg py-10 px-5" onSubmit={handleSubmite}>
            {/* Mensaje de Error */}
            {error && <Error>Todos los campos son obligatorios</Error>  }


            <div className="mb-5">
                <label
                    className="block text-gray-700 uppercase font-bold"
                    htmlFor="mascota"
                >
                    Nombre Mascota
                </label>

                <input
                    id="mascota"
                    type="text"
                    placeholder="Nombre de la mascota"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    />
            </div>

            <div className="mb-5">
                <label
                    className="block text-gray-700 uppercase font-bold"
                    htmlFor="propietario"
                >
                    Nombre Propietario
                </label>

                <input
                    id="propietario"
                    type="text"
                    placeholder="Nombre del Propietario"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={propietario}
                    onChange={e => setPropietario(e.target.value)}
                    />
            </div>

            <div className="mb-5">
                <label
                    className="block text-gray-700 uppercase font-bold"
                    htmlFor="email"
                >
                    Email
                </label>

                <input
                    id="email"
                    type="email"
                    placeholder="Contacto Email del Propietario"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
            </div>

            <div className="mb-5">
                <label
                    className="block text-gray-700 uppercase font-bold"
                    htmlFor="alta"
                >
                    Alta
                </label>

                <input
                    id="alta"
                    type="date"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={fecha}
                    onChange={e => setFecha(e.target.value)}/>
            </div>

            <div className="mb-5">
                <label
                    className="block text-gray-700 uppercase font-bold"
                    htmlFor="sintomas"
                >
                    Síntomas
                </label>

               <textarea
                    id="sintomas"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Describle las Sintomas"
                    value={sintomas}
                    onChange={e => setSintomas(e.target.value)}
               >

               </textarea>
            </div>

            <input
                type="submit"
                className="bg-indigo-600 w-full p-3 text-center text-white uppercase font-bold hover:bg-indigo-800 cursor-pointer transition-all "
                value={paciente.id ? "Editar Paciente" : "Agregar Paciente"}
                // onChange={handleSubmite}
            />
        </form>
    </div>
  )
}

export default Formulario