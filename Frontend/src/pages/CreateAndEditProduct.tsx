import { useNavigate, useParams } from "react-router-dom";
import { Button, Input } from "../components";
import { useForm } from "react-hook-form";
import useMutation from "../hooks/useMutation";
import { toast, Toaster } from "sonner";

interface ProductForm {
  name: string;
  description: string;
  price: number;
}

export default function CreateAndEditProduct() {

  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);


  const navigate = useNavigate();

  const { register, formState: { errors }, handleSubmit, reset } = useForm<ProductForm>();

  // Use mutationm hook
  const { error, loading, fetchEntity } = useMutation();


  const handelDataSubmit = async (data: ProductForm) => {
    const response = await fetchEntity(data, "POST", "/products")

    if (response.status_code === 201) {
      reset(); // Reinicio el formulario
      return toast.success('Producto', {
        description: "Creado exitosamente.",
        action: {
          label: "Ir al listado",
          onClick: () => navigate("/")
        }
      });
    }
  }

  return (
    <div className="m-auto">
      <Toaster theme="light" position='top-right' duration={3000} />
      <div className="p-6 w-[20rem] md:w-[30rem] mx-auto bg-gray-200 shadow-lg rounded-2xl border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 text-start">{isEditing ? `Editar producto: ${id}` : "Crear nuevo producto"}</h2>
        <form onSubmit={handleSubmit(handelDataSubmit)} className="space-y-6">
          <div>
            <Input
              label="Nombre"
              type="text"
              register={register}
              errors={errors}
              minLength={3}
              maxLength={200}
              required={!id ? true : false}
              name="name"
            />
          </div>
          <div>
            <Input
              label="Descipción"
              type="text"
              name="description"
              register={register}
              errors={errors}
              minLength={8}
              maxLength={200}
              required={!id ? true : false}
            />
          </div>
          <div>
            <Input
              label="Precio"
              type="decimal"
              register={register}
              errors={errors}
              minLength={1}
              maxLength={10}
              required={!id ? true : false}
              name="price"
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
