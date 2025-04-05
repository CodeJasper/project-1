import type { Account } from "@prisma/client";

type IncomeForm = {
  accounts: Account[];
}

export function IncomeForm(props: IncomeForm) {
  const { accounts } = props;
  return (
    <div className="mx-auto max-w-md rounded-md p-4 shadow-lg">
      <h1 className="text-lg mb-4 font-medium">Nuevo Ingreso</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label>Monto:</label>
          <input className="rounded-md border border-gray-300 px-4 py-2" placeholder="Ingresa el monto" />
        </div>

        <div className="flex flex-col gap-1">
          <label>Cuenta:</label>
          <div className="relative">
            <select className="appearance-none w-full rounded-md border border-gray-300 pl-4 pr-8 py-2" >
              <option>Selecciona una cuenta</option>
              {accounts.map((account) => {
                return (
                  <option key={account.id} value={account.id}>{account.name}</option>
                )
              })}
            </select>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 material-icons">keyboard_arrow_down</span>
          </div>
        </div>
        <div className="flex gap-4 pt-4">
          <a href="/income" className="w-1/2 text-center border border-gray-900 text-gray-900 rounded-md px-4 py-2 hover:bg-gray-100">Cancelar</a>
          <a href="/income" className="w-1/2 text-center bg-gray-200 px-4 py-2 border border-gray-900 rounded-md hover:bg-gray-700 hover:text-white">Aceptar</a>
        </div>
      </form>
    </div>
  )
}