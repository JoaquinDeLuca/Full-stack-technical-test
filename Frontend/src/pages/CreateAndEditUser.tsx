import { useNavigate, useParams } from 'react-router-dom';
import { Button, Input } from '../components'
import { useForm } from 'react-hook-form';
import useMutation from '../hooks/useMutation'
import { toast, Toaster } from 'sonner';

interface UserForm {
  name: string;
  email: string;
}

export default function CreateAndEditUser() {

  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);

  const navigate = useNavigate()

  const { register, formState: { errors }, handleSubmit, reset } = useForm<UserForm>();

  // Use mutation hook
  const { error, loading, fetchEntity } = useMutation();

  const handelDataSubmit = async (data: UserForm) => {

    const response = await fetchEntity(data, "POST", "/users")

    if (response.status_code === 201) {
      reset(); // Reinicio el formulario
      return toast.success('Usuario', {
        description: "Creado exitosamente.",
        action: {
          label: "Ir al listado",
          onClick: () => navigate("/")
        }
      });
    }
  };

  return (
    <div className='m-auto'>
      <Toaster theme="light" position='top-right' duration={3000} />
      <div className="p-6 w-[20rem] md:w-[30rem] mx-auto bg-gray-200 shadow-lg rounded-2xl border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 text-start">{isEditing ? `Editar usuario: ${id}` : `Crear nuevo usuario`}</h2>
        <form onSubmit={handleSubmit(handelDataSubmit)} className="space-y-6">
          <div>
            <Input
              label="Nombre"
              type="text"
              register={register}
              errors={errors}
              minLength={3}
              maxLength={100}
              name='name'
              required={!id ? true : false}
            />
          </div>
          <div>
            <Input
              label="Correo electrónico"
              type="email"
              register={register}
              errors={errors}
              maxLength={100}
              required={!id ? true : false}
              name='email'
              pattern={{ value: /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,63}){1,3})$/i, message: "Ingrese un mail válido" }}
            />
          </div>
          <Button
            text={loading ? "Enviando..." : "Guardar"}
            type="submit"
            disabled={loading}
          />

          {error && <p className='pt-1 text-red-600 text-s'>{error}</p>}
        </form>
      </div>
    </div>
  )
}
