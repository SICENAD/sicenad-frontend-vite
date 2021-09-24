package es.mde.rest;

import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.webmvc.PersistentEntityResource;
import org.springframework.data.rest.webmvc.PersistentEntityResourceAssembler;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.CollectionModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import es.mde.entidades.Categoria;
import es.mde.repositorios.CategoriaDAO;

@RepositoryRestController
@RequestMapping(path = "/categorias")
@Configuration
public class CategoriaController {

	private CategoriaDAO categoriaDAO;

	public CategoriaController(CategoriaDAO categoriaDAO) {
		this.categoriaDAO = categoriaDAO;
	}
	
	@GetMapping("/{id}/subcategorias/search")
	@ResponseBody
	public CollectionModel<PersistentEntityResource> getSubcategorias(@PathVariable Categoria categoriaPadre,
			PersistentEntityResourceAssembler assembler) {

		List<Categoria> categorias = categoriaDAO.getSubcategorias(categoriaPadre);

		return assembler.toCollectionModel(categorias);
	}
	
	@GetMapping("/padre/search")
	@ResponseBody
	public CollectionModel<PersistentEntityResource> getCategoriasPadre(PersistentEntityResourceAssembler assembler) {

		List<Categoria> categorias = categoriaDAO.getCategoriasPadre();

		return assembler.toCollectionModel(categorias);
	}
	
}
