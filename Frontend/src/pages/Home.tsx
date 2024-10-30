import { useRef, useState } from 'react';
import { Button, AlertModal, Loading } from '../components'
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch'
import type { User, Product } from '../types'
import useMutation from '../hooks/useMutation'
import { toast, Toaster } from 'sonner';


export default function Home() {

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const entityToDelete = useRef<{ id: number; type: "users" | "products" } | null>(null);

  // Fetch all users
  const {
    data: users,
    isLoading: loadingUsers,
    error: errorUsers,
    refetch: refetchUsers
  } = useFetch<User[]>({ url: '/users', method: "GET" });

  // Fetch all products
  const {
    data: products,
    isLoading: loadingProducts,
    error: errorProducts,
    refetch: refetchProducts
  } = useFetch<Product[]>({ url: '/products', method: "GET" });



  // Abre el modal y establesco la entidad que quiero eliminar
  const handleDeleteClick = (id: number, type: "users" | "products") => {
    entityToDelete.current = { id, type }; // Almacena la entidad en la referencia
    setIsOpen(true);
  };


  // Use mutation hook
  const { loading, fetchEntity } = useMutation();

  // Confirma la eliminación
  const confirmDeleteClick = async () => {
    if (entityToDelete.current) {
      const endpoint = entityToDelete.current.type === "users"
        ? `/users/${entityToDelete.current.id}`
        : `/products/${entityToDelete.current.id}`;

      const response = await fetchEntity(null, "DELETE", endpoint);
      setIsOpen(false); // Cierro la modal

      if (response) {
        // Refresca la lista de usuarios o productos después de la eliminación
        if (entityToDelete.current.type === "users") {
          refetchUsers();
        } else {
          refetchProducts();
        }


        toast.success(entityToDelete.current.type === "users" ? "Usuario" : "Producto", {
          description: response,
        });
      }

      entityToDelete.current = null; // Limpia la entidad
    }
  };

  return (
    <>
      {isOpen && (
        <AlertModal
          questionText={entityToDelete.current?.type === 'users' ? "¿Esta seguro que desea eliminar este usuario?" : "¿Esta seguro que desea eliminar este producto?"}
          isOpen={isOpen}
          onClose={() => setIsOpen(!isOpen)}
          onConfirm={confirmDeleteClick}
          isloading={loading}
        />
      )
      }
      <div className='flex flex-col justify-center items-center gap-12 py-2 overflow-x-auto my-5'>
        <section className="p-4 lg:p-8 w-[95%] lg:w-[70%] mx-auto overflow-x-auto bg-gray-200 rounded-md">
          <div className='flex flex-col items-start mb-2 md:flex-row md:items-center md:justify-between'>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Listado Usuarios</h2>
            <Button text='Crear usuario' onClick={() => navigate("/user/create")} />
          </div>
          <table className="w-full border border-gray-200 bg-white shadow-sm rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-slate-600 text-white uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Nombre</th>
                <th className="py-3 px-6 text-left">Mail</th>
                <th className="py-3 px-6 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm w-full">
              {errorUsers && (
                <tr>
                  <td colSpan={4} className='p-2 bg-red-200'>
                    <p className='text-sm'>{errorUsers ?? "Error al obtener usuarios"}</p>
                  </td>
                </tr>
              )}
              {loadingUsers && (
                <tr>
                  <td colSpan={4} className='p-2'>
                    <div className='flex justify-center items-center gap-2 w-full'>
                      <p className='text-sm'>Obteniendo usuarios</p>
                      <Loading />
                    </div>
                  </td>
                </tr>
              )}
              {users && users.length > 0 ? users.map((item) => (
                <tr key={item.id} className="border-b border-zinc-200 hover:bg-zinc-100 transition duration-300 ease-in-out">
                  <td className="py-3 px-6">{item.id}</td>
                  <td className="py-3 px-6">{item.name}</td>
                  <td className="py-3 px-6">{item.email}</td>
                  <td className="py-3 px-6 text-center space-y-2">
                    <button
                      onClick={() => toast.warning("Editar usuarios", {
                        description: "¡Próximamente estará disponible!"
                      })}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 mr-2 transition duration-200 ease-in"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteClick(item.id, "users")}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200 ease-in"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
                : (
                  <tr>
                    <td colSpan={4} className='text-center p-4'>
                      <p className='text-sm'>No hay usuarios registrados todavía.</p>
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </section>


        <section className="p-4 lg:p-8 w-[95%] lg:w-[70%] mx-auto overflow-x-auto bg-gray-200 rounded-md">
          <div className='flex flex-col items-start mb-2 md:flex-row md:items-center md:justify-between'>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Listado Productos</h2>
            <Button text='Crear producto' onClick={() => navigate("/product/create")} />
          </div>
          <table className="w-full border border-gray-200 bg-white shadow-sm rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-slate-600 text-white uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Nombre</th>
                <th className="py-3 px-6 text-left">Descripción</th>
                <th className="py-3 px-6 text-left">Precio</th>
                <th className="py-3 px-6 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm w-full">
              {errorProducts && (
                <tr>
                  <td colSpan={4} className='p-2 bg-red-200'>
                    <p className='text-sm'>{errorUsers ?? "Error al obtener productos"}</p>
                  </td>
                </tr>
              )}
              {loadingProducts && (
                <tr>
                  <td colSpan={4} className='p-2'>
                    <div className='flex justify-center items-center gap-2 w-full'>
                      <p className='text-sm'>Obteniendo productos</p>
                      <Loading />
                    </div>
                  </td>
                </tr>
              )}
              {products && products.length > 0 ? products.map((item) => (
                <tr key={item.id} className="border-b border-zinc-200 hover:bg-zinc-100 transition duration-300 ease-in-out">
                  <td className="py-3 px-6">{item.id}</td>
                  <td className="py-3 px-6">{item.name}</td>
                  <td className="py-3 px-6">{item.description}</td>
                  <td className="py-3 px-6">{item.price}</td>
                  <td className="py-3 px-6 text-center space-y-2">
                    <button
                      onClick={() => toast.warning("Editar productos", {
                        description: "¡Próximamente estará disponible!"
                      })}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition duration-200 ease-in mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteClick(item.id, "products")}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200 ease-in"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className='text-center p-4'>
                    <p className='text-sm'>No hay productos registrados todavía.</p>
                  </td>
                </tr>
              )
              }
            </tbody>
          </table>
        </section>
      </div>

      <Toaster theme="light" position='top-right' duration={3000} />
    </>
  )
}
