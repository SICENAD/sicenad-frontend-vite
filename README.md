# Aplicación `SICENAD` 

![CENAD_SG](./frontend/src/assets/ESCUDO_CENAD_pequeño.jpg)

## INSTRUCCIONES

### PREPRODUCCIÓN
- Haga click [aquí](https://sicenad.netlify.app/) para acceder al primer prototipo de la aplicación. Debido a que en los siguientes prototipos se utilizará información sensible ya no se publicarán en internet. 
- Puede consultar la documentación accediendo a la [WIKI](https://git.institutomilitar.com/sicenad/sicenad/wikis/home)
<!-- - Para documentacion más especifica del FRONT, se puede consultar en la siguiente [URL](https://sicenad.github.io/sicenad-documentation/).-->

### DESARROLLO
- Clone el repositorio
- Acceda al direccorio frontend
- Ejecute en una terminal: 
    
    `npm install`

    `npm start`

- La APP de despliega en [servidor local](http://localhost:4270/) en entorno de desarrollo, inicialmente sobre BD H2, y posteriormente en ELEPHANTSQL (primer prototipo) y SQL Server (en el servidor privado situado en simulador Casiopea del CENAD SG).
- La API se despliega en Heroku (primer prototipo) y en IIS (en el servidor anteriormente mencionado del CENAD SG).
- Se recomienda el uso de Google Chrome o Firefox como navegador.
- En producción se desplegará en el servidor del CENAD SG, utilizando una BD SQL Server (accesible desde WAN-PG MINISDEF).

## SICENAD: Funcionalidades

- Se necesita una aplicación para poder gestionar los recursos de los CENAD,s/CMT,s del Ejército de Tierra.  
- La aplicación `SICENAD` permitirá crear y mantener una BD de sus CENAD,s/CMT,s, con sus respectivos recursos, pudiendo administrase cada CENAD/CMT, pero teniendo un control centralizado.
- Cada CENAD/CMT podrá decidir su estructura de recursos y podrá personalizarlos, sin necesidad de ningún conocimiento de programación.
- Cada CENAD dispondrá además de un repositorio actualizado de cartografía.

[DIM Sandstorm](https://dim.institutomilitar.com/) |  [DIM Web](https://web.institutomilitar.com/) | [Recursos Online DIM](https://web.institutomilitar.com/recursos-online.html)