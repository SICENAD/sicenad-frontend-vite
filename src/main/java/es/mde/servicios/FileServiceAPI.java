package es.mde.servicios;

import java.nio.file.Path;
import java.util.List;
import java.util.stream.Stream;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileServiceAPI {
	
	public void saveEscudo(MultipartFile file) throws Exception;
	
	public void borrarEscudo(String name) throws Exception;
	
	public Resource loadEscudo(String name) throws Exception;
	
	public void saveEscudos(List<MultipartFile> files) throws Exception;
	
	public Stream<Path> loadAllEscudos() throws Exception;
	
	public void saveDocRecurso(MultipartFile file) throws Exception;
	
	public void borrarDocRecurso(String name) throws Exception;
	
	public Resource loadDocRecurso(String name) throws Exception;
	
	public void saveDocRecursos(List<MultipartFile> files) throws Exception;
	
	public Stream<Path> loadAllDocRecursos() throws Exception;
	
	public void saveDocSolicitud(MultipartFile file) throws Exception;
	
	public void borrarDocSolicitud(String name) throws Exception;
	
	public Resource loadDocSolicitud(String name) throws Exception;
	
	public void saveDocSolicitudes(List<MultipartFile> files) throws Exception;
	
	public Stream<Path> loadAllDocSolicitudes() throws Exception;
}
