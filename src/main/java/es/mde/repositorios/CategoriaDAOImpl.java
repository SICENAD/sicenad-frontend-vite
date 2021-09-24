package es.mde.repositorios;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import es.mde.entidades.Categoria;

@Transactional(readOnly = true)
public class CategoriaDAOImpl implements CategoriaDAOCustom {

	@Autowired
	CategoriaDAO categoriaDAO;

	@PersistenceContext
	EntityManager entityManager;

	@Override
	public List<Categoria> getSubcategorias(Categoria categoriaPadre) {
		List<Categoria> categorias = categoriaDAO.findAll().stream()
				.filter(j -> j.getCategoriaPadre() == categoriaPadre).collect(Collectors.toList());

		return categorias;
	}
	
	@Override
	public List<Categoria> getCategoriasPadre() {
		List<Categoria> categorias = categoriaDAO.findAll().stream()
				.filter(j -> j.getCategoriaPadre() == null).collect(Collectors.toList());

		return categorias;
	}
	
}
