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
import es.mde.entidades.CategoriaFichero;
import es.mde.repositorios.RecursoDAO;

@RepositoryRestController
@RequestMapping(path = "recursos/{id}")
@Configuration
public class RecursoController {
	private RecursoDAO recursoDAO;

	public RecursoController(RecursoDAO recursoDAO) {
		this.recursoDAO = recursoDAO;
	}
	
	@GetMapping("/categoriasFichero")
	@ResponseBody
	public CollectionModel<PersistentEntityResource> getCategoriasFicheroDeRecurso(@PathVariable Long id,
			PersistentEntityResourceAssembler assembler) {

		List<CategoriaFichero> categoriasFichero = recursoDAO.getCategoriasFicheroDeRecurso(id);

		return assembler.toCollectionModel(categoriasFichero);
	}
}