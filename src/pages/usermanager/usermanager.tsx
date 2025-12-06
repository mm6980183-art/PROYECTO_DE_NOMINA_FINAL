import axios from 'axios';
import './usermanager.css'
import { Link } from 'react-router-dom'

const UserNamerPage = () => {

  const handleSubmit = (e: any) => {
    e.preventDefault(); // evita que se recargue la página

    const formData = new FormData(e.target);

    const data = {
      NombreCompleto: formData.get("nombre"),
      Cedula: formData.get("cedula"),
      Telefono: formData.get("telefono"),
      AreadeDesempeño: formData.get("area"),
      Cargo: formData.get("cargo"),
    };

    console.log("Datos del formulario:", data);
    axios.post('http://localhost:3000/users', data)
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  };



  return (
    <div className="container">
      <div className="left"></div>

      <div className="right">
        <h1>Pay<span style={{ color: "#3b82f6;" }}>Track</span></h1>
        <h2>Gestión de usuarios</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre Completo</label>
            <input type="nombre" id="nombre" name="nombre" placeholder="Ingresa tu nombre" />
          </div>

          <div className="form-group">
            <label htmlFor="cedula">Cédula</label>
            <input type="text" id="cedula" name="cedula" placeholder="Ingresa tu cedula completo" />
          </div>

          <div className="form-group">
            <label htmlFor="telefono">Teléfono</label>
            <input type="text" id="telefono" name="telefono" placeholder="Ingresa tu número de cédula" />
          </div>

          <div className="form-group">
            <label htmlFor="area">Área de desempeño</label>
            <input type="text" id="area" name="area" placeholder="Área de desempeño" />
          </div>

          <div className="form-group">
            <label htmlFor="cargo">Cargo</label>
            <input type="text" id="cargo" name="cargo" placeholder="Cargo" />
          </div>

          <button className="btn" type="submit">Crear usuario</button>
          <Link to="/list-users">
            <button className="btn" type="submit">Ver usuarios</button>
          </Link>
        </form>


      </div>
    </div>
  )
}
export default UserNamerPage