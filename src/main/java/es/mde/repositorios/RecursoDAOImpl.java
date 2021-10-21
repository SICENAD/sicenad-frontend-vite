package es.mde.repositorios;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import es.mde.entidades.CategoriaFichero;
import es.mde.entidades.Fichero;

@Transactional(readOnly = true)
public class RecursoDAOImpl implements RecursoDAOCustom {
	@Autowired
	RecursoDAO recursoDAO;

	@PersistenceContext
	EntityManager entityManager;
	
	@Override//obtiene un listado de las categorias de fichero de los ficheros que tiene un recurso concreto
	public List<CategoriaFichero> getCategoriasFicheroDeRecurso(Long id) {

		List<CategoriaFichero> categoriasFichero = new ArrayList<CategoriaFichero>();

		List<Fichero> ficheros = recursoDAO.findById(id).get().getFicheros().stream().collect(Collectors.toList());

		for (Fichero fichero : ficheros) {
			if (!categoriasFichero.contains(fichero.getCategoriaFichero())) {
				categoriasFichero.add(fichero.getCategoriaFichero());
			}
		}
		return categoriasFichero;
	}
}