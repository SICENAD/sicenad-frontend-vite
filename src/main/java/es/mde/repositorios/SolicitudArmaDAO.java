package es.mde.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import es.mde.entidades.SolicitudArma;

@RepositoryRestResource(path="solicitudesArmas", collectionResourceRel="solicitudesArmas", itemResourceRel="solicitudArma") 
public interface SolicitudArmaDAO extends JpaRepository<SolicitudArma, Long> {

}
