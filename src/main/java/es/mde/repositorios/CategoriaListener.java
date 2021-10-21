package es.mde.repositorios;

import javax.persistence.PostPersist;
import javax.persistence.PostRemove;
import javax.persistence.PostUpdate;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import es.mde.entidades.Categoria;

@Component
public class CategoriaListener {
	private Logger log = LoggerFactory.getLogger(CategoriaListener.class);
	private CategoriaDAO categoriaDAO;
	
	@Autowired
	public void init(CategoriaDAO categoriaDAO) {
		this.categoriaDAO = categoriaDAO;
	}
	
	@PrePersist
	public void preGuardar(Categoria categoria) {
		System.err.println("Se va a guardar una categoria: " + categoria.getNombre());
	}
		
	@PostRemove
	public void postBorrar(Categoria categoria) {
		System.err.println("Se ha borrado una categoria: " + categoria.getNombre());
	}
	
	@PreUpdate
	public void preActualizar(Categoria categoria) {
		System.err.println("Se va a actualizar  una categoria: " + categoria.getNombre());
	}
	
	@PostUpdate
	public void postActualizar(Categoria categoria) {
		System.err.println("Se ha actualizado  una categoria: " + categoria.getNombre());
	}
	
	@PostPersist
	public void postGuardar(Categoria categoria) {
		log.warn("has guardado una categoria: " + categoria.getNombre());
	}
}