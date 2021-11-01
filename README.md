# Aplicación `SICENAD` 

![CENAD_SG](./frontend/src/assets/ESCUDO_CENAD_pequeño.jpg)

## DOCUMENTACIÓN

- Puede consultar la documentación accediendo a la [WIKI](https://git.institutomilitar.com/sicenad/sicenad/wikis/home).

- Como documentación más específica del BACK, se puede consultar su [Javadoc](https://sicenad.github.io/sicenad_backend_javadoc_documentation/), así como su [documentación Postman](https://documenter.getpostman.com/view/15313739/UVByHpXD).

Para documentacion más especifica del FRONT, se puede consultar en la siguiente [URL](https://sicenad.github.io/sicenad_frontend_documentation/).

## DESARROLLO

- El **primer prototipo**, perteneciente al primer sprint, utiliza una BD ELEPHANTSQL, y despliega la API en [Heroku](https://www.heroku.com/), y la aplicación en [Netlify](https://www.netlify.com/). Se puede acceder al prototipo [aquí](https://sicenad.netlify.app/)

- El **segundo prototipo**, perteneciente al segundo sprint, utiliza una BD SQL Server (en el servidor privado situado en el simulador Casiopea del CENAD SG), y despliega la API y la aplicación web en IIS, en el mencionado servidor. Se puede acceder al prototipo desde [aquí](http://192.168.100.199/sicenad) (no accesible desde internet). 

- En producción se desplegará en el servidor del CENAD SG, utilizando una BD SQL Server (accesible desde WAN-PG MINISDEF).

## FUNCIONALIDADES PRINCIPALES

- Se necesita una aplicación para poder gestionar los recursos de los CENAD,s/CMT,s del Ejército de Tierra.  
- La aplicación `SICENAD` permitirá crear y mantener una BD de sus CENAD,s/CMT,s, con sus respectivos recursos, pudiendo administrase cada CENAD/CMT, pero teniendo un control centralizado.
- Cada CENAD/CMT podrá decidir su estructura de recursos y podrá personalizarlos, sin necesidad de ningún conocimiento de programación.
- Cada CENAD dispondrá además de un repositorio actualizado de cartografía.

[DIM Sandstorm](https://dim.institutomilitar.com/) |  [DIM Web](https://web.institutomilitar.com/) | [Recursos Online DIM](https://web.institutomilitar.com/recursos-online.html)