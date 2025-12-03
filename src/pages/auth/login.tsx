import './login.css'
import { Link } from 'react-router-dom'

const LoginPage = () => {
    return (
        <div className="container">
            <div className="right">
                <div className="login-box">
                    <h1>Pay<span style={{ color: "#3b82f6" }}>Track</span></h1>
                    <p>Bienvenido de vuelta</p>

                    <form>
                        <div className="form-group">
                            <label htmlFor="email">Correo electrónico</label>
                            <input type="email" id="email" placeholder="Ingresa tu email" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <input type="password" id="password" placeholder="Ingresa tu contraseña" required />
                        </div>

                        <Link to="/createuser">
                            <button className="btn" type="submit">Iniciar sesión</button>
                        </Link>

                    </form>

                    <div className="social-login">
                        <p>O inicia sesión con:</p>
                        <a href="#" className="social-btn">Facebook</a>
                        <a href="#" className="social-btn">Google</a>
                    </div>

                    <div className="links">
                        <p>¿Olvidaste tu contraseña? <a href="#">Recupérala aquí</a></p>
                        <p>¿No tienes una cuenta? <a href="#">Crea una ahora</a></p>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default LoginPage 