# Aplicación `SICENAD` 

## INSTRUCCIONES

### PREPRODUCCIÓN
- Haga click [aquí](https://sicenad.netlify.app/) para acceder a la aplicación. 
- Puede consultar la documentación accediendo a la [WIKI](https://git.institutomilitar.com/sicenad/sicenad/wikis/home)
<!-- - Para documentacion más especifica del FRONT, se puede consultar en la siguiente [URL](https://sicenad.github.io/sicenad-documentation/).-->

### DESARROLLO
- Clone el repositorio
- Acceda al direccorio frontend
- Ejecute en una terminal: 
    
    `npm install`

    `npm start`

- La APP de despliega en [servidor local](http://localhost:4270/) sobre BD H2 en entorno de desarrollo, y posteriormente en ELEPHANTSQL. La API se despliega en Heroku.
- Se recomienda el uso de Google Chrome o Firefox como navegador.
- En producción se desplegará en el servidor del CENAD SG, utilizando una BD SQL Express.

*Nota: Se ha recurrido a HEROKU para desplegar la API y a ELEPHANTSQL para la BBDD, desplegando la aplicación en Netlify (primer prototipo ya funcionando).*

# SICENAD: Funcionalidades

- Se necesita una aplicación para poder gestionar los recursos de los CENAD,s/CMT,s del Ejército de Tierra.  
- La aplicación `SICENAD` permitirá crear y mantener una BD de sus CENAD,s/CMT,s, con sus respectivos recursos, pudiendo administrase cada CENAD/CMT, pero teniendo un control centralizado.
- Cada CENAD/CMT podrá decidir su estructura de recursos y podrá personalizarlos, sin necesidad de ningún conocimiento de programación.

  
![CENAD_SG](./frontend/src/assets/ESCUDO_CENAD_pequeño.jpg)

[DIM Sandstorm](https://dim.institutomilitar.com/) |  [DIM Web](https://web.institutomilitar.com/) | [Recursos Online DIM](https://web.institutomilitar.com/recursos-online.html)
