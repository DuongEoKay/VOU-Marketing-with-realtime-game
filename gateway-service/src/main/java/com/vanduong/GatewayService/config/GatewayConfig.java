package com.vanduong.GatewayService.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.cloud.netflix.hystrix.EnableHystrix;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableHystrix
public class GatewayConfig {

    @Autowired
    AuthenticationFilter filter;

    @Bean
    public RouteLocator routes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("user-service", r -> r.path("/users/**")
                        .filters(f -> f.filter(filter))
                        .uri("lb://user-service"))
                .route("auth-service", r -> r.path("/auth/**")
                        .filters(f -> f.filter(filter))
                        .uri("lb://auth-service"))
                .route("auth-service", r -> r.path("/games/**")
                        .filters(f -> f.filter(filter))
                        .uri("lb://game-service"))
                .route("brand-service", r -> r.path("/brand/**")
                        .filters(f -> f.filter(filter))
                        .uri("lb://brand-service"))
                .route("report-service", r -> r.path("/report/**")
                        .filters(f -> f.filter(filter))
                        .uri("lb://report-service"))
                .route("log-service", r -> r.path("/log/**")
                        .filters(f -> f.filter(filter))
                        .uri("lb://log-service"))
                .build();
    }





}
