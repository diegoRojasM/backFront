import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';


function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/tasks');
  }, [isAuthenticated]);

  const onSubmit = async (values) => {
    signup(values);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        
        {Array.isArray(registerErrors) && registerErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white mb-2 rounded-md" key={i}>
            {error}
          </div>
        ))}
        <h1 className="text-2xl font-bold text-white">Registro</h1>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register("username", { 
              required: "El nombre de usuario es obligatorio" 
            })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Usuario"
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
          
          <input
            type="email"
            {...register("email", { 
              required: "El correo electrónico es obligatorio",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "El formato del correo no es válido"
              }
            })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Correo"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <input
            type="password"
            {...register("password", { 
              required: "La contraseña es obligatoria",
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres"
              }
            })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Contraseña"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md mt-4">
            Registrar
          </button>
        </form>
        <p className="flex gap-x-2 justify-between text-white">
          ¿Ya tienes una cuenta?  <Link to="/login"
          className="text-sky-500">Login</Link>
        </p>


      </div>
    </div>
  );
}

export default RegisterPage;
