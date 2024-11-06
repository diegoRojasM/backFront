import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Navbar() {
    const {isAuthenticated, logout, user} = useAuth()

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg text-white" >
        <Link to={
          isAuthenticated ? '/tasks' : '/'
        }>
            <h1 className="text-2xl font-bold text-white">GESTION DE PROYECTOS</h1>
        </Link>
    <ul className="flex gap-x-2">
    {isAuthenticated ? (
          <>
            <li>
              Bienvenido {user.username}
            </li>
            <li>
              <Link to="/add-task" className="bg-indigo-500 px-4 py-1 rounded-sm">Añadir Tarea</Link>
            </li>
            <li>
              <Link to="/" onClick={()=>{
                logout()
              }} className="bg-red-600 px-4 py-1 rounded-sm">
                Cerrar Sesion
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="bg-indigo-500 px-4 py-1 rounded-sm">
              Iniciar Sesion</Link>
            </li>
            <li>
              <Link to="/register" className="bg-indigo-500 px-4 py-1 rounded-sm">
              Registrarse</Link>
            </li>
          </>
        )}
    </ul>
    </nav>
  )
}

export default Navbar
