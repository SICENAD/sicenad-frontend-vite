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

@Transactional(readOnly = true)
public class CategoriaDAOImpl implements CategoriaDAOCustom {
	@Autowired
	CategoriaDAO categoriaDAO;

	@PersistenceContext
	EntityManager entityManager;
	
	@Override//obtiene un listado de todas las categorias padre de todos los CENAD,s/CMT,s
	public List<Categoria> getCategoriasPadre() {
		List<Categoria> categorias = categoriaDAO.findAll().stream()
				.filter(j -> j.getCategoriaPadre() == null).collect(Collectors.toList());
		
		return categorias;
	}

	@Override//obtiene recursivamente los recursos de una categoria y de sus subcategorias, recursivamente
	public List<Recurso> getRecursosDeSubcategorias(Long id) {
		List<Recurso> recursos = new ArrayList<Recurso>();
		
		getSubcategoriasAnidadas(id).forEach(c -> recursos.addAll(c.getRecursos()));

		return recursos;
	}

	@Override//obtiene un listado de las subcategorias anidadas de una subcategoria, recursivamente
	public List<Categoria> getSubcategoriasAnidadas(Long id) {
		List<Categoria> categorias = categoriaDAO.findById(id).get().getSubcategorias().stream().collect(Collectors.toList());
		List<Categoria> categoriasAnidadas = new ArrayList<Categoria>();
		categoriasAnidadas.addAll(categorias);
		categorias.forEach(c -> { 
			if (c.getSubcategorias().size() != 0) {
				categoriasAnidadas.addAll(getSubcategoriasAnidadas(c.getId()));
			}
		});
		
		return categoriasAnidadas;
	}
}