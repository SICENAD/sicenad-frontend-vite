package es.mde.repositorios;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import es.mde.entidades.Categoria;
import es.mde.entidades.Cenad;
import es.mde.entidades.Recurso;

@Transactional(readOnly = true)
public class CenadDAOImpl implements CenadDAOCustom {

	@Autowired
	CenadDAO cenadDAO;

	@PersistenceContext
	EntityManager entityManager;

	@Override
	public List<Categoria> getCategoriasCenad(Long id) {

		List<Categoria> categorias = cenadDAO.findById(id).get().getCategorias().stream().collect(Collectors.toList());

		return categorias;
	}

	@Override
	public List<Recurso> getRecursosCenad(Long id) {
		
		List<Recurso> recursos = new ArrayList<Recurso>();
		
		getCategoriasCenad(id).forEach(c -> recursos.addAll(c.getRecursos()));
		
//		for (Categoria categoria: getCategoriasCenad(cenad)) {
//		
//			recursos.addAll(categoria.getRecursos());
//		}
				
		return recursos;
	}
	
}
