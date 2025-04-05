import type { Account, Income } from "@prisma/client";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/store/queryClient";

type IncomeForm = {
  accounts: Account[];
}

export function IncomeForm(props: IncomeForm) {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<Income>();

  const createIncome = async (data: Income) => {
    const response = await fetch("/api/incomes/", {
      method: "POST",
      body: JSON.stringify({ accountId: data.accountId, mount: data.mount })
    })

    if(!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message)
    }
  }

  const { mutate, error: mutationError } = useMutation({
    mutationFn: createIncome
  }, queryClient)

  const onSubmit = (data: Income) => {
    mutate(data);
  }

  const { accounts } = props;
  return (
    <div className="mx-auto max-w-md rounded-md p-4 shadow-lg">
      <h1 className="text-lg mb-4 font-medium">Nuevo Ingreso</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label>Monto:</label>
          <input
            className="rounded-md border border-gray-300 px-4 py-2"
            placeholder="Ingresa el monto"
            type="number"
            {...register('mount', { required: 'El monto es obligatorio' })}
          />
          {errors.mount?.message && (
            <span className="text-red-500 text-xs italic">{errors.mount.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label>Cuenta:</label>
          <div className="relative">
            <select
              className="appearance-none w-full rounded-md border border-gray-300 pl-4 pr-8 py-2"
              {...register('accountId', { required: 'La cuenta es obligatorio' })}
            >
              <option value="">Selecciona una cuenta</option>
              {accounts.map((account) => {
                return (
                  <option key={account.id} value={account.id}>{account.name}</option>
                )
              })}
            </select>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 material-icons">keyboard_arrow_down</span>
            {errors.accountId?.message && (
            <span className="text-red-500 text-xs italic">{errors.accountId.message}</span>
            )}
          </div>
        </div>

        {mutationError && (
          <span className="text-red-500 text-xs italic">{mutationError.message}</span>
        )}

        <div className="flex gap-4 pt-4">
          <a href="/income" className="w-1/2 text-center border border-gray-900 text-gray-900 rounded-md px-4 py-2 hover:bg-gray-100">Cancelar</a>
          <button type="submit" className="w-1/2 text-center bg-gray-200 px-4 py-2 border border-gray-900 rounded-md hover:bg-gray-700 hover:text-white">Aceptar</button>
        </div>
      </form>
    </div>
  )
}