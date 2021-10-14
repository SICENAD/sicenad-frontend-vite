package es.mde.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import es.mde.entidades.TipoFormulario;


@RepositoryRestResource(path="tipos_formulario", collectionResourceRel="tipos_formulario", itemResourceRel="tipo_formulario") 
public interface TipoFormularioDAO extends JpaRepository<TipoFormulario, Long> {

	@RestResource(path="nombre")
	List<TipoFormulario> findByNombreIgnoreCaseContaining(@Param("nombre") String txt);
}
