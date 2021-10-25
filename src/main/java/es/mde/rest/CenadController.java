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
import es.mde.entidades.Cenad;
import es.mde.entidades.Recurso;
import es.mde.entidades.SolicitudRecurso;
import es.mde.repositorios.CenadDAO;

@RepositoryRestController
@RequestMapping(path = "/cenads")
@Configuration
public class CenadController {
	private CenadDAO cenadDAO;

	public CenadController(CenadDAO cenadDAO) {
		this.cenadDAO = cenadDAO;
	}
	
	@GetMapping("/sinAdmin")
	@ResponseBody
	public CollectionModel<PersistentEntityResource> getCenadsSinAdmin(PersistentEntityResourceAssembler assembler) {

		List<Cenad> cenads = cenadDAO.getCenadsSinAdmin();

		return assembler.toCollectionModel(cenads);
	}
	
	@GetMapping("/{id}/categoriasPadre")
	@ResponseBody
	public CollectionModel<PersistentEntityResource> getCategoriasPadreCenad(@PathVariable Long id,
			PersistentEntityResourceAssembler assembler) {

		List<Categoria> categorias = cenadDAO.getCategoriasPadreCenad(id);

		return assembler.toCollectionModel(categorias);
	}
	
	@GetMapping("/{id}/recursos")
	@ResponseBody
	public CollectionModel<PersistentEntityResource> getRecursosCenad(@PathVariable Long id,
			PersistentEntityResourceAssembler assembler) {

		List<Recurso> recursos = cenadDAO.getRecursosCenad(id);

		return assembler.toCollectionModel(recursos);
	}
	
	@GetMapping("/{id}/solicitudes")
	@ResponseBody
	public CollectionModel<PersistentEntityResource> getSolicitudesCenad(@PathVariable Long id,
			PersistentEntityResourceAssembler assembler) {

		List<SolicitudRecurso> solicitudes = cenadDAO.getSolicitudesCenad(id);

		return assembler.toCollectionModel(solicitudes);
	}
}