version: '2.2'
services:

  es01:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.8.1
    container_name: es01
    environment:
      - node.name=es01
      - cluster.name=es-docker-cluster
      - discovery.type=single-node
    volumes:
      - data01:/usr/share/elasticsearch/data
    ports:
      - 127.0.0.1:9200:9200
    networks:
      - elastic

  kib01:
    image: docker.elastic.co/kibana/kibana:7.8.1
    container_name: kib01
    ports:
      - 127.0.0.1:5601:5601
    environment:
      ELASTICSEARCH_URL: http://es01:9200
      ELASTICSEARCH_HOSTS: http://es01:9200
    networks:
      - elastic

volumes:
  data01:
    driver: local

networks:
  elastic:
    driver: bridge
