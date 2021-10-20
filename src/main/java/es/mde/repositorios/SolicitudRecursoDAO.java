package es.mde.repositorios;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import es.mde.entidades.SolicitudRecurso;

@RepositoryRestResource(path="solicitudes", collectionResourceRel="solicitudes", itemResourceRel="solicitud") 
public interface SolicitudRecursoDAO extends JpaRepository<SolicitudRecurso, Long> {
	
	@RestResource(path="fechaInicioRecursoPosterior")
	List<SolicitudRecurso> findByfechaHoraInicioRecursoAfter(@Param("fecha") Date fechaInicioRecurso);
	
	@RestResource(path="fechaSolicitudPosterior")
	List<SolicitudRecurso> findByfechaSolicitudAfter(@Param("fechaSolicitud") Date fechaSolicitud);
	
	@RestResource(path="fechaSolicitudesEntreDosFechas")
	List<SolicitudRecurso> findAllByfechaSolicitudBetween(@Param("fechaInicio") Date fechaSolicitudDesde, @Param("fechaFin") Date fechaSolicitudHasta);	
	
	@RestResource(path="fechaInicioRecursoEntreDosFechas")
	List<SolicitudRecurso> findAllByfechaHoraInicioRecursoBetween(@Param("fechaInicio") Date fechaInicioRecursoDesde, @Param("fechaFin") Date fechaInicioRecursoHasta);	
	
}
