package es.mde.repositorios;

import javax.persistence.PostLoad;
import javax.persistence.PostPersist;
import javax.persistence.PostRemove;
import javax.persistence.PostUpdate;
import javax.persistence.PrePersist;
import javax.persistence.PreRemove;
import javax.persistence.PreUpdate;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import es.mde.entidades.UsuarioAdministrador;





@Component
public class UsuarioAdministradorListener {

	private Logger log = LoggerFactory.getLogger(UsuarioAdministradorListener.class);
	private UsuarioAdministradorDAO usuarioAdministradorDAO;
	
	@Autowired
	public void init(UsuarioAdministradorDAO categoriaDAO) {
		this.usuarioAdministradorDAO = usuarioAdministradorDAO;
	}
	
	@PrePersist
	public void preGuardar(UsuarioAdministrador usuarioAdministrador) {
		System.err.println("Se va a guardar un usuarioAdministrador: " + usuarioAdministrador.getNombre() + usuarioAdministrador.getCenad().getNombre());
	}
		
	@PostRemove
	public void postBorrar(UsuarioAdministrador usuarioAdministrador) {
		System.err.println("Se ha borrado un usuarioAdministrador: " + usuarioAdministrador.getNombre() + usuarioAdministrador.getCenad().getNombre());
	}
	
	@PreUpdate
	public void preActualizar(UsuarioAdministrador usuarioAdministrador) {
		System.err.println("Se va a actualizar  un usuarioAdministrador: " + usuarioAdministrador.getNombre() + usuarioAdministrador.getCenad().getNombre());
	}
	
	@PostUpdate
	public void postActualizar(UsuarioAdministrador usuarioAdministrador) {
		System.err.println("Se ha actualizado  un usuarioAdministrador: " + usuarioAdministrador.getNombre() + usuarioAdministrador.getCenad().getNombre());
	}
	
	@PostPersist
	public void postGuardar(UsuarioAdministrador usuarioAdministrador) {
		log.warn("has guardado un usuarioAdministrador: " + usuarioAdministrador.getNombre() + usuarioAdministrador.getCenad().getNombre());
	}
}



