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
import es.mde.entidades.Recurso;
import es.mde.entidades.UsuarioGestor;
import es.mde.repositorios.CenadDAO;

@RepositoryRestController
@RequestMapping(path = "cenads/{id}")
@Configuration
public class CenadController {

	private CenadDAO cenadDAO;

	public CenadController(CenadDAO cenadDAO) {
		this.cenadDAO = cenadDAO;
	}
	
	@GetMapping("/categorias")
	@ResponseBody
	public CollectionModel<PersistentEntityResource> getCategoriasCenad(@PathVariable Long id,
			PersistentEntityResourceAssembler assembler) {

		List<Categoria> categorias = cenadDAO.getCategoriasCenad(id);

		return assembler.toCollectionModel(categorias);
	}
	
	@GetMapping("/recursos")
	@ResponseBody
	public CollectionModel<PersistentEntityResource> getRecursosCenad(@PathVariable Long id,
			PersistentEntityResourceAssembler assembler) {

		List<Recurso> recursos = cenadDAO.getRecursosCenad(id);

		return assembler.toCollectionModel(recursos);
	}
	
	@GetMapping("/gestores")
	@ResponseBody
	public CollectionModel<PersistentEntityResource> getUsuariosGestorCenad(@PathVariable Long id,
			PersistentEntityResourceAssembler assembler) {

		List<UsuarioGestor> gestores = cenadDAO.getUsuariosGestorCenad(id);

		return assembler.toCollectionModel(gestores);
	}
}
