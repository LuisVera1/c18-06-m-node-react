import React from 'react';
import Image from 'next/image';
import Filter from '../../../../../assets/Filter.png'
import Search from '../../../../../assets/Search.png'

interface User {
  name: string;
  email: string;
  id: string;
  program: string;
  status: string;
}

const users: User[] = [
  { name: 'Hanna Baker', email: 'hanna@company.com', id: '123456789', program: 'Diseño', status: 'Activo' },
  { name: 'Hanna Baker', email: 'hanna@company.com', id: '123456789', program: 'Economía', status: 'Graduado' },
  { name: 'Hanna Baker', email: 'hanna@company.com', id: '123456789', program: 'Contaduría', status: 'Inactivo' },
  { name: 'Hanna Baker', email: 'hanna@company.com', id: '123456789', program: 'Ing. civil', status: 'Activo' },
  { name: 'Hanna Baker', email: 'hanna@company.com', id: '123456789', program: 'Ing. industrial', status: 'Graduado' },
  { name: 'Hanna Baker', email: 'hanna@company.com', id: '123456789', program: 'Publicidad', status: 'Inactivo' },
  { name: 'Hanna Baker', email: 'hanna@company.com', id: '123456789', program: 'Ing. civil', status: 'Activo' }
];

const UserTable: React.FC = () => {
  return (
    <div className="flex-1 p-6 bg-white rounded-lg shadow m-4">
      <h1 className='font-bold text-blue-500 text-2xl mb-5'>Lista de estudiantes</h1>
      <div className="flex justify-between mb-4">
      <div className="relative w-full sm:w-1/2">
      <input
        type="text"
        placeholder="Buscar estudiante"
        className="w-full p-2 pl-10 border rounded"
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Image src={Search} alt="Buscar" width={20} height={20} />
      </div>
    </div>
        <div className="flex space-x-2">
          <Image 
            src={Filter} 
            alt="Filtro" 
            className='mr-4 cursor-pointer'
            width={24} 
            height={24} 
          />
          <button className="bg-blue-200 text-blue-500 font-semibold py-2 px-4 rounded">Crear nuevo estudiante</button>
          <button className="bg-blue-500 text-white  py-2 px-4 rounded">Carga masiva</button>
        </div>
      </div>


      <table className="w-full border-collapse">
        <thead className="bg-blue-200 rounded-full text-blue-500">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Correo</th>
            <th className="p-2">ID Estudiante</th>
            <th className="p-2">Programa</th>
            <th className="p-2">Estado académico</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {users.map((user, index) => (
            <tr key={index} className="bg-white">
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.id}</td>
              <td className="p-2">{user.program}</td>
              <td className="p-2">
                <span className={`p-1 rounded ${user.status === 'Activo' ? 'bg-green-200' : user.status === 'Graduado' ? 'bg-yellow-200' : 'bg-red-200'}`}>
                  {user.status}
                </span>
              </td>
              <td className="p-2 flex justify-around">
                <button className="text-blue-500">✏️</button>
                <button className="text-red-500">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
