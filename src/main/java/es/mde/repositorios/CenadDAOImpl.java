package es.mde.repositorios;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import es.mde.entidades.Categoria;
import es.mde.entidades.Cenad;

@Transactional(readOnly = true)
public class CenadDAOImpl implements CenadDAOCustom {

	@Autowired
	CenadDAO cenadDAO;

	@PersistenceContext
	EntityManager entityManager;

	@Override
	public List<Categoria> getCategoriasCenad(Cenad cenad) {

		List<Categoria> categorias = cenadDAO.findById(cenad.getId()).get().getCategorias().stream().collect(Collectors.toList());

		return categorias;
	}
	
}
