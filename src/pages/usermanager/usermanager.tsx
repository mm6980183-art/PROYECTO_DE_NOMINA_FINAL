import './usermanager.css'
import { Link } from 'react-router-dom'

const UserNamerPage = () => {
  return (
    <div className="container">
      <div className="left"></div>

      <div className="right">
        <h1>Pay<span style={{ color: "#3b82f6;" }}>Track</span></h1>
        <h2>Gestión de usuarios</h2>

        <form>
          <div className="form-group">
            <label htmlFor="email">Nombre Completo</label>
            <input type="email" id="email" placeholder="Ingresa tu email" />
          </div>

          <div className="form-group">
            <label htmlFor="nombre">Cédula</label>
            <input type="text" id="nombre" placeholder="Ingresa tu nombre completo" />
          </div>

          <div className="form-group">
            <label htmlFor="cedula">Teléfono</label>
            <input type="text" id="cedula" placeholder="Ingresa tu número de cédula" />
          </div>

          <div className="form-group">
            <label htmlFor="fecha">Área de desempeño</label>
            <input type="text" id="fecha" placeholder="DIA/MES/AÑO" />
          </div>

          <div className="form-group">
            <label htmlFor="fecha">Cargo</label>
            <input type="text" id="fecha" placeholder="DIA/MES/AÑO" />
          </div>

          <div className="form-group">
            <label>Actualización de información de usuarios – Gestión y eliminación de registros</label>
            <div className="permisos">
              <div className="permiso-btn">Actualizar usuario</div>
              <div className="permiso-btn">Eliminar usuario</div>
            </div>
          </div>

          <Link to="/downloads">
            <button className="btn" type="submit">Consultar usuario</button>
          </Link>


          <Link to="/downloads">
            <button className="btn" type="submit">Crear usuario</button>
          </Link>

        </form>
        
      </div>
    </div>
  )
}
export default UserNamerPage