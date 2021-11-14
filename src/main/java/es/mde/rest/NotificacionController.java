package es.mde.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import es.mde.Notificaciones.Notificar;
import es.mde.Notificaciones.SolicitudDTO;


@RestController
@RequestMapping(path = "/api/notificar")
//@Configuration
public class NotificacionController {
	
	@GetMapping("/{id}")
	public SolicitudDTO enviarNotificacion(@PathVariable Long id) {
		
		SolicitudDTO solicitudDTO = Notificar.enviarNotificacion(id);
				
		return solicitudDTO;
		
	}
	
	
	
	
	
//	public CollectionModel<PersistentEntityResource> generarFacturas(@PathVariable Long id,
//			PersistentEntityResourceAssembler assembler) {
//
//		List<PrestacionConId> prestaciones = Descargar.generarFacturas(id);
//		
//		return assembler.toCollectionModel(prestaciones);
//	}
		
		
	
}
