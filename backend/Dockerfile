FROM maven:3.9.11-eclipse-temurin-21-noble AS builder

WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn package -DskipTests

FROM eclipse-temurin:21-jre-noble
WORKDIR /app

RUN addgroup --system spring && adduser --system --ingroup spring spring

USER spring

COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]