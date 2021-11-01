package es.mde.repositorios;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import es.mde.entidades.Cartografia;

/**
 * Representa la interfaz que expone para la API los conjuntos cartograficos 
 * @author JOSE LUIS PUENTES ÁLAMOS - MIGUEL PRADA MUÑOZ
 *
 */
@RepositoryRestResource(path="cartografias", collectionResourceRel="cartografias", itemResourceRel="cartografia") 
public interface CartografiaDAO extends JpaRepository<Cartografia, Long> {
	
	/**
	 * Devuelve una lista de conjuntos cartograficos que contiene ese texto en su nombre
	 * @param txt Texto que esta incluido en el nombre de los conjuntos cartograficos buscados
	 * @return Devuelve una lista de conjuntos cartograficos que contiene ese texto en su nombre
	 */
	@RestResource(path="nombre")
	List<Cartografia> findByNombreIgnoreCaseContaining(@Param("nombre") String txt);
}