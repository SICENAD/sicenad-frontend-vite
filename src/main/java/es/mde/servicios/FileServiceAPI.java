package es.mde.servicios;

import java.nio.file.Path;
import java.util.List;
import java.util.stream.Stream;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileServiceAPI {
	// *******************************
	// Métodos para tratar los escudos
	// *******************************
	public void saveEscudo(MultipartFile file) throws Exception;
	
	public void borrarEscudo(String name) throws Exception;
	
	public Resource loadEscudo(String name) throws Exception;
	
	public void saveEscudos(List<MultipartFile> files) throws Exception;
	
	public Stream<Path> loadAllEscudos() throws Exception;
	
	// *********************************************************
	// Métodos para tratar los ficheros asociados a los recursos
	// *********************************************************
	
	public void saveDocRecurso(MultipartFile file, String id) throws Exception;
	
	public void borrarDocRecurso(String name, String id) throws Exception;
	
	public void borrarCarpetaDocRecurso(String id) throws Exception;
	
	public Resource loadDocRecurso(String name, String id) throws Exception;
	
	public 	Resource loadDocRecurso(String name) throws Exception;
	
	public void saveDocRecursos(List<MultipartFile> files, String id) throws Exception;
	
	public Stream<Path> loadAllDocRecursos(String id) throws Exception;
	
	// ************************************************************
	// Métodos para tratar los ficheros asociados a las solicitudes
	// ************************************************************
	
	public void saveDocSolicitud(MultipartFile file, String id) throws Exception;
	
	public void borrarDocSolicitud(String name, String id) throws Exception;
	
	public void borrarCarpetaDocSolicitud(String id) throws Exception;

	public Resource loadDocSolicitud(String name, String id) throws Exception;
	
	public 	Resource loadDocSolicitud(String name) throws Exception;
	
	public void saveDocSolicitudes(List<MultipartFile> files, String id) throws Exception;
	
	public Stream<Path> loadAllDocSolicitudes(String id) throws Exception;
}