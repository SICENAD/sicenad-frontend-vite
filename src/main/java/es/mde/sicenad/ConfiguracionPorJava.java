package es.mde.sicenad;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import com.fasterxml.jackson.databind.ObjectMapper;

@Configuration
@PropertySource({ "classpath:config/rest.properties", "classpath:config/jackson.properties", "classpath:config/archivos.properties",
"classpath:config/mail.properties" })
@ComponentScan({"es.mde"})
public class ConfiguracionPorJava {

	@Value("${ruta.escudos}")
	private String rutaEscudos;

	@Value("${ruta.docRecursos}")
	private String rutaDocRecursos;

	@Value("${ruta.docSolicitudes}")
	private String rutaDocSolicitudes;

	@Bean("rutaEscudos")
	public String getRutaEscudos() {

		return rutaEscudos;
	}

	@Bean("rutaDocRecursos")
	public String getRutaDocRecursos() {

		return rutaDocRecursos;
	}

	@Bean("rutaDocSolicitudes")
	public String getRrutaDocSolicitudes() {

		return rutaDocSolicitudes;
	}


	@Bean
	public ObjectMapper getObjectMapper() {

		ObjectMapper mapper = new ObjectMapper();
//		mapper.addMixIn(MascotaConId.class, MixIns.Mascotas.class);
//		mapper.addMixIn(ClienteConId.class, MixIns.Clientes.class);


		return mapper;
	}


}