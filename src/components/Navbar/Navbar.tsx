import React, { Component } from 'react';
import '../../styles/components/navbar.css'

class Navbar extends Component {

    /*Usuario Normal*/
    render()  {
        return(
            <div className='navbar-container align-text-top flex justify-center'>
                <div>
                    <h1 className='nb-name'>Nombre del e-commerce</h1>
                </div>
                <div>
                    <a href="" className='navbar-href'>
                        Inicio
                    </a>
                    <a href="" className='navbar-href'>
                        Contacto
                    </a>
                    <a href="" className='navbar-href'>
                        Acerca de
                    </a>
                    <a href="" className='navbar-href'>
                        Ajustes
                    </a>
                    <a className='navbar-href'>
                        Mis Compras
                    </a>
                    <a className='navbar-href'>
                        Mi perfil
                    </a>
                    <a className='navbar-href'>
                        Otro...
                    </a>
                </div>


            </div>
        )
    }
}

export default Navbar;