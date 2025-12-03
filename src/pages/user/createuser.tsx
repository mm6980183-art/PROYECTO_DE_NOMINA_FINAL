import './auth.css'

const CreateUser = () =>{
    return (
  <div className="container">
    <div className="left"></div>

    <div className="right">
      <h1>Pay<span style={{color:"#3b82f6;"}}>Track</span></h1>
      <h2>Creación de usuarios</h2>

      <form>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Ingresa tu email"  />
        </div>

        <div className="form-group">
          <label htmlFor="nombre">Nombres y apellidos</label>
          <input type="text" id="nombre" placeholder="Ingresa tu nombre completo"  />
        </div>

        <div className="form-group">
          <label htmlFor="cedula">Cédula</label>
          <input type="text" id="cedula" placeholder="Ingresa tu número de cédula"  />
        </div>

        <div className="form-group">
          <label htmlFor="fecha">Fecha de nacimiento</label>
          <input type="text" id="fecha" placeholder="DIA/MES/AÑO"  />
        </div>

        <div className="form-group">
          <label>Permisos de usuario - Selecciona los permisos del usuario que estás creando</label>
          <div className="permisos">
            <div className="permiso-btn">Usuario maestro</div>
            <div className="permiso-btn">Usuario general</div>
          </div>
        </div>

        <button className="btn" type="submit">Crear usuario</button>
      </form>

      <div className="footer">
        ¿Tienes problemas? <strong>Comunícate ahora con soporte técnico.</strong>
      </div>
    </div>
  </div>
    )
}
export default CreateUser