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

        // Si el valor no es un número, interpretarlo como búsqueda por nombre
        const maybeId = Number(idColaboradores);
        if (Number.isNaN(maybeId)) {
            // Si ya tenemos usuarios cargados, filtrar localmente
            if (users && users.length > 0) {
                const filtered = users.filter((u: any) => {
                    return u.NombreCompleto && u.NombreCompleto.toLowerCase().includes(String(idColaboradores).toLowerCase())
                })
                if (filtered.length === 1) {
                    setUserFilter(filtered[0])
                } else {
                    setUserFilter(null)
                    setUsers(filtered)
                }
                return
            }

            // Si no tenemos usuarios en memoria, pedir la lista completa y filtrar
            axios.get('http://localhost:3000/users')
                .then(response => {
                    const filtered = response.data.filter((u: any) => u.NombreCompleto && u.NombreCompleto.toLowerCase().includes(String(idColaboradores).toLowerCase()))
                    if (filtered.length === 1) {
                        setUserFilter(filtered[0])
                    } else {
                        setUserFilter(null)
                        setUsers(filtered)
                    }
                })
                .catch(error => {
                    console.log(error)
                })

            return
        }

        // Si es un id numérico, solicitar por id
        axios.get(`http://localhost:3000/users/${maybeId}`)
            .then(response => {
                setUserFilter(response.data)
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