package es.mde.repositorios;

import java.util.List;
import es.mde.entidades.Categoria;
import es.mde.entidades.Recurso;
import es.mde.entidades.SolicitudRecurso;

public interface CenadDAOCustom {
	List<Categoria> getCategoriasPadreCenad(Long id);
	List<Recurso> getRecursosCenad(Long id);
	List<SolicitudRecurso> getSolicitudesCenad(Long id);
}