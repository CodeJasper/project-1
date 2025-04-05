import type { Income } from '@prisma/client';

type IncomesListProps = {
  incomes: Income[];
};

export function IncomesList(props: IncomesListProps) {
  const { incomes } = props;
  return (
    <>
      <div className="pb-4 mb-7 flex justify-between items-center border-b border-gray-400">
        <h1 className="text-5xl">Ingresos</h1>
        <a
          href="/income/add"
          className="flex items-center gap-4 bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white"
        >
          <span className="material-icons">search</span>
          Agregar ingreso
        </a>
      </div>
      <ul className="flex flex-col gap-4">
        {incomes.map((income) => {
          return (
            <li className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-xl">{income.mount}</span>
              {/* <span className="text-gray-500">{income.date}</span> */}
            </li>
          );
        })}
      </ul>
    </>
  );
}
