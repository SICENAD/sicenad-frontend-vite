package es.mde.repositorios;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import es.mde.entidades.Categoria;
import es.mde.entidades.Recurso;
import es.mde.entidades.SolicitudRecurso;

@Transactional(readOnly = true)
public class CenadDAOImpl implements CenadDAOCustom {
	@Autowired
	CenadDAO cenadDAO;

	@PersistenceContext
	EntityManager entityManager;
	
	@Override//obtiene las categorias padre de un cenad concreto
	public List<Categoria> getCategoriasPadreCenad(Long id) {
		
		List<Categoria> categorias = cenadDAO.findById(id).get().getCategorias().stream().filter(c -> c.getCategoriaPadre() == null).collect(Collectors.toList());

		return categorias;
	}

	@Override//obtiene todos los recursos de las categorias de un cenad
	public List<Recurso> getRecursosCenad(Long id) {

		List<Recurso> recursos = new ArrayList<Recurso>();

		List<Categoria> categorias = cenadDAO.findById(id).get().getCategorias().stream().collect(Collectors.toList());

		categorias.forEach(c -> recursos.addAll(c.getRecursos()));

		return recursos;
	}

	@Override//obtiene todas las solicitudes de un cenad
	public List<SolicitudRecurso> getSolicitudesCenad(Long id) {
		
		List<SolicitudRecurso> solicitudes = new ArrayList<SolicitudRecurso>();
		
		List<Recurso> recursos = this.getRecursosCenad(id);
		
		recursos.forEach(r -> solicitudes.addAll(r.getSolicitudes()));
		
		return solicitudes;
	}	
}