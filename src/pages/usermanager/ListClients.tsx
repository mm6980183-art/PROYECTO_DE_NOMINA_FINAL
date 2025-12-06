import axios from 'axios';
import TitleHeader from '../../components/title'
import { useState } from 'react';


const ListClientsPage = () => {
    const [users, setUsers] = useState([])
    const [userFilter, setUserFilter] = useState<any>(null)

    const getUsersList = () => {
        setUserFilter(null);
        axios.get('http://localhost:3000/users')
            .then(response => {
                setUsers(response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const getUserById = (idColaboradores: number | string) => {
        console.log("ID seleccionado: ", idColaboradores);
        if (idColaboradores === '') {
            getUsersList();
            return
        }
        axios.get(`http://localhost:3000/users/${idColaboradores}`)
            .then(response => {
                setUserFilter(response.data)
                // setUsers(response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const deleteUserById = (idColaboradores: number | string) => {
        
        axios.delete(`http://localhost:3000/users/${idColaboradores}`)
            .then(response => {
                getUsersList();
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className="container">
            <div className="left"></div>

            <div className="right">
                <TitleHeader />
                <h2>Descarga la base de datos que necesites</h2>
                <button className='btn' onClick={getUsersList}>Cargar usuarios</button>
                <input type="text" id="buscar" onChange={(text) => { getUserById(text.target.value) }} className="search-box" placeholder="Ingresa el nombre de la base de datos que deseas descargar" />
                {
                    !userFilter ?
                        users.map((valores: any) => {
                            console.log(valores)
                            return <div key={valores.Cedula} onClick={() => { getUserById(valores.idColaboradores) }} style={{ padding: 10, borderWidth: 4, backgroundColor: 'red', marginBottom: 20, width: 600,position: 'relative' }}>
                                <div style={{ position: 'absolute', right: 5, top: 5 }}>
                                    <button className='btn' onClick={() => { deleteUserById(valores.idColaboradores) }}>Eliminar</button>
                                </div>
                                <h3>NOMBRE: {valores.NombreCompleto}</h3>
                                <h3>CEDULA: {valores.Cedula}</h3>
                                <h3>CARGO: {valores.Cargo}</h3>
                                <h3>TELEFONO: {valores.Telefono}</h3>
                            </div>
                        })
                        :
                        <div key={userFilter.Cedula} style={{ padding: 10, borderWidth: 4, backgroundColor: 'blue', marginBottom: 20, width: 600,position: 'relative' }}>
                            <div style={{ position: 'absolute', right: 5, top: 5 }}>
                                    <button className='btn' onClick={() => { deleteUserById(userFilter.idColaboradores) }}>Eliminar</button>
                                </div>
                            <h3>NOMBRE: {userFilter.NombreCompleto}</h3>
                            <h3>CEDULA: {userFilter.Cedula}</h3>
                            <h3>CARGO: {userFilter.Cargo}</h3>
                            <h3>TELEFONO: {userFilter.Telefono}</h3>
                        </div>
                }
            </div>
        </div >

    )
}
export default ListClientsPage