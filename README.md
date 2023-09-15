# Grafana-Prometheus-Loki
This is the prototpye server for the montitoring web applications. It is written in javascript and uses node.js, express.js., Grafana ,Prometheus and Loki.


#### Grafana 
Grafana is an open-source platform for monitoring and observability. It is commonly used to visualize and analyze data from various sources in real-time. Grafana provides a flexible and powerful interface for creating interactive dashboards, charts, and graphs to help users gain insights into their data.

### Prometheus
Prometheus is an open-source systems monitoring and alerting toolkit. It collects all the metrics data of the application at regular interval of time  and push this data to grafana for the purpose of visulation.

### Loki 
Loki specializes in collecting, storing, and querying log data efficiently.It is used to collect all the logs of the various servers and push them to grafana for further analayses.

### Installation
To install the server, you need to have node.js and npm installed. Then, you can run the following command in the root directory of the project:
```
npm install
```

### Running the server in test mode
To run the serveer in test mode, you can run the following command in the root directory of the project:
```
npm run dev
```
### Running the docker
To run the docker in test mode, you can run the following command in the terminal:
```
docker compose up 
```