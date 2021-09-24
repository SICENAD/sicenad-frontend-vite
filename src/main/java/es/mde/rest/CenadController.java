package es.mde.rest;

import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.webmvc.PersistentEntityResource;
import org.springframework.data.rest.webmvc.PersistentEntityResourceAssembler;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.CollectionModel;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import es.mde.entidades.Categoria;
import es.mde.entidades.Cenad;
import es.mde.repositorios.CenadDAO;

@RepositoryRestController
@RequestMapping(path = "cenads/{id}/categorias")
@Configuration
public class CenadController {

	private CenadDAO cenadDAO;

	public CenadController(CenadDAO cenadDAO) {
		this.cenadDAO = cenadDAO;
	}
	
//	@GetMapping("/{id}/subcategorias/search")
	@ResponseBody
	public CollectionModel<PersistentEntityResource> getCategoriasCenad(@PathVariable Cenad cenad,
			PersistentEntityResourceAssembler assembler) {

		List<Categoria> categorias = cenadDAO.getCategoriasCenad(cenad);

		return assembler.toCollectionModel(categorias);
	}
	
}
