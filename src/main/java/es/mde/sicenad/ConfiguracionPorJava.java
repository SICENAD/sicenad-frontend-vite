package es.mde.sicenad;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import com.fasterxml.jackson.databind.ObjectMapper;

@Configuration
@PropertySource({ "classpath:config/rest.properties", "classpath:config/jackson.properties",
"classpath:config/mail.properties" })
@ComponentScan({"es.mde"})
public class ConfiguracionPorJava {

	@Bean
	public ObjectMapper getObjectMapper() {

		ObjectMapper mapper = new ObjectMapper();
//		mapper.addMixIn(MascotaConId.class, MixIns.Mascotas.class);
//		mapper.addMixIn(ClienteConId.class, MixIns.Clientes.class);


		return mapper;
	}
}