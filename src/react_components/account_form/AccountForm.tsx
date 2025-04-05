import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/store/queryClient";
import { useEffect } from "react";

type Account = {
  name: string;
  color: string;
}

export default function AccountForm() {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<Account>();

  const createAccount = async (data: Account) => {
    const response = await fetch('/api/accounts', {
      method: "POST",
      body: JSON.stringify({ name: data.name, color: data.color })
    })

    if(!response.ok){
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  }

  const { mutate, error: mutationError } = useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      console.log("success");
    },
  }, queryClient)

  const onSubmit = (data: Account) => {
    mutate(data);
  }

  return(
    <div className="mx-auto max-w-md rounded-md p-4 shadow-lg">
      <h1 className="text-lg mb-4 font-medium">Nueva cuenta</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label>Nombre:</label>
          <input
            className="rounded-md border border-gray-300 px-4 py-2"
            placeholder="Ingresa el nombre"
            {...register('name', { required: "El nombre es obligatorio" })}
          />
          {errors.name?.message && (
            <span className="text-red-500 text-xs italic">{errors.name.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label>Color:</label>
          <input
            type="color"
            className="h-11 w-1/4 rounded-md border border-gray-300 px-4 py-2"
            {...register('color', { required: "El color es obligatorio" })}
          />
          {errors.color?.message && (
            <span className="text-red-500 text-xs italic">{errors.color.message}</span>
          )}
        </div>

        {mutationError && (
          <span className="text-red-500 text-xs italic">{mutationError.message}</span>
        )}

        <div className="flex gap-4 pt-4">
          <a href="/accounts" className="w-1/2 text-center border border-gray-900 text-gray-900 rounded-md px-4 py-2 hover:bg-gray-100">Cancelar</a>
          <button type="submit" className="w-1/2 text-center bg-gray-200 px-4 py-2 border border-gray-900 rounded-md hover:bg-gray-700 hover:text-white">Aceptar</button>
        </div>
      </form>
    </div>
  )
}